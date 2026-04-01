import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const ITEMS = [
  "AI startups building SaaS products",
  "Founders needing MVP development",
  "Product teams scaling backend platforms",
  "Web3 infrastructure teams",
]

export function WhoIWorkWith() {
  return (
    <Panel id="who-i-work-with">
      <PanelHeader>
        <PanelTitle>Who I Work With</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <article key={item} className="rounded-lg border border-line p-3">
              <p className="font-mono text-sm text-muted-foreground">{item}</p>
            </article>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
