import { format } from "date-fns"

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site"
import { getAllDocs } from "@/features/doc/data/documents"
import { getLLMText } from "@/features/doc/lib/get-llm-text"
import { EXPERIENCES } from "@/features/portfolio/data/experiences"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { TECH_STACK } from "@/features/portfolio/data/tech-stack"
import { USER } from "@/features/portfolio/data/user"

const SUMMARY = `${USER.bio}. Senior Platform Engineer with 9+ years building production SaaS, fintech, Web3, and AI systems used by real users. Specializes in scalable platforms, AI-native applications, and modern cloud infrastructure. Based in ${USER.address}.`

function getInsightPosts() {
  return getAllDocs().filter((doc) => doc.metadata.category !== "components")
}

export function getLlmsTxtContent() {
  const posts = getInsightPosts()

  return `# ${USER.displayName}

> ${SUMMARY}

## About Me

- [About](${SITE_INFO.url}/about.md): Bio, personal details, tech stack, and social links.
- [Full Profile](${SITE_INFO.url}/llms-full.txt): Complete portfolio, experience, projects, and all insights in one document.

## Experience & Projects

- [Experience](${SITE_INFO.url}/experience.md): Career roles across blockchain, fintech, gaming, healthcare, and SaaS engineering.
- [Projects](${SITE_INFO.url}/projects.md): ${PROJECTS.length}+ projects including Skypost AI, o1 Exchange, Predictefy, DFS Chain, and DIFINES AI.

## Insights (Blog)

Engineering articles on AI platform development, Web3 infrastructure, backend architecture, and production SaaS.

${posts.map((item) => `- [${item.metadata.title}](${SITE_INFO.url}/insights/${item.slug}): ${item.metadata.description}`).join("\n")}

## Connect

- [Portfolio](${SITE_INFO.url}/): Homepage with overview, projects, and contact.
- [Contact](${SITE_INFO.url}/contact): Get in touch for consulting and engineering partnerships.
- [GitHub](https://github.com/0xdanieltran): Open-source work and code repositories.
- [X](https://x.com/0xdanieltran106): Updates and engineering insights.
- [Schedule a Call](${SITE_INFO.calendarUrl}): Book a 30-minute intro call.
- [Source Code](${SOURCE_CODE_GITHUB_URL}): Portfolio source on GitHub.
`
}

function getAboutText() {
  return `## About

${USER.about.trim()}

### Personal Information

- Name: ${USER.displayName} (${USER.username})
- Pronouns: ${USER.pronouns}
- Job Title: ${USER.jobTitle}
- Location: ${USER.address}
- Website: ${USER.website}
- Email: ${USER.email}

### Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}`
}

function getExperienceText() {
  return `## Experience

${EXPERIENCES.map((item) =>
  item.positions
    .map((position) => {
      const skills = position.skills?.join(", ") || "N/A"
      return `### ${position.title} | ${item.companyName}

Duration: ${position.employmentPeriod.start} - ${position.employmentPeriod.end || "Present"}

Skills: ${skills}

${position.description?.trim()}`
    })
    .join("\n\n")
).join("\n\n")}`
}

function getProjectsText() {
  return `## Projects

${PROJECTS.map((item) => {
  const skills = `Skills: ${item.skills.join(", ")}`
  const role = item.role ? `Role: ${item.role}` : ""
  const business = item.businessDescription
    ? `Description: ${item.businessDescription}`
    : ""
  const highlights = item.highlights?.length
    ? `Highlights:\n${item.highlights.map((h) => `- ${h}`).join("\n")}`
    : ""
  const impact = item.impact ? `Impact: ${item.impact}` : ""
  const description = item.description?.trim()

  return `### ${item.title}

Project URL: ${item.link}
${[role, business, skills, highlights, impact, description].filter(Boolean).join("\n\n")}`
}).join("\n\n")}`
}

async function getBlogContent() {
  const posts = getInsightPosts()

  const text = await Promise.all(
    posts.map(
      async (item) =>
        `---\ntitle: "${item.metadata.title}"\ndescription: "${item.metadata.description}"\ncreated: "${format(new Date(item.metadata.createdAt), "MMMM d, yyyy")}"\nlast_updated: "${format(new Date(item.metadata.updatedAt), "MMMM d, yyyy")}"\nsource: "${SITE_INFO.url}/insights/${item.slug}"\n---\n\n${await getLLMText(item)}`
    )
  )

  return text.join("\n\n")
}

export async function getLlmsFullTxtContent() {
  return `<SYSTEM>This document contains comprehensive information about ${USER.displayName}'s professional profile, portfolio, and engineering insights. It includes personal details, work experience, ${PROJECTS.length}+ projects, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${USER.displayName}'s background, skills, and expertise as an ${USER.jobTitle}.</SYSTEM>

# ${USER.displayName}

> ${SUMMARY}

${getAboutText()}

${getExperienceText()}

${getProjectsText()}

## Insights (Blog)

${await getBlogContent()}`
}
