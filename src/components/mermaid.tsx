"use client"

import { useTheme } from "next-themes"
import { useEffect, useId, useState } from "react"

import { cn } from "@/lib/utils"

export function Mermaid({
  chart,
  className,
}: {
  chart: string
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid")

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
        })

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}`,
          chart
        )

        if (active) {
          setSvg(renderedSvg)
          setError(false)
        }
      } catch {
        if (active) setError(true)
      }
    }

    void render()

    return () => {
      active = false
    }
  }, [chart, id, resolvedTheme])

  if (error) {
    return (
      <pre className={cn("overflow-x-auto", className)}>
        <code>{chart}</code>
      </pre>
    )
  }

  return (
    <div
      className={cn(
        "not-prose my-6 flex min-h-48 items-center justify-center overflow-x-auto rounded-xl border bg-card p-4 [&_svg]:h-auto [&_svg]:max-w-full",
        className
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
