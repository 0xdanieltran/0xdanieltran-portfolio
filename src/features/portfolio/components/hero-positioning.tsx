import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SITE_INFO } from "@/config/site"

import { Panel, PanelContent } from "./panel"

export function HeroPositioning() {
  const scheduleUrl = SITE_INFO.calendarUrl || "/contact"

  return (
    <Panel id="hero-positioning">
      <PanelContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Senior Full Stack Engineer Building Scalable SaaS and AI Products
          </h2>
          <p className="font-mono text-sm text-balance text-muted-foreground">
            Helping startups move from idea → production → scale using Next.js,
            Supabase, PostgreSQL, and modern AI workflows.
          </p>
        </div>

        <div className="rounded-lg border border-line p-3">
          <p className="font-mono text-sm text-muted-foreground">
            Senior Full Stack Engineer with 9+ years of experience building
            production SaaS platforms, backend systems, and user facing
            applications across fintech, AI, healthcare, iGaming, and digital
            asset products. I specialize in scalable application architecture,
            backend engineering, AI powered product development, and reliable
            cloud based systems.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 font-mono text-sm text-muted-foreground">
            <li>
              Full stack architecture, scalable backend services, and
              distributed systems
            </li>
            <li>
              AI powered applications, RAG pipelines, LLM integrations, and
              workflow automation
            </li>
            <li>
              Backend APIs, asynchronous processing, real time systems, and
              service integrations
            </li>
            <li>
              React, Next.js, TypeScript, and modern frontend architecture
            </li>
            <li>
              Cloud deployment, CI/CD, observability, performance optimization,
              and developer tooling
            </li>
          </ul>
          <ul className="mt-3 flex flex-wrap gap-1.5 font-mono text-xs text-muted-foreground">
            <li className="rounded-md border border-line px-2 py-1">
              Built production systems used by real users
            </li>
            <li className="rounded-md border border-line px-2 py-1">
              9+ years engineering experience
            </li>
            <li className="rounded-md border border-line px-2 py-1">
              Startup engineering experience
            </li>
            <li className="rounded-md border border-line px-2 py-1">
              AI-native development workflows
            </li>
            <li className="rounded-md border border-line px-2 py-1">
              Production SaaS architecture experience
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/contact">Work With Me</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href={scheduleUrl}
              target={scheduleUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                scheduleUrl.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              Book a Call
            </Link>
          </Button>
        </div>
      </PanelContent>
    </Panel>
  )
}
