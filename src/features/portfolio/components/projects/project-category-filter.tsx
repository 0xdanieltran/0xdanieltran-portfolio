"use client"

import { Button } from "@/components/ui/button"

import {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_LABELS,
  type ProjectCategory,
} from "../../types/projects"

export function ProjectCategoryFilter({
  selected,
  onSelect,
  counts,
  total,
}: {
  selected: string
  onSelect: (category: "all" | ProjectCategory) => void
  counts: Record<ProjectCategory, number>
  total: number
}) {
  const options: Array<{
    value: "all" | ProjectCategory
    label: string
    count: number
  }> = [
    { value: "all", label: "All", count: total },
    ...PROJECT_CATEGORIES.filter((category) => counts[category] > 0).map(
      (category) => ({
        value: category,
        label: PROJECT_CATEGORY_LABELS[category],
        count: counts[category],
      })
    ),
  ]

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-1.5"
    >
      {options.map((option) => {
        const isSelected = selected === option.value

        return (
          <Button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            aria-label={`${option.label}, ${option.count} projects`}
            size="xs"
            variant={isSelected ? "default" : "outline"}
            className="font-mono"
            onClick={() => onSelect(option.value)}
          >
            {option.label}
            <span className="text-[0.7rem] opacity-70">{option.count}</span>
          </Button>
        )
      })}
    </div>
  )
}
