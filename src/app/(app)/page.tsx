import type { Metadata } from "next"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { Blog } from "@/features/portfolio/components/blog"
import { Experiences } from "@/features/portfolio/components/experiences"
import { FinalCta } from "@/features/portfolio/components/final-cta"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { HeroPositioning } from "@/features/portfolio/components/hero-positioning"
import { Overview } from "@/features/portfolio/components/overview"
import { PartnershipModel } from "@/features/portfolio/components/partnership-model"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SelectedWork } from "@/features/portfolio/components/selected-work"
import { SocialLinks } from "@/features/portfolio/components/social-links-v2"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { TestimonialsMarquee } from "@/features/portfolio/components/testimonials-marquee"
import { WhoIWorkWith } from "@/features/portfolio/components/who-i-work-with"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <Separator />

        <ProfileHeader />
        <Separator />

        <HeroPositioning />
        <Separator />

        <Overview />
        <SocialLinks />
        <Separator />

        <PartnershipModel />
        <Separator />

        {/* <WhoIWorkWith />
        <Separator /> */}

        <TestimonialsMarquee />
        <Separator />

        {/* <GitHubContributions />
        <Separator /> */}

        <TechStack />
        <Separator />

        {/* <SelectedWork />
        <Separator /> */}

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Blog />
        <Separator />

        <FinalCta />
        <Separator />

        {/* <Awards />
        <Separator />

        <Certifications />
        <Separator />

        <Bookmarks />
        <Separator /> */}
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-line",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-line)]/56",
        className
      )}
    />
  )
}
