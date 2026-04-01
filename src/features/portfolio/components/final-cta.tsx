import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SITE_INFO } from "@/config/site"

import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel"

export function FinalCta() {
  const scheduleUrl = SITE_INFO.calendarUrl || "/contact"

  return (
    <Panel id="contact-cta">
      <PanelHeader>
        <PanelTitle>Let&apos;s Build Something Great</PanelTitle>
        <PanelDescription>
          I work with startups and product teams building AI platforms, SaaS
          applications, and scalable backend systems.
        </PanelDescription>
      </PanelHeader>
      <PanelContent className="space-y-3">
        <div className="font-mono text-sm text-muted-foreground">
          <p>Available for:</p>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            <li>
              Full-stack SaaS platform development (Next.js, Supabase,
              PostgreSQL)
            </li>
            <li>AI feature development and integration</li>
            <li>Scalable frontend systems and backend architecture</li>
            <li>Blockchain infrastructure and Web3 platform engineering</li>
            <li>Technical architecture and senior engineering consulting</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={scheduleUrl}
              target={scheduleUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                scheduleUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              Schedule a Call
            </Link>
          </Button>
        </div>
      </PanelContent>
    </Panel>
  )
}
