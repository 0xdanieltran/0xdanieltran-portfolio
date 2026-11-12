import "server-only"

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// Free-tier Groq models. See https://console.groq.com/docs/models
export const GROQ_ANSWER_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b"
export const GROQ_ROUTER_MODEL =
  process.env.GROQ_ROUTER_MODEL || "openai/gpt-oss-20b"

export type GroqMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

type GroqRequest = {
  model: string
  messages: GroqMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
  response_format?: { type: "json_object" }
  reasoning_effort?: "low" | "medium" | "high"
}

/**
 * Reasoning models (gpt-oss) spend tokens thinking before they answer; keep
 * that short so replies stay fast and within `max_tokens`.
 */
function withModelDefaults(body: GroqRequest): GroqRequest {
  if (body.model.startsWith("openai/gpt-oss")) {
    return { reasoning_effort: "low", ...body }
  }
  return body
}

type GroqCompletion = {
  choices?: {
    message?: { content?: string }
    delta?: { content?: string }
  }[]
}

export class GroqError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
  }
}

export function hasGroqKey() {
  return Boolean(process.env.GROQ_API_KEY)
}

export async function groqFetch(body: GroqRequest, signal?: AbortSignal) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(withModelDefaults(body)),
    signal,
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new GroqError(
      `Groq ${res.status}: ${detail.slice(0, 300)}`,
      res.status
    )
  }

  return res
}

/** Non-streaming JSON completion. */
export async function groqJson<T>(
  body: Omit<GroqRequest, "stream" | "response_format">,
  signal?: AbortSignal
): Promise<T> {
  const res = await groqFetch(
    { ...body, stream: false, response_format: { type: "json_object" } },
    signal
  )
  const data = (await res.json()) as GroqCompletion
  return JSON.parse(data.choices?.[0]?.message?.content ?? "{}") as T
}

/** Yields content deltas from an OpenAI-compatible SSE stream. */
export async function* groqStream(
  body: Omit<GroqRequest, "stream">,
  signal?: AbortSignal
) {
  const res = await groqFetch({ ...body, stream: true }, signal)
  const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader()
  let buffer = ""

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += value

    const lines = buffer.split("\n")
    buffer = lines.pop() ?? ""

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith("data:")) continue
      const payload = trimmed.slice(5).trim()
      if (payload === "[DONE]") return
      try {
        const chunk = JSON.parse(payload) as GroqCompletion
        const delta = chunk.choices?.[0]?.delta?.content
        if (delta) yield delta
      } catch {
        // Ignore keep-alives / partial frames.
      }
    }
  }
}
