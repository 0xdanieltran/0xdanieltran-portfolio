"use client"

import {
  ArrowUpIcon,
  CornerDownRightIcon,
  RotateCcwIcon,
  SquareIcon,
  XIcon,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

import { MAX_QUESTION_LENGTH, STARTER_QUESTIONS } from "../constants"
import { type ChatMessage, usePortfolioChat } from "../hooks/use-portfolio-chat"

const AVATAR_SRC = "/images/logos/danieltran.png"

export const ASSISTANT_PANEL_POSITION = cn(
  "fixed z-50 flex flex-col overflow-hidden",
  "rounded-2xl border border-border bg-background shadow-2xl shadow-black/10 dark:shadow-black/40",
  // Mobile: bottom sheet.
  "inset-x-2 bottom-2",
  // Desktop: vertically centered, docked to the left of the assistant rail.
  "md:inset-x-auto md:top-1/2 md:right-[4.5rem] md:bottom-auto md:-translate-y-1/2 lg:right-[5.25rem]",
  "origin-right transition-[opacity,translate,scale] duration-300 ease-out"
)

export const ASSISTANT_PANEL_HIDDEN =
  "pointer-events-none translate-y-3 scale-[0.98] opacity-0 md:translate-x-3"

export function ChatPanel({
  open,
  focusOnOpen,
  onClose,
}: {
  open: boolean
  focusOnOpen?: boolean
  onClose: () => void
}) {
  const { messages, isLoading, send, stop, reset } = usePortfolioChat()
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const lastMessage = messages.at(-1)

  // Keep the newest content in view while streaming.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages.length, lastMessage?.content, lastMessage?.suggestions])

  useEffect(() => {
    if (open && focusOnOpen) inputRef.current?.focus({ preventScroll: true })
  }, [open, focusOnOpen])

  // Auto-grow the textarea up to ~5 lines.
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`
  }, [input])

  const submit = (text: string) => {
    if (!text.trim() || isLoading) return
    send(text)
    setInput("")
  }

  return (
    <section
      id="ai-chat-panel"
      role="dialog"
      aria-label="Chat with Daniel's AI assistant"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        ASSISTANT_PANEL_POSITION,
        "h-[min(36rem,calc(100dvh-5rem))] md:h-[min(40rem,calc(100dvh-7rem))] md:w-[23.5rem]",
        !open && ASSISTANT_PANEL_HIDDEN
      )}
    >
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="relative shrink-0">
          <img
            src={AVATAR_SRC}
            alt=""
            className="size-9 rounded-full object-cover ring-1 ring-border"
          />
          <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-tight font-semibold">
            Ask Daniel&apos;s AI
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Answers from his portfolio · instant
          </p>
        </div>
        {messages.length > 0 && (
          <HeaderButton label="Start a new chat" onClick={reset}>
            <RotateCcwIcon />
          </HeaderButton>
        )}
        <HeaderButton label="Close chat" onClick={onClose}>
          <XIcon />
        </HeaderButton>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-4"
        aria-live="polite"
      >
        <Welcome
          showStarters={messages.length === 0}
          onPick={submit}
          disabled={isLoading}
        />

        {messages.map((m, i) =>
          m.role === "user" ? (
            <UserBubble key={m.id} content={m.content} />
          ) : (
            <AssistantMessage
              key={m.id}
              message={m}
              isLatest={i === messages.length - 1}
              disabled={isLoading}
              onPick={submit}
            />
          )
        )}
      </div>

      {/* Composer */}
      <form
        className="border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault()
          submit(input)
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border border-border bg-muted/40 p-1.5 pl-3 transition-colors focus-within:border-ring focus-within:bg-background">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={MAX_QUESTION_LENGTH}
            placeholder="Ask about projects, skills, experience…"
            aria-label="Your question"
            className="max-h-32 min-h-8 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault()
                submit(input)
              }
            }}
          />
          {isLoading ? (
            <button
              type="button"
              aria-label="Stop generating"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-80"
              onClick={stop}
            >
              <SquareIcon className="size-3 fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-opacity hover:opacity-80 disabled:opacity-30"
            >
              <ArrowUpIcon className="size-4" />
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          AI answers are based on portfolio data and may be imperfect.
        </p>
      </form>
    </section>
  )
}

/* ------------------------------------------------------------------ parts */

function HeaderButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4"
    >
      {children}
    </button>
  )
}

function Welcome({
  showStarters,
  onPick,
  disabled,
}: {
  showStarters: boolean
  onPick: (q: string) => void
  disabled: boolean
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm leading-relaxed">
        <p className="font-medium">Hi there 👋</p>
        <p className="mt-1 text-muted-foreground">
          I&apos;m Daniel&apos;s AI assistant. Ask me anything about his
          experience, projects, tech stack, or how to work with him.
        </p>
      </div>

      {showStarters && (
        <div className="space-y-2">
          <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Suggested questions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {STARTER_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                disabled={disabled}
                onClick={() => onPick(q)}
                className="rounded-full border border-border px-3 py-1.5 text-left text-xs transition-colors hover:border-foreground/20 hover:bg-muted disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-sm whitespace-pre-wrap text-background">
        {content}
      </p>
    </div>
  )
}

const markdownComponents: Components = {
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow">
        {children}
      </a>
    ),
}

function AssistantMessage({
  message,
  isLatest,
  disabled,
  onPick,
}: {
  message: ChatMessage
  isLatest: boolean
  disabled: boolean
  onPick: (q: string) => void
}) {
  const { status, content, sources, suggestions } = message

  if (status === "pending") {
    return (
      <div
        className="flex items-center gap-1 py-2"
        aria-label="Assistant is thinking"
      >
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    )
  }

  const linkedSources = sources?.filter((s) => s.url) ?? []

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "prose prose-sm max-w-none text-sm leading-relaxed dark:prose-invert",
          "prose-headings:mt-3 prose-headings:mb-1.5 prose-headings:text-sm prose-p:my-2 prose-ol:my-2 prose-ul:my-2 prose-li:my-0.5",
          "prose-a:font-medium prose-a:underline-offset-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          status === "error" && "text-destructive"
        )}
      >
        <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {content}
        </Markdown>
        {status === "streaming" && (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-foreground/60" />
        )}
      </div>

      {status === "done" && linkedSources.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-0.5 text-[11px] text-muted-foreground">
            Sources
          </span>
          {linkedSources.slice(0, 4).map((s) => (
            <Link
              key={s.id}
              href={s.url!}
              className="max-w-40 truncate rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.title}
            </Link>
          ))}
        </div>
      )}

      {isLatest && status === "done" && !!suggestions?.length && (
        <div className="flex flex-col items-start gap-1.5">
          {suggestions.map((q) => (
            <button
              key={q}
              type="button"
              disabled={disabled}
              onClick={() => onPick(q)}
              className="group flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-left text-xs transition-colors hover:border-foreground/20 hover:bg-muted disabled:opacity-50"
            >
              <CornerDownRightIcon className="size-3 shrink-0 text-muted-foreground group-hover:text-foreground" />
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
