import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  MenuIcon,
  ShoppingCartIcon,
} from "lucide-react"

import { TOKYO_IMAGES } from "../heros/hero-gallery-scale/hero-gallery-scale-demo"
import {
  ContainerScroll,
  ContainerSticky,
  SliderImage,
  SliderScrollSlide,
  SliderTitle,
} from "./slider-scroll"

const IMAGES = [
  {
    id: "images-1",
    imageMdUrl:
      "https://images.unsplash.com/photo-1573455494057-12684d151bf4?q=80&w=2462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageXlUrl:
      "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]
export const SliderScrollDemo = () => {
  return (
    <div>
      <ContainerScroll itemsLength={TOKYO_IMAGES.length}>
        <ContainerSticky>
          <SliderScrollSlide
            className="absolute inset-0 size-full overflow-hidden"
            style={{
              perspective: "1000px",
            }}
            index={2}
          >
            {/* image wrap */}
            <div className="relative size-full place-content-center place-items-center">
              <SliderImage
                index={2}
                imageUrl={IMAGES[0].imageXlUrl}
                className="absolute inset-0 size-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70" />

              <SliderImage
                index={2}
                style={{ translateZ: 10 }}
                imageUrl={IMAGES[0].imageMdUrl}
                className="relative z-10 h-5/6 max-h-full w-auto border
              border-white/20 object-contain
              shadow-[0_0_25px_rgba(255,255,255,0.15)]
              backdrop-blur-[2px]"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden text-center text-5xl font-semibold tracking-tight text-primary-foreground mix-blend-difference">
              <SliderTitle index={2} className="">
                <h3>#the third 3 slide</h3>
              </SliderTitle>
            </div>
          </SliderScrollSlide>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
