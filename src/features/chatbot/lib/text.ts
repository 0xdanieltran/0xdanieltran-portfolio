/**
 * Text → sparse-vector utilities shared by the knowledge builder script
 * (`src/scripts/build-chat-knowledge.mts`) and the runtime retriever.
 *
 * Keep this file free of path aliases and Node-only APIs so it can be imported
 * from both the build script and the Next.js server runtime.
 */

const STOP_WORDS = new Set(
  `a about above after again against all am an and any are as at be because been
  before being below between both but by can could did do does doing down during
  each few for from further had has have having he her here hers herself him
  himself his how i if in into is it its itself just let me more most my myself
  no nor not now of off on once only or other our ours ourselves out over own
  same she should so some such than that the their theirs them themselves then
  there these they this those through to too under until up very was we were
  what when where which while who whom why will with would you your yours
  yourself yourselves also using used use via etc per within across like
  tell show give please know want wants daniel daniels tran s`.split(/\s+/)
)

/** Very small suffix stemmer — good enough for keyword matching. */
export function stem(word: string) {
  if (word.length <= 4) return word
  if (word.endsWith("ies") && word.length > 5) return word.slice(0, -3) + "y"
  if (word.endsWith("ing") && word.length > 6) return word.slice(0, -3)
  if (word.endsWith("ed") && word.length > 5) return word.slice(0, -2)
  if (word.endsWith("es") && /(sses|xes|ches|shes)$/.test(word))
    return word.slice(0, -2)
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1)
  return word
}

/** Lowercase, strip markdown/urls, split, drop stop words, stem. */
export function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[`*_>#~|[\](){}"“”'’]/g, " ")
    .replace(/next\.js/g, "nextjs")
    .replace(/node\.js/g, "nodejs")
    .replace(/socket\.io/g, "socketio")
    .replace(/three\.js/g, "threejs")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t) && !/^\d+$/.test(t))
    .map(stem)
}

/**
 * Query-side expansion so short visitor questions still match portfolio
 * vocabulary (e.g. "crypto" → web3, blockchain).
 */
const SYNONYMS: Record<string, string[]> = {
  crypto: ["web3", "blockchain"],
  web3: ["blockchain", "crypto", "defi"],
  blockchain: ["web3", "smart", "contract"],
  defi: ["web3", "dex", "blockchain"],
  ai: ["llm", "rag", "agent"],
  llm: ["ai", "rag", "gpt"],
  chatbot: ["rag", "chat", "llm"],
  rag: ["retrieval", "llm", "vector"],
  hire: ["contact", "service", "available", "freelance"],
  contact: ["email", "telegram", "call", "schedule"],
  reach: ["contact", "email"],
  email: ["contact", "gmail"],
  rate: ["pricing", "service"],
  price: ["pricing", "service"],
  cost: ["pricing", "service"],
  job: ["experience", "role", "position"],
  work: ["experience", "project"],
  career: ["experience", "role"],
  company: ["experience", "employer"],
  stack: ["skill", "technology", "tech"],
  skill: ["technology", "stack"],
  tech: ["technology", "stack", "skill"],
  language: ["typescript", "python", "javascript"],
  frontend: ["react", "nextjs", "ui"],
  backend: ["api", "nodejs", "database"],
  database: ["postgresql", "mongodb", "supabase"],
  cloud: ["aws", "docker", "kubernetes", "devops"],
  devops: ["ci", "docker", "kubernetes", "cloud"],
  game: ["igaming", "casino", "gaming"],
  gambling: ["igaming", "casino"],
  casino: ["igaming", "gaming"],
  payment: ["stripe", "fintech", "transaction"],
  fintech: ["payment", "finance", "trading"],
  trading: ["exchange", "fintech"],
  health: ["healthcare", "medical"],
  mobile: ["app", "ios", "android"],
  blog: ["insight", "article", "post"],
  article: ["insight", "blog"],
  location: ["based", "denmark", "timezone"],
  live: ["location", "based", "demo", "website"],
  review: ["testimonial", "client"],
  client: ["testimonial", "founder"],
  recommend: ["testimonial"],
  year: ["experience"],
  experience: ["year", "role"],
  demo: ["live", "website", "link"],
  demos: ["live", "website", "link"],
  website: ["live", "demo", "link", "site"],
  site: ["live", "demo", "website"],
  url: ["live", "link", "website", "demo"],
  link: ["live", "url", "website", "demo"],
  try: ["live", "demo"],
  visit: ["live", "website"],
  example: ["demo", "project", "live"],
  study: ["education", "university", "degree", "bachelor"],
  studied: ["education", "university", "degree", "bachelor"],
  education: ["university", "degree", "bachelor"],
  degree: ["education", "university", "bachelor"],
  university: ["education", "degree"],
  specialize: ["specialty", "expertise", "focus", "about"],
  specialty: ["specialize", "expertise", "focus"],
  expertise: ["specialize", "focus", "skill"],
  good: ["specialize", "expertise"],
  best: ["highlight", "impact"],
  latest: ["recent", "2026"],
  recent: ["latest", "2026"],
}

export function expandQueryTokens(tokens: string[]) {
  const out = [...tokens]
  for (const t of tokens) {
    const extra = SYNONYMS[t]
    if (extra) out.push(...extra.map(stem))
  }
  return out
}

export type SparseVector = { indices: number[]; values: number[] }

/** Sublinear TF × IDF, L2-normalized. Mirrors pgvector's `sparsevec` shape. */
export function vectorize(
  tokens: string[],
  vocabIndex: Map<string, number>,
  idf: number[]
): SparseVector {
  const tf = new Map<number, number>()
  for (const t of tokens) {
    const idx = vocabIndex.get(t)
    if (idx === undefined) continue
    tf.set(idx, (tf.get(idx) ?? 0) + 1)
  }

  const entries = [...tf.entries()].map(
    ([idx, count]) => [idx, (1 + Math.log(count)) * idf[idx]] as const
  )
  const norm = Math.sqrt(entries.reduce((sum, [, v]) => sum + v * v, 0)) || 1

  entries.sort((a, b) => a[0] - b[0])
  return {
    indices: entries.map(([idx]) => idx),
    values: entries.map(([, v]) => Number((v / norm).toFixed(4))),
  }
}

/** Cosine similarity between two L2-normalized sparse vectors. */
export function cosine(a: SparseVector, b: SparseVector) {
  let i = 0
  let j = 0
  let dot = 0
  while (i < a.indices.length && j < b.indices.length) {
    const ai = a.indices[i]
    const bj = b.indices[j]
    if (ai === bj) {
      dot += a.values[i] * b.values[j]
      i++
      j++
    } else if (ai < bj) {
      i++
    } else {
      j++
    }
  }
  return dot
}
