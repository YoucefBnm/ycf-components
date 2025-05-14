"use client"

import * as React from "react"
import { ChevronRight, Star } from "lucide-react"

import { gradientStyle } from "@/lib/gradients"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ContainerAnimated } from "@/components/containers/container-animated"
import MotionIcon from "@/components/icons/motion-icon"
import NextIcon from "@/components/icons/next-icon"
import ReactIcon from "@/components/icons/react-icon"
import ShadcnIcon from "@/components/icons/shadcn-icon"
import TailwindIcon from "@/components/icons/tailwind-icon"
import TypescriptIcon from "@/components/icons/typescript-icon"
import { TextStagger } from "@/components/text-stagger"

const STACK = [
  {
    id: "stack-1",
    label: "next js",
    icon: NextIcon,
  },
  {
    id: "stack-2",
    label: "react",
    icon: ReactIcon,
  },
  {
    id: "stack-6",
    label: "typescript",
    icon: TypescriptIcon,
  },
  {
    id: "stack-3",
    label: "shadcn",
    icon: ShadcnIcon,
  },
  {
    id: "stack-4",
    label: "tailwind css",
    icon: TailwindIcon,
  },
  {
    id: "stack-5",
    label: "motion",
    icon: MotionIcon,
  },
]

const Hero = () => {
  const { gradientBg, dominantColor } = gradientStyle({
    gradientPosition: "center",
    gradientSize: { width: "40%", height: "40%" },
  })

  return (
    <section
      className="relative min-h-screen max-w-7xl place-content-center px-6 py-12 text-stone-200 "
      style={{
        background: dominantColor,
        backgroundImage: gradientBg,
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <TextStagger
          text={"Build blazing and fast interfaces"}
          as="h1"
          stagger={0.02}
          className="text-5xl font-medium tracking-tighter  md:text-6xl"
        />

        <ContainerAnimated className="my-4" animation="blur">
          <p className="max-w-prose text-muted/90">
            Open source library for Collection of UI components, layouts,
            blocks, hooks, uitilites ready to use with React and Next.js.
          </p>
        </ContainerAnimated>
        <ContainerAnimated
          className="flex flex-wrap items-center justify-center gap-4"
          animation="blur"
          transition={{ delay: 0.2 }}
        >
          <Button
            size={"lg"}
            className="gap-2 rounded-full bg-blue-500  hover:bg-blue-400"
          >
            Browse Components <ChevronRight className="size-4" />
          </Button>
          <Button
            size={"lg"}
            variant={"outline"}
            className="gap-2 rounded-full  hover:border-blue-400 hover:bg-blue-400"
          >
            <Star className="size-4" /> Star on Github
          </Button>
        </ContainerAnimated>

        <ContainerAnimated
          className="my-4 flex items-center gap-2"
          animation="blur"
          transition={{ delay: 0.4 }}
        >
          {STACK.map((stack) => (
            <TooltipProvider key={stack.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <stack.icon className="size-8 text-white" />
                </TooltipTrigger>
                <TooltipContent className="border-blue-950/80 bg-blue-950/80 text-current">
                  <p>{stack.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ContainerAnimated>
      </div>
    </section>
  )
}

export { Hero }
