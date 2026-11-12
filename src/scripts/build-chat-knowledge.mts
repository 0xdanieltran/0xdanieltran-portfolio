/**
 * Builds the local portfolio knowledge base used by the AI chat assistant.
 *
 * Output: src/features/chatbot/data/portfolio-knowledge.json
 *
 * Works like a tiny pgvector table in a JSON file: every portfolio fact is a
 * chunk with a sparse TF-IDF embedding. At request time `/api/chat` embeds the
 * question the same way, retrieves the nearest chunks, lets a fast Groq model
 * pick the ones it needs, and answers only from them.
 *
 * Run after editing portfolio data:  pnpm chat:knowledge
 */
import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

import { tokenize, vectorize } from "@/features/chatbot/lib/text"
import type {
  KnowledgeBase,
  KnowledgeDoc,
  KnowledgeDocType,
} from "@/features/chatbot/types"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import {
  TESTIMONIALS_1,
  TESTIMONIALS_2,
} from "@/features/portfolio/data/testimonials"
import { USER } from "@/features/portfolio/data/user"

const ROOT = process.cwd()
const OUT_FILE = path.join(
  ROOT,
  "src/features/chatbot/data/portfolio-knowledge.json"
)
const DOCS_DIR = path.join(ROOT, "src/features/doc/content")
const CALENDAR_URL = "https://calendly.com/0xdanieltran/30min"
const MAX_CHUNK_CHARS = 1800

type RawDoc = Omit<KnowledgeDoc, "embedding"> & {
  /** Extra weight for title terms when embedding. */
  keywords?: string[]
}

const docs: RawDoc[] = []

function add(
  type: KnowledgeDocType,
  id: string,
  title: string,
  content: string,
  opts: { url?: string; summary?: string; keywords?: string[] } = {}
) {
  const clean = content.replace(/\n{3,}/g, "\n\n").trim()
  docs.push({
    id: `${type}:${id}`,
    type,
    title,
    url: opts.url,
    summary: (opts.summary ?? clean.replace(/\s+/g, " ")).slice(0, 180),
    content: clean,
    keywords: opts.keywords,
  })
}

const period = (p: { start: string; end?: string }) =>
  `${p.start} – ${p.end ?? "Present"}`

/* ------------------------------------------------------------------ profile */

add(
  "profile",
  "overview",
  `About ${USER.displayName}`,
  `${USER.displayName} — ${USER.jobTitle}.
Headline: ${USER.bio}
Location: ${USER.address} (time zone ${USER.timeZone}). Pronouns: ${USER.pronouns}.
Current role: ${USER.jobs.map((j) => `${j.title.trim()} at ${j.company}`).join(", ")}.
Focus areas: ${USER.flipSentences.join("; ")}.

${USER.about.trim()}

Highlights: 9+ years of engineering experience; production systems used by real users; startup engineering experience; AI-native development workflows; production SaaS architecture experience. Helps startups move from idea → production → scale using Next.js, Supabase, PostgreSQL and modern AI workflows.`,
  {
    url: "/#about",
    summary: `Bio, headline, location, years of experience and focus areas of ${USER.displayName}.`,
    keywords: ["about", "bio", "who", "background", "summary", "overview"],
  }
)

/* ------------------------------------------------------------------ contact */

add(
  "contact",
  "channels",
  "Contact & hiring",
  `How to contact or hire ${USER.displayName}:
- Contact form: /contact
- Book a 30-minute intro call: ${CALENDAR_URL}
- Email: ${USER.email}
- Website: ${USER.website}
${SOCIAL_LINKS.map((s) => `- ${s.title}: ${s.href.split("?")[0]}${s.subtitle ? ` (${s.subtitle})` : ""}`).join("\n")}

Available for: full-stack SaaS platform development, AI feature development and integration, system architecture and scalable platform engineering, technical architecture and senior engineering consulting. Engagements are typically contract / freelance and remote.
Pricing and rates are discussed case by case — the best next step is booking a call or using the contact form.`,
  {
    url: "/contact",
    summary:
      "Email, social links, booking a call, availability and how to hire.",
    keywords: ["contact", "hire", "email", "call", "available", "availability"],
  }
)

/* ----------------------------------------------------------------- services */

add(
  "services",
  "offerings",
  "Services & what I do",
  `Services offered:
- AI Feature Development — adding production AI capabilities (LLM workflows, RAG, agents) into SaaS products.
- SaaS Platform Development — building scalable web platforms with Next.js, Node.js, PostgreSQL and Supabase.
- Platform Architecture — backend systems, APIs and distributed architectures built for reliability and long-term scalability.
- Database Schema Design — scalable, maintainable schemas designed for data integrity and performance.
- MVP Development / Startup Engineering Partner — helping founders ship MVPs fast, scale products and strengthen technical foundations.
- Technical Consulting — architecture reviews, scaling guidance and implementation strategy.
- Performance Optimization — improving speed and scalability.`,
  {
    url: "/#services",
    summary:
      "Services offered: AI features, SaaS, architecture, MVPs, consulting.",
    keywords: ["service", "offer", "help", "mvp", "consulting"],
  }
)

