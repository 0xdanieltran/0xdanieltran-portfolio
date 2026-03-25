import type { Metadata } from "next"
import { Suspense } from "react"

import { CollapsibleList } from "@/components/collapsible-list"
import { SITE_INFO, X_USERNAME } from "@/config/site"
import { PostList } from "@/features/blog/components/post-list"
import { getAllDocs } from "@/features/doc/data/documents"
import { ProjectItem } from "@/features/portfolio/components/projects/project-item"
import { getAllProjects } from "@/features/portfolio/data/projects"

export const metadata: Metadata = {
  title: "Project",
  description:
    "A collection of projects showcasing my work and expertise in various domains.",
  alternates: {
    canonical: "/project",
  },
  openGraph: {
    url: "/project",
    type: "website",
    images: {
      url: SITE_INFO.ogImage,
      width: 1200,
      height: 630,
      alt: "Project - A collection of projects showcasing my work and expertise in various domains.",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_USERNAME,
    creator: X_USERNAME,
    images: [SITE_INFO.ogImage],
  },
}

export default function Page() {
  const allPosts = getAllDocs()
  const allProjects = getAllProjects()

  return (
    <div className="min-h-svh">
      <div className="screen-line-bottom px-4">
        <h1 className="text-3xl leading-none font-semibold tracking-tight">
          Project
        </h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <div className="screen-line-top" />

      <Suspense fallback={<PostList posts={allPosts} />}>
        <CollapsibleList
          items={allProjects}
          max={allProjects.length}
          renderItem={(item) => <ProjectItem project={item} />}
        />
      </Suspense>

      <div className="h-4" />
    </div>
  )
}
