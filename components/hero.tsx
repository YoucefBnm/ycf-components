"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Property } from "csstype"

import { cn } from "@/lib/utils"

const heroVariants = cva("")
export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {}

export function Hero() {
  return <section className="">hero</section>
}

interface BgGradientProps {
  dominantColor: Property.Background<string | number>
}
export function BgGradient() {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 size-full select-none"
      )}
      style={{
        background: `radial-gradient()`,
        backgroundImage: ``,
      }}
    ></div>
  )
}
