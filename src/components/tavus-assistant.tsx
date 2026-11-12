"use client"

import { XIcon } from "lucide-react"
import Script from "next/script"
import { useState } from "react"

import {
  ASSISTANT_PANEL_HIDDEN,
  ASSISTANT_PANEL_POSITION,
} from "@/features/chatbot/components/chat-panel"
import { cn } from "@/lib/utils"

const TAVUS_DEPLOYMENT_ID = "562b4b08-c9c9-4577-8694-62cab6249b15"

/**
 * AI video interviewer. Controlled by `AssistantDock`; the Tavus embed is only
 * loaded after the visitor opens it the first time, and is unmounted on close
 * so the camera/microphone session ends.
 */
export function TavusPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [hasOpened, setHasOpened] = useState(false)
  if (open && !hasOpened) setHasOpened(true)

  return (
    <>
      {hasOpened && (
        <Script
          id="tavus-embed"
          src="https://unpkg.com/@tavus/embed@latest"
          strategy="afterInteractive"
        />
      )}

      <section
        id="tavus-assistant-panel"
        role="dialog"
        aria-label="AI video assistant"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          ASSISTANT_PANEL_POSITION,
          "h-[min(30rem,calc(100dvh-5rem))] md:h-[min(30rem,calc(100dvh-7rem))] md:w-[21rem]",
          !open && ASSISTANT_PANEL_HIDDEN
        )}
      >
        <button
          type="button"
          aria-label="Close AI video assistant"
          title="Close"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-lg bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
        >
          <XIcon className="size-4" />
        </button>

        {open && (
          <tavus-embed
            deployment-id={TAVUS_DEPLOYMENT_ID}
            className="block size-full"
          />
        )}
      </section>
    </>
  )
}
