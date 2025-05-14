"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  StoryCarousel,
  StoryCarouselControl,
  StoryCarouselProgress,
  StoryCarouselSlide,
  StoryOverlay,
  YouTubeStory,
} from "./story"

const SHADCN_STORIES = [
  {
    title: "just got 50 @shadcn stickers",
    caption: "who wants one 👀",
    imageUrl:
      "https://pbs.twimg.com/media/GqPQHK9bAAQKxPW?format=jpg&name=large",
    alt: "shadcn stickers image",
  },
  {
    title: "shadcn is the top comment here",
    caption:
      "Thank you. Here's why I call it a way to build your component library and NOT a component library.🙏",
    imageUrl:
      "https://pbs.twimg.com/media/GqPQHK4bAAA7M3o?format=jpg&name=large",
    alt: "shadcn top library image",
  },
]

export const ShadcnStoryDemo = () => (
  <Dialog>
    <DialogTrigger>
      <Avatar className="hover:mix-blend-difference">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DialogTrigger>
    <DialogContent className="aspect-[9/16] h-[90vh] max-w-[calc(100vh*0.5625)] overflow-hidden p-0">
      <DialogTitle className="sr-only">Story</DialogTitle>

      <StoryCarousel
        className="relative size-full "
        duration={5000}
        totalStories={SHADCN_STORIES.length}
      >
        <StoryOverlay />

        <DialogHeader className="px-4 py-6">
          <div className="relative z-10 flex items-center justify-between gap-2">
            <Avatar className="!size-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 space-x-1">
              {Array.from({ length: SHADCN_STORIES.length }).map((_, idx) => (
                <StoryCarouselProgress
                  className=" bg-white"
                  activeBg="bg-slate-800"
                  key={idx}
                  index={idx}
                />
              ))}
            </div>
            <StoryCarouselControl className=" text-white" />
          </div>
        </DialogHeader>
        {SHADCN_STORIES.map((story, idx) => (
          <StoryCarouselSlide
            key={idx}
            index={idx}
            className="absolute inset-0 size-full"
          >
            {/* Example with image */}
            <Image
              src={story.imageUrl}
              fill
              className="object-cover"
              alt={story.alt}
            />

            <div className="absolute bottom-4 left-4  z-10 space-y-1">
              <a href="https://x.com/shadcn" className="text-indigo-600">
                @shadcn
              </a>
              <h3 className="text-medium  tracking-tight text-slate-50">
                {story.title}
              </h3>
              <p className="text-sm text-slate-200">{story.caption}</p>
            </div>
          </StoryCarouselSlide>
        ))}
      </StoryCarousel>
    </DialogContent>
  </Dialog>
)

const YouTubeStoryDemo = () => {
  const [videoDuration, setVideoDuration] = React.useState(5000) // Default duration
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar>
          <AvatarImage
            src="https://pbs.twimg.com/profile_images/1920139232934555648/WPgPZf_m_400x400.jpg"
            alt="@shadcn"
          />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="aspect-[9/16] h-[90vh] max-w-[calc(100vh*0.5625)] overflow-hidden p-0">
        <DialogTitle className="sr-only">Story</DialogTitle>

        <StoryCarousel
          className="relative size-full"
          duration={videoDuration}
          totalStories={1}
        >
          <StoryOverlay />
          <DialogHeader className="px-4 py-6">
            <div className="relative z-10 flex items-center justify-between gap-2">
              <Avatar className="!size-8">
                <AvatarImage
                  src="https://pbs.twimg.com/profile_images/1920139232934555648/WPgPZf_m_400x400.jpg"
                  alt="@shadcn"
                />
                <AvatarFallback>F</AvatarFallback>
              </Avatar>

              <StoryCarouselProgress
                className="  bg-slate-50"
                activeBg="bg-slate-800"
                index={0}
              />
              <StoryCarouselControl className=" text-slate-50" />
            </div>
          </DialogHeader>

          <StoryCarouselSlide
            index={0}
            className="absolute inset-0 flex size-full items-center justify-center bg-black "
          >
            <YouTubeStory
              // videoId="NHodnYFUT_I"
              videoId="GpbygrQR2YM"
              onDurationReady={setVideoDuration}
            />
            <div className="absolute bottom-4 left-4  z-10 space-y-1">
              <a
                className="text-white"
                href="https://www.youtube.com/watch?v=GpbygrQR2YM"
              >
                @figma
              </a>
              <h3 className="text-medium  tracking-tight text-slate-200">
                All the launches at Config 2025 | Figma
              </h3>
              <p className="text-sm text-slate-200">
                Did you catch them all? Here’s everything we announced at
                <span className="text-indigo-600"> #Config2025</span>
              </p>
            </div>
          </StoryCarouselSlide>
        </StoryCarousel>
      </DialogContent>
    </Dialog>
  )
}

export const StoryDemo = () => {
  return (
    <div className="container flex h-svh items-center justify-center">
      <div className="flex items-center gap-4">
        <p className="text-slate-500">Discover latest stories</p>
        <ShadcnStoryDemo />
        <YouTubeStoryDemo />
      </div>
    </div>
  )
}

export default StoryDemo
