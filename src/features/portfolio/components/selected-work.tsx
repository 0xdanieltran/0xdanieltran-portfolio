import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const ITEMS = [
  {
    title: "DFS Chain",
    description:
      "Blockchain infrastructure platform supporting DeFi applications and token ecosystems.",
    role: "Lead Platform Architect",
    impact:
      "Designed scalable architecture supporting token issuance, exchanges, wallet infrastructure, and developer integrations.",
  },
  {
    title: "XMR.gg | Casino Platform",
    description:
      "High-traffic gaming and payments platform with complex financial operations.",
    role: "Senior Backend Engineer",
    impact:
      "Architected production microservices and financial systems to improve throughput, reliability, and platform stability at scale.",
  },
  {
    title: "AI Dating Assistant App",
    description:
      "AI-powered assistant product for contextual messaging and response generation.",
    role: "AI Platform Engineer",
    impact:
      "Integrated production LLM workflows and context-aware pipelines to increase engagement and reduce response friction.",
  },
]

export function SelectedWork() {
  return (
    <Panel id="selected-work">
      <PanelHeader>
        <PanelTitle>Selected Work</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-3">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-line p-3"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {item.description}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Role:</span>{" "}
                <span className="font-mono text-muted-foreground">
                  {item.role}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium">Impact:</span>{" "}
                <span className="font-mono text-muted-foreground">
                  {item.impact}
                </span>
              </p>
            </article>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
