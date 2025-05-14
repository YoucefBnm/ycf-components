"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, Transition, motion } from "motion/react"

import { SPRING_TRANSITION_CONFIG } from "@/lib/motion"
import { cn } from "@/lib/utils"
import {
  AnimationT,
  useAnimationVariants,
} from "@/hooks/use-animation-variants"

interface TextStagger extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  animation?: AnimationT
  className?: string
  as?: keyof JSX.IntrinsicElements
}
interface WordProps extends React.HTMLAttributes<HTMLSpanElement> {
  word: string
  transition?: Transition
  animation?: AnimationT
}

export function Word({ word, animation }: WordProps) {
  const characters = word.split("")
  const animationVariants = useAnimationVariants(animation)
  return (
    <span className="inline-block text-nowrap align-top">
      {characters.map((char, index) => (
        <span key={index} className="inline-block">
          <motion.span className="inline-block" variants={animationVariants}>
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export const TextStagger = ({
  text,
  stagger = 0.04,
  transition,
  viewport,
  animation,
  className,
  as: Component = "span",
  ...props
}: TextStagger) => {
  const words = text.split(" ")

  const MotionComp = motion.create<typeof Component>(
    Component as React.ElementType
  )

  return (
    <MotionComp
      transition={{ staggerChildren: stagger, ...transition }}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, ...viewport }}
      className={cn("relative", className)}
      {...props}
    >
      <MotionConfig transition={{ SPRING_TRANSITION_CONFIG }}>
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <Word transition={transition} animation={animation} word={word} />
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </MotionConfig>
    </MotionComp>
  )
}
