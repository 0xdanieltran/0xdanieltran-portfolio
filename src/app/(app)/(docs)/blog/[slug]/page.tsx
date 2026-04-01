import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const revalidate = false
export const dynamic = "force-static"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return {
    title: "Blog",
    description: "Legacy blog detail path redirecting to insights.",
    alternates: {
      canonical: `/blog/${(await params).slug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  redirect(`/insights/${(await params).slug}`)
}
