"use client"

import { useEffect } from "react"

import { trackEvent } from "@/lib/events"

/** Fires `view_project` once when a project detail page is opened. */
export function TrackProjectView({ id, title }: { id: string; title: string }) {
  useEffect(() => {
    trackEvent({
      name: "view_project",
      properties: { project: title, project_id: id, source: "detail_page" },
    })
  }, [id, title])

  return null
}
