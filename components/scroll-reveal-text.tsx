"use client"

import * as React from "react"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

function useScrollAnimation() {
  const scrollRef = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["0.2 0.4", "0.9 1"],
    // offset: ["start start"],
  })

  return {
    scrollRef,
    scrollYProgress,
  }
}
interface WordProps extends React.HTMLAttributes<HTMLSpanElement> {
  word: string
  range: [number, number]
  scrollProgress: MotionValue<number>
  className?: string
}
interface LetterProps extends HTMLMotionProps<"span"> {
  letter: string
  scrollProgress: MotionValue<number>
  range: [number, number]
  initialOpacityValue?: number
  className?: string
}
function Letter({
  letter,
  range,
  scrollProgress,
  initialOpacityValue = 0.2,
  className,
  ...props
}: LetterProps) {
  const opacity = useTransform(scrollProgress, range, [0.2, 1])

  return (
    <motion.span style={{ opacity }} className={cn("", className)} {...props}>
      {letter}
    </motion.span>
  )
}
function Word({ word, range, scrollProgress, className, ...props }: WordProps) {
  const letters = word.split("")
  const amount = range[1] - range[0]
  const step = amount / word.length

  return (
    <span className={"inline-block "} {...props}>
      {letters.map((letter, index) => {
        const start = range[0] + step * index
        const end = start * (index + 1)

        return (
          <Letter
            key={index}
            range={[start, end]}
            scrollProgress={scrollProgress}
            letter={letter}
          />
        )
      })}
    </span>
  )
}

interface ScrollRevealTextProps {
  text: string
  className?: string
}
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const words = text.split(" ")
  const { scrollRef, scrollYProgress } = useScrollAnimation()

  return (
    <div ref={scrollRef} className={cn("relative h-[200vh]", className)}>
      <div className="sticky left-0 top-0 min-h-svh w-full">
        {words.map((word, index) => {
          const start = index / words.length
          const end = start + 1 / words.length

          return (
            <Word
              key={`${word}-${index}`}
              word={word}
              range={[start, end]}
              scrollProgress={scrollYProgress}
            />
          )
        })}
      </div>
    </div>
  )
}
