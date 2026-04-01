import type { Metadata } from "next"

import { SITE_INFO } from "@/config/site"

import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out for consulting, contract work, or technical partnerships.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
    type: "website",
    images: {
      url: SITE_INFO.ogImage,
      width: 1200,
      height: 630,
      alt: "Contact",
    },
  },
}

export default function Page() {
  return (
    <div className="mx-auto min-h-svh border-x border-line md:max-w-3xl">
      <div
        className="screen-line-bottom h-8 before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56"
        aria-hidden
      />

      <div className="screen-line-bottom px-4">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-muted-foreground">
          Tell me about your product, current challenge, and timeline. I reply
          to qualified inquiries as quickly as possible.
        </p>
      </div>

      <ContactForm />
    </div>
  )
}
