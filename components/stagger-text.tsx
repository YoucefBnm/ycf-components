"use client"

import * as React from "react"
import { HTMLMotionProps, Transition, motion, useInView } from "motion/react"

import {
  TransformDirectionType,
  easeTransitions,
  transformVariants,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

interface WordProps {
  word: string
  transition?: Transition
  direction?: TransformDirectionType
}
const transitionConfig = { ease: easeTransitions["default"], duration: 0.5 }
function Word({
  word,
  transition = transitionConfig,
  direction = "bottom",
}: WordProps) {
  const characters = word.split("")
  return (
    <span className="inline-block text-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
            transition={transition}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface staggerTextProps extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  transition?: Transition
  direction?: TransformDirectionType
  className?: string
}
function StaggerText({
  text,
  stagger = 0.05,
  transition,
  direction,
  className,
  ...props
}: staggerTextProps) {
  const words = text.split(" ")
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  })
  return (
    <motion.div
      ref={ref}
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative", className)}
      {...props}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word transition={transition} direction={direction} word={word} />
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.div>
  )
}

export { StaggerText }
