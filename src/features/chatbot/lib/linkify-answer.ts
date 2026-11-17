import { SITE_INFO } from "@/config/site"
import { USER } from "@/features/portfolio/data/user"

import type { ChatProjectPreview } from "../types"

const CONTACT_HREF = "/contact"
const CALL_HREF = SITE_INFO.calendarUrl
const EMAIL = USER.email

type Range = [start: number, end: number]

function markdownLinkRanges(text: string): Range[] {
  const ranges: Range[] = []
  const re = /\[[^\]]*]\([^)]*\)/g
  for (const match of text.matchAll(re)) {
    ranges.push([match.index, match.index + match[0].length])
  }
  return ranges
}

function overlaps(index: number, length: number, ranges: Range[]) {
  const end = index + length
  return ranges.some(([start, stop]) => index < stop && end > start)
}

function linkOnce(
  text: string,
  pattern: RegExp,
  href: string,
  label?: (match: string) => string
) {
  const ranges = markdownLinkRanges(text)
  return text.replace(pattern, (match, ...args) => {
    const offset = args[args.length - 2] as number
    if (overlaps(offset, match.length, ranges)) return match
    const textLabel = label ? label(match) : match
    return `[${textLabel}](${href})`
  })
}

function repairPlaceholderLinks(text: string) {
  let next = text
  if (EMAIL) {
    next = next.replace(
      /\[[eE]mail\](?:\([^)]*\))?/g,
      `[${EMAIL}](mailto:${EMAIL})`
    )
  }
  next = next.replace(
    /\[book a call\](?:\(([^)]*)\))?/gi,
    (_match, href: string | undefined) =>
      href?.startsWith("http") ? _match : `[book a call](${CALL_HREF})`
  )
  return next
}

/** Turn plain mentions of contact, calls, email, and project names into Markdown links. */
export function linkifyAnswer(text: string, projects?: ChatProjectPreview[]) {
  let next = repairPlaceholderLinks(text)

  const titles = [...(projects ?? [])]
    .map((project) => ({
      title: project.title.split(/[|–—(]/)[0]?.trim() ?? project.title,
      href: project.liveUrl ?? project.url,
    }))
    .filter((project) => project.title.length >= 3)
    .sort((a, b) => b.title.length - a.title.length)

  for (const project of titles) {
    next = linkOnce(
      next,
      new RegExp(
        `\\b${project.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      ),
      project.href
    )
  }

  next = linkOnce(
    next,
    /\b(?:the\s+)?contact(?:\s+page|\s+form)\b/gi,
    CONTACT_HREF
  )
  next = linkOnce(
    next,
    /\b(?:book(?:ing)?\s+a\s+call|intro\s+call|schedule\s+a\s+call|calendly)\b/gi,
    CALL_HREF
  )
  if (EMAIL) {
    next = linkOnce(
      next,
      new RegExp(`\\b${EMAIL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"),
      `mailto:${EMAIL}`
    )
  }

  return next
}
