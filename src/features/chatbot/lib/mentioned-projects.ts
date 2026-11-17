import type { ChatProjectPreview, ChatSource } from "../types"

const META_PROJECT_IDS = new Set(["index", "live-links"])

function projectIdFromSource(source: ChatSource) {
  if (source.type !== "project") return null
  const id = source.id.startsWith("project:")
    ? source.id.slice("project:".length)
    : source.id
  if (META_PROJECT_IDS.has(id)) return null
  return id
}

/** Projects to illustrate an assistant answer: retrieved sources + names in the text. */
export function mentionedProjects(
  content: string,
  sources: ChatSource[] | undefined,
  catalog: ChatProjectPreview[] | undefined
): ChatProjectPreview[] {
  if (!catalog?.length) return []

  const byId = new Map(catalog.map((project) => [project.id, project]))
  const picked = new Set<string>()

  for (const source of sources ?? []) {
    const id = projectIdFromSource(source)
    if (id && byId.has(id)) picked.add(id)
  }

  const lower = content.toLowerCase()
  for (const project of catalog) {
    if (lower.includes(`/project/${project.id}`)) {
      picked.add(project.id)
      continue
    }

    const name = project.title.split(/[|–—(]/)[0]?.trim() ?? ""
    if (name.length >= 3 && lower.includes(name.toLowerCase())) {
      picked.add(project.id)
    }
  }

  return catalog.filter((project) => picked.has(project.id))
}
