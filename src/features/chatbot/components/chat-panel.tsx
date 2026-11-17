"use client"

import {
  ArrowUpIcon,
  CornerDownRightIcon,
  EllipsisIcon,
  Maximize2Icon,
  Minimize2Icon,
  RotateCcwIcon,
  Share2Icon,
  SquareIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

import { MAX_QUESTION_LENGTH, STARTER_QUESTIONS } from "../constants"
import {
  type ChatMessage,
  type QuestionSource,
  usePortfolioChat,
} from "../hooks/use-portfolio-chat"
import { mentionedProjects } from "../lib/mentioned-projects"
import type { ChatProjectPreview } from "../types"

const AVATAR_SRC = "/images/logos/danieltran.png"

const PANEL_BASE = cn(
  "fixed z-50 flex flex-col overflow-hidden",
  "border border-border bg-background shadow-2xl shadow-black/10 dark:shadow-black/40",
  "transition-[opacity,translate,scale] duration-300 ease-out"
)

/** Docked next to the assistant rail (desktop) / bottom sheet (mobile). */
const PANEL_DOCKED = cn(
  "origin-right rounded-2xl",
  "inset-x-2 bottom-2",
  "md:inset-x-auto md:top-1/2 md:right-[4.5rem] md:bottom-auto md:-translate-y-1/2 lg:right-[5.25rem]"
)

/** Large centered modal (desktop, 90% of the viewport) / full screen (mobile). */
const PANEL_EXPANDED = cn(
  // Above the sticky site header (z-50) and the backdrop (z-60).
  "inset-0 z-[70] origin-center rounded-none",
  "md:inset-auto md:top-1/2 md:left-1/2 md:h-[90dvh] md:w-[90vw] md:max-w-6xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl",
  "animate-in duration-200 fade-in-0 zoom-in-95"
)

export const ASSISTANT_PANEL_POSITION = cn(PANEL_BASE, PANEL_DOCKED)

export const ASSISTANT_PANEL_HIDDEN =
  "pointer-events-none translate-y-3 scale-[0.98] opacity-0 md:translate-x-3"

export function ChatPanel({
  open,
  expanded,
  focusOnOpen,
  onClose,
  onToggleExpand,
}: {
  open: boolean
  expanded: boolean
  focusOnOpen?: boolean
  onClose: () => void
  onToggleExpand: () => void
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

  const submit = (text: string, source: QuestionSource = "typed") => {
    if (!text.trim() || isLoading) return
    send(text, source)
    setInput("")
  }

  // In the wide modal, keep text in a comfortable reading column.
  const column = expanded ? "mx-auto w-full max-w-3xl" : ""

  return (
    <section
      id="ai-chat-panel"
      role="dialog"
      aria-modal={expanded || undefined}
      aria-label="Chat with Daniel's AI assistant"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        PANEL_BASE,
        expanded
          ? PANEL_EXPANDED
          : cn(
              PANEL_DOCKED,
              "h-[min(36rem,calc(100dvh-5rem))] md:h-[min(40rem,calc(100dvh-7rem))] md:w-[23.5rem]"
            ),
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
            Answers from his portfolio
          </p>
        </div>
        {messages.length > 0 && (
          <HeaderButton label="Start a new chat" onClick={reset}>
            <RotateCcwIcon />
          </HeaderButton>
        )}
        <HeaderButton
          label={expanded ? "Exit full screen" : "Full screen"}
          onClick={onToggleExpand}
          pressed={expanded}
        >
          {expanded ? <Minimize2Icon /> : <Maximize2Icon />}
        </HeaderButton>
        <HeaderButton label="Close chat" onClick={onClose}>
          <XIcon />
        </HeaderButton>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto overscroll-contain px-4 py-4",
          expanded && "md:px-8 md:py-8"
        )}
        aria-live="polite"
      >
        <div className={cn("space-y-5", column)}>
          <Welcome
            showStarters={messages.length === 0}
            onPick={(q) => submit(q, "starter")}
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
                expanded={expanded}
                disabled={isLoading}
                onPick={(q) => submit(q, "follow_up")}
              />
            )
          )}
        </div>
      </div>

      {/* Composer */}
      <form
        className={cn(
          "border-t border-border p-3",
          expanded && "md:px-8 md:pb-5",
          expanded && "[&>*]:mx-auto [&>*]:max-w-3xl"
        )}
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
  pressed,
  children,
}: {
  label: string
  onClick: () => void
  pressed?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
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

/** Models sometimes end with a stray `---` before the follow-up block. */
function stripTrailingRule(text: string) {
  return text.replace(/\s*(?:-{3,}|\*{3,}|_{3,})\s*$/, "")
}

const markdownComponents: Components = {
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link
        href={href}
        data-track="cta_click"
        data-track-label={String(children)}
        data-track-location="chat_answer"
      >
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        data-track="open_project_link"
        data-track-project={String(children)}
        data-track-source="chat_answer"
      >
        {children}
      </a>
    ),
}

function AssistantMessage({
  message,
  isLatest,
  expanded,
  disabled,
  onPick,
}: {
  message: ChatMessage
  isLatest: boolean
  expanded: boolean
  disabled: boolean
  onPick: (q: string) => void
}) {
  const { status, content, sources, projects, suggestions } = message
  const answer = stripTrailingRule(content)
  const projectImages = mentionedProjects(answer, sources, projects)

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
          {answer}
        </Markdown>
        {status === "streaming" && (
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse rounded-sm bg-foreground/60" />
        )}
      </div>

      {projectImages.length > 0 && (
        <ProjectImageGallery projects={projectImages} expanded={expanded} />
      )}

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

      {(status === "done" || status === "error") && answer.trim() && (
        <div className="-ml-1.5 flex items-center">
          <CopyButton
            variant="ghost"
            size="icon-xs"
            className="rounded-md border-none text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-3.5"
            text={answer.trim()}
            aria-label="Copy answer"
          />
          <span
            className="flex size-6 items-center justify-center text-muted-foreground [&_svg]:size-3.5"
            aria-hidden
          >
            <Share2Icon />
          </span>
          <span
            className="flex size-6 items-center justify-center text-muted-foreground [&_svg]:size-3.5"
            aria-hidden
          >
            <EllipsisIcon />
          </span>
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

function ProjectImageGallery({
  projects,
  expanded,
}: {
  projects: ChatProjectPreview[]
  expanded: boolean
}) {
  return (
    <ul
      className={cn(
        "grid gap-2",
        expanded && projects.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
      )}
    >
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={project.url}
            className="group block overflow-hidden rounded-xl border border-border bg-muted/30 transition-colors hover:border-foreground/20"
            data-track="view_project"
            data-track-project={project.title}
            data-track-source="chat_answer_image"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={360}
              className="h-auto w-full object-cover"
              unoptimized
            />
            <span className="block truncate px-2.5 py-1.5 text-[11px] text-muted-foreground group-hover:text-foreground">
              {project.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
