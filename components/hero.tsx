"use client"

import * as React from "react"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

import { StaggerText } from "./stagger-text"

interface HeroProps
  extends React.HTMLAttributes<HTMLElement>,
    React.PropsWithChildren {
  heading: string
  videoLink: string
  description?: string
  className?: string
}
interface HeroContextValue {
  heading: string
  videoLink: string
  description?: string
  scrollYProgress: MotionValue<number>
}

function useScrollProgress() {
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["0.2 0.4", "0.9 1"],
  })

  return {
    scrollRef,
    scrollYProgress,
  }
}
function useRevealAnimation() {
  const revealRef = React.useRef(null)

  const isInView = useInView(revealRef, {
    once: true,
    amount: 0.5,
  })

  return {
    revealRef,
    isInView,
  }
}

const HeroContext = React.createContext<HeroContextValue | undefined>(undefined)

function useHeroContext() {
  const context = React.useContext(HeroContext)

  if (context === undefined) {
    throw new Error("useHeroContext must be used within a HeroProvider")
  }

  return context
}

function Hero({
  heading,
  videoLink,
  description,
  className,
  children,
  ...props
}: HeroProps) {
  const { scrollRef, scrollYProgress } = useScrollProgress()

  return (
    <HeroContext.Provider
      value={{ heading, videoLink, description, scrollYProgress }}
    >
      <section
        className={cn("relative has-[video]:h-[300vh]", className)}
        ref={scrollRef}
        {...props}
      >
        {children}
      </section>
    </HeroContext.Provider>
  )
}

interface HeroHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
  direction?: "top" | "bottom" | "left" | "right"
}
function HeroHeading({
  className,
  direction = "bottom",
  ...props
}: HeroHeadingProps) {
  const { heading } = useHeroContext()
  return (
    <h1 className={className} {...props}>
      <StaggerText text={heading} direction={direction} />
    </h1>
  )
}

interface HeroDescriptionProps extends HTMLMotionProps<"div"> {
  className?: string
}
function HeroDescription({ className, ...props }: HeroDescriptionProps) {
  const { description } = useHeroContext()
  const { revealRef, isInView } = useRevealAnimation()
  return (
    <motion.div
      className={cn(className)}
      ref={revealRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.7, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p>{description}</p>
    </motion.div>
  )
}

interface HeroVideoProps extends HTMLMotionProps<"video"> {
  className?: string
}
function HeroVideo({ className, ...props }: HeroVideoProps) {
  const { videoLink, scrollYProgress } = useHeroContext()

  const scale = useTransform(scrollYProgress, [0.2, 0.9], [0.25, 1])
  const borderRadius = useTransform(scrollYProgress, [0.2, 0.9], [1000, 24])

  return (
    <motion.video
      className={cn(
        className,
        "sticky left-0 top-6 h-auto w-full max-w-full origin-top object-contain "
      )}
      layout
      width="100%"
      height="100%"
      loop
      style={{ scale, borderRadius }}
      playsInline
      autoPlay
      {...props}
    >
      <source src={videoLink} type="video/mp4" />
    </motion.video>
  )
}
export { Hero, HeroHeading, HeroVideo, HeroDescription }
