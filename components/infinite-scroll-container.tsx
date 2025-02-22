"use client"

import * as React from "react"
import { motion, useInView } from "motion/react"

import { cn } from "@/lib/utils"

import { Skeleton } from "./ui/skeleton"

function Spinner() {
  return (
    <div className="inline-block size-6 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
  )
}

interface InfiniteScrollCellProps extends React.PropsWithChildren {
  isPending: boolean
  className?: string
}
export function InfiniteScrollCell({
  isPending,
  children,
  className,
}: InfiniteScrollCellProps) {
  const revealRef = React.useRef<HTMLDivElement | null>(null)

  const isInView = useInView(revealRef, {
    once: true,
    amount: 0.3,
  })

  return (
    <div className={cn("relative", className)}>
      {isPending || !isInView ? (
        <motion.div
          initial="visible"
          animate={
            !isInView || isPending
              ? { opacity: 1, display: "block" }
              : { opacity: 0, display: "none" }
          }
        >
          <div className=" space-y-5 p-4">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-48 w-full" />
          </div>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {children}
        </motion.div>
      )}
      <div ref={revealRef} />
    </div>
  )
}

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  items: unknown[]
  isPending: boolean
  itemsCount: number | null | undefined
  loadMore: () => void
  className?: string
}
export function InfiniteScrollContainer({
  items,
  isPending,
  itemsCount,
  loadMore,
  children,
  className,
}: InfiniteScrollContainerProps) {
  const observerRef = React.useRef<HTMLDivElement | null>(null)
  const allLoaded = items.length === itemsCount
  const hasMore = isPending && !allLoaded && items.length > 0
  React.useEffect(() => {
    const { current } = observerRef
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !allLoaded && items.length > 0) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  })
  return (
    <div className={className}>
      {children}
      {hasMore && <Spinner />}
      {items.length > 0 && itemsCount && items.length < itemsCount && (
        <div ref={observerRef} />
      )}
    </div>
  )
}
