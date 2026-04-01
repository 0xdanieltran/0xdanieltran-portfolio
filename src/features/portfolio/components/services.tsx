import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const SERVICES = [
  {
    title: "AI Feature Development",
    description: "Adding AI capabilities into SaaS products.",
  },
  {
    title: "SaaS Platform Development",
    description: "Building scalable web platforms.",
  },
  {
    title: "Technical Consulting",
    description: "Architecture reviews and scaling guidance.",
  },
  {
    title: "MVP Development",
    description: "Helping startups ship products fast.",
  },
  {
    title: "Performance Optimization",
    description: "Improving speed and scalability.",
  },
]

export function Services() {
  return (
    <Panel id="services">
      <PanelHeader>
        <PanelTitle>Services</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="rounded-lg border border-line bg-accent-muted/20 p-3"
            >
              <h3 className="font-medium">{service.title}</h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
