import type { Registry } from "shadcn/schema"

import { hook } from "./hooks/_registry"
import { lib } from "./lib/_registry"
import { styles } from "./styles/_registry"

export const registry = {
  name: "0xdanieltran",
  homepage: "https://0xdanieltran.vercel.app/components",
  items: [...lib, ...hook, ...styles],
} satisfies Registry
