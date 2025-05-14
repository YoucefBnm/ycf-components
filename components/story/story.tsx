"use client"

import * as React from "react"
import { PauseIcon, PlayIcon, RotateCcw, Volume2, VolumeX } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "../ui/button"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

// ----- Story Progress Hook (no YouTube logic here) -----
interface UseStoryProgressProps {
  totalStories: number
  duration: number
  tickInterval?: number
}
export function useStoryProgress({
  totalStories,
  duration,
  tickInterval = 50,
}: UseStoryProgressProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isEnded, setIsEnded] = React.useState(false)

  const progressRef = React.useRef(0)
  const intervalRef = React.useRef<NodeJS.Timer | null>(null)

  const resetProgress = React.useCallback(() => {
    progressRef.current = 0
    setProgress(0)
  }, [])

  React.useEffect(() => {
    resetProgress()
  }, [currentIndex, duration, resetProgress])

  React.useEffect(() => {
    if (totalStories === 0 || isPaused) return
    const totalTicks = duration / tickInterval
    const cleanup = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    cleanup()
    intervalRef.current = setInterval(() => {
      progressRef.current += 1
      setProgress((progressRef.current / totalTicks) * 100)
      if (progressRef.current >= totalTicks) {
        cleanup()
        if (currentIndex < totalStories - 1) {
          setCurrentIndex((i) => i + 1)
        } else {
          setIsPaused(true)
          setIsEnded(true)
        }
      }
    }, tickInterval)
    return cleanup
  }, [isPaused, currentIndex, duration, totalStories, tickInterval])

  const toggle = React.useCallback(() => {
    setIsPaused((p) => !p)
    if (isEnded) {
      setCurrentIndex(0)
      setIsEnded(false)
    }
  }, [isEnded])

  const pause = React.useCallback(() => setIsPaused(true), [])
  const play = React.useCallback(() => {
    if (isEnded) {
      setCurrentIndex(0)
      setIsEnded(false)
    }
    setIsPaused(false)
  }, [isEnded])

  const handleProgressClick = React.useCallback(
    (index: number) => {
      setCurrentIndex(index)
      setIsPaused(false)
      setIsEnded(false)
      resetProgress()
    },
    [resetProgress]
  )

  return {
    currentIndex,
    progress,
    isPaused,
    isEnded,
    toggle,
    pause,
    play,
    handleProgressClick,
  }
}

// ----- Carousel Components -----
interface StoryCarouselContextValue
  extends ReturnType<typeof useStoryProgress> {
  totalStories: number
  duration: number
}
const StoryCarouselContext =
  React.createContext<StoryCarouselContextValue | null>(null)
function useStoryCarouselContext() {
  const ctx = React.useContext(StoryCarouselContext)
  if (!ctx) throw new Error("Must be inside StoryCarouselProvider")
  return ctx
}

interface StoryCarouselProps {
  totalStories: number
  duration?: number
}
export const StoryCarousel: React.FC<
  StoryCarouselProps & React.HTMLAttributes<HTMLDivElement>
> = ({ totalStories, duration = 3000, children, className }) => {
  const progress = useStoryProgress({ totalStories, duration })
  return (
    <StoryCarouselContext.Provider
      value={{ ...progress, totalStories, duration }}
    >
      <div className={className}>{children}</div>
    </StoryCarouselContext.Provider>
  )
}

// Progress Bar
export const StoryCarouselProgress: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { index: number; activeBg?: string }
> = ({ index, activeBg = "bg-gray-800", className, ...props }) => {
  const { currentIndex, progress, handleProgressClick } =
    useStoryCarouselContext()
  let w = "0%"
  if (index < currentIndex) w = "100%"
  else if (index === currentIndex) w = `${progress}%`
  return (
    <div
      className={cn("h-1 flex-1 cursor-pointer rounded bg-gray-300", className)}
      onClick={() => handleProgressClick(index)}
      {...props}
    >
      <div
        className={cn("h-full rounded-[inherit]", activeBg)}
        style={{ width: w }}
      />
    </div>
  )
}

// Slide
export const StoryCarouselSlide: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { index: number }
> = ({ index, children, className, ...props }) => {
  const { currentIndex } = useStoryCarouselContext()
  if (index !== currentIndex) return null
  return (
    <div className={cn("animate-in fade-in", className)} {...props}>
      {children}
    </div>
  )
}

// Control Button
export const StoryCarouselControl = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, ...props }, ref) => {
  const { toggle, isPaused, isEnded } = useStoryCarouselContext()
  return (
    <Button
      className={cn("rounded-full", className)}
      ref={ref}
      onClick={toggle}
      size="icon"
      variant="ghost"
      {...props}
    >
      {isPaused ? (
        isEnded ? (
          <RotateCcw className="size-5" />
        ) : (
          <PlayIcon className="size-5" />
        )
      ) : (
        <PauseIcon className="size-5" />
      )}
    </Button>
  )
})
StoryCarouselControl.displayName = "StoryCarouselControl"

// Overlay
export const StoryOverlay: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 z-40">
    {/* Top gradient - for controls */}
    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
    {/* Bottom gradient - for text */}
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
  </div>
)

// ----- YouTubeStory: YT logic here -----
interface YouTubeStoryProps {
  videoId: string
  onDurationReady?: (ms: number) => void
  className?: string
}
export const YouTubeStory: React.FC<YouTubeStoryProps> = ({
  videoId,
  onDurationReady,
  className,
}) => {
  const { isPaused, pause, play } = useStoryCarouselContext()
  const playerRef = React.useRef<any>(null)
  const [isReady, setIsReady] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(true)

  // Load & init YT
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(tag)
    }
    const containerId = `yt-${videoId}`
    const container = document.createElement("div")
    // ensure iframe sits behind controls
    container.className = "absolute inset-0 w-full h-full "
    container.id = containerId
    document
      .querySelector(`[data-youtube="${videoId}"]`)
      ?.appendChild(container)

    const onReady = (event: any) => {
      playerRef.current = event.target
      onDurationReady?.(event.target.getDuration() * 1000)
      setIsReady(true)
    }
    const onStateChange = (e: any) => {
      const s = e.data
      if ((s === 2 || s === 0) && !isPaused) pause()
      if (s === 1 && isPaused) play()
    }

    const init = () =>
      new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          mute: 1,
        },
        events: { onReady, onStateChange },
      })
    if (window.YT?.Player) init()
    else window.onYouTubeIframeAPIReady = init
  }, [videoId, pause, play, isPaused, onDurationReady])

  // Sync Story → Video
  React.useEffect(() => {
    if (!playerRef.current || !isReady) return
    try {
      isPaused ? playerRef.current.pauseVideo() : playerRef.current.playVideo()
    } catch {}
  }, [isPaused, isReady])

  const toggleMute = React.useCallback(() => {
    if (!playerRef.current || !isReady) return
    if (isMuted) {
      playerRef.current.unMute()
      playerRef.current.setVolume(100)
    } else playerRef.current.mute()
    setIsMuted((m) => !m)
  }, [isMuted, isReady])

  return (
    <div data-youtube={videoId} className={cn("youtube-wrapper", className)}>
      {isReady && (
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-50 rounded-full text-white"
        >
          {isMuted ? (
            <VolumeX className="size-5" />
          ) : (
            <Volume2 className="size-5" />
          )}
        </Button>
      )}
    </div>
  )
}
