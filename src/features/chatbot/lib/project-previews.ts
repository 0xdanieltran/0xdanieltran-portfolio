import "server-only"

import { PROJECTS } from "@/features/portfolio/data/projects"
import { getProjectPrimaryLink } from "@/features/portfolio/types/projects"

import type { ChatProjectPreview, KnowledgeDoc } from "../types"

export const PROJECT_PREVIEWS: ChatProjectPreview[] = PROJECTS.filter(
  (project) => project.logo
).map((project) => ({
  id: project.id,
  title: project.title,
  image: project.logo!,
  url: `/project/${project.id}`,
  liveUrl: getProjectPrimaryLink(project),
}))

export function projectPreviewsForDocs(docs: KnowledgeDoc[]) {
  if (!docs.some((doc) => doc.type === "project")) return undefined
  return PROJECT_PREVIEWS
}
