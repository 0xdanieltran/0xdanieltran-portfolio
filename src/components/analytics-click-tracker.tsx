"use client"

import { useEffect } from "react"

import { isEventName, trackEvent } from "@/lib/events"

/**
 * Declarative click tracking for server components. Mark any element with
 *
 *   <a data-track="cta_click" data-track-label="Book a Call" data-track-location="hero">
 *
 * and a click sends `cta_click { label, location, path, href }` to every
 * analytics provider. Extra `data-track-*` attributes become event properties
 * (`data-track-link-type` → `link_type`).
 */
export function AnalyticsClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-track]"
      )
      const name = el?.dataset.track
      if (!el || !name || !isEventName(name)) return

      const properties: Record<string, string> = {
        path: window.location.pathname,
      }
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === "track" || !key.startsWith("track") || value === undefined)
          continue
        const prop = key
          .slice("track".length)
          .replace(/^[A-Z]/, (c) => c.toLowerCase())
          .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
        properties[prop] = value
      }

      const href = el instanceof HTMLAnchorElement ? el.href : undefined
      if (href && !properties.href) properties.href = href.split("?")[0]

      // Use a beacon when the click navigates away from the page.
      const leavesPage =
        !!href &&
        el.getAttribute("target") !== "_blank" &&
        new URL(href, window.location.href).origin !== window.location.origin

      trackEvent({ name, properties }, { beacon: leavesPage })
    }

    document.addEventListener("click", onClick, { capture: true })
    return () =>
      document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
