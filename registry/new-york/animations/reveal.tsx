"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { SPRING_TRANSITION_CONFIG } from "../utils/transitions";
import {
  AnimationT,
  useAnimationVariants,
} from "../hooks/use-animation-variants";

export const Reveal = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { animation?: AnimationT }
>(({ className, transition, viewport, animation, ...props }, ref) => {
  const animationVariants = useAnimationVariants(animation);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport || { once: true, amount: 0.3 }}
      transition={transition || SPRING_TRANSITION_CONFIG}
      {...props}
    />
  );
});
Reveal.displayName = "Reveal";
