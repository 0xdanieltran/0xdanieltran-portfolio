import { BoxIcon, LinkIcon } from "lucide-react"
import Image from "next/image"

import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Markdown } from "@/components/markdown"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { addQueryParams } from "@/utils/url"

import type { Project } from "../../types/projects"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const hasStructuredContent =
    project.businessDescription ||
    project.role ||
    project.highlights?.length ||
    project.impact

  return (
    <Collapsible className={className} defaultOpen={project.isExpanded}>
      <div className="flex items-center hover:bg-accent-muted">
        <div className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line ring-offset-1 ring-offset-background select-none">
          <BoxIcon className="size-4" />
        </div>
        <div className="flex-1 border-l border-dashed border-line">
          <CollapsibleTrigger
            className="flex w-full items-center gap-2 p-4 pr-2 text-left"
            source="view_project"
            project={project}
          >
            <div className="flex-1">
              <h3 className="mb-1 leading-snug font-medium text-balance">
                {project.title}
              </h3>
            </div>
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={addQueryParams(project.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                    <span className="sr-only">Open Project Link</span>
                  </a>
                }
              />
              <TooltipContent>
                <p>Open Project Link</p>
              </TooltipContent>
            </Tooltip>

            <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
              <CollapsibleChevronsIcon duration={0.15} />
            </div>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          <div className="flex flex-col items-start gap-6 text-sm text-muted-foreground">
            {/* Image side */}
            <Image
              src={project.logo || "/images/projects/default.webp"}
              alt={project.title}
              width={160}
              height={160}
              quality={100}
              className="h-auto w-full object-contain"
              unoptimized
              aria-hidden
            />

            {/* Description side */}
            {hasStructuredContent ? (
              <div className="w-full space-y-3">
                {project.businessDescription && (
                  <p className="font-mono text-sm text-foreground">
                    {project.businessDescription}
                  </p>
                )}
                {project.role && (
                  <div>
                    <p className="font-medium text-foreground">Role</p>
                    <p className="font-mono text-sm">{project.role}</p>
                  </div>
                )}
                {!!project.highlights?.length && (
                  <div>
                    <p className="font-medium text-foreground">
                      Technical Highlights
                    </p>
                    <ul className="list-disc space-y-0.5 pl-4 font-mono text-sm">
                      {project.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.impact && (
                  <div>
                    <p className="font-medium text-foreground">Impact</p>
                    <p className="font-mono text-sm">{project.impact}</p>
                  </div>
                )}
              </div>
            ) : (
              project.description && (
                <ProseMono>
                  <Markdown>{project.description}</Markdown>
                </ProseMono>
              )
            )}
          </div>

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
