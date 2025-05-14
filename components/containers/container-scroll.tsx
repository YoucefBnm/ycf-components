"use client"

import * as React from "react"
import { MotionValue, useScroll } from "motion/react"

import { cn } from "@/lib/utils"

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}
const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

export function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (context === undefined) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScrollProvider"
    )
  }
  return context
}

interface ContainerScrollProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const ContainerScroll = ({
  children,
  className,
  style,
  ...props
}: ContainerScrollProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative w-full", className)}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

ContainerScroll.displayName = "ContainerScroll"
