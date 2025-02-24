"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import InnerImageZoom from "react-inner-image-zoom"

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css"
import { cn } from "@/lib/utils"

interface ImageGalleryIndicProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  layoutId: string
  imageUrl: string
  index: number
  activeIndex: number
  onHover: (index: number) => void
  className?: string
}

interface ImageGalleryPreviewProps {
  imageUrl: string
  className?: string
}

interface ImageGalleryProps {
  imagesUrl: string[]
  className?: string
}

const ImageGalleryIndic = React.memo(
  ({
    layoutId,
    imageUrl,
    index,
    activeIndex,
    onHover,
    className,
    ...props
  }: ImageGalleryIndicProps) => (
    <button
      aria-label={`View image ${index + 1}`}
      className={cn("relative size-12 ", className)}
      onMouseEnter={() => onHover(index)}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 size-full bg-gray-500/5"
        aria-hidden="true"
      />
      <Image
        src={imageUrl}
        alt={`Product thumbnail ${index + 1}`}
        className="object-contain p-1.5"
        fill
        sizes="(max-width: 768px) 25vw, 48px"
        priority={index === 0}
      />
      {index === activeIndex && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 z-10 size-full border border-gray-500"
        />
      )}
    </button>
  )
)

ImageGalleryIndic.displayName = "ImageGalleryIndic"

const ImageGalleryPreview = React.memo(
  ({ imageUrl, className }: ImageGalleryPreviewProps) => {
    const [isMouseIn, setIsMouseIn] = React.useState(false)

    return (
      <div
        className={cn(
          "relative flex h-[450px] w-full items-center justify-center bg-white",
          className
        )}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
      >
        <div
          className="pointer-events-none absolute inset-0 z-40 size-full bg-gray-500/5"
          aria-hidden="true"
        />

        {isMouseIn ? (
          <InnerImageZoom
            src={imageUrl}
            zoomSrc={imageUrl}
            hasSpacer={false}
            zoomType="hover"
            fullscreenOnMobile={true}
            className="size-full object-contain p-4"
            imgAttributes={{
              alt: "Product zoom view",
              style: {
                objectFit: "contain",
                width: "100%",
                height: "100%",
              },
            }}
          />
        ) : (
          <div className="relative size-full">
            <Image
              src={imageUrl}
              alt="Product preview"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4"
            />
          </div>
        )}
      </div>
    )
  }
)

ImageGalleryPreview.displayName = "ImageGalleryPreview"

export function ImageGallery({ imagesUrl, className }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  if (!imagesUrl?.length) {
    return <div>No images available</div>
  }

  return (
    <div className={cn("flex items-start gap-2", className)}>
      <div
        className="flex flex-col gap-2"
        role="region"
        aria-label="Product gallery thumbnails"
      >
        {imagesUrl.map((imageUrl, index) => (
          <ImageGalleryIndic
            key={`${imageUrl}-${index}`}
            layoutId="image-gallery-indics"
            imageUrl={imageUrl}
            index={index}
            activeIndex={activeIndex}
            onHover={setActiveIndex}
          />
        ))}
      </div>

      <ImageGalleryPreview imageUrl={imagesUrl[activeIndex]} />
    </div>
  )
}
