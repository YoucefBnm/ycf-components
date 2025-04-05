"use client"

import * as React from "react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { FlipCard, FlipCardBack, FlipCardFront } from "@/components/flip-card"
import {
  Hero,
  HeroDescription,
  HeroHeading,
  HeroVideo,
} from "@/components/hero"
import { Menu, MenuButton, MenuList } from "@/components/menu"
import { ScrollRevealText } from "@/components/scroll-reveal-text"

const PRODUCT = {
  id: "product-1",
  colors: ["rgb(147, 171, 193)", "rgb(187, 203, 195)", "rgb(222, 156, 94)"],
  images: [
    {
      id: "product-1-color-1",
      color: "rgb(187, 195, 203)",
      images: [
        "https://m.media-amazon.com/images/I/51o1onb4djL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51M6NgQBmhL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/513u06YgdUL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61Iiz3mNZML._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71ZUDauanRL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51NmoERaG1L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51tL3GKKEVL._AC_SY695_.jpg",
      ],
    },
    {
      id: "product-1-color-2",
      color: "rgb(187, 203, 195)",
      images: [
        "https://m.media-amazon.com/images/I/51bfzTuf2cL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51Xm87WBX1L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51OeG91-ThL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61uea5RnOFL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61LDgzNp5mL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51Cbm0TzXXL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51cZe0QGFpL._AC_SY695_.jpg",
      ],
    },
    {
      id: "product-1-color-3",
      color: "rgb(222, 156, 94)",
      images: [
        "https://m.media-amazon.com/images/I/61++XRhgaTL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51WRTVpnh0L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51N6X-0wRGL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61U2ujR0DNL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/712BDuOS69L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51viiVQvWlL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51Nk-eLMYuL._AC_SY695_.jpg",
      ],
    },
  ],
}

export default function IndexPage() {
  const [isMouseIn, setIsMouseIn] = React.useState(false)

  return (
    <main className="container py-12">
      <div className="flex flex-wrap justify-center gap-4">
        <FlipCard className="h-96 w-2/6">
          <FlipCardFront className="rounded-xl">
            <img
              width={1015}
              height={678}
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="nike air jordan"
              className="size-full object-cover"
            />
          </FlipCardFront>
          <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-rose-600 px-4 py-6 text-center text-white">
            <h2 className="text-xl font-bold">Nike Air Jordan</h2>
            <h4 className="mb-4">€ 1,299.00</h4>
            <Button className="rounded-full">Add to cart</Button>
          </FlipCardBack>
        </FlipCard>

        <FlipCard flipDirection="vertical" className="h-96 w-2/6">
          <FlipCardFront className="rounded-xl">
            <img
              width={542}
              height={678}
              src="https://images.unsplash.com/photo-1617814121568-9b184eaabf08?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="nike air jordan"
              className="size-full object-cover"
            />
          </FlipCardFront>
          <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-emerald-500 px-4 py-6 text-center text-white">
            <h2 className="text-xl font-bold">Nike Air Jordan</h2>
            <h4 className="mb-4">€ 1,299.00</h4>
            <Button className="rounded-full">Add to cart</Button>
          </FlipCardBack>
        </FlipCard>
      </div>
      <div
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className="relative h-96 w-2/6 overflow-visible"
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
      >
        {/* font */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transition: "0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
            // init: rotateY(0deg) translateZ(0px)
            // hover: rotateY(-180deg)
            rotateX: isMouseIn ? -180 : 0,
          }}
          className="absolute inset-0 z-10 block size-full overflow-hidden rounded-xl bg-lime-400"
        >
          front
        </motion.div>

        {/* back */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            backgroundColor: "rgb(214, 163, 54)",
            transition: " 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",

            // hidden: transform: rotateY(180deg);
            // visible:
            rotateX: isMouseIn ? 0 : 180,
            translateZ: isMouseIn ? 1 : 0,
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            padding: "40px",
            zIndex: "2",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className=""
            style={{
              transform: "translateY(-50%) translateZ(60px) scale(0.9)",
              perspective: "inherit",
            }}
          >
            <div
              style={{
                background: "rgb(255, 255, 255)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              back
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
