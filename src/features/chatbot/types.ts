import type { SparseVector } from "./lib/text"

export type KnowledgeDocType =
  | "profile"
  | "contact"
  | "services"
  | "skills"
  | "experience"
  | "project"
  | "testimonial"
  | "insight"

export type KnowledgeDoc = {
  /** Stable chunk id, e.g. `project:animcoder-ai`. */
  id: string
  type: KnowledgeDocType
  title: string
  /** Site-relative or absolute URL a visitor can open for more detail. */
  url?: string
  /** One-line summary, used by the LLM re-ranker. */
  summary: string
  /** Full chunk text given to the answering model. */
  content: string
  /** Sparse TF-IDF embedding (pgvector `sparsevec`-style). */
  embedding: SparseVector
}

export type KnowledgeBase = {
  version: 1
  generatedAt: string
  embedding: {
    model: "tfidf-sparse-v1"
    dimensions: number
  }
  /** Term for each embedding dimension. */
  vocabulary: string[]
  /** Inverse document frequency for each embedding dimension. */
  idf: number[]
  documents: KnowledgeDoc[]
}

export type ChatSource = {
  id: string
  title: string
  type: KnowledgeDocType
  url?: string
}

export type ChatProjectPreview = {
  id: string
  title: string
  image: string
  url: string
}

export type ChatRole = "user" | "assistant"

export type ChatHistoryMessage = { role: ChatRole; content: string }

/** NDJSON events streamed from `/api/chat`. */
export type ChatStreamEvent =
  | { type: "sources"; sources: ChatSource[]; projects?: ChatProjectPreview[] }
  | { type: "delta"; text: string }
  | { type: "suggestions"; suggestions: string[] }
  | { type: "error"; message: string }
  | { type: "done" }
