import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const ITEMS = [
  {
    title: "AI Engineering",
    description:
      "Integrating AI features into SaaS platforms using modern LLM workflows and production-ready architecture.",
  },
  {
    title: "Full Stack Development",
    description:
      "Building scalable applications using Next.js, Node.js, PostgreSQL, and Supabase.",
  },
  {
    title: "Platform Architecture",
    description:
      "Designing backend systems, APIs, and distributed architectures for performance and reliability.",
  },
  {
    title: "Startup Engineering Partner",
    description:
      "Helping founders ship MVPs, scale products, and improve technical foundations.",
  },
]

export function WhatIDo() {
  return (
    <Panel id="what-i-do">
      <PanelHeader>
        <PanelTitle>What I Do</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-line p-3"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
