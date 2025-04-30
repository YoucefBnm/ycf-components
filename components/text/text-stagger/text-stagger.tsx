"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, Transition, motion } from "motion/react"

import { TransformDirectionType, transformVariants } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface TextStaggerText extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  direction?: TransformDirectionType
  className?: string
  as?: keyof JSX.IntrinsicElements
}
interface WordProps extends React.HTMLAttributes<HTMLSpanElement> {
  word: string
  transition?: Transition
  direction?: TransformDirectionType
}
const TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

function Word({ word, direction = "bottom" }: WordProps) {
  const characters = word.split("")
  return (
    <span className="inline-block text-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span
            className="inline-block"
            variants={transformVariants(direction)}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function TextStagger({
  text,
  stagger = 0.05,
  transition,
  direction,
  className,
  as: Component = "span",
  ...props
}: TextStaggerText) {
  const words = text.split(" ")

  const MotionComp = motion.create<typeof Component>(
    Component as React.ElementType
  )
  return (
    <MotionComp
      transition={{ staggerChildren: stagger }}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      className={cn("relative", className)}
      {...props}
    >
      <MotionConfig transition={{ TRANSITION_CONFIG }}>
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <Word transition={transition} direction={direction} word={word} />
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </MotionConfig>
    </MotionComp>
  )
}
TextStagger.displayName = "TextStagger"
