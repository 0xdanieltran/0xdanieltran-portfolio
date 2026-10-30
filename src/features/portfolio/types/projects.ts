export type ProjectType = "website" | "app" | "game"

export const PROJECT_CATEGORIES = [
  "web",
  "mobile",
  "desktop",
  "game",
  "saas",
  "ai",
  "agent",
  "web3",
  "igaming",
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  game: "Game",
  saas: "SaaS",
  ai: "AI",
  agent: "Agent",
  web3: "Web3",
  igaming: "iGaming",
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return PROJECT_CATEGORIES.includes(value as ProjectCategory)
}

export function sortProjectCategories(categories: ProjectCategory[]) {
  return PROJECT_CATEGORIES.filter((category) => categories.includes(category))
}

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
   * - `game`: use `link` for the playable game URL
   * Defaults to `website` when omitted.
   */
  type?: ProjectType
  /** Public website / demo / game URL (website and game projects). */
  link?: string
  /** Google Play Store URL (app projects). */
  androidLink?: string
  /** Apple App Store URL (app projects). */
  iosLink?: string
  /** Product categories used for filtering on the projects page. */
  categories: ProjectCategory[]
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
      [project.iosLink, project.androidLink, project.link].find(
        isValidProjectUrl
      ) ?? undefined
    )
  }

  return isValidProjectUrl(project.link) ? project.link : undefined
}

export function getProjectsByCategory(
  projects: Project[],
  category?: string | null
) {
  if (!category || category === "all" || !isProjectCategory(category)) {
    return projects
  }

  return projects.filter((project) => project.categories.includes(category))
}

export function getProjectCategoryCounts(projects: Project[]) {
  const counts = Object.fromEntries(
    PROJECT_CATEGORIES.map((category) => [category, 0])
  ) as Record<ProjectCategory, number>

  for (const project of projects) {
    for (const category of new Set(project.categories)) {
      counts[category] += 1
    }
  }

  return counts
}
