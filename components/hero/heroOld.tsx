"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { motion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

const heroContainerVariants = cva(
  "sticky top-0 z-0 grid h-screen overflow-hidden p-4",
  {
    variants: {
      variant: {
        // 5items
        default: "grid grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]",
        // 3items
        threeCells: "grid grid-cols-2 grid-rows-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const HeroContainer = () => {}

const HeroImages = () => {
  return <div>hero images</div>
}
const HeroText = () => {
  return <div>hero text </div>
}
const Hero = () => {
  // image init style: translateX(-35%) translateY(-35%) scale(0.5) translateZ(0px)
  // image anim style: translateX(0%) translateY(0%) scale(1) translateZ(0px);

  // text init style: style="opacity: 1; transform: translateY(0%) scale(1) translateZ(0px);"
  // text anim style: style="opacity: 0; transform: translateY(7.5%) scale(0.5) translateZ(0px);"
  const scrollRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })
  const translate = useTransform(scrollYProgress, [0.1, 0.9], ["-35%", "0%"])
  const scale = useTransform(scrollYProgress, [0, 0.9], [0.5, 1])

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "7.5%"])
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, -500])
  return (
    <section ref={scrollRef} className="h-[350vh] bg-white">
      <div
        // className="sticky top-0 z-0 grid h-screen grid-cols-3 grid-rows-3 gap-4 overflow-hidden p-4"
        className={cn(
          "sticky left-0 top-0 grid h-screen",
          "grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]",
          "gap-4 overflow-hidden p-4",
          "[&>.cell:first-child]:col-span-6", // Changed from nth-child(1)
          "[&>.cell:first-child]:row-span-2"
        )}
        style={{ perspective: "1000px" }}
      >
        {/* text */}
        <motion.div
          style={{
            opacity,
            y,
            z: scale2,
          }}
          className="absolute z-20 flex h-screen w-full flex-col items-center justify-center px-8"

          // style="opacity: 0.949437; transform: translateY(0.37923%) scale(0.974718) translateZ(0px);"
        >
          <h1 className="max-w-xl text-center text-5xl font-bold text-stone-950 md:text-7xl">
            Photo gallery for artists
          </h1>
          <p className="my-6 max-w-xl text-center text-sm text-stone-600 md:text-base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, minus
            nisi? Quod praesentium quaerat possimus.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-violet-600 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-600">
              Try for free
            </button>
            <button className="bg-transparent px-4 py-2 font-medium text-stone-950 transition-colors hover:bg-stone-200">
              Learn about us
            </button>
          </div>
        </motion.div>

        {/* images */}
        <motion.div
          // style={{
          //   translate,
          //   scale,
          // }}
          // className="relative z-10 col-span-6 row-span-3 origin-top-right bg-blue-400"
          className="cell relative z-10 origin-top-right bg-blue-400"

          // style='background-image: url("/imgs/grid-hero/1.jpg"); background-size: cover; background-position: center center; transform: translateX(-33.6727%) translateY(-33.6727%) scale(0.518961) translateZ(0px);'
        ></motion.div>
        <motion.div
          // style={{
          //   translate,
          //   scale,
          // }}
          // className="relative z-10 col-span-2 row-span-2 bg-red-400"
          className="cellrelative z-10  bg-red-400"

          // style='background-image: url("/imgs/grid-hero/2.jpg"); background-size: cover; background-position: center center; transform: translateX(28.8623%) translateY(-28.8623%) scale(0.518961) translateZ(0px);'
        ></motion.div>
        <motion.div
          // style={{
          //   translate,
          //   scale,
          // }}
          // className="relative z-10 col-span-2 row-span-2 origin-right bg-emerald-400"
          className="cellrelative z-10 origin-right bg-emerald-400"

          // style='background-image: url("/imgs/grid-hero/3.jpg"); background-size: cover; background-position: center center; transform: translateX(-24.0519%) translateY(24.0519%) scale(0.518961) translateZ(0px);'
        ></motion.div>
        <motion.div
          // style={{
          //   translate,
          //   scale,
          // }}
          // className="relative z-10 col-span-3 origin-right bg-violet-400"
          className="cellrelative z-10 origin-right bg-violet-400"

          // style='background-image: url("/imgs/grid-hero/4.jpg"); background-size: cover; background-position: center center; transform: translateX(24.0519%) translateY(-139.501%) scale(0.518961) translateZ(0px);'
        ></motion.div>
        <motion.div
          // style={{
          //   translate,
          //   scale,
          // }}
          // className="relative z-10 col-span-3 origin-top bg-yellow-400"
          className="cellrelative z-10  origin-top bg-yellow-400"

          // style='background-image: url("/imgs/grid-hero/5.jpg"); background-size: cover; background-position: center center; transform: translateX(-24.0519%) translateY(24.0519%) scale(0.518961) translateZ(0px);'
        ></motion.div>
        {/* <div
          className="relative z-10 bg-teal-400"
          // style='background-image: url("/imgs/grid-hero/6.jpg"); background-size: cover; background-position: center center; transform: translateX(24.0519%) translateY(24.0519%) scale(0.518961) translateZ(0px);'
        ></div> */}
        {/* <div className="absolute left-0 top-0 z-0 aspect-square w-3/5 min-w-[400px] max-w-[850px] -translate-x-[50%] -translate-y-[50%] rounded-full border-8 border-slate-200"></div>
        <div className="absolute bottom-0 right-0 z-0 aspect-square w-1/2 min-w-[300px] max-w-[600px] translate-x-[50%] translate-y-[50%] rounded-full border-8 border-slate-200"></div> */}
      </div>
    </section>
  )
}

export { Hero }
