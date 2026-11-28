import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"
import { getAllProjects } from "@/features/portfolio/data/projects"

/**
 * Only real dates are used for `lastModified`. Pages without a reliable
 * date omit it: a value that changes on every build ("now") teaches search
 * engines to ignore the sitemap's dates entirely.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocs()
  const isComponent = (doc: (typeof docs)[number]) =>
    doc.metadata.category === "components"

  const toEntry = (path: string, updatedAt?: string) => ({
    url: `${SITE_INFO.url}${path}`,
    ...(updatedAt && { lastModified: new Date(updatedAt).toISOString() }),
  })

  const insights = docs.filter((doc) => !isComponent(doc))
  const components = docs.filter(isComponent)

  const latest = (items: typeof docs) =>
    items
      .map((doc) => doc.metadata.updatedAt)
      .sort()
      .at(-1)

  return [
    toEntry(""),
    toEntry("/project"),
    toEntry("/insights", latest(insights)),
    ...(components.length ? [toEntry("/components", latest(components))] : []),
    toEntry("/testimonials"),
    toEntry("/contact"),
    toEntry("/llms.txt"),
    toEntry("/llms-full.txt"),
    ...getAllProjects().map((project) => toEntry(`/project/${project.id}`)),
    ...insights.map((doc) =>
      toEntry(`/insights/${doc.slug}`, doc.metadata.updatedAt)
    ),
    ...components.map((doc) =>
      toEntry(`/components/${doc.slug}`, doc.metadata.updatedAt)
    ),
  ]
}
