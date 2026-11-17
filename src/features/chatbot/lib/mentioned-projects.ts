import type { ChatProjectPreview, ChatSource } from "../types"

/** Projects named or linked in the answer — not every retrieved source. */
export function mentionedProjects(
  content: string,
  _sources: ChatSource[] | undefined,
  catalog: ChatProjectPreview[] | undefined
): ChatProjectPreview[] {
  if (!catalog?.length) return []

  const lower = content.toLowerCase()
  return catalog.filter((project) => {
    if (lower.includes(`/project/${project.id}`)) return true
    const name = project.title.split(/[|–—(]/)[0]?.trim() ?? ""
    return name.length >= 3 && lower.includes(name.toLowerCase())
  })
}
