import { SITE_INFO } from "@/config/site"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

import type { ChatProjectPreview } from "../types"

/**
 * The answering model sometimes "guesses" a project URL from its name
 * (e.g. `sonica-studio.vercel.app` instead of `sonicastudio.vercel.app`).
 * This pass replaces any URL that is not a real portfolio link with the
 * project's actual link taken from the project data, or unlinks it when the
 * project can't be identified.
 */

const BARE_TLDS =
  "app|com|io|lol|org|net|ai|dev|xyz|co|gg|me|so|site|tech|games|studio|cloud"

// Markdown link: [label](href)
const MD_LINK_RE = /\[([^\]]*)]\(([^)\s]*)\)/g
// Absolute URL, or a bare domain with a known TLD (not part of an email/path).
const BARE_URL_RE = new RegExp(
  String.raw`(?<![@\w/.-])(?:https?:\/\/[^\s<>()\[\]]+|(?:[a-z0-9-]+\.)+(?:${BARE_TLDS})(?:\/[^\s<>()\[\]]*)?)(?![\w@-])`,
  "gi"
)

type ProjectLinks = {
  name: string
  slug: string
  compact: string
  /** The project's primary public link, exactly as in the portfolio data. */
  href: string
  /** Every public link of the project, normalized. */
  all: Set<string>
}

function hostOf(url: string) {
  try {
    const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`
    return new URL(withScheme).hostname.toLowerCase().replace(/^www\./, "")
  } catch {
    return undefined
  }
}

function displayUrl(href: string) {
  return href.replace(/^https?:\/\//i, "").replace(/\/$/, "")
}

const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")

/** Host + path + query, without scheme, `www.` or trailing slash. */
function normalizeUrl(url: string) {
  try {
    const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`
    const u = new URL(withScheme)
    const host = u.hostname.toLowerCase().replace(/^www\./, "")
    return `${host}${u.pathname.replace(/\/+$/, "")}${u.search}`
  } catch {
    return undefined
  }
}

/**
 * A URL is trusted only when it is exactly one of a project's `link`,
 * `iosLink` or `androidLink` values, or lives on a non-project host we own
 * (the site itself, the calendar, social profiles).
 */
function buildTrustCheck(projects: ChatProjectPreview[]) {
  const exact = new Set<string>()
  const projectHosts = new Set<string>()
  for (const p of projects) {
    for (const link of p.links ?? (p.liveUrl ? [p.liveUrl] : [])) {
      const normalized = normalizeUrl(link)
      const host = hostOf(link)
      if (normalized) exact.add(normalized)
      if (host) projectHosts.add(host)
    }
  }

  const ownHosts = new Set<string>()
  for (const url of [
    SITE_INFO.url,
    SITE_INFO.calendarUrl,
    ...SOCIAL_LINKS.map((l) => l.href),
  ]) {
    const host = hostOf(url)
    if (host && !projectHosts.has(host)) ownHosts.add(host)
  }

  return (url: string) => {
    const normalized = normalizeUrl(url)
    if (normalized && exact.has(normalized)) return true
    const host = hostOf(url)
    return !!host && ownHosts.has(host)
  }
}

