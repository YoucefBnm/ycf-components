"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CardHoverRevealContextValue {
  isHovered: boolean
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>
}
const CardHoverRevealContext = React.createContext<CardHoverRevealContextValue>(
  {} as CardHoverRevealContextValue
)
const useCardHoverRevealContext = () => {
  const context = React.useContext(CardHoverRevealContext)
  if (!context) {
    throw new Error(
      "useCardHoverRevealContext must be used within a CardHoverRevealProvider"
    )
  }
  return context
}
const CardHoverReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <CardHoverRevealContext.Provider
      value={{
        isHovered,
        setIsHovered,
      }}
    >
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    </CardHoverRevealContext.Provider>
  )
})
CardHoverReveal.displayName = "CardHoverReveal"

interface CardHoverRevealMainProps extends HTMLMotionProps<"div"> {
  initialScale?: number
  hoverScale?: number
}
const CardHoverRevealMain = React.forwardRef<
  HTMLDivElement,
  CardHoverRevealMainProps
>(({ className, initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext()
  return (
    <motion.div
      ref={ref}
      className={cn("size-full", className)}
      initial={{ scale: initialScale }}
      animate={{ scale: isHovered ? hoverScale : initialScale }}
      transition={props.transition || { duration: 0.3 }}
      {...props}
    />
  )
})
CardHoverRevealMain.displayName = "CardHoverRevealMain"

const CardHoverRevealContent = React.forwardRef<
  HTMLDivElement,
  CardHoverRevealMainProps
>(({ className, initialScale = 1, hoverScale = 1.05, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext()
  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-sm",
        className
      )}
      initial={{ opacity: 0, y: "140%" }}
      animate={isHovered ? { y: "0%", opacity: 1 } : { y: "140%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", ...props.transition }}
      {...props}
    />
  )
})
CardHoverRevealContent.displayName = "CardHoverRevealContent"

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent }
