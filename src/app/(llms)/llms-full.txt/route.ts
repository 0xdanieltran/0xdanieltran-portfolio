import { getLlmsFullTxtContent } from "@/features/llms/lib/content"

export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  return new Response(await getLlmsFullTxtContent(), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
