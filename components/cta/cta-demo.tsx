"use client"

import * as React from "react"
import { motion, useScroll } from "motion/react"

const galleryImages = [
  "https://images.pexels.com/photos/10835278/pexels-photo-10835278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/10849906/pexels-photo-10849906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/10774989/pexels-photo-10774989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4090418/pexels-photo-4090418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/10835278/pexels-photo-10835278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/10774989/pexels-photo-10774989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4090418/pexels-photo-4090418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/10849906/pexels-photo-10849906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/4090418/pexels-photo-4090418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
]

export function CtaDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [W, setW] = React.useState(0)

  // measure container width
  React.useLayoutEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver((entries) => {
      for (let e of entries) setW(e.contentRect.width)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const n = galleryImages.length
  const cardWidthVW = 13 // each card is 10vw wide
  const verticalScale = 0.5 // 0.5 = half‑circle height

  const transforms = React.useMemo(() => {
    if (W === 0) return []
    const cw = (cardWidthVW / 100) * W
    const gap = (W - n * cw) / (n - 1)
    const R = W / 2

    return Array.from({ length: n }, (_, i) => {
      // center‑x of card i
      const xCenter = cw / 2 + i * (cw + gap)
      const dx = xCenter - R
      // θ so that x = R·cosθ
      const θ = Math.acos(dx / R)
      // y up from bottom
      const y = R * Math.sin(θ) * verticalScale
      // **flip rotation** so left side is negative
      const rotate = 90 - (θ * 180) / Math.PI
      return { xCenter, y, rotate }
    })
  }, [W])

  // container height = arc height + card height
  const imgAspect = 750 / 1260
  const cardH = (cardWidthVW / 100) * W * imgAspect
  const arcH = (W / 2) * verticalScale
  const containerH = arcH + cardH

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible bg-[#F9F5F1]"
      style={{ height: `${containerH}px` }}
    >
      {transforms.map(({ xCenter, y, rotate }, i) => (
        <div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${xCenter}px`,
            transform: `translateX(-50%) translateY(-${y}px) rotate(${rotate}deg)`,
            transformOrigin: "50% 100%",
            width: `${cardWidthVW}vw`,
            padding: "0 0.5vw",
          }}
        >
          <img
            src={galleryImages[i]}
            alt=""
            className="block w-full rounded-3xl"
          />
        </div>
      ))}
    </div>
  )
}
