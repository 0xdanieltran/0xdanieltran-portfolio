import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Panel, PanelContent } from "./panel"

export function HeroPositioning() {
  return (
    <Panel id="hero-positioning">
      <PanelContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            AI &amp; Full-Stack Engineering Partner for SaaS, AI, and Web3
            Startups
          </h2>
          <p className="font-mono text-sm text-balance text-muted-foreground">
            Helping startups move from idea → production → scale using Next.js,
            Supabase, PostgreSQL, and modern AI workflows.
          </p>
        </div>

        <div className="rounded-lg border border-line p-3">
          <p className="font-mono text-sm text-muted-foreground">
            Senior Platform Engineer with 9+ years building production SaaS,
            fintech, Web3, and AI systems used by real users. I specialize in
            scalable product architecture, AI integrations, and modern cloud
            infrastructure.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 font-mono text-sm text-muted-foreground">
            <li>Scalable platform architecture and production system design</li>
            <li>AI feature integration for production SaaS products</li>
            <li>Backend architecture and API design</li>
            <li>High-performance React and Next.js frontend systems</li>
            <li>Developer infrastructure and production delivery workflows</li>
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
            <Link href="/contact">Contact Me</Link>
          </Button>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Available for contract work, consulting, and startup partnerships.
        </p>
      </PanelContent>
    </Panel>
  )
}
