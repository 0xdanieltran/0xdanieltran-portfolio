import { AppleIcon, ArrowUpRightIcon, GlobeIcon } from "lucide-react"
import Link from "next/link"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { addQueryParams } from "@/utils/url"

import { isValidProjectUrl, type Project } from "../../types/projects"

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92Zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635Zm3.199-3.198 2.407 1.393c.75.434.75 1.518 0 1.952l-2.407 1.393L15.608 12l2.09-2.491ZM5.864 2.658 16.8 8.99l-2.302 2.302-8.634-8.634Z" />
    </svg>
  )
}

const chipClassName = cn(
  "inline-flex items-center gap-1.5 rounded-lg border bg-zinc-50 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors",
  "hover:border-foreground/20 hover:bg-accent-muted hover:text-foreground",
  "dark:bg-zinc-900",
  "[&_svg]:size-3.5 [&_svg]:shrink-0"
)

function ProjectLinkChip({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={addQueryParams(href, UTM_PARAMS)}
      target="_blank"
      rel="noopener noreferrer"
      className={chipClassName}
      aria-label={label}
    >
      {children}
      <span>{label}</span>
    </a>
  )
}

export function ProjectLinks({
  project,
  className,
  showDetailLink = false,
}: {
  project: Project
  className?: string
  showDetailLink?: boolean
}) {
  const isApp = project.type === "app"
  const links: React.ReactNode[] = []

  if (isApp) {
    if (isValidProjectUrl(project.iosLink)) {
      links.push(
        <ProjectLinkChip key="ios" href={project.iosLink} label="App Store">
          <AppleIcon />
        </ProjectLinkChip>
      )
    }

    if (isValidProjectUrl(project.androidLink)) {
      links.push(
        <ProjectLinkChip
          key="android"
          href={project.androidLink}
          label="Google Play"
        >
          <GooglePlayIcon />
        </ProjectLinkChip>
      )
    }
  } else if (isValidProjectUrl(project.link)) {
    links.push(
      <ProjectLinkChip key="website" href={project.link} label="Visit website">
        <GlobeIcon />
      </ProjectLinkChip>
    )
  }

  if (showDetailLink) {
    links.push(
      <Link
        key="details"
        href={`/project/${project.id}`}
        className={chipClassName}
        aria-label={`View ${project.title} details`}
      >
        <ArrowUpRightIcon />
        <span>View details</span>
      </Link>
    )
  }

  if (links.length === 0) return null

  return (
    <div className={cn("flex w-full flex-wrap justify-end gap-2", className)}>
      {links}
    </div>
  )
}
