export const EASE_TRANSITIONS_CONFIG = {
  default: [0.25, 0.1, 0.25, 1],
  transform: [0.42, 0, 0.58, 1], // Smoother ease transition for transforms
  opacity: [0.25, 0.1, 0.25, 1], // Smoother ease transition for opacity
  clipPath: [0.6, 0.04, 0.98, 0.335], // Smoother ease transition for clip path
}
export const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

export const transitionConfig = (
  index?: number,
  transitionType?: keyof typeof EASE_TRANSITIONS_CONFIG,
  duration?: number,
  delay?: number
) => ({
  delay: index ? index * 0.1 : delay || 0.2,
  duration: duration || 0.4,
  ease: EASE_TRANSITIONS_CONFIG[transitionType || "default"],
})
