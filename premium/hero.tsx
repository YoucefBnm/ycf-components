"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLMotionProps, Transition, motion, stagger } from "motion/react"

import { cn } from "@/lib/utils"

export type TransformDirectionType = "top" | "bottom" | "left" | "right" | "z"
export interface BgGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: keyof typeof GRADIENT_SIZES | { width: string; height: string }
  gradientPosition?: keyof typeof GRADIENT_POSITIONS | { x: string; y: string }
  gradientColors?:
    | keyof typeof GRADIENT_COLORS
    | { color: string; start: string }[]
  className?: string
}
interface WordProps extends React.HTMLAttributes<HTMLSpanElement> {
  word: string
  transition?: Transition
  direction?: TransformDirectionType
}
export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {}
interface TextStaggerText extends HTMLMotionProps<"div"> {
  text: string
  stagger?: number
  direction?: TransformDirectionType
  className?: string
  as?: keyof JSX.IntrinsicElements
}
export interface AnimatedContainerProps extends HTMLMotionProps<"p"> {
  transformDirection?: TransformDirectionType
  className?: string
}

export const transformVariants = (direction?: TransformDirectionType) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : 0,
    scale: direction === "z" ? 0 : 1,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
})
export const GRADIENT_COLORS = {
  blue: [
    { color: "rgb(180, 176, 254)", start: "0%" },
    { color: "rgb(54, 50, 133)", start: "22.92%" },
    { color: "rgb(17, 13, 91)", start: "42.71%" },
    { color: "rgb(5, 3, 39)", start: "88.54%" },
  ],
  black: [
    { color: "#333333", start: "0%" },
    { color: "#292929", start: "22.92%" },
    { color: "#1F1F1F", start: "42.71%" },
    { color: "#0A0A0A", start: "88.54%" },
  ],
  purple: [
    { color: "#342456", start: "0%" },
    { color: "#2B1E48", start: "22.92%" },
    { color: "#22183A", start: "42.71%" },
    { color: "#110C1D", start: "88.54%" },
  ],
  green: [
    { color: "#116A67", start: "0%" },
    { color: "#0E5856", start: "22.92%" },
    { color: "#0B4745", start: "42.71%" },
    { color: "#062726", start: "88.54%" },
  ],
  skyblue: [
    { color: "#70D9FF", start: "0%" },
    { color: "#5CD3FF", start: "22.92%" },
    { color: "#47CEFF", start: "42.71%" },
    { color: "#0096CC", start: "88.54%" },
  ],
  red: [
    { color: "#931020", start: "0%" },
    { color: "#810E1C", start: "22.92%" },
    { color: "#6E0C18", start: "42.71%" },
    { color: "#37060C", start: "88.54%" },
  ],
  orange: [
    { color: "#B04007", start: "0%" },
    { color: "#893206", start: "22.92%" },
    { color: "#622304", start: "42.71%" },
    { color: "#3B1502", start: "88.54%" },
  ],
}
const GRADIENT_SIZES = {
  default: { width: "70%", height: "55%" },
  sm: { width: "50%", height: "35%" },
  lg: { width: "85%", height: "70%" },
}
const GRADIENT_POSITIONS = {
  top: { x: "50%", y: "-10%" },
  center: { x: "50%", y: "50%" },
  bottom: { x: "50%", y: "110%" },
  left: { x: "-10%", y: "0%" },
  right: { x: "110%", y: "0%" },
}
const TRANSITION_CONFIG = { ease: [0.25, 0.1, 0.25, 1], duration: 0.5 }

const heroVariants = cva("relative min-h-svh w-full overflow-hidden", {
  variants: {
    layout: {
      default: "flex flex-col  text-center justify-center text-center ",
      colLeft: "flex flex-col justify-center items-start",
    },
  },
  defaultVariants: {
    layout: "default",
  },
})
export function Hero({ children, className, layout, ...props }: HeroProps) {
  return (
    <section className={cn(heroVariants({ layout }), className)} {...props}>
      {children}
    </section>
  )
}
Hero.displayName = "Hero"

export function BgGradient({
  gradientSize = GRADIENT_SIZES["default"],
  gradientPosition = GRADIENT_POSITIONS["top"],
  gradientColors = GRADIENT_COLORS["purple"],
  className,
  ...props
}: BgGradientProps) {
  const gradientString = Array.isArray(gradientColors)
    ? gradientColors.map(({ color, start }) => `${color} ${start}`).join(", ")
    : GRADIENT_COLORS[gradientColors]
        .map(({ color, start }) => `${color} ${start}`)
        .join(", ")

  const gradientStyle = `radial-gradient(${
    typeof gradientSize === "string"
      ? `${GRADIENT_SIZES[gradientSize].width} ${GRADIENT_SIZES[gradientSize].height}`
      : `${gradientSize.width} ${gradientSize.height}`
  } at ${
    typeof gradientPosition === "string"
      ? `${GRADIENT_POSITIONS[gradientPosition].x} ${GRADIENT_POSITIONS[gradientPosition].y}`
      : `${gradientPosition.x} ${gradientPosition.y}`
  }, ${gradientString})`

  const dominantColor = Array.isArray(gradientColors)
    ? gradientColors[gradientColors.length - 1].color
    : GRADIENT_COLORS[gradientColors][
        GRADIENT_COLORS[gradientColors].length - 1
      ].color
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 size-full select-none",
        className
      )}
      style={{
        background: dominantColor,
        backgroundImage: gradientStyle,
        ...props.style,
      }}
      {...props}
    />
  )
}

function Word({
  word,
  transition = TRANSITION_CONFIG,
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
TextStagger.displayName = "TextStagger"

export const AnimatedContainer = React.forwardRef<
  HTMLParagraphElement,
  AnimatedContainerProps
>(({ children, className, transformDirection = "bottom", ...props }, ref) => {
  return (
    <motion.div
      className={cn("relative z-10", className)}
      ref={ref}
      variants={transformVariants(transformDirection)}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, ...props.viewport }}
      transition={{
        duration: props.transition?.delay ?? 0.4,
        ease: props.transition?.delay ?? "easeIn",
        delay: props.transition?.delay ?? 0.4,
        ...props.transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
})
AnimatedContainer.displayName = "AnimatedContainer"
