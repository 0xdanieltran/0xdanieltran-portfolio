import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

const CARDS = [
  {
    title: "AI Engineering",
    description:
      "Integrating production AI features into SaaS platforms using modern LLM workflows and scalable architecture.",
  },
  {
    title: "Full Stack Development",
    description:
      "Building scalable SaaS applications using Next.js, Node.js, PostgreSQL, and Supabase.",
  },
  {
    title: "Platform Architecture",
    description:
      "Designing backend systems, APIs, and distributed architectures built for reliability and long-term scalability.",
  },
  {
    title: "Startup Engineering Partner",
    description:
      "Helping founders ship MVPs, scale products, and strengthen technical foundations from MVP to scale.",
  },
  {
    title: "Technical Consulting",
    description:
      "Architecture reviews, scaling guidance, and implementation strategy for growing startups.",
  },
  {
    title: "Ownership Focused Delivery",
    description: "End-to-end ownership from idea to production deployment.",
  },
]

export function PartnershipModel() {
  return (
    <Panel id="partnership-model">
      <PanelHeader>
        <PanelTitle>Services</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-line p-3"
            >
              <h3 className="font-medium">{card.title}</h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
