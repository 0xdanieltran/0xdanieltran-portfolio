import "server-only"

import knowledge from "@/features/chatbot/data/portfolio-knowledge.json"
import type { KnowledgeBase, KnowledgeDoc } from "@/features/chatbot/types"

import { GROQ_ROUTER_MODEL, groqJson } from "./groq"
import { cosine, expandQueryTokens, tokenize, vectorize } from "./text"

const KB = knowledge as KnowledgeBase
const VOCAB_INDEX = new Map(KB.vocabulary.map((t, i) => [t, i]))
const DOC_BY_ID = new Map(KB.documents.map((d) => [d.id, d]))

/** Always given to the model so basic identity questions never miss. */
const ALWAYS_INCLUDE = ["profile:overview"]

const LIVE_LINKS_ID = "project:live-links"
const LINK_INTENT =
  /\b(demos?|live|websites?|sites?|urls?|links?|try|visit|play|app ?store|google play|see (it|them|one|some))\b/i

const CANDIDATE_COUNT = 14
const FINAL_COUNT = 5
const MAX_CONTEXT_CHARS = 9000

export type ScoredDoc = { doc: KnowledgeDoc; score: number }

function embedQuery(text: string) {
  return vectorize(expandQueryTokens(tokenize(text)), VOCAB_INDEX, KB.idf)
}

/**
 * Vector search over the local JSON store — the equivalent of
 * `ORDER BY embedding <=> $query LIMIT k` in pgvector.
 */
export function vectorSearch(question: string, previousQuestion?: string) {
  const q = embedQuery(question)
  const prev = previousQuestion ? embedQuery(previousQuestion) : null
  const lower = question.toLowerCase()
  const wantsArticles =
    /\b(blog|article|post|insight|write|wrote|written)/.test(lower)

  const ranked = KB.documents
    .map<ScoredDoc>((doc) => {
      let score = cosine(q, doc.embedding)
      // Follow-ups like "tell me more about it" lean on the previous turn.
      if (prev) score += 0.35 * cosine(prev, doc.embedding)
      // Blog sections are numerous; favour first-hand portfolio facts
      // unless the visitor is asking about writing.
      if (doc.type === "insight" && !wantsArticles) score *= 0.75
      // Exact name mention (project / company) is a strong signal.
      if (titleNames(doc).some((n) => n.length > 3 && lower.includes(n)))
        score += 0.5
      return { doc, score }
    })
    .filter((r) => r.score > 0.02)
    .sort((a, b) => b.score - a.score)

  // Diversity: at most 2 sections from the same article.
  const perArticle = new Map<string, number>()
  return ranked.filter(({ doc }) => {
    if (doc.type !== "insight") return true
    const key = doc.id.split(":")[1]
    const n = (perArticle.get(key) ?? 0) + 1
    perArticle.set(key, n)
    return n <= 2
  })
}

function titleNames(doc: KnowledgeDoc) {
  const title = doc.title.toLowerCase()
  const names = [title.split(/[|–—(]/)[0].trim()]
  // "Backend Engineer at XMRPlay Ltd" → also match "xmrplay".
  const company = title.split(" at ")[1]
  if (company) names.push(company.replace(/\b(ltd|inc|llc)\b/g, "").trim())
  return names
}

type RouterResult = { ids?: unknown }

/**
 * Lets a fast Groq model pick which candidate chunks are actually needed.
 * Falls back to pure vector ranking if the call fails or times out.
 */
async function llmSelect(
  question: string,
  history: string,
  candidates: ScoredDoc[]
): Promise<KnowledgeDoc[] | null> {
  if (!process.env.GROQ_API_KEY || candidates.length === 0) return null

  const catalog = candidates
    .map(({ doc }) => `- ${doc.id} | ${doc.title} | ${doc.summary}`)
    .join("\n")

  try {
    const result = await groqJson<RouterResult>(
      {
        model: GROQ_ROUTER_MODEL,
        temperature: 0,
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content:
              'You select knowledge chunks for a portfolio Q&A assistant. Given a visitor question and a catalog of chunks (id | title | summary), return the ids (max 5, most relevant first) whose content is needed to answer. Prefer specific chunks over overviews unless the question is broad (e.g. "list all projects"). For follow-ups ("it", "that", "these", "a demo"), resolve them using the recent conversation and pick the chunks about what was just discussed. When the visitor asks for demos, links, websites or something to try, include "project:live-links" plus the specific projects marked [has live demo link]. Respond as JSON: {"ids": ["..."]}. Return {"ids": []} if nothing is relevant.',
          },
          {
            role: "user",
            content: `${history ? `Recent conversation:\n${history}\n\n` : ""}Question: ${question}\n\nCatalog:\n${catalog}`,
          },
        ],
      },
      AbortSignal.timeout(3500)
    )

    if (!Array.isArray(result.ids)) return null
    const allowed = new Set(candidates.map((c) => c.doc.id))
    return result.ids
      .filter((id): id is string => typeof id === "string" && allowed.has(id))
      .slice(0, FINAL_COUNT)
      .map((id) => DOC_BY_ID.get(id)!)
  } catch (error) {
    console.warn("[chat] router fallback:", (error as Error).message)
    return null
  }
}

