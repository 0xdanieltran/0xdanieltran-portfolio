import type { DetailedHTMLProps, HTMLAttributes } from "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tavus-embed": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "deployment-id"?: string
          "override-config"?: string
          "conversational-context"?: string
        },
        HTMLElement
      >
    }
  }
}

export {}
