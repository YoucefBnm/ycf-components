"use client"

import * as React from "react"
import Image from "next/image"

interface StoryCarouselProps {
  images: string[]
  duration?: number // duration per image in ms
}

export const StoryCarouselGpt: React.FC<StoryCarouselProps> = ({
  images,
  duration = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isEnded, setIsEnded] = React.useState(false)
  const progressRef = React.useRef<number>(0)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset progress when slide changes
  React.useEffect(() => {
    progressRef.current = 0
    setProgress(0)
  }, [currentIndex, duration, images.length])

  // Manage the interval for progress & slide change
  React.useEffect(() => {
    if (images.length === 0 || isPaused) return

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    const tick = 50 // ms per tick
    const totalTicks = duration / tick

    intervalRef.current = setInterval(() => {
      progressRef.current += 1
      const newProgress = (progressRef.current / totalTicks) * 100
      setProgress(newProgress)

      if (progressRef.current >= totalTicks) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null

        if (currentIndex < images.length - 1) {
          setCurrentIndex((idx) => idx + 1)
        } else {
          // reached end
          setIsPaused(true)
          setIsEnded(true)
        }
      }
    }, tick)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPaused, currentIndex, duration, images.length])

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500">No stories to display</div>
    )
  }

  const handleControl = () => {
    if (isEnded) {
      // restart from beginning
      setCurrentIndex(0)
      setIsEnded(false)
      setIsPaused(false)
    } else {
      setIsPaused((prev) => !prev)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Progress indicators */}
      <div className="mb-2 flex space-x-1">
        {images.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 rounded bg-gray-300">
            <div
              className={`h-full ${
                idx < currentIndex ||
                (idx === currentIndex && (isPaused || isEnded))
                  ? "bg-blue-500"
                  : idx === currentIndex
                  ? "bg-blue-500"
                  : "bg-transparent"
              } rounded`}
              style={{
                width:
                  idx === currentIndex
                    ? `${progress}%`
                    : idx < currentIndex
                    ? "100%"
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Image display */}
      <div className="relative mb-2 h-64 w-full overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`story-${currentIndex}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        <button
          onClick={handleControl}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          {/* {isPaused || isEnded ? "Play" : "Pause"} */}
          {isPaused ? (isEnded ? "Restart" : "Play") : "Pause"}
        </button>
      </div>
    </div>
  )
}
