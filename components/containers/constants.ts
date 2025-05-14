import { LayoutConfig, Product } from "./types"

export const LAYOUT_CONFIGS: LayoutConfig[] = [
  { mode: "list", className: "flex flex-col space-y-4", label: "list view" },
  { mode: "2col", className: "grid grid-cols-2 gap-4", label: "2 column view" },
  {
    mode: "4col",
    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
    label: "4 column view",
  },
]

export const ANIMATION_VARIANTS = {
  container: {
    list: { transition: { staggerChildren: 0.02 } },
    "2col": { transition: { staggerChildren: 0.1 } },
    "4col": { transition: { staggerChildren: 0.15 } },
  },
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 0.85, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  },
}
