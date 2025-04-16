"use client"

import * as React from "react"
import { HTMLMotionProps, Transition, motion } from "motion/react"

import {
  TransformDirectionType,
  easeTransitions,
  transformVariants,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

interface WordProps extends React.HTMLAttributes<HTMLSpanElement> {
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
interface StaggerTextProps extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  transition?: Transition
  direction?: TransformDirectionType
  className?: string
  as?: keyof JSX.IntrinsicElements
}

function StaggerText({
  text,
  stagger = 0.05,
  transition,
  direction,
  className,
  as: Component = "span",
  ...props
}: StaggerTextProps) {
  const words = text.split(" ")

  const MotionComp = motion<typeof Component>(Component as React.ElementType)
  return (
    <MotionComp
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      className={cn("relative", className)}
      {...props}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <Word transition={transition} direction={direction} word={word} />
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </MotionComp>
  )
}

export { StaggerText }
