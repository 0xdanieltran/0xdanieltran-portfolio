export const registryConfig = {
  /**
   * Registry namespace identifier for shadcn CLI
   * @example "@0xdanieltran" - Users can install components with: `npx shadcn add @0xdanieltran/wheel-picker`
   * @see https://ui.shadcn.com/docs/registry/namespace#overview
   */
  namespace: process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE || "@0xdanieltran",
  /**
   * URL pattern for resolving namespaced components
   * The {name} placeholder will be replaced with the component name
   * @example "https://0xdanieltran.vercel.app/r/{name}.json" resolves to "https://0xdanieltran.vercel.app/r/wheel-picker.json"
   * This tells shadcn CLI where to fetch component definitions when installing with namespace prefix
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl:
    process.env.NEXT_PUBLIC_REGISTRY_NAMESPACE_URL ||
    "https://0xdanieltran.vercel.app/r/{name}.json",
}

export const registryCategories = [
  {
    name: "Marketing",
    slug: "marketing",
    description: "Hero sections, landing pages, testimonials, CTAs",
  },
  {
    name: "Content",
    slug: "content",
    description: "Blog layouts, article pages, documentation",
  },
  {
    name: "Application",
    slug: "application",
    description: "Dashboards, login, signup, app layouts, sidebars",
  },
]
