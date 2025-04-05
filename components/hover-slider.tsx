"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface HoverSliderProps {
  slides: Slide[]
  activeImage: number
  handleMouseEnter: (index: number) => void
}

type SliderImagesProps = Pick<HoverSliderProps, "slides" | "activeImage"> & {
  className?: string
}

function HoverSliderImages({
  slides,
  activeImage,
  className,
}: SliderImagesProps) {
  return (
    <div
      className={cn(
        "relative before:block before:w-full before:pt-[125%] before:content-['']",
        className
      )}
    ></div>
  )
}

type Slide = {
  id: string
  image: string
  title: string
  route: string
}
export function HoverSlider() {
  return <div>hover slider</div>
}
