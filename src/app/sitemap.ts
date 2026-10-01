import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs, getDocsByCategory } from "@/features/doc/data/documents"
import { getAllProjects } from "@/features/portfolio/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllDocs().map((post) => ({
    url: `${SITE_INFO.url}/insights/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }))

  const components = getDocsByCategory("components").map((post) => ({
    url: `${SITE_INFO.url}/components/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }))

  const projects = getAllProjects().map((project) => ({
    url: `${SITE_INFO.url}/project/${project.id}`,
    lastModified: new Date().toISOString(),
  }))

  const routes = [
    "",
    "/insights",
    "/components",
    "/project",
    "/llms.txt",
    "/llms-full.txt",
  ].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...posts, ...components, ...projects]
}
