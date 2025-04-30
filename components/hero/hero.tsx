"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface Sphere1Props {
  size?: number
  baseColor?: string
  colors?: {
    glow1?: string // B6FFED
    glow2?: string // B6EDFF
    glow3?: string // FFA3F0
    glow4?: string // 658AC0
    glow5?: string // B6FFC2
    glow6?: string // B6FFED
    highlight?: string // FFA3C2
    accent?: string // FFBA69
  }
  blur?: number
  className?: string
}

const Sphere1 = React.forwardRef<HTMLDivElement, Sphere1Props>(
  (
    {
      size = 698,
      baseColor = "#CED7DE",
      colors = {
        glow1: "#B6FFED",
        glow2: "#B6EDFF",
        glow3: "#FFA3F0",
        glow4: "#658AC0",
        glow5: "#B6FFC2",
        glow6: "#B6FFED",
        highlight: "#FFA3C2",
        accent: "#FFBA69",
      },
      blur = 14,
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("relative rounded-full", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: baseColor,
        filter: `blur(${blur}px)`,
        boxShadow: `
        inset 0px 124px 144px ${colors.glow1},
        -80px 54px 74px -30px ${colors.glow2},
        80px -36px 144px -60px ${colors.glow3},
        inset 210px -296px 144px -240px ${colors.glow4},
        inset 0 -107px 224px 0 ${colors.glow5},
        inset -0 -126px 234px 0 ${colors.glow6}
      `,
        perspective: "1000px",
      }}
      {...props}
    >
      {/* Medium sphere */}
      <div
        className="absolute rounded-[50%] blur-3xl"
        style={{
          left: size * 0.56,
          top: size * 0.15,
          height: size * 0.69,
          width: size * 0.89,
          background: `radial-gradient(
          ellipse 80% 60% at 30% 25%,
          ${colors.highlight} 0%,
          ${colors.highlight}00 100%
        )`,
          rotate: "24deg",
          boxShadow: `
          inset -120px -36px 174px -60px ${colors.glow4},
          inset 0px 4px 224px 0px #F1F1F1
        `,
        }}
      />
      {/* Small sphere */}
      <div
        className="absolute rounded-[50%]"
        style={{
          left: size * 0.27,
          top: size * 0.27,
          height: size * 0.42,
          width: size * 0.56,
          transform: "rotate(1.6deg)",
          filter: "blur(94px)",
          background: `linear-gradient(
          -42deg,
          ${colors.accent}3d 0%,
          ${colors.accent} 100%
        )`,
        }}
      />
    </div>
  )
)

Sphere1.displayName = "Sphere1"

const Sphere2 = () => (
  <div>
    {/* sphere md */}
    <div className="h-[334px] w-[426px] rotate-[42deg] rounded-[50%]  bg-[#FF3145] blur-[150px]"></div>
  </div>
)

const Sphere3 = () => (
  <div
    className="relative size-[650px] rounded-full bg-[#1a1a1a] blur"
    style={{
      boxShadow: `
        inset 0px 60px 124px #000000,
        -60px 40px 84px -20px rgba(0,0,0,0.8),
        60px -30px 124px -50px #2a2a2a,
        inset 180px -250px 124px -200px #101010,
        inset 0 -87px 184px 0 #1d1d1d,
        0px 10px 44px 0px rgba(0,0,0,0.6)
      `,
      perspective: "1200px",
    }}
  >
    {/* Dark metallic highlight */}
    <div
      className="absolute left-[320px] top-[85px] h-[460px] w-[600px] rounded-[50%] blur-2xl"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 25% 20%, #2a2a2a 0%, rgba(26,26,26,0) 100%)",
        rotate: "28deg",
      }}
    />
    {/* Subtle dark gradient */}
    <div
      className="absolute left-[156px] top-[161px] h-[275px] w-[372px] rotate-2 rounded-[50%] blur-[84px]"
      style={{
        background:
          "linear-gradient(-45deg, rgba(26,26,26, 0.8) 0%, #2d2d2d 100%)",
      }}
    />
  </div>
)

interface Sphere4Props {
  baseColor?: string
  highlightColor?: string
  accentColor?: string
  size?: number
  blur?: number
  className?: string
}

const Sphere4: React.FC<Sphere4Props> = ({
  baseColor = "rgb(24,83,84)",
  highlightColor = "rgb(34,113,114)",
  accentColor = "rgb(14,53,54)",
  size = 650,
  blur = 8,
  className,
}) => (
  <div
    className={cn("relative rounded-full blur", className)}
    style={{
      width: size,
      height: size,
      backgroundColor: baseColor,
      boxShadow: `
        inset 0px 60px 124px ${accentColor},
        -60px 40px 84px -20px rgba(0,0,0,0.4),
        60px -30px 124px -50px ${highlightColor},
        inset 180px -250px 124px -200px ${accentColor},
        inset 0 -87px 184px 0 ${baseColor}
      `,
      perspective: "1200px",
    }}
  >
    {/* Main highlight */}
    <div
      className="absolute rounded-[50%] blur-2xl"
      style={{
        left: size * 0.49,
        top: size * 0.13,
        height: size * 0.71,
        width: size * 0.92,
        background: `radial-gradient(
          ellipse 70% 50% at 25% 20%,
          ${highlightColor} 0%,
          ${baseColor}00 100%
        )`,
        transform: "rotate(28deg)",
      }}
    />
    {/* Subtle gradient */}
    <div
      className="absolute rounded-[50%] blur-[84px]"
      style={{
        left: size * 0.24,
        top: size * 0.25,
        height: size * 0.42,
        width: size * 0.57,
        transform: "rotate(2deg)",
        background: `linear-gradient(
          -45deg,
          ${baseColor}cc 0%,
          ${highlightColor} 100%
        )`,
      }}
    />
  </div>
)

