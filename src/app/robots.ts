import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"

/** Never useful in search results: API endpoints and component previews. */
const DISALLOW = ["/api/", "/preview/"]

/**
 * Search and AI crawlers we explicitly welcome. They are already covered by
 * `*`, but naming them makes the intent unambiguous to each bot.
 */
const SEARCH_AND_AI_BOTS = [
  // Search engines
  "Googlebot",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  // OpenAI: ChatGPT search, user-initiated browsing, model training
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  // Anthropic: Claude search, user-initiated fetches, model training
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / Apple Intelligence training opt-ins
  "Google-Extended",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: SEARCH_AND_AI_BOTS, allow: "/", disallow: DISALLOW },
      { userAgent: "*", allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_INFO.url}/sitemap.xml`,
    host: SITE_INFO.url,
  }
}
