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
  /** Public URL (site, repository, demo, or video). */
  link: string
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
