import "server-only"

import { PROJECTS } from "@/features/portfolio/data/projects"
import {
  getProjectPrimaryLink,
  isValidProjectUrl,
} from "@/features/portfolio/types/projects"

import type { ChatProjectPreview } from "../types"

export const PROJECT_PREVIEWS: ChatProjectPreview[] = PROJECTS.filter(
  (project) => project.logo
).map((project) => ({
  id: project.id,
  title: project.title,
  image: project.logo!,
  url: `/project/${project.id}`,
  liveUrl: getProjectPrimaryLink(project),
  links: [project.link, project.iosLink, project.androidLink].filter(
    isValidProjectUrl
  ),
}))
