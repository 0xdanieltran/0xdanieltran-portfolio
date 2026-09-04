"use client"

import { VideoIcon, XIcon } from "lucide-react"
import Script from "next/script"
import { useState } from "react"

import { Button } from "@/components/base/ui/button"
import { useIsClient } from "@/hooks/use-is-client"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const TAVUS_DEPLOYMENT_ID = "562b4b08-c9c9-4577-8694-62cab6249b15"

export function TavusAssistant({ className }: { className?: string }) {
  const isClient = useIsClient()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  if (!isClient) return null

  const isPanelVisible = !isMobile || isOpen

  return (
    <>
      <Script
        id="tavus-embed"
        src="https://unpkg.com/@tavus/embed@latest"
        strategy="lazyOnload"
      />

      {isMobile && (
        <Button
          aria-controls="tavus-assistant-panel"
          aria-expanded={isOpen}
          aria-label={
            isOpen ? "Close AI video assistant" : "Open AI video assistant"
          }
          className={cn(
            "fixed z-50 shadow-xl md:hidden",
            "top-[38%] right-2 -translate-y-1/2",
            "ring-2 ring-primary/20",
            "[&_svg:not([class*='size-'])]:size-6",
            "transition-[opacity,transform] duration-300",
            isOpen && "pointer-events-none scale-90 opacity-0"
          )}
          size="icon-lg"
          variant="secondary"
          onClick={() => setIsOpen(true)}
        >
          <VideoIcon />
        </Button>
      )}

      <div
        id="tavus-assistant-panel"
        aria-hidden={!isPanelVisible}
        aria-label="AI video assistant"
        className={cn(
          "fixed z-40 overflow-hidden rounded-2xl shadow-2xl",
          "ring-1 ring-black/10 dark:ring-white/10",
          "top-[38%] right-4 -translate-y-1/2 lg:right-8",
          "h-[min(420px,calc(100dvh-6rem))] w-[min(320px,calc(100vw-2rem))]",
          "max-md:left-1/2 max-md:right-auto max-md:w-[80%] max-md:-translate-x-1/2 max-md:-translate-y-1/2",
          "max-md:h-[min(380px,calc(100dvh-8rem))]",
          "transition-[opacity,transform] duration-300",
          !isPanelVisible &&
            "pointer-events-none max-md:scale-95 max-md:opacity-0",
          className
        )}
      >
        {isMobile && isOpen && (
          <Button
            aria-label="Close AI video assistant"
            className="absolute top-2 right-2 z-50 shadow-sm"
            size="icon-xs"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            <XIcon />
          </Button>
        )}

        <tavus-embed deployment-id={TAVUS_DEPLOYMENT_ID} />
      </div>
    </>
  )
}