add(
  "services",
  "why-and-who",
  "Why work with me & who I work with",
  `Why work with ${USER.firstName}:
- Production experience — built real systems used by real users.
- Startup mindset — comfortable in fast-moving environments.
- Ownership focused — takes responsibility for what ships.
- AI-native workflow — uses modern AI tools to ship faster.
- System thinking — designs solutions, not just features.

Who ${USER.firstName} works with:
- AI startups building SaaS products
- Founders needing MVP development
- Product teams scaling backend platforms
- Web3 infrastructure teams`,
  {
    url: "/#why-work-with-me",
    summary: "Strengths, working style, and the kinds of clients/teams served.",
    keywords: ["why", "strength", "client", "team", "startup", "founder"],
  }
)

/* ------------------------------------------------------------------- skills */

const stackByCategory = new Map<string, string[]>()
for (const t of TECH_STACK) {
  for (const c of t.categories) {
    stackByCategory.set(c, [...(stackByCategory.get(c) ?? []), t.title])
  }
}
add(
  "skills",
  "tech-stack",
  "Tech stack",
  `Tech stack by category:
${[...stackByCategory.entries()].map(([c, items]) => `- ${c}: ${items.join(", ")}`).join("\n")}

Skills used across roles: ${[...new Set(EXPERIENCES.flatMap((e) => e.positions.flatMap((p) => p.skills ?? [])))].join(", ")}.`,
  {
    url: "/#stack",
    summary: "Languages, frameworks, databases, cloud and tools used.",
    keywords: ["stack", "skill", "technology", "language", "framework", "tool"],
  }
)

/* --------------------------------------------------------------- experience */

add(
  "experience",
  "timeline",
  "Career timeline",
  `Career timeline (newest first):
${EXPERIENCES.flatMap((e) => e.positions.map((p) => `- ${p.title.trim()} at ${e.companyName} (${period(p.employmentPeriod)}${p.employmentType ? `, ${p.employmentType}` : ""})${e.isCurrentEmployer ? " — current" : ""}`)).join("\n")}`,
  {
    url: "/#experience",
    summary: "All companies and roles with dates, newest first.",
    keywords: ["career", "timeline", "company", "employer", "history", "role"],
  }
)

for (const exp of EXPERIENCES) {
  for (const pos of exp.positions) {
    add(
      "experience",
      `${exp.id}-${pos.id}`,
      `${pos.title.trim()} at ${exp.companyName}`,
      `${pos.title.trim()} at ${exp.companyName}${exp.isCurrentEmployer ? " (current employer)" : ""}
Period: ${period(pos.employmentPeriod)}${pos.employmentType ? ` · ${pos.employmentType}` : ""}
${exp.companyWebsite ? `Company website: ${exp.companyWebsite}\n` : ""}Skills: ${(pos.skills ?? []).join(", ")}

${pos.description?.trim() ?? ""}`,
      {
        url: "/#experience",
        summary: `${pos.title.trim()} at ${exp.companyName}, ${period(pos.employmentPeriod)}. Skills: ${(pos.skills ?? []).slice(0, 6).join(", ")}`,
        keywords: [exp.companyName, ...(pos.skills ?? [])],
      }
    )
  }
}

/* ----------------------------------------------------------------- projects */

add(
  "project",
  "index",
  "All projects overview",
  `Portfolio projects (${PROJECTS.length}), newest first:
${PROJECTS.map((p) => `- ${p.title} (${period(p.period)}; ${p.categories.join(", ")}): ${(p.businessDescription ?? p.description ?? "").replace(/\s+/g, " ").slice(0, 140)}`).join("\n")}`,
  {
    url: "/project",
    summary: "List of every project with dates, categories and a one-liner.",
    keywords: ["project", "portfolio", "built", "list", "all", "best"],
  }
)

const isUrl = (url?: string) => !!url && url.trim() !== "" && url.trim() !== "#"

function projectLinks(p: (typeof PROJECTS)[number]) {
  return [
    isUrl(p.link)
      ? `${p.type === "game" ? "Play the game" : "Live demo / website"}: ${p.link}`
      : null,
    isUrl(p.iosLink) ? `App Store: ${p.iosLink}` : null,
    isUrl(p.androidLink) ? `Google Play: ${p.androidLink}` : null,
  ].filter((l): l is string => l !== null)
}

const projectsWithLinks = PROJECTS.filter((p) => projectLinks(p).length > 0)

add(
  "project",
  "live-links",
  "Live demos & project links",
  `Projects you can open or try right now (${projectsWithLinks.length}), newest first:
${projectsWithLinks.map((p) => `- ${p.title} (${p.categories.join(", ")}) — ${projectLinks(p).join(" · ")} — details: /project/${p.id}`).join("\n")}

Projects not listed here are private/internal and have no public demo; their details are on /project.`,
  {
    url: "/project",
    summary:
      "Every public live demo, website, game and app-store URL, one per project.",
    keywords: [
      "demo",
      "live",
      "website",
      "link",
      "url",
      "site",
      "try",
      "visit",
      "open",
      "app",
      "example",
    ],
  }
)

