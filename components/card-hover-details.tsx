"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CardHoverDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const CardHoverDetails: React.FC<CardHoverDetailsProps> = ({
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      className={cn(
        "relative h-[480px] w-1/3 cursor-pointer overflow-hidden rounded-xl bg-red-500",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        ...props.style,
      }}
      {...props}
    >
      {/* image */}
      <motion.img
        width={1077}
        height={606}
        alt="product image"
        src="https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inline-block size-full max-h-full max-w-full object-cover align-middle"
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* details */}
      {/*
      init: translate3d(0px, 140%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)
      visible:
      */}
      <motion.div
        className=" absolute inset-[auto_1.5rem_1.5rem] space-y-4 rounded-2xl  bg-[rgb(20,20,20)]/90 p-6 text-[#f3efef] backdrop-blur-sm "
        // style={{ backdropFilter: "blur(10px)" }}
        initial={{ opacity: 0, y: "140%" }}
        animate={{ y: isHovered ? "0%" : "140%", opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="space-y-2">
          <h3 style={{ opacity: 0.6 }} className=" text-sm text-opacity-60">
            Services
          </h3>
          {/* tag */}
          <div className="flex flex-wrap gap-2 ">
            <div className=" rounded-full bg-[hsl(18,0%,20%)] px-2 py-1 text-[#f3efef]">
              <p className=" text-xs leading-normal">Branding</p>
            </div>
            <div className=" rounded-full bg-[hsl(18,0%,20%)] px-2 py-1 text-[#f3efef]">
              <p className=" text-xs leading-normal">UI UX</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className=" text-sm text-opacity-60" style={{ opacity: 0.6 }}>
            Stack
          </h3>
          {/* tag */}
          <div className="flex flex-wrap gap-2 ">
            <div className=" rounded-full bg-[hsl(18,56%,32%)] px-2 py-1 text-[#f3efef]">
              <p className=" text-xs leading-normal">Figma</p>
            </div>
            <div className=" rounded-full bg-[hsl(18,56%,32%)] px-2 py-1 text-[#f3efef]">
              <p className=" text-xs leading-normal">Webflow</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className=" text-sm text-opacity-60" style={{ opacity: 0.6 }}>
            Profile
          </h3>
          {/* tag */}
          <div className="flex flex-wrap gap-2 ">
            <p className="text-sm text-card">
              Comprehensive platform designed for an agency, Creating
              professional and business-oriented brand.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CardHoverDetails
