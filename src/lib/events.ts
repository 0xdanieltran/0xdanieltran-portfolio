import posthog from "posthog-js"
import { z } from "zod"

import { op } from "./openpanel"
import { vemetricTrack } from "./vemetric"

export const EVENT_NAMES = [
  "copy_npm_command",
  "copy_code_block",
  "copy_block_code",
  "copy_email",
  "copy_phone_number",
  "play_name_pronunciation",
  "open_command_menu",
  "command_menu_search",
  "command_menu_action",
  "blog_search",
  // Portfolio
  "view_project",
  "open_project_link",
  "view_experience",
  "cta_click",
  "social_link_click",
  // AI assistants
  "chat_question",
  "chat_answer_failed",
] as const

const eventSchema = z.object({
  name: z.enum(EVENT_NAMES),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
})

export type Event = z.infer<typeof eventSchema>
export type EventName = Event["name"]

export function isEventName(name: string): name is EventName {
  return (EVENT_NAMES as readonly string[]).includes(name)
}

/**
 * Sends a custom event to every analytics provider (PostHog, OpenPanel,
 * Vemetric). Never throws — a bad event is dropped with a dev warning.
 *
 * `beacon` makes Vemetric use `navigator.sendBeacon`, so clicks on links that
 * leave the page still get recorded.
 */
export function trackEvent(input: Event, options?: { beacon?: boolean }) {
  const parsed = eventSchema.safeParse(input)
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] invalid event", input, parsed.error.issues)
    }
    return
  }

  const { name, properties } = parsed.data
  try {
    posthog.capture(name, properties)
    op.track(name, properties)
  } catch {
    // Providers may be blocked or not initialised; ignore.
  }
  vemetricTrack(name, properties, options)
}
