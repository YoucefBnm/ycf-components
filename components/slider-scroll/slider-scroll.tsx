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

import { animationRange } from "@/lib/animation-range"
import { cn } from "@/lib/utils"

interface SliderScrollProps {
  itemsLength: number
}
interface SliderScrollContextValue {
  scrollYProgress: MotionValue<number>
  itemsLength: number
}
const SliderScrollContext = React.createContext<
  SliderScrollContextValue | undefined
>(undefined)
function useSliderScrollContext() {
  const context = React.useContext(SliderScrollContext)
  if (!context) {
    throw new Error(
      "useSliderScrollContext must be used within a SliderScrollProvider"
    )
  }
  return context
}
export const ContainerScroll: React.FC<
  SliderScrollProps & React.HTMLAttributes<HTMLDivElement>
> = ({ itemsLength, children, className, style }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })

  return (
    <SliderScrollContext.Provider value={{ scrollYProgress, itemsLength }}>
      <div
        ref={scrollRef}
        style={{ height: `${itemsLength + 4}00vh`, ...style }}
        className={cn("relative w-full", className)}
      >
        {children}
      </div>
    </SliderScrollContext.Provider>
  )
}
ContainerScroll.displayName = "ContainerScroll"

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sticky inset-0 h-svh w-full", className)}
    {...props}
  />
))
ContainerSticky.displayName = "ContainerSticky"

interface SliderScrollSlideProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  index: number
}
export const SliderScrollSlide = React.forwardRef<
  HTMLImageElement,
  SliderScrollSlideProps
>(({ index, className, style, ...props }, ref) => {
  const { scrollYProgress, itemsLength } = useSliderScrollContext()
  const range = animationRange(index, itemsLength)

  const clipPathAnimated = useTransform(scrollYProgress, range, [100, 0])
  const clipPath = useMotionTemplate`polygon(0 100%, 100% 100%, 100% ${clipPathAnimated}%, 0 ${clipPathAnimated}%)`

  return (
    <motion.div
      className={className}
      style={{ clipPath, ...style }}
      ref={ref}
      {...props}
    />
  )
})
SliderScrollSlide.displayName = "SliderScrollSlide"

interface SliderImageProps extends Omit<HTMLMotionProps<"img">, "ref"> {
  imageUrl: string
  index: number
}
export const SliderImage = React.forwardRef<HTMLImageElement, SliderImageProps>(
  ({ imageUrl, index, children, className, style, ...props }, ref) => {
    const { scrollYProgress, itemsLength } = useSliderScrollContext()
    const range = animationRange(index, itemsLength)
    const clipPathAnimated = useTransform(scrollYProgress, range, [100, 0])
    const clipPath = useMotionTemplate`polygon(0 100%, 100% 100%, 100% ${clipPathAnimated}%, 0 ${clipPathAnimated}%)`

    // const rotate = useTransform(progress, range, [-45, 0]);
    // const scale = useTransform(progress, range, [1.2, 1]);

    const notFirst = index > 0
    return (
      <motion.div
        className={cn("absolute inset-0 size-full overflow-hidden", className)}
        style={
          notFirst ? { clipPath, ...style } : { clipPath: "none", ...style }
        }
        ref={ref}
        {...props}
      >
        <motion.img
          className={className}
          loading="eager"
          decoding="async"
          style={{}}
          src={imageUrl}
          {...props}
        />
      </motion.div>
    )
  }
)
SliderImage.displayName = "SliderImage"

interface SliderTitleProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  index: number
}
export const SliderTitle = React.forwardRef<HTMLImageElement, SliderTitleProps>(
  ({ index, className, style, ...props }, ref) => {
    const { scrollYProgress, itemsLength } = useSliderScrollContext()
    const range = animationRange(index, itemsLength)
    const notFirst = index > 0
    const y = useTransform(scrollYProgress, range, ["-100%", "0%"])

    return (
      <motion.div
        exit={{ y: "100%" }}
        ref={ref}
        style={notFirst ? { y } : { y: 0 }}
        className={cn(className, "uppercase")}
        {...props}
      />
    )
  }
)
SliderTitle.displayName = "SliderTitle"
