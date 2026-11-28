import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { SoftwareApplication, WithContext } from "schema-dts"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Button } from "@/components/ui/button"
import { SITE_INFO, X_USERNAME } from "@/config/site"
import { ProjectCategoryTags } from "@/features/portfolio/components/projects/project-category-tags"
import { ProjectContent } from "@/features/portfolio/components/projects/project-content"
import { TrackProjectView } from "@/features/portfolio/components/projects/track-project-view"
import {
  findProjectNeighbour,
  getAllProjects,
  getProjectById,
} from "@/features/portfolio/data/projects"
import { USER } from "@/features/portfolio/data/user"
import {
  getProjectPrimaryLink,
  isValidProjectUrl,
  type Project,
} from "@/features/portfolio/types/projects"
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

function getSchemaType(project: Project) {
  if (project.type === "game") return "VideoGame" as const
  if (project.type === "app") return "MobileApplication" as const
  return "WebApplication" as const
}

function getApplicationCategory(project: Project) {
  const has = (c: Project["categories"][number]) =>
    project.categories.includes(c)
  if (project.type === "game" || has("game") || has("igaming"))
    return "GameApplication"
  if (has("web3")) return "FinanceApplication"
  return "BusinessApplication"
}

function getOperatingSystems(project: Project) {
  if (project.type === "app") {
    return [project.iosLink && "iOS", project.androidLink && "Android"].filter(
      Boolean
    ) as string[]
  }
  const os = ["Web"]
  if (project.categories.includes("desktop")) os.push("Windows", "macOS")
  if (project.categories.includes("mobile")) os.push("iOS", "Android")
  return os
}

/** "MM.YYYY" → "YYYY-MM", "YYYY" → "YYYY" (ISO 8601). */
function toIsoDate(period: string) {
  const [first, second] = period.trim().split(".")
  if (second && /^\d{4}$/.test(second))
    return `${second}-${first.padStart(2, "0")}`
  return /^\d{4}$/.test(first) ? first : undefined
}

function getPageJsonLd(project: Project): WithContext<SoftwareApplication> {
  const pageUrl = `${SITE_INFO.url}/project/${project.id}`
  // Exact public links from projects.ts — never derived from the title or id.
  const liveUrl = getProjectPrimaryLink(project)
  const links = [project.link, project.iosLink, project.androidLink].filter(
    isValidProjectUrl
  )

  return {
    "@context": "https://schema.org",
    "@type": getSchemaType(project),
    name: project.title,
    description: getProjectDescription(project),
    url: liveUrl ?? pageUrl,
    ...(links.length > 1 && { sameAs: links }),
    ...(project.type === "app" && links.length && { installUrl: links }),
    mainEntityOfPage: pageUrl,
    image: new URL(project.logo || SITE_INFO.ogImage, SITE_INFO.url).toString(),
    applicationCategory: getApplicationCategory(project),
    operatingSystem: getOperatingSystems(project).join(", "),
    keywords: project.skills.join(", "),
    dateCreated: toIsoDate(project.period.start),
    author: {
      "@type": "Person",
      // Same entity as the Person on the home page.
      "@id": `${SITE_INFO.url}/#person`,
      name: USER.displayName,
      url: SITE_INFO.url,
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

        <ProjectCategoryTags categories={project.categories} linked />

        <TrackProjectView id={project.id} title={project.title} />
        <ProjectContent project={project} />
      </div>

      <div className="screen-line-top h-4 w-full" />
    </>
  )
}
