import { PROJECTS } from "@/features/portfolio/data/projects"
import {
  getProjectPrimaryLink,
  isValidProjectUrl,
} from "@/features/portfolio/types/projects"

function getProjectUrlsMarkdown(item: (typeof PROJECTS)[number]) {
  if (item.type === "app") {
    const lines = [
      isValidProjectUrl(item.iosLink) ? `App Store: ${item.iosLink}` : null,
      isValidProjectUrl(item.androidLink)
        ? `Google Play: ${item.androidLink}`
        : null,
    ].filter(Boolean)

    return lines.length > 0 ? lines.join("\n") : "Project URL: N/A"
  }

  const link = getProjectPrimaryLink(item)
  return `Project URL: ${link ?? "N/A"}`
}

const content = `# Projects

${PROJECTS.map((item) => {
  const skills = `\n\nSkills: ${item.skills.join(", ")}`
  const description = item.description ? `\n\n${item.description.trim()}` : ""
  return `## ${item.title}\n\n${getProjectUrlsMarkdown(item)}${skills}${description}`
}).join("\n\n")}
`

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
