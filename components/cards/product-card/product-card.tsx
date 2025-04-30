"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface ProductImagesProps {
  id: string
  color: string
  images: string[]
}
interface ProductCardImagesProps {
  productImages: ProductImagesProps[]
  activeColor: number
  activeImage: number
  handleMouse: (event: "enter" | "leave") => void
  className?: string
}
const variants = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
function useSetActiveProduct(initialColor = 0) {
  const [state, setState] = React.useState({
    activeColor: initialColor,
    activeImage: 0,
  })

  const handleColorChange = React.useCallback((index: number) => {
    setState((prev) => ({ ...prev, activeColor: index }))
  }, [])

  const handleMouse = React.useCallback((event: "enter" | "leave") => {
    setState((prev) => ({
      ...prev,
      activeImage: event === "enter" ? 1 : 0,
    }))
  }, [])

  return {
    ...state,
    handleColorChange,
    handleMouse,
  }
}
function ProductCardImages({
  productImages,
  activeColor,
  activeImage,
  handleMouse,
  className,
}: ProductCardImagesProps) {
  const handleMouseEnter = () => handleMouse("enter")
  const handleMouseLeave = () => handleMouse("leave")

  return (
    <div className={cn("relative aspect-video", className)}>
      {productImages.map((productImage, index) => (
        <motion.div
          key={productImage.id}
          variants={variants}
          animate={index === activeColor ? "visible" : "hidden"}
          className="absolute inset-0 cursor-pointer overflow-hidden"
          exit={"hidden"}
        >
          <div
            className="relative flex size-full items-end "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence>
              <motion.div
                key={0}
                variants={variants}
                className="pointer-events-none"
                exit="hidden"
              >
                <Image
                  alt={`Product image ${index + 1} in ${
                    productImage.color
                  } color`}
                  fill
                  className="object-contain"
                  src={productImage.images[0]}
                />
              </motion.div>
              <motion.div
                key={1}
                variants={variants}
                className="pointer-events-none absolute inset-0 size-full"
                animate={
                  activeImage === 1 &&
                  productImage.id === productImages[activeColor].id
                    ? "visible"
                    : "hidden"
                }
                exit="hidden"
              >
                <Image
                  alt={`Product image ${index + 1} in ${
                    productImage.color
                  } color`}
                  fill
                  className="object-contain"
                  src={productImage.images[1]}
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
const springTransition = {
  type: "spring",
  stiffness: 500,
  damping: 50,
  mass: 1,
}
interface ProductColorsThumbsProps {
  productId: string
  productColors: string[]
  activeColor: number
  setActiveColor: (index: number) => void
  className?: string
}
function ProductColorsThumbs({
  productId,
  productColors,
  activeColor,
  setActiveColor,
  className,
}: ProductColorsThumbsProps) {
  return (
    <div className={cn("my-2 flex gap-2 px-4", className)}>
      {productColors.map((productColor, index) => (
        <button
          key={productColor}
          role="button"
          aria-label="show product color"
          className="relative size-4 appearance-none rounded-full border border-neutral-200"
          style={{ backgroundColor: productColor }}
          onMouseEnter={() => setActiveColor(index)}
          title={productColor}
        >
          {index === activeColor && (
            <motion.div
              layoutId={productId}
              className="absolute -left-[2px] -top-[2px] size-[18px] rounded-full border border-gray-500"
              transition={springTransition}
            />
          )}
        </button>
      ))}
    </div>
  )
}

interface ProductCardProps {
  id: string
  images: ProductImagesProps[]
  colors: string[]
  className?: string
}
export function ProductCard({
  id,
  images,
  colors,
  className,
}: ProductCardProps) {
  const { activeColor, activeImage, handleColorChange, handleMouse } =
    useSetActiveProduct()
  return (
    <div id={id} className={cn("relative px-4 py-6", className)}>
      <ProductCardImages
        productImages={images}
        activeColor={activeColor}
        activeImage={activeImage}
        handleMouse={handleMouse}
      />

      <ProductColorsThumbs
        productId={id}
        productColors={colors}
        activeColor={activeColor}
        setActiveColor={handleColorChange}
      />
    </div>
  )
}
