"use client";
import * as React from "react";

export type AnimationT =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "z"
  | "blur"
  | undefined;

export function useAnimationVariants(animation?: AnimationT) {
  return React.useMemo(
    () => ({
      hidden: {
        x: animation === "left" ? "-100%" : animation === "right" ? "100%" : 0,
        y: animation === "top" ? "-100%" : animation === "bottom" ? "100%" : 0,
        scale: animation === "z" ? 0 : 1,
        filter: animation === "blur" ? "blur(10px)" : "blur(0px)",
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
      },
    }),
    [animation]
  );
}
