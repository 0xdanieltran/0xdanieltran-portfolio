"use client"

import { BotMessageSquareIcon, VideoIcon } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { TavusPanel } from "@/components/tavus-assistant"
import { ChatPanel } from "@/features/chatbot/components/chat-panel"
import { useIsClient } from "@/hooks/use-is-client"
import { cn } from "@/lib/utils"

type Assistant = "chat" | "video"

const DISMISSED_KEY = "assistant-dock:chat-dismissed"
const AUTO_OPEN_DELAY_MS = 900

/**
 * Center-right rail holding the AI chat assistant and the AI video
 * interviewer. Only one panel is open at a time. The chat opens automatically
 * on a visitor's first page view (desktop), unless they've closed it this
 * session; the video interviewer only opens on demand.
 */
export function AssistantDock() {
  const isClient = useIsClient()
  const [active, setActive] = useState<Assistant | null>(null)
  const [openedByUser, setOpenedByUser] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(DISMISSED_KEY) === "1"
    } catch {}
    if (dismissed || !window.matchMedia("(min-width: 768px)").matches) return

    const timer = setTimeout(
      () => setActive((current) => current ?? "chat"),
      AUTO_OPEN_DELAY_MS
    )
    return () => clearTimeout(timer)
  }, [])

  const close = useCallback(() => {
    setActive((current) => {
      if (current === "chat") {
        try {
          sessionStorage.setItem(DISMISSED_KEY, "1")
        } catch {}
      }
      return null
    })
  }, [])

  const toggle = (assistant: Assistant) => {
    setOpenedByUser(true)
    if (active === assistant) close()
    else setActive(assistant)
  }

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, close])

  if (!isClient) return null

  return (
    <>
      <nav
        aria-label="AI assistants"
        className={cn(
          "fixed top-1/2 right-2 z-50 -translate-y-1/2 md:right-3 lg:right-6",
          "flex flex-col items-center gap-1 rounded-2xl border border-border p-1",
          "bg-background/80 shadow-lg shadow-black/5 backdrop-blur-md dark:shadow-black/30",
          "transition-opacity duration-300",
          // On mobile the panel is a bottom sheet with its own close button.
          active && "max-md:pointer-events-none max-md:opacity-0"
        )}
      >
        <DockButton
          label="Chat with Daniel's AI"
          controls="ai-chat-panel"
          active={active === "chat"}
          onClick={() => toggle("chat")}
          indicator
        >
          <BotMessageSquareIcon />
        </DockButton>

        <span aria-hidden className="h-px w-5 bg-border" />

        <DockButton
          label="Video interview with AI Daniel"
          controls="tavus-assistant-panel"
          active={active === "video"}
          onClick={() => toggle("video")}
        >
          <VideoIcon />
        </DockButton>
      </nav>

      <ChatPanel
        open={active === "chat"}
        focusOnOpen={openedByUser}
        onClose={close}
      />
      <TavusPanel open={active === "video"} onClose={close} />
    </>
  )
}

function DockButton({
  label,
  controls,
  active,
  indicator,
  onClick,
  children,
}: {
  label: string
  controls: string
  active: boolean
  indicator?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={active ? `Close: ${label}` : label}
        aria-controls={controls}
        aria-expanded={active}
        onClick={onClick}
        className={cn(
          "relative flex size-10 items-center justify-center rounded-xl outline-none",
          "transition-[background-color,color,scale] duration-200 active:scale-95",
          "focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-5",
          active
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {children}
        {indicator && !active && (
          <span className="absolute top-2 right-2 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500 ring-2 ring-background" />
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent side="left" className="px-2.5 py-1.5 text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
