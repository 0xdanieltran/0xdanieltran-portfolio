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

export async function retrieveContext(
  question: string,
  history: { role: string; content: string }[]
) {
  const previousQuestion = [...history]
    .reverse()
    .find((m) => m.role === "user")?.content

  const candidates = vectorSearch(question, previousQuestion).slice(
    0,
    CANDIDATE_COUNT
  )

  const historyText = history
    .slice(-4)
    .map((m) => `${m.role}: ${m.content.slice(0, 200)}`)
    .join("\n")

  const selected =
    (await llmSelect(question, historyText, candidates)) ??
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