function projectLinks(projects: ChatProjectPreview[]): ProjectLinks[] {
  return projects
    .filter((p) => p.liveUrl)
    .map((p) => {
      const name = p.title.split(/[|–—(]/)[0]?.trim() ?? p.title
      const all = new Set(
        (p.links ?? [p.liveUrl!])
          .map(normalizeUrl)
          .filter((u): u is string => !!u)
      )
      return {
        name,
        slug: p.id,
        compact: compact(name),
        href: p.liveUrl!,
        all,
      }
    })
    .filter((p) => p.name.length >= 3)
}

/** The project whose name appears in a link label, longest name first. */
function labelProject(projects: ProjectLinks[], label: string) {
  const labelLower = label.toLowerCase()
  return projects
    .filter((p) => labelLower.includes(p.name.toLowerCase()))
    .sort((a, b) => b.name.length - a.name.length)[0]
}

/** Best guess at which project a wrong URL was meant to point to. */
function findProject(
  projects: ProjectLinks[],
  url: string,
  label: string,
  lineBefore: string
) {
  const byLabel = labelProject(projects, label)
  if (byLabel) return byLabel

  // Guessed hostnames are usually derived from the project name / id.
  const hostLabel = compact(hostOf(url)?.split(".")[0] ?? "")
  if (hostLabel.length >= 4) {
    const byHost = projects.find(
      (p) =>
        compact(p.slug) === hostLabel ||
        p.compact === hostLabel ||
        p.compact.startsWith(hostLabel) ||
        hostLabel.startsWith(p.compact)
    )
    if (byHost) return byHost
  }

  // Otherwise: the project named closest before the URL on the same line.
  const before = lineBefore.toLowerCase()
  let best: ProjectLinks | undefined
  let bestAt = -1
  for (const p of projects) {
    const at = before.lastIndexOf(p.name.toLowerCase())
    const longer = at === bestAt && !!best && p.name.length > best.name.length
    if (at !== -1 && (at > bestAt || longer)) {
      best = p
      bestAt = at
    }
  }
  return bestAt === -1 ? undefined : best
}

function lineBeforeIndex(text: string, index: number) {
  return text.slice(text.lastIndexOf("\n", index - 1) + 1, index)
}

export function correctProjectUrls(
  text: string,
  catalog: ChatProjectPreview[] | undefined
) {
  if (!catalog?.length) return text

  const isTrusted = buildTrustCheck(catalog)
  const projects = projectLinks(catalog)
  const looksLikeUrl = (s: string) =>
    /^https?:\/\//i.test(s.trim()) ||
    new RegExp(
      String.raw`^(?:[a-z0-9-]+\.)+(?:${BARE_TLDS})(?:\/\S*)?$`,
      "i"
    ).test(s.trim())

  // 1. Markdown links with an untrusted absolute href.
  const linkRanges: [number, number][] = []
  let next = text.replace(
    MD_LINK_RE,
    (match, label: string, href: string, offset: number) => {
      if (!/^https?:\/\//i.test(href)) return match
      if (isTrusted(href)) {
        // A real link, but maybe another project's: "[DIFINES AI](difines.org)".
        const named =
          labelProject(projects, label) ??
          (looksLikeUrl(label)
            ? findProject(projects, "", "", lineBeforeIndex(text, offset))
            : undefined)
        const normalized = normalizeUrl(href)
        if (!named || !normalized || named.all.has(normalized)) return match
        const fixedLabel = looksLikeUrl(label) ? displayUrl(named.href) : label
        return `[${fixedLabel}](${named.href})`
      }
      const project = findProject(
        projects,
        href,
        label,
        lineBeforeIndex(text, offset)
      )
      if (!project) return label
      const nextLabel = looksLikeUrl(label) ? displayUrl(project.href) : label
      return `[${nextLabel}](${project.href})`
    }
  )

  for (const m of next.matchAll(MD_LINK_RE)) {
    linkRanges.push([m.index, m.index + m[0].length])
  }

  // 2. Bare URLs / domains outside of Markdown links.
  next = next.replace(BARE_URL_RE, (match: string, offset: number) => {
    if (linkRanges.some(([s, e]) => offset >= s && offset < e)) return match
    const trailing = match.match(/[.,;:!?]+$/)?.[0] ?? ""
    const url = trailing ? match.slice(0, -trailing.length) : match
    if (isTrusted(url)) return match
    const project = findProject(
      projects,
      url,
      "",
      lineBeforeIndex(next, offset)
    )
    if (!project) return match
    return `[${displayUrl(project.href)}](${project.href})${trailing}`
  })

  return next
}
