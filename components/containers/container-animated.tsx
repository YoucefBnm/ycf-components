"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { SPRING_TRANSITION_CONFIG } from "@/lib/motion"
import {
  AnimationT,
  useAnimationVariants,
} from "@/hooks/use-animation-variants"

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { animation?: AnimationT }
>(({ className, transition, animation, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={useAnimationVariants(animation)}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      transition={{ ...SPRING_TRANSITION_CONFIG, ...transition }}
      {...props}
    />
  )
})
ContainerAnimated.displayName = "ContainerAnimated"
