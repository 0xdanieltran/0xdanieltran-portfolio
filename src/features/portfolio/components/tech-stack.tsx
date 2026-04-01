import Image from "next/image"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"

import { TECH_STACK } from "../data/tech-stack"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "./panel"

const GROUPS = [
  {
    title: "Primary Production Stack",
    items: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "OpenAI"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "GraphQL", "Redis"],
  },
  {
    title: "Infrastructure",
    items: ["AWS", "Docker", "CI/CD"],
  },
  {
    title: "Blockchain",
    items: ["Ethereum", "Solana", "Ethers.js"],
  },
]

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>
          Core Technologies I Build Production Systems With
        </PanelTitle>
        <PanelDescription>
          Next.js, Supabase, PostgreSQL, and AI-native tooling for scalable SaaS
          and Web3 products.
        </PanelDescription>
      </PanelHeader>

      <PanelContent className="space-y-4">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 font-medium">{group.title}</h3>
            <ul className="flex flex-wrap gap-3 select-none">
              {group.items.map((name) => {
                const tech = TECH_STACK.find((item) => item.title === name)
                if (!tech) return null
                return (
                  <li key={tech.key} className="flex">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <a
                            href={tech.href}
                            target="_blank"
                            rel="noopener"
                            aria-label={tech.title}
                          >
                            <Image
                              src={`${tech.imgUrl}`}
                              alt={`${tech.title} icon`}
                              width={100}
                              height={50}
                              className="h-7 w-auto"
                              unoptimized
                            />
                          </a>
                        }
                      />
                      <TooltipContent>
                        <p>{tech.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </PanelContent>
    </Panel>
  )
}
