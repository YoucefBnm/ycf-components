import { Transition } from "motion/react";

export const gsapEasings = {
  // Smooth acceleration; suitable for elements entering the viewport
  "power1.in": [0.55, 0.085, 0.68, 0.53],
  // Smooth deceleration; ideal for elements exiting the viewport
  "power1.out": [0.25, 0.46, 0.45, 0.94],
  // Smooth acceleration and deceleration; great for modals or overlays
  "power1.inOut": [0.455, 0.03, 0.515, 0.955],

  // Faster acceleration; good for quick entrances
  "power2.in": [0.55, 0.085, 0.68, 0.53],
  // Faster deceleration; useful for quick exits
  "power2.out": [0.25, 0.46, 0.45, 0.94],
  // Balanced acceleration and deceleration; suitable for smooth transitions
  "power2.inOut": [0.455, 0.03, 0.515, 0.955],

  // Strong acceleration; effective for drawing attention
  "power3.in": [0.55, 0.055, 0.675, 0.19],
  // Strong deceleration; emphasizes the end of an animation
  "power3.out": [0.215, 0.61, 0.355, 1],
  // Pronounced acceleration and deceleration; ideal for impactful animations
  "power3.inOut": [0.645, 0.045, 0.355, 1],

  // Very strong acceleration; grabs user attention quickly
  "power4.in": [0.895, 0.03, 0.685, 0.22],
  // Very strong deceleration; creates a dramatic slowdown
  "power4.out": [0.165, 0.84, 0.44, 1],
  // Sharp acceleration and deceleration; for high-impact transitions
  "power4.inOut": [0.77, 0, 0.175, 1],

  // Gentle start; suitable for subtle animations
  "sine.in": [0.47, 0, 0.745, 0.715],
  // Gentle end; perfect for fading elements
  "sine.out": [0.39, 0.575, 0.565, 1],
  // Smooth start and end; ideal for continuous animations
  "sine.inOut": [0.445, 0.05, 0.55, 0.95],

  // Rapid acceleration; for elements that need to appear quickly
  "expo.in": [0.95, 0.05, 0.795, 0.035],
  // Rapid deceleration; for elements that need to disappear quickly
  "expo.out": [0.19, 1, 0.22, 1],
  // Sharp acceleration and deceleration; for dynamic transitions
  "expo.inOut": [1, 0, 0, 1],

  // Circular motion start; for elements entering in a circular path
  "circ.in": [0.6, 0.04, 0.98, 0.335],
  // Circular motion end; for elements exiting in a circular path
  "circ.out": [0.075, 0.82, 0.165, 1],
  // Circular motion start and end; for looping animations
  "circ.inOut": [0.785, 0.135, 0.15, 0.86],

  // Slight reverse motion before starting; adds anticipation
  "back.in": [0.6, -0.28, 0.735, 0.045],
  // Overshoots slightly before settling; adds a playful effect
  "back.out": [0.175, 0.885, 0.32, 1.275],
  // Combined overshoot at start and end; for bouncy animations
  "back.inOut": [0.68, -0.55, 0.265, 1.55]
};

export const SPRING_TRANSITION_CONFIG:Transition = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

