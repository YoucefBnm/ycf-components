"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

const customCursorSpringConfig = {
  damping: 25,
  stiffness: 250,
  mass: 1,
  restSpeed: 0.01,
  restDelta: 0.01,
  duration: 0.4,
}
function useFollowMouse() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const cursorXSpring = useSpring(cursorX, customCursorSpringConfig)
  const cursroYSpring = useSpring(cursorY, customCursorSpringConfig)

  React.useEffect(() => {
    const followMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }
    window.addEventListener("mousemove", followMouse)

    return () => {
      window.removeEventListener("mousemove", followMouse)
    }
  }, [])

  return {
    cursorXSpring,
    cursroYSpring,
  }
}

const customCursorVariants = {
  default: {
    scale: 1,
  },
  sm: {
    scale: 0.4,
  },
}

export function useSetCursorVariant() {
  const [cursorVariant, setCursorVariant] =
    React.useState<keyof typeof customCursorVariants>("default")
  const [cursorText, setCursorText] = React.useState<string>("")

  return {
    cursorVariant,
    setCursorVariant,
    cursorText,
    setCursorText,
  }
}

interface CustomCursorProps {
  variant?: keyof typeof customCursorVariants
  text?: string
  className?: string
}
export function CustomCursor({
  variant = "default",
  text = "",
  className,
}: CustomCursorProps) {
  const { cursorXSpring, cursroYSpring } = useFollowMouse()

  const isTextNotEmpty = text !== ""
  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 flex aspect-square min-h-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-center text-xs mix-blend-difference",
        className
      )}
      variants={customCursorVariants}
      animate={variant}
      style={{
        y: cursroYSpring,
        x: cursorXSpring,
      }}
    >
      <AnimatePresence>
        {isTextNotEmpty && (
          <motion.span
            className="inline-block"
            transition={{ duration: 0.3, ease: "easeIn" }}
            animate={isTextNotEmpty ? { y: "0%" } : { y: "100%" }}
            exit={{ y: "100%" }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