for (const p of PROJECTS) {
  const links = projectLinks(p)

  add(
    "project",
    p.id,
    p.title,
    `${p.title} (${period(p.period)})
Type: ${p.type ?? "website"} · Categories: ${p.categories.join(", ")}
${p.role ? `Role: ${p.role}\n` : ""}${links.length ? `${links.join(" · ")}\n` : ""}Tech: ${p.skills.join(", ")}

${p.businessDescription ?? ""}
${p.highlights?.length ? `\nHighlights:\n${p.highlights.map((h) => `- ${h}`).join("\n")}\n` : ""}${p.impact ? `\nImpact: ${p.impact}\n` : ""}${p.description ? `\n${p.description.trim()}` : ""}`.slice(
      0,
      MAX_CHUNK_CHARS * 2
    ),
    {
      url: `/project/${p.id}`,
      summary: `${p.title}${links.length ? " [has live demo link]" : ""} — ${(p.businessDescription ?? p.description ?? "").replace(/\s+/g, " ")}`,
      keywords: [
        p.title,
        p.title,
        ...p.categories,
        ...p.skills,
        ...(links.length ? ["demo", "live", "website", "link"] : []),
      ],
    }
  )
}

/* ------------------------------------------------------------- testimonials */

const testimonials = [...TESTIMONIALS_1, ...TESTIMONIALS_2]
add(
  "testimonial",
  "all",
  "Testimonials from clients & colleagues",
  `What clients and colleagues say:
${testimonials.map((t) => `- "${t.quote}" — ${t.authorName}, ${t.authorTagline}`).join("\n")}`.slice(
    0,
    MAX_CHUNK_CHARS * 2
  ),
  {
    url: "/testimonials",
    summary: "Quotes and recommendations from founders, CTOs and tech leads.",
    keywords: ["testimonial", "review", "recommendation", "feedback", "client"],
  }
)

/* ----------------------------------------------------------------- insights */

function mdxToPlain(src: string) {
  return src
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^import .*$/gm, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

for (const file of fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx"))) {
  const slug = path.basename(file, ".mdx")
  const { data, content } = matter(
    fs.readFileSync(path.join(DOCS_DIR, file), "utf8")
  )
  if (data.category === "components") continue

  const title = String(data.title ?? slug)
  const url = `/insights/${slug}`
  const sections = mdxToPlain(content).split(/\n(?=## )/)

  add(
    "insight",
    `${slug}:overview`,
    `Article: ${title}`,
    `Article "${title}" (published ${data.createdAt}).
${data.description ?? ""}

${sections[0]}`.slice(0, MAX_CHUNK_CHARS),
    {
      url,
      summary: `Blog article: ${title} — ${data.description ?? ""}`,
      keywords: [title, "article", "blog", "insight"],
    }
  )

  sections.slice(1).forEach((section, i) => {
    const heading = section.match(/^## (.+)$/m)?.[1]?.trim() ?? `Part ${i + 1}`
    add(
      "insight",
      `${slug}:${i + 1}`,
      `${title} — ${heading}`,
      `From the article "${title}", section "${heading}":
${section.replace(/^## .+$/m, "").trim()}`.slice(0, MAX_CHUNK_CHARS),
      { url, keywords: [heading] }
    )
  })
}

/* ---------------------------------------------------------------- embedding */

const tokenized = docs.map((d) => [
  ...tokenize(d.content),
  // Titles and keywords are weighted 3× so name lookups rank well.
  ...Array(3)
    .fill(tokenize([d.title, ...(d.keywords ?? [])].join(" ")))
    .flat(),
])

const df = new Map<string, number>()
for (const tokens of tokenized) {
  for (const t of new Set(tokens)) df.set(t, (df.get(t) ?? 0) + 1)
}

const vocabulary = [...df.keys()].sort()
const vocabIndex = new Map(vocabulary.map((t, i) => [t, i]))
const N = docs.length
const idf = vocabulary.map((t) =>
  Number((Math.log((N + 1) / ((df.get(t) ?? 0) + 1)) + 1).toFixed(4))
)

const kb: KnowledgeBase = {
  version: 1,
  generatedAt: new Date().toISOString(),
  embedding: { model: "tfidf-sparse-v1", dimensions: vocabulary.length },
  vocabulary,
  idf,
  documents: docs.map((d, i) => ({
    id: d.id,
    type: d.type,
    title: d.title,
    url: d.url,
    summary: d.summary,
    content: d.content,
    embedding: vectorize(tokenized[i], vocabIndex, idf),
  })),
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(kb, null, 1) + "\n")

const counts = Object.entries(
  kb.documents.reduce<Record<string, number>>((acc, d) => {
    acc[d.type] = (acc[d.type] ?? 0) + 1
    return acc
  }, {})
)
  .map(([k, v]) => `${k}=${v}`)
  .join(" ")

console.log(
  `✓ Wrote ${kb.documents.length} chunks (${counts}), ${vocabulary.length} dims → ${path.relative(ROOT, OUT_FILE)}`
)
