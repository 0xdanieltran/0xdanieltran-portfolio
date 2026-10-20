import Link from "next/link"

import { Tag } from "@/components/ui/tag"
import { cn } from "@/lib/utils"

import {
  PROJECT_CATEGORY_LABELS,
  sortProjectCategories,
  type ProjectCategory,
} from "../../types/projects"

export function ProjectCategoryTags({
  categories,
  className,
  linked = false,
}: {
  categories: ProjectCategory[]
  className?: string
  linked?: boolean
}) {
  if (categories.length === 0) return null

  return (
    <ul className={cn("flex flex-wrap gap-1", className)}>
      {sortProjectCategories(categories).map((category) => {
        const label = PROJECT_CATEGORY_LABELS[category]
        const tag = (
          <Tag
            className={
              linked
                ? "transition-colors hover:border-foreground/20 hover:text-foreground"
                : undefined
            }
          >
            {label}
          </Tag>
        )

        return (
          <li key={category} className="flex">
            {linked ? (
              <Link
                href={`/project?category=${category}`}
                aria-label={`View ${label} projects`}
              >
                {tag}
              </Link>
            ) : (
              tag
            )}
          </li>
        )
      })}
    </ul>
  )
}
