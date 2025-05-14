"use client"

import * as React from "react"

import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle,
} from "./process"

const PROCESS_PHASES = [
  {
    id: "process-1",
    title: "Research and Analysis",
    description:
      "With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences. This informed approach ensures your website stands out and provides an excellent user experience.",
  },
  {
    id: "process-2",
    title: "Wireframing and Prototyping",
    description:
      "We move on to Wireframing and Prototyping, where we create skeletal representations of your website's pages. These visual indigoprints allow us to test and refine the user experience before diving into design.",
  },
  {
    id: "process-3",
    title: "Design Creation",
    description:
      "Now, it's time for the Design Creation phase. Our talented designers bring your vision to life. We focus on aesthetics, ensuring your website not only looks stunning but also aligns perfectly with your brand identity.",
  },
  {
    id: "process-4",
    title: "Development and Testing",
    description:
      "In the Development and Testing phase, our skilled developers turn designs into a fully functional website. Rigorous testing ensures everything works seamlessly, providing an exceptional user experience.",
  },
]

export const ProcessDemoDark = () => {
  return (
    <ContainerScroll
      className="container px-6 py-12 h-[300vh]"
      style={{
        background:
          "radial-gradient(30% 80% at 0% 70%, #4338ca 0%, #3730a3 22.92%, #312e81 42.71%, #0f172a 88.54%)",
      }}
    >
      <div className="mb-8 space-y-4">
        <h2 className="bg-gradient-to-r from-indigo-200/60 via-indigo-50 to-indigo-200/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
          Planning your project
          <br /> development journey
        </h2>
        <p className="max-w-[52ch] text-sm text-slate-300">
          we blend creative design with cutting‑edge frontend development to
          build stunning, high‑performance websites that elevate your brand and
          captivate your audience.
        </p>
      </div>

      <ContainerSticky className=" top-16 flex flex-nowrap">
        {PROCESS_PHASES.map((phase, index) => (
          <ProcessCard
            key={phase.id}
            itemsLength={PROCESS_PHASES.length}
            index={index}
            className="min-w-[70%] max-w-[70%]"
          >
            <ProcessCardTitle className="border-r border-slate-700">
              <div className="rounded-full size-8 bg-indigo-700 text-sm flex justify-center items-center">
                {String(index + 1).padStart(2, "0")}
              </div>
            </ProcessCardTitle>
            <ProcessCardBody className="flex flex-col gap-10">
              <h3 className=" text-3xl font-semibold leading-tight">
                {phase.title}
              </h3>
              <p className=" opacity-80">{phase.description}</p>
            </ProcessCardBody>
          </ProcessCard>
        ))}
      </ContainerSticky>
    </ContainerScroll>
  )
}
