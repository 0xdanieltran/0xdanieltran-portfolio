import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://0xdanieltran.vercel.app",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Project",
    href: "/project",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

export const X_USERNAME = "@danieltran"
export const GITHUB_USERNAME = "0xdanieltran"
export const SOURCE_CODE_GITHUB_REPO = "0xdanieltran/0xdanieltran-portfolio"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/0xdanieltran/0xdanieltran-portfolio"

export const SPONSORSHIP_URL = "#"

export const UTM_PARAMS = {
  utm_source: "0xdanieltran.vercel.app",
}
