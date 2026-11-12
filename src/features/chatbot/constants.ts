import type { KnowledgeDocType } from "./types"

/** Shown when the chat opens for the first time. */
export const STARTER_QUESTIONS = [
  "What does Daniel specialize in?",
  "Show me his best AI projects",
  "Which tech stack does he use?",
  "How can I hire Daniel?",
]

/** Used when the model doesn't return its own follow-ups. */
export const FALLBACK_SUGGESTIONS: Partial<Record<KnowledgeDocType, string[]>> =
  {
    project: [
      "What tech stack was used?",
      "What other AI projects exist?",
      "How can I hire Daniel?",
    ],
    experience: [
      "What was his biggest impact?",
      "Which projects relate to this?",
      "Is he available for contract work?",
    ],
    skills: [
      "Show projects using Next.js",
      "Does he work with Python?",
      "What's his AI experience?",
    ],
    insight: [
      "Show related projects",
      "What else has he written?",
      "How can I contact him?",
    ],
  }

export const DEFAULT_SUGGESTIONS = [
  "Show me his best projects",
  "What services does he offer?",
  "How can I contact Daniel?",
]

export const MAX_QUESTION_LENGTH = 500
export const MAX_HISTORY_MESSAGES = 6
