"use client"

import Image from "next/image"
import { motion } from "motion/react"
import InnerImageZoom from "react-inner-image-zoom"

import { ProductProps } from "@/types/product"

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css"
import * as React from "react"

function LayoutActive({ layoutId }: { layoutId: string }) {
  return (
    <motion.div
      layoutId={layoutId}
      className="absolute inset-0 z-10 size-full rounded-sm border border-gray-500"
    />
  )
}

interface ProductGalleryIndicatorProps {
  layoutId: string
  imageUrl: string
  index: number
  activeColor: number
  handleMouseEnter: React.MouseEventHandler<HTMLButtonElement>
}
function ProductGalleryIndicator({
  layoutId,
  imageUrl,
  index,
  activeColor,
  handleMouseEnter,
}: ProductGalleryIndicatorProps) {
  return (
    <button
      aria-label="show color"
      role="button"
      className="relative size-12"
      onMouseEnter={handleMouseEnter}
    >
      <div className="pointer-events-none absolute inset-0 z-10 size-full rounded-sm bg-gray-600/5" />
      <Image
        alt="gallery indicator"
        src={imageUrl}
        aria-hidden
        fill
        sizes="100%"
        className="object-contain p-1"
      />
      {index === activeColor && <LayoutActive layoutId={layoutId} />}
    </button>
  )
}

interface ProductGalleryImagePreviewProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isMouseIn: boolean
  imagePreviewUrl: string
  onLoadStart?: () => void
  onLoad?: () => void
  onError?: () => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  className?: string
  'aria-busy'?: boolean
  'aria-label'?: string
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}
export function ProductGalleryImagePreview({
  isMouseIn,
  imagePreviewUrl,
  onLoadStart,
  onLoad,
  onError,
  onKeyDown,
  className,
  'aria-busy': ariaBusy,
  'aria-label': ariaLabel,
  onMouseEnter,
  onMouseLeave
}: ProductGalleryImagePreviewProps) {
  const handleImageLoad = React.useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  const handleImageError = React.useCallback(() => {
    onError?.();
  }, [onError]);

  return (
    <div
      className={`relative flex h-[450px] w-full flex-1 items-center justify-center ${className || ''}`}
      onKeyDown={onKeyDown}
      aria-busy={ariaBusy}
      aria-label={ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-40 size-full rounded-sm bg-gray-500/5" />
      {isMouseIn ? (
        <div className="size-full">
          <InnerImageZoom
            zoomSrc={imagePreviewUrl}
            src={imagePreviewUrl}
            className="size-full max-h-full bg-white object-contain"
            zoomType="hover"
            fullscreenOnMobile={true}
            hasSpacer={true}
            afterZoomIn={handleImageLoad}
          />
        </div>
      ) : (
        <Image
          src={imagePreviewUrl}
          className="size-full object-contain p-6"
          alt="product image preview"
          fill
          sizes="100%"
          onLoadingComplete={handleImageLoad}
          onError={handleImageError}
          onLoadStart={onLoadStart}
        />
      )}
    </div>
  )
}
export function ProductGallery({ imagesUrl }: { imagesUrl: string[] }) {
  const [previewImage, setPreviewImage] = React.useState<number>(0)
  const [isMouseIn, setIsMouseIn] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [hasError, setHasError] = React.useState<boolean>(false)

  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => setIsMouseIn(true), [])
  const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => setIsMouseIn(false), [])
  const handleImageChange = React.useCallback((index: number) => setPreviewImage(index), [])

  const handleKeyNavigation = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      setPreviewImage(prev => (prev + 1) % imagesUrl.length)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setPreviewImage(prev => (prev - 1 + imagesUrl.length) % imagesUrl.length)
    }
  }, [imagesUrl.length])

  React.useEffect(() => {
    // Preload next image
    const nextIndex = (previewImage + 1) % imagesUrl.length
    const img = new window.Image()
    img.src = imagesUrl[nextIndex]
  }, [previewImage, imagesUrl])

  if (!imagesUrl.length) {
    return <div className="text-red-500">No images available</div>
  }

  return (
    <div 
      className="flex items-start gap-2"
      role="region"
      aria-label="Product gallery"
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
    >
      <div
        id="product-gallery-indics"
        className="flex flex-col items-start gap-2"
        role="tablist"
        aria-label="Product gallery thumbnails"
      >
        {imagesUrl.map((imageUrl, index) => (
          <ProductGalleryIndicator
            imageUrl={imageUrl}
            index={index}
            key={imageUrl}
            handleMouseEnter={() => handleImageChange(index)}
            layoutId="product-gallery-indics"
            activeColor={previewImage}
          />
        ))}
      </div>

      {hasError ? (
        <div className="flex h-[450px] w-full items-center justify-center text-red-500">
          Failed to load image
        </div>
      ) : (
        <ProductGalleryImagePreview
          isMouseIn={isMouseIn}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          imagePreviewUrl={imagesUrl[previewImage]}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => {
            setIsLoading(false)
            setHasError(false)
          }}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          aria-busy={isLoading}
          aria-label={`Product image ${previewImage + 1} of ${imagesUrl.length}`}
        />
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}

export function Product({ product }: { product: ProductProps }) {
  const [activeColor, setActiveColor] = React.useState<number>(0)

  return (
    <main className="grid grid-cols-12 gap-6 px-6 py-12 md:px-8 xl:px-12">
      <div className="col-span-12 md:col-span-8">
        <ProductGallery imagesUrl={product.images[0].imagesUrl} />
      </div>
    </main>
  )
}
