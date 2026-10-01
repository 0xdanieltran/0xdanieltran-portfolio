import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CreativeWork as PageSchema, WithContext } from "schema-dts"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Button } from "@/components/ui/button"
import { SITE_INFO, X_USERNAME } from "@/config/site"
import { ProjectContent } from "@/features/portfolio/components/projects/project-content"
import {
  findProjectNeighbour,
  getAllProjects,
  getProjectById,
} from "@/features/portfolio/data/projects"
import { USER } from "@/features/portfolio/data/user"
import type { Project } from "@/features/portfolio/types/projects"
import { cn } from "@/lib/utils"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ id: project.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    return notFound()
  }

  const description = getProjectDescription(project)
  const projectUrl = `/project/${project.id}`
  const ogImage =
    project.logo ||
    `/og/simple?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(description)}`

  return {
    title: project.title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      url: projectUrl,
      type: "website",
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: project.title,
      },
    },
    twitter: {
      card: "summary_large_image",
      site: X_USERNAME,
      creator: X_USERNAME,
      images: [ogImage],
    },
  }
}

function getProjectDescription(project: Project) {
  return (
    project.businessDescription ||
    project.description?.trim() ||
    `${project.title} — a project by ${USER.displayName}.`
  )
}

function getPageJsonLd(project: Project): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: getProjectDescription(project),
    url: `${SITE_INFO.url}/project/${project.id}`,
    image: project.logo
      ? `${SITE_INFO.url}${project.logo}`
      : `${SITE_INFO.url}${SITE_INFO.ogImage}`,
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  const { previous, next } = findProjectNeighbour(id)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(project)).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 border-none px-0 font-mono text-muted-foreground hover:text-foreground"
          variant="link"
          size="sm"
          asChild
        >
          <Link href="/project">
            <ArrowLeftIcon />
            Projects
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          {previous && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 border-none"
                    variant="secondary"
                    size="icon-sm"
                    asChild
                  >
                    <Link href={`/project/${previous.id}`}>
                      <ArrowLeftIcon />
                      <span className="sr-only">Previous project</span>
                    </Link>
                  </Button>
                }
              />
              <TooltipContent>
                <p>{previous.title}</p>
              </TooltipContent>
            </Tooltip>
          )}

          {next && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 border-none"
                    variant="secondary"
                    size="icon-sm"
                    asChild
                  >
                    <Link href={`/project/${next.id}`}>
                      <ArrowRightIcon />
                      <span className="sr-only">Next project</span>
                    </Link>
                  </Button>
                }
              />
              <TooltipContent>
                <p>{next.title}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="screen-line-top screen-line-bottom">
        <div
          className={cn(
            "h-8",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
          )}
        />
      </div>

      <div className="space-y-6 p-4">
        <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance">
          {project.title}
        </h1>

        <ProjectContent project={project} />
      </div>

      <div className="screen-line-top h-4 w-full" />
    </>
  )
}
