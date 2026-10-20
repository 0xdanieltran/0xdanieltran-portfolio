import type { Metadata } from "next"
import { Suspense } from "react"

import { CollapsibleList } from "@/components/collapsible-list"
import { SITE_INFO, X_USERNAME } from "@/config/site"
import { ProjectItem } from "@/features/portfolio/components/projects/project-item"
import { ProjectListWithFilter } from "@/features/portfolio/components/projects/project-list-with-filter"
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

      <Suspense
        fallback={
          <>
            <div className="screen-line-top screen-line-bottom p-4">
              <div className="h-6 w-full rounded-lg border border-input dark:bg-input/30" />
            </div>
            <CollapsibleList
              items={allProjects}
              max={allProjects.length}
              keyExtractor={(item) => item.id}
              renderItem={(item) => <ProjectItem project={item} />}
            />
          </>
        }
      >
        <ProjectListWithFilter projects={allProjects} />
      </Suspense>

      <div className="h-4" />
    </div>
  )
}
