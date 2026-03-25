"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import type { Project } from "@/features/portfolio/types/projects"
import { trackEvent } from "@/lib/events"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  source = "",
  project,
  experience,
  ...props
}: CollapsiblePrimitive.Trigger.Props & {
  source?: string
  project?: Project
  experience?: { title: string; company: string }
}) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...props}
      onClick={() => {
        if (source === "view_project") {
          trackEvent({
            name: "view_project",
            properties: {
              project: project?.title || "project_item",
              link: project?.link || "unknown",
            },
          })
        } else if (source === "view_experience") {
          trackEvent({
            name: "view_experience",
            properties: {
              company: experience?.company || "unknown_company",
              position: experience?.title || "experience_position_item",
            },
          })
        }
      }}
    />
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
