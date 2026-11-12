import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SITE_INFO } from "@/config/site"

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

export function FinalCta() {
  const scheduleUrl = SITE_INFO.calendarUrl || "/contact"

  return (
    <Panel id="contact-cta">
      <PanelHeader>
        <PanelTitle>Let&apos;s Build Something Great</PanelTitle>
      </PanelHeader>
      <PanelContent className="space-y-3">
        <div className="font-mono text-sm text-muted-foreground">
          <p>Available for:</p>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            <li>Full-stack SaaS platform development</li>
            <li>AI feature development and integration</li>
            <li>System architecture and scalable platform engineering</li>
            <li>Technical architecture and senior engineering consulting</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link
              href="/contact"
              data-track="cta_click"
              data-track-label="Start a Project"
              data-track-location="final_cta"
            >
              Start a Project
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={scheduleUrl}
              data-track="cta_click"
              data-track-label="Get Technical Advice"
              data-track-location="final_cta"
              target={scheduleUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                scheduleUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              Get Technical Advice
            </Link>
          </Button>
        </div>
      </PanelContent>
    </Panel>
  )
}
