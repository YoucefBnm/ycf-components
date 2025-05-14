import { AboutDemo } from "@/components/about/about-demo"
import { CalculatorDemo } from "@/components/calculator/calculator-demo"
import CardCurtainRevealDemo from "@/components/cards/card-curtain-reveal/card-curtain-reveal-demo"
import { CardFlipDemo } from "@/components/cards/card-filp/card-flip-demo"
import CardHoverRevealDemo from "@/components/cards/card-hover-reveal/card-hover-reveal-demo"
import { CardsFloatingDemo } from "@/components/cards/cards-floating/cards-floating-demo"
import { CardsStickyDemo } from "@/components/cards/cards-sticky/cards-sticky-demo"
import {
  CardsTransformedDemoDark,
  CardsTransformedDemoLight,
  CardsTransformedPokemon,
  CardsTransformedServices,
} from "@/components/cards/cards-transformed/cards-transformed-demo"
import { LayoutToggleDemo } from "@/components/containers/layout-toggle-demo"
import { Hero } from "@/components/heros/hero-bg-gradient/hero"
import { HeroGalleryRotateDemo } from "@/components/heros/hero-gallery-rotate/hero-gallery-rotate-demo"
import { HeroGalleryScaleDemo } from "@/components/heros/hero-gallery-scale/hero-gallery-scale-demo"
import { HeroVideoDemo } from "@/components/heros/hero-video/hero-video-demo"
import { MenuDemo } from "@/components/menu/menu-demo"
import { ProcessDemoDark } from "@/components/process/process-demo"
import { SliderScrollDemo } from "@/components/slider-scroll/slider-scroll-demo"
import { StoryDemo } from "@/components/story/story-demo"

export default function IndexPage() {
  return (
    <main>
      <LayoutToggleDemo />
      {/* <MenuDemo /> */}
      <HeroGalleryRotateDemo />

      {/* <SliderScrollDemo /> */}
      {/* <CalculatorDemo />
      <CardsFloatingDemo />

      <StoryDemo /> */}
      {/* heros */}
      {/*
      <HeroGalleryScaleDemo />
      <Hero />
      <HeroVideoDemo /> */}

      {/* sections */}
      {/* <ProcessDemoDark />
      <AboutDemo /> */}
      {/* cards */}
      {/* <CardsStickyDemo />
      <CardFlipDemo />
      <CardCurtainRevealDemo />
      <div className="h-svh place-content-center place-items-center">
        <CardHoverRevealDemo />
      </div>*/}
      {/* <CardsTransformedPokemon />
      <CardsTransformedServices />
      <CardsTransformedDemoLight />
      <CardsTransformedDemoDark /> */}
    </main>
  )
}
