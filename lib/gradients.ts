import {
  RADIAL_GRADIENTS,
  RADIAL_GRADIENT_POSITIONS,
  RADIAL_GRADIENT_SIZES,
} from "@/constants/gradients"

export interface GradientStyleT {
  gradientColors?:
    | keyof typeof RADIAL_GRADIENTS
    | { color: string; start: string }[]
  gradientSize?:
    | keyof typeof RADIAL_GRADIENT_SIZES
    | { width: string; height: string }
  gradientPosition?:
    | keyof typeof RADIAL_GRADIENT_POSITIONS
    | { x: string; y: string }
}
export const gradientStyle = (params: GradientStyleT = {}) => {
  const {
    gradientColors = RADIAL_GRADIENTS["blue"],
    gradientSize = RADIAL_GRADIENT_SIZES["default"],
    gradientPosition = RADIAL_GRADIENT_POSITIONS["top"],
  } = params

  const gradientString = Array.isArray(gradientColors)
    ? gradientColors.map(({ color, start }) => `${color} ${start}`).join(", ")
    : RADIAL_GRADIENTS[gradientColors]
        .map(({ color, start }) => `${color} ${start}`)
        .join(", ")

  const gradientBg = `radial-gradient(${
    typeof gradientSize === "string"
      ? `${RADIAL_GRADIENT_SIZES[gradientSize].width} ${RADIAL_GRADIENT_SIZES[gradientSize].height}`
      : `${gradientSize.width} ${gradientSize.height}`
  } at ${
    typeof gradientPosition === "string"
      ? `${RADIAL_GRADIENT_POSITIONS[gradientPosition].x} ${RADIAL_GRADIENT_POSITIONS[gradientPosition].y}`
      : `${gradientPosition.x} ${gradientPosition.y}`
  }, ${gradientString})`

  const dominantColor = Array.isArray(gradientColors)
    ? gradientColors[gradientColors.length - 1].color
    : RADIAL_GRADIENTS[gradientColors][
        RADIAL_GRADIENTS[gradientColors].length - 1
      ].color

  return {
    gradientString,
    gradientBg,
    dominantColor,
  }
}
