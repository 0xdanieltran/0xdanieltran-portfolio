"use client"

import Script from "next/script"

import { useIsClient } from "@/hooks/use-is-client"
import { cn } from "@/lib/utils"

const TAVUS_DEPLOYMENT_ID = "562b4b08-c9c9-4577-8694-62cab6249b15"

export function TavusAssistant({ className }: { className?: string }) {
  const isClient = useIsClient()

  if (!isClient) return null

  return (
    <>
      <Script
        id="tavus-embed"
        src="https://unpkg.com/@tavus/embed@latest"
        strategy="lazyOnload"
      />

      <div
        aria-label="AI video assistant"
        className={cn(
          "fixed z-40 overflow-hidden rounded-2xl shadow-2xl",
          "ring-1 ring-black/10 dark:ring-white/10",
          "top-[38%] right-4 -translate-y-1/2 lg:right-8",
          "h-[min(420px,calc(100dvh-6rem))] w-[min(320px,calc(100vw-2rem))]",
          className
        )}
      >
        <tavus-embed deployment-id={TAVUS_DEPLOYMENT_ID} />
      </div>
    </>
  )
}
