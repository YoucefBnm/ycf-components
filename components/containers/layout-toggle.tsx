"use client"

import * as React from "react"
import { HTMLMotionProps, LayoutGroup, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

const LAYOUT_CONFIGS = [
  { mode: "list", className: "flex flex-col space-y-4", label: "list view" },
  { mode: "2col", className: "grid grid-cols-2 gap-4", label: "2 column view" },
  {
    mode: "4col",
    className: "grid grid-cols-2 md:grid-cols-4 gap-4",
    label: "4 column view",
  },
]
const ANIMATION_VARIANTS = {
  container: {
    list: { transition: { staggerChildren: 0.02 } },
    "2col": { transition: { staggerChildren: 0.1 } },
    "4col": { transition: { staggerChildren: 0.15 } },
  },
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" },
  },
}

interface LayoutButtonProps {
  isSelected: boolean
  onClick: () => void
  isMiddle: boolean
  label: string
}

const LayoutButton = ({
  isSelected,
  onClick,
  isMiddle,
  label,
}: LayoutButtonProps) => (
  <div className="relative">
    {isSelected && (
      <motion.div
        className="rounded-inherit absolute inset-0 bg-gray-900"
        layoutId="layout-toggle-buttons"
      />
    )}
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn(
        "h- relative rounded-none bg-transparent text-xs hover:bg-slate-900/20 hover:text-white",
        isMiddle && "border-x border-current",
        label === "4 column view"
          ? "cursor-not-allowed opacity-50 md:cursor-pointer md:opacity-100"
          : "",
        isSelected ? "text-white" : "text-inherit"
      )}
    >
      {label}
    </Button>
  </div>
)

export const ContainerToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [modeIndex, setModeIndex] = React.useState(2)
  const currentConfig = LAYOUT_CONFIGS[modeIndex]
  return (
    <div ref={ref} {...props}>
      <div className="mb-6 flex w-fit rounded-sm border border-current">
        {LAYOUT_CONFIGS.map((config, idx) => (
          <LayoutButton
            key={config.mode}
            isSelected={modeIndex === idx}
            onClick={() => setModeIndex(idx)}
            isMiddle={idx > 0 && idx < LAYOUT_CONFIGS.length - 1}
            label={config.label}
          />
        ))}
      </div>
      <LayoutGroup>
        <motion.div
          layout
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate={currentConfig.mode}
          className={currentConfig.className}
        >
          {children}
        </motion.div>
      </LayoutGroup>
    </div>
  )
})
ContainerToggle.displayName = "ContainerToggle"

export const CellToggle = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <motion.div
      layout
      variants={ANIMATION_VARIANTS.card}
      initial="hidden"
      animate="visible"
      whileHover={"hover"}
      className={className}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      exit="hidden"
      ref={ref}
      {...props}
    />
  )
})
CellToggle.displayName = "CellToggle"
