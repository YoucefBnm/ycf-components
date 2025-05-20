"use client";

import { motion } from "motion/react";
import * as React from "react";
import { Logo } from "./logo";
import { ThemeSwitcher } from "./theme-switcher";
import { useAnimationVariants } from "@/registry/new-york/hooks/use-animation-variants";
import { headerVariants, logoVariants } from "@/lib/variants";
import { SPRING_TRANSITION_CONFIG } from "@/registry/new-york/utils/transitions";

export const Header = ({ transition }: { transition: boolean }) => {
  const animationVariants = useAnimationVariants();
  return (
    <motion.div
      variants={headerVariants}
      initial="center"
      animate={transition ? "topLeft" : "center"}
      transition={SPRING_TRANSITION_CONFIG}
      className="fixed z-40 flex items-center justify-center "
      layout
    >
      <div className="relative max-w-7xl size-full">
        <motion.div
          className="absolute"
          variants={logoVariants}
          initial="center"
          animate={transition ? "topLeft" : "center"}
          transition={SPRING_TRANSITION_CONFIG}
          layout
        >
          <Logo />
        </motion.div>
      </div>

      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate={transition ? "visible" : "hidden"}
      >
        <ThemeSwitcher className="mr-10" />
      </motion.div>
    </motion.div>
  );
};
