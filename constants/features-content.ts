import { FileCogIcon, Palette, PuzzleIcon } from "lucide-react"

import TypescriptIcon from "@/components/icons/typescript-icon"

export const FEATURES_CONTENT = [
  {
    id: "feature-1",
    title: "Modular Blocks & Layouts",
    description:
      "Compose pages effortlessly with pre‑designed blocks (headers, cards, galleries, footers). All blocks are fully responsive and theme‑able to match your brand.",
    icon: PuzzleIcon,
  },
  {
    id: "feature-2",
    title: "Handy Utilities & Custom Hooks",
    description:
      "Optimize development with battle‑tested hooks (data fetching, form state, intersection observers) and utility functions (debounce, throttle, deep merge).",
    icon: FileCogIcon,
  },
  {
    id: "feature-3",
    title: "TypeScript‑First with Complete Typings",
    description:
      "Robust end‑to‑end TypeScript support—intellisense, compile‑time safety, and zero‑config type definitions.",
    icon: TypescriptIcon,
  },
  {
    id: "feature-4",
    title: "Easy Theming & Customization",
    description:
      "Switch themes or override styles with Tailwind CSS or CSS‑in‑JS. You control every pixel without fighting the library.",
    icon: Palette,
  },
]
