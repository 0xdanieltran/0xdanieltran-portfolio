import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Blog",
  description: "Legacy blog path redirecting to insights.",
  alternates: {
    canonical: "/blog",
  },
}

export default function Page() {
  redirect("/insights")
}
