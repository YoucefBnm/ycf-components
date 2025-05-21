"use client";
import * as React from "react";
import { splitText } from "../utils/split-text";
import { cn } from "@/lib/utils";
import { motion, MotionConfig, MotionProps } from "motion/react";
import {
  AnimationT,
  useAnimationVariants,
} from "../hooks/use-animation-variants";
import { gsapEasings } from "../utils/transitions";
import { setStagger } from "../utils/set-stagger";

interface TextStaggerInviewProps extends MotionProps {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  animation?: AnimationT;
  ease?: keyof typeof gsapEasings;
  stagger?: number;
  staggerDirection?: keyof typeof setStagger | "start";
}

interface TransitionConfigProps {
  index: number;
  itemsLength: number;
  ease: keyof typeof gsapEasings;
  staggerDirection?: keyof typeof setStagger | "start";
  stagger?: number;
}
const transitionConfig = ({
  index,
  itemsLength,
  ease = "power1.out",
  stagger,
  staggerDirection = "start",
}: TransitionConfigProps) => ({
  delay: setStagger({ index, itemsLength, stagger })[staggerDirection],
  duration: 0.3,
  ease: gsapEasings[ease],
});
export const TextStaggerInview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TextStaggerInviewProps
>(
  (
    {
      text,
      as: Component = "span",
      animation,
      ease = "power1.out",
      stagger = 0.02,
      staggerDirection = "start",
      transition,
      className,
      viewport,
      ...props
    },
    ref
  ) => {
    const MotionComp = motion.create<React.JSX.IntrinsicElements>(
      Component as keyof React.JSX.IntrinsicElements
    );
    const { characters } = splitText(text);
    const animationVariants = useAnimationVariants(animation);
    return (
      <MotionComp
        ref={ref}
        className={cn("relative inline-block origin-bottom", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, ...viewport }}
        {...props}
      >
        {characters.map((char, index) => (
          <MotionConfig
            key={`${char}-${index}`}
            transition={
              transitionConfig({
                index,
                itemsLength: characters.length,
                ease,
                stagger,
                staggerDirection,
              }) || transition
            }
          >
            <motion.span className="inline-block" variants={animationVariants}>
              {char}
              {char === " " && index < characters.length - 1 && <>&nbsp;</>}
            </motion.span>
          </MotionConfig>
        ))}
      </MotionComp>
    );
  }
);
TextStaggerInview.displayName = "TextStaggerInview";
