import { gradientStyle } from "@/lib/gradients"

import { CardsStack } from "./cards-stack"
import { ContainerAnimated } from "./containers/container-animated"
import { TextStagger } from "./text-stagger"

export const Features = () => {
  const { gradientBg, dominantColor } = gradientStyle({
    gradientColors: [
      { color: "#FFE4E8", start: "0%" },
      { color: "#FFF1F2", start: "45%" }, // Subtle pink
      { color: "#FFE4E6", start: "85%" }, // Light rose
      { color: "#FFFFFF", start: "100%" }, // Soft rose
    ],
    gradientPosition: "right", // Position at right
    gradientSize: "sm",
  })
  return (
    <section
      style={
        {
          // background: dominantColor,
          // backgroundImage: gradientBg,
        }
      }
      className="px-6 py-12"
    >
      <div className="container grid md:grid-cols-2  md:justify-between md:gap-8 xl:gap-12">
        <div className="left-0 space-y-4 md:sticky md:top-8 md:h-svh">
          <TextStagger
            text="Ready to Use Animated Components"
            as="h2"
            className="text-4xl font-semibold tracking-tighter"
            animation="blur"
          />
          <ContainerAnimated>
            <p className="max-w-prose">
              Skip boilerplate and configuration —each component comes with
              built‑in Framer Motion animations, so your UI feels alive from day
              one.
            </p>
          </ContainerAnimated>
        </div>
        <CardsStack />
      </div>
    </section>
  )
}
