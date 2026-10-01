import { BoxIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleChevronsIcon,
} from "@/components/base/collapsible-animated"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/base/ui/collapsible"

import type { Project } from "../../types/projects"
import { ProjectContent } from "./project-content"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
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

            <div className="shrink-0 text-muted-foreground [&_svg]:size-4">
              <CollapsibleChevronsIcon duration={0.15} />
            </div>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden">
        <div className="border-t border-line p-4">
          <ProjectContent project={project} showDetailLink />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
