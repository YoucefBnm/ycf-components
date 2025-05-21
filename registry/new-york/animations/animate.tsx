"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { SPRING_TRANSITION_CONFIG } from "../utils/transitions";
import {
  AnimationT,
  useAnimationVariants,
} from "../hooks/use-animation-variants";

type ElementType = "div" | "header" | "section" | "span" | "p";

export const Animate = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    animation?: AnimationT;
    as?: ElementType;
  }
>(
  (
    {
      className,
      transition,
      animation,
      variants,
      initial,
      animate,
      as = "div",
      ...props
    },
    ref
  ) => {
    const animationVariants = useAnimationVariants(animation);
    const MotionComponent = motion[as];

    return (
      <MotionComponent
        ref={ref}
        className={className}
        variants={animationVariants || variants}
        initial={initial || "hidden"}
        animate={animate || "visible"}
        transition={transition || SPRING_TRANSITION_CONFIG}
        {...props}
      />
    );
  }
);
Animate.displayName = "Animate";
