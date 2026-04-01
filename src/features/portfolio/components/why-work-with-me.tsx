import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const ITEMS = [
  "Production Experience - Built real systems used by real users.",
  "Startup Mindset - Comfortable working in fast-moving environments.",
  "Ownership Focused - I take responsibility for what I ship.",
  "AI Native Workflow - Using modern AI tools to ship faster.",
  "System Thinking - I design solutions, not just features.",
]

export function WhyWorkWithMe() {
  return (
    <Panel id="why-work-with-me">
      <PanelHeader>
        <PanelTitle>Why Work With Me</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {ITEMS.map((item) => {
            const [title, description] = item.split(" - ")
            return (
              <article
                key={title}
                className="rounded-lg border border-line p-3"
              >
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1 font-mono text-sm text-muted-foreground">
                  {description}
                </p>
              </article>
            )
          })}
        </div>
      </PanelContent>
    </Panel>
  )
}