/** Letters outside ASCII: Japanese, Chinese, Korean, Cyrillic, accented Latin… */
const NON_ASCII_LETTER = /(?![\x00-\x7F])\p{L}/u

/**
 * The JSON index is English, so non-English questions get translated for the
 * search step only (the answer is still written in the visitor's language).
 * Latin-script languages without accents are caught by low vocabulary overlap.
 */
function looksNonEnglish(text: string) {
  if (NON_ASCII_LETTER.test(text)) return true
  const tokens = tokenize(text)
  if (tokens.length < 3) return false
  const known = tokens.filter((t) => VOCAB_INDEX.has(t)).length
  return known / tokens.length < 0.4
}

type TranslateResult = { question?: unknown; previous?: unknown }

async function translateForSearch(question: string, previous?: string) {
  if (
    !process.env.GROQ_API_KEY ||
    !(looksNonEnglish(question) || (previous && looksNonEnglish(previous)))
  ) {
    return { question, previous }
  }

  try {
    const result = await groqJson<TranslateResult>(
      {
        model: GROQ_ROUTER_MODEL,
        temperature: 0,
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content:
              'Translate the visitor\'s question(s) into concise English for a search index about a software engineer\'s portfolio. Keep names of people, companies, projects and technologies exactly as written. If text is already English, return it unchanged. Respond as JSON: {"question": "...", "previous": "..."}.',
          },
          {
            role: "user",
            content: JSON.stringify({ question, previous: previous ?? "" }),
          },
        ],
      },
      AbortSignal.timeout(3000)
    )
    return {
      question:
        typeof result.question === "string" && result.question.trim()
          ? result.question
          : question,
      previous:
        typeof result.previous === "string" && result.previous.trim()
          ? result.previous
          : previous,
    }
  } catch (error) {
    console.warn("[chat] translate fallback:", (error as Error).message)
    return { question, previous }
  }
}

export async function retrieveContext(
  originalQuestion: string,
  history: { role: string; content: string }[]
) {
  const { question, previous: previousQuestion } = await translateForSearch(
    originalQuestion,
    [...history].reverse().find((m) => m.role === "user")?.content
  )

  const candidates = vectorSearch(question, previousQuestion).slice(
    0,
    CANDIDATE_COUNT
  )

  const historyText = history
    .slice(-4)
    .map((m) => `${m.role}: ${m.content.slice(0, 200)}`)
    .join("\n")

  const routerQuestion =
    question === originalQuestion
      ? question
      : `${originalQuestion} (English: ${question})`

  const selected =
    (await llmSelect(routerQuestion, historyText, candidates)) ??
    candidates.slice(0, FINAL_COUNT).map((c) => c.doc)

  // If the router picked nothing, keep the top vector hits as a safety net.
  const chosen = selected.length
    ? selected
    : candidates.slice(0, 3).map((c) => c.doc)

  const docs: KnowledgeDoc[] = []
  const seen = new Set<string>()
  let size = 0
  for (const doc of [
    ...ALWAYS_INCLUDE.map((id) => DOC_BY_ID.get(id)!),
    // Link / demo requests always get the full list of public URLs.
    ...(LINK_INTENT.test(question) ? [DOC_BY_ID.get(LIVE_LINKS_ID)!] : []),
    ...chosen,
  ]) {
    if (!doc || seen.has(doc.id)) continue
    if (size + doc.content.length > MAX_CONTEXT_CHARS && docs.length > 1) break
    seen.add(doc.id)
    size += doc.content.length
    docs.push(doc)
  }

  return docs
}

export function formatContext(docs: KnowledgeDoc[]) {
  return docs
    .map(
      (d) =>
        `<chunk id="${d.id}" title="${d.title}"${d.url ? ` url="${d.url}"` : ""}>\n${d.content}\n</chunk>`
    )
    .join("\n\n")
}
