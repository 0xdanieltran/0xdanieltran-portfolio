export type ProjectType = "website" | "app"

export type Project = {
  /** Stable unique identifier (used as list key/anchor). */
  id: string
  title: string
  /**
   * Project period for display and sorting.
   * Use "MM.YYYY" format. Omit `end` for ongoing projects.
   */
  period: {
    /** Start date (e.g., "05.2025"). */
    start: string
    /** End date; leave undefined for "Present". */
    end?: string
  }
  /**
   * Product format.
   * - `website`: use `link` for the product URL
   * - `app`: use `androidLink` and/or `iosLink` for store listings
   * Defaults to `website` when omitted.
   */
  type?: ProjectType
  /** Public website / demo URL (website projects). */
  link?: string
  /** Google Play Store URL (app projects). */
  androidLink?: string
  /** Apple App Store URL (app projects). */
  iosLink?: string
  /** Tags/technologies for chips or filtering. */
  skills: string[]
  /** Optional rich description; Markdown and line breaks supported. */
  description?: string
  /** One-line business description. */
  businessDescription?: string
  /** Role on the project. */
  role?: string
  /** Key technical highlights. */
  highlights?: string[]
  /** Business or product impact. */
  impact?: string
  /** Logo image URL (absolute or path under /public). */
  logo?: string
  /** Whether the project card is expanded by default in the UI. */
  isExpanded?: boolean
}

export function isValidProjectUrl(url?: string): url is string {
  if (!url) return false
  const trimmed = url.trim()
  return trimmed !== "" && trimmed !== "#"
}

export function getProjectPrimaryLink(project: Project): string | undefined {
  if (project.type === "app") {
    return (
      [project.iosLink, project.androidLink, project.link].find(isValidProjectUrl) ??
      undefined
    )
  }

  return isValidProjectUrl(project.link) ? project.link : undefined
}
