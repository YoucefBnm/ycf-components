"use client"

import * as React from "react"
import { HTMLMotionProps, Variants, motion } from "motion/react"

import { SPRING_TRANSITION_CONFIG } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface GalleryGridCellProps extends HTMLMotionProps<"div"> {
  index: number
}
const filterVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
  },
}
const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3", // .div1
  "col-start-1 col-end-2 row-start-2 row-end-4", // .div2
  "col-start-1 col-end-2 row-start-4 row-end-6", // .div3
  "col-start-2 col-end-3 row-start-3 row-end-5", // .div4
]

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      transition={{
        staggerChildren: transition?.staggerChildren ?? 0.2,
        delayChildren: transition?.delayChildren ?? 0.2,
        duration: 0.3,
        ...transition,
      }}
      {...props}
    />
  )
})
ContainerStagger.displayName = "ContainerStagger"

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={filterVariants}
      transition={{
        ...SPRING_TRANSITION_CONFIG,
        duration: 0.3,
        ...transition,
      }}
      {...props}
    />
  )
})
ContainerAnimated.displayName = "ContainerAnimated"

export const GalleryGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4",
        className
      )}
      {...props}
    />
  )
})
GalleryGrid.displayName = "ContainerSticky"

export const GalleryGridCell = React.forwardRef<
  HTMLDivElement,
  GalleryGridCellProps
>(({ className, transition, index, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.2,
        delayChildren: transition?.delayChildren ?? 0.2,
      }}
      className={`relative overflow-hidden rounded-xl shadow-xl ${areaClasses[index]}`}
      {...props}
    />
  )
})
GalleryGridCell.displayName = "GalleryGridCell"
