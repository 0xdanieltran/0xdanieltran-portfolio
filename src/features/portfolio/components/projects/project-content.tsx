import Image from "next/image"

import { Markdown } from "@/components/markdown"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

import type { Project } from "../../types/projects"
import { ProjectLinks } from "./project-links"

export function ProjectContent({
  project,
  className,
  showLogo = true,
  showDetailLink = false,
}: {
  project: Project
  className?: string
  showLogo?: boolean
  showDetailLink?: boolean
}) {
  const hasStructuredContent =
    project.businessDescription ||
    project.role ||
    project.highlights?.length ||
    project.impact

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col items-start gap-6 text-sm text-muted-foreground">
        {showLogo && (
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
        )}

        <ProjectLinks project={project} showDetailLink={showDetailLink} />

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
  )
}
