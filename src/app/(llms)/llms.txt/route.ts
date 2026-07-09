import { getLlmsTxtContent } from "@/features/llms/lib/content"

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(getLlmsTxtContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
