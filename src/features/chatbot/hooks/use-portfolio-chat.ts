"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { trackEvent } from "@/lib/events"

import { MAX_HISTORY_MESSAGES } from "../constants"
import type { ChatProjectPreview, ChatSource, ChatStreamEvent } from "../types"

/** How the visitor asked: typed it, or clicked a suggestion. */
export type QuestionSource = "typed" | "starter" | "follow_up"

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: ChatSource[]
  projects?: ChatProjectPreview[]
  suggestions?: string[]
  status?: "pending" | "streaming" | "done" | "error"
}

const STORAGE_KEY = "portfolio-chat:messages"

const uid = () => Math.random().toString(36).slice(2, 10)

function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : []
    // Drop anything that was mid-stream when the page reloaded.
    return parsed.filter(
      (m) => m.status !== "pending" && m.status !== "streaming"
    )
  } catch {
    return []
  }
}

export function usePortfolioChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const hydrated = useRef(false)

  useEffect(() => {
    // Hydrate from sessionStorage after mount (avoids SSR mismatch).
    setMessages(loadMessages())
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current || isLoading) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)))
    } catch {
      // Storage may be unavailable (private mode); chat still works.
    }
  }, [messages, isLoading])

  const patch = useCallback(
    (id: string, update: (m: ChatMessage) => Partial<ChatMessage>) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...update(m) } : m))
      ),
    []
  )

  const send = useCallback(
    async (text: string, source: QuestionSource = "typed") => {
      const question = text.trim()
      if (!question || isLoading) return

      trackEvent({
        name: "chat_question",
        properties: {
          question,
          source,
          turn: messages.filter((m) => m.role === "user").length + 1,
          path: window.location.pathname,
        },
      })

      const history = messages
        .filter((m) => m.status !== "error" && m.content)
        .slice(-MAX_HISTORY_MESSAGES)
        .map(({ role, content }) => ({ role, content }))

      const assistantId = uid()
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "user", content: question, status: "done" },
        { id: assistantId, role: "assistant", content: "", status: "pending" },
      ])
      setIsLoading(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: question, history }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) {
          const data = (await res.json().catch(() => null)) as {
            error?: string
          } | null
          throw new Error(
            data?.error ?? "Something went wrong. Please try again."
          )
        }

        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
        let buffer = ""

        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += value
          const lines = buffer.split("\n")
          buffer = lines.pop() ?? ""

          for (const line of lines) {
            if (!line.trim()) continue
            const event = JSON.parse(line) as ChatStreamEvent
            switch (event.type) {
              case "sources":
                patch(assistantId, () => ({
                  sources: event.sources,
                  projects: event.projects,
                }))
                break
              case "delta":
                patch(assistantId, (m) => ({
                  content: m.content + event.text,
                  status: "streaming",
                }))
                break
              case "suggestions":
                patch(assistantId, () => ({ suggestions: event.suggestions }))
                break
              case "error":
                throw new Error(event.message)
              case "done":
                patch(assistantId, () => ({ status: "done" }))
                break
            }
          }
        }

        patch(assistantId, (m) => ({
          status: m.content ? "done" : "error",
          content: m.content || "Sorry, I couldn't come up with an answer.",
        }))
      } catch (error) {
        if (controller.signal.aborted) {
          patch(assistantId, (m) => ({
            status: "done",
            content: m.content || "_Stopped._",
          }))
        } else {
          trackEvent({
            name: "chat_answer_failed",
            properties: { question, error: (error as Error).message },
          })
          patch(assistantId, (m) => ({
            status: "error",
            content: m.content
              ? `${m.content}\n\n_${(error as Error).message}_`
              : (error as Error).message,
          }))
        }
      } finally {
        setIsLoading(false)
        abortRef.current = null
      }
    },
    [isLoading, messages, patch]
  )

  const stop = useCallback(() => abortRef.current?.abort(), [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
  }, [])

  return { messages, isLoading, send, stop, reset }
}
