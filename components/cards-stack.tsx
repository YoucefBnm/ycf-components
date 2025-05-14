"use client"

import * as React from "react"
import { FEATURES_CONTENT } from "@/constants/features-content"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { ContainerScroll } from "./containers/container-scroll"

interface CardStickyProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardStickyVariants> {
  index: number
  incrementY?: number
  incrementZ?: number
}
const cardStickyVariants = cva("sticky", {
  variants: {
    variant: {
      default: "rounded-2xl border p-8 shadow-md backdrop-blur-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
export const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 10,
      className,
      variant,
      style,
      ...props
    },
    ref
  ) => {
    const y = index * incrementY
    const z = index * incrementZ

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          top: y,
          z,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn(cardStickyVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
CardSticky.displayName = "CardSticky"

export const CardsStack = () => {
  return (
    <div className="relative">
      <ContainerScroll className="relative min-h-[100rem] place-content-center place-items-center space-y-8">
        {FEATURES_CONTENT.map((feature, index) => (
          <CardSticky
            className="min-w-min max-w-md"
            key={feature.id}
            index={index + 2}
          >
            <div className="space-y-4">
              <div className="flex size-10 items-center justify-around rounded-lg bg-blue-500/10">
                <feature.icon className="size-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold leading-none tracking-tighter">
                {feature.title}
              </h3>
            </div>

            <p className="mt-4 text-foreground/80">{feature.description}</p>
          </CardSticky>
        ))}
      </ContainerScroll>
    </div>
  )
}
