import { vemetric } from "@vemetric/web"

/**
 * Vemetric project token (Project settings → Token). `NEXT_PUBLIC_VEMETRIC_TOKEN`
 * is the documented name; `NEXT_PUBLIC_VEMETRICS_API_KEY` is accepted too.
 * Must be referenced literally so Next.js inlines it into the client bundle.
 */
export const VEMETRIC_TOKEN =
  process.env.NEXT_PUBLIC_VEMETRIC_TOKEN ||
  process.env.NEXT_PUBLIC_VEMETRICS_API_KEY ||
  ""

let initialized = false

/** Called once from `instrumentation-client.ts`, before React hydrates. */
export function initVemetric() {
  if (initialized || !VEMETRIC_TOKEN || typeof window === "undefined") return
  initialized = vemetric.init({
    token: VEMETRIC_TOKEN,
    // Page views (incl. client-side navigations) and outbound link clicks
    // are tracked automatically.
    trackPageViews: true,
    trackOutboundLinks: true,
    // Cookieless by default — no consent banner needed for Vemetric.
    allowCookies: false,
    // Set NEXT_PUBLIC_VEMETRIC_DEBUG=true to also record events from localhost.
    allowLocalhost: process.env.NEXT_PUBLIC_VEMETRIC_DEBUG === "true",
  })
}

type EventValue = string | number | boolean | null

export function vemetricTrack(
  name: string,
  data?: Record<string, EventValue>,
  options?: { beacon?: boolean }
) {
  if (!initialized) return
  vemetric
    .trackEvent(name, { eventData: data, beacon: options?.beacon })
    .catch(() => {
      // Analytics must never break the UI (ad blockers, offline, …).
    })
}