interface ShpereProps extends React.HTMLAttributes<HTMLDivElement> {
  colorMain?: string
  colorAccent?: string
  shadowLeft?: string
  shadowRight?: string
}
const Sphere5: React.FC<ShpereProps> = (
  { colorMain, colorAccent, shadowLeft, shadowRight, className, ...props },
  ref
) => (
  <div
    className="relative size-[698px] rounded-[50%] blur-xl "
    style={{
      boxShadow: `
    -80px 54px 74px -30px green,
    80px -36px 114px -60px blue,
    inset 0 -126px 234px -30px yellow
  `,
    }}
  ></div>
)

export const SPHERE_VARIANTS = {
  // Light variants
  light: {
    base: {
      baseColor: "#CED7DE",
      colors: {
        glow1: "#B6FFED",
        glow2: "#B6EDFF",
        glow3: "#FFA3F0",
        glow4: "#658AC0",
        glow5: "#B6FFC2",
        glow6: "#B6FFED",
        highlight: "#FFA3C2",
        accent: "#FFBA69",
      },
    },
    silver: {
      baseColor: "#E5E7EB",
      colors: {
        glow1: "#F3F4F6",
        glow2: "#D1D5DB",
        glow3: "#F9FAFB",
        glow4: "#9CA3AF",
        glow5: "#E5E7EB",
        glow6: "#F3F4F6",
        highlight: "#F9FAFB",
        accent: "#D1D5DB",
      },
    },
  },

  // Dark variants
  dark: {
    midnight: {
      baseColor: "#1A1A1A",
      colors: {
        glow1: "#2A2A2A",
        glow2: "#333333",
        glow3: "#404040",
        glow4: "#262626",
        glow5: "#1F1F1F",
        glow6: "#2A2A2A",
        highlight: "#404040",
        accent: "#333333",
      },
    },
    ocean: {
      baseColor: "rgb(24,83,84)",
      colors: {
        glow1: "rgb(34,113,114)",
        glow2: "rgb(14,53,54)",
        glow3: "rgb(44,123,124)",
        glow4: "rgb(19,68,69)",
        glow5: "rgb(29,98,99)",
        glow6: "rgb(34,113,114)",
        highlight: "rgb(44,123,124)",
        accent: "rgb(19,68,69)",
      },
    },
  },

  // Color variants
  colors: {
    blue: {
      baseColor: "#1E40AF",
      colors: {
        glow1: "#3B82F6",
        glow2: "#2563EB",
        glow3: "#60A5FA",
        glow4: "#1D4ED8",
        glow5: "#3B82F6",
        glow6: "#2563EB",
        highlight: "#60A5FA",
        accent: "#1D4ED8",
      },
    },
    purple: {
      baseColor: "#6D28D9",
      colors: {
        glow1: "#8B5CF6",
        glow2: "#7C3AED",
        glow3: "#A78BFA",
        glow4: "#6D28D9",
        glow5: "#8B5CF6",
        glow6: "#7C3AED",
        highlight: "#A78BFA",
        accent: "#6D28D9",
      },
    },
    emerald: {
      baseColor: "#047857",
      colors: {
        glow1: "#10B981",
        glow2: "#059669",
        glow3: "#34D399",
        glow4: "#047857",
        glow5: "#10B981",
        glow6: "#059669",
        highlight: "#34D399",
        accent: "#047857",
      },
    },
  },
} as const

const Hero = () => {
  return (
    <div
      style={{ perspective: "1000px" }}
      className="container relative min-h-dvh w-full overflow-hidden "
    >
      <Sphere1
        size={900}
        baseColor="#CED7DE"
        colors={{
          glow1: "#B6FFED",
          glow2: "#B6EDFF",
          glow3: "#FFA3F0",
          glow4: "#658AC0",
          glow5: "#B6FFC2",
          glow6: "#B6FFED",
          highlight: "#FFA3C2",
          accent: "#FFBA69",
        }}
        blur={0}
        className="absolute -left-1/3 top-0"
      />
      <Sphere1
        size={900}
        baseColor="#CED7DE"
        colors={{
          glow1: "#B6FFED",
          glow2: "#B6EDFF",
          glow3: "#FFA3F0",
          glow4: "#658AC0",
          glow5: "#B6FFC2",
          glow6: "#B6FFED",
          highlight: "#FFA3C2",
          accent: "#FFBA69",
        }}
        blur={5}
        className="absolute -bottom-full -right-1/2"
      />
    </div>
  )
}

export { Hero }
