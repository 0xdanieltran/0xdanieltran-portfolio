"use client"

import { useQueryState } from "nuqs"

import { CollapsibleList } from "@/components/collapsible-list"

import {
  getProjectCategoryCounts,
  getProjectsByCategory,
  isProjectCategory,
  type Project,
} from "../../types/projects"
import { ProjectCategoryFilter } from "./project-category-filter"
import { ProjectItem } from "./project-item"

export function ProjectListWithFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  })

  const selected =
    category === "all" || isProjectCategory(category) ? category : "all"
  const filteredProjects = getProjectsByCategory(projects, selected)
  const counts = getProjectCategoryCounts(projects)

  return (
    <>
      <div className="screen-line-top screen-line-bottom p-4">
        <ProjectCategoryFilter
          selected={selected}
          onSelect={(value) => {
            void setCategory(value === "all" ? null : value)
          }}
          counts={counts}
          total={projects.length}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p className="p-4 font-mono text-sm text-muted-foreground">
          No projects in this category.
        </p>
      ) : (
        <CollapsibleList
          items={filteredProjects}
          max={filteredProjects.length}
          keyExtractor={(item) => `${item.id}-${selected}`}
          renderItem={(item) => (
            <ProjectItem
              project={item}
              defaultOpen={selected !== "all" || item.isExpanded}
            />
          )}
        />
      )}
    </>
  )
}
