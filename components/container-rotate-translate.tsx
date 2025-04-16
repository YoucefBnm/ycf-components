"use client"

import * as React from "react"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

const BRANDING_IMAGES = [
  "https://images.unsplash.com/photo-1654481412923-13f029904661?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1654309184038-f9b689cfbdcb?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1654481414716-2f4ab5fe0fbe?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1654892968823-ea564870a96f?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]
const DESIGN_IMAGES = [
  "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVzaWdufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const CODING_IMAGES = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
]

export interface HeroRotationContainerProps extends HTMLMotionProps<"div"> {
  className?: string
}
export interface GalleryProps extends HTMLMotionProps<"div"> {
  progress: MotionValue<number>
  className?: string
}
export interface GalleryColProps extends HTMLMotionProps<"div"> {
  progress: MotionValue<number>
  imagesUrls: string[]
  order: number
  className?: string
}
export interface GalleryColProps extends HTMLMotionProps<"div"> {
  progress: MotionValue<number>
  imagesUrls: string[]
  order: number
  className?: string
}
export function GalleryCol({
  progress,
  order,
  imagesUrls,
  className,
  ...props
}: GalleryColProps) {
  const yPair = useTransform(progress, [0.5, 0.9], ["-20%", "20%"])
  const yOdd = useTransform(progress, [0.5, 0.9], ["0%", "-10%"])

  const y = order % 2 === 0 ? yPair : yOdd

  return (
    <motion.div
      style={{ y }}
      className=" relative col-span-1 flex size-full flex-col gap-y-2"
      {...props}
    >
      {imagesUrls.map((imageUrl, index) => (
        <img
          className="block aspect-video size-full rounded-md object-cover shadow-md"
          src={imageUrl}
          key={index}
        />
      ))}
    </motion.div>
  )
}
GalleryCol.displayName = "GalleryCol"
export function Gallery({ progress, className, ...props }: GalleryProps) {
  const scale = useTransform(progress, [0.5, 0.9], [1.2, 1])
  const y = useTransform(progress, [0.5, 1], [0, 170])
  return (
    <motion.div
      className={cn(
        "relative grid h-[60svh] w-full grid-cols-3 gap-2 overflow-hidden  bg-white lg:h-[120svh] 2xl:h-[150svh]",
        className
      )}
      style={{
        scale,
        y,
        ...props.style,
      }}
      {...props}
    />
  )
}
GalleryCol.displayName = "Gallery"
export function RotationContainer({
  children,
  className,
  ...props
}: HeroRotationContainerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })
  const clipPathX = useTransform(scrollYProgress, [0.5, 0.9], [48, 0])
  const clipPath = useMotionTemplate`inset(0px ${clipPathX}px)`
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [50, 0])
  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={scrollRef}
        className={cn("h-[55rem] w-full bg-blue-500", className)}
        style={{
          clipPath,
          rotateX,
          ...props.style,
        }}
        {...props}
      >
        <Gallery progress={scrollYProgress} className="size-full">
          <GalleryCol
            progress={scrollYProgress}
            imagesUrls={BRANDING_IMAGES}
            order={1}
          />
          <GalleryCol
            progress={scrollYProgress}
            imagesUrls={DESIGN_IMAGES}
            order={2}
          />
          <GalleryCol
            progress={scrollYProgress}
            imagesUrls={CODING_IMAGES}
            order={3}
          />
        </Gallery>
      </motion.div>
    </div>
  )
}
RotationContainer.displayName = "RotationContainer"
