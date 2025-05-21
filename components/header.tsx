"use client";

import { motion } from "motion/react";
import * as React from "react";
import { Logo } from "./logo";
import { ThemeSwitcher } from "./theme-switcher";
import { useAnimationVariants } from "@/registry/new-york/hooks/use-animation-variants";
import { headerVariants, logoVariants } from "@/lib/variants";
import { SPRING_TRANSITION_CONFIG } from "@/registry/new-york/utils/transitions";
import XIcon from "./icons/x-icon";
import TwentyFirstIcon from "./icons/21st-icon";
import GithubIcon from "./icons/github-icon";
import { gsapEasings } from "@/lib/transitions";

export const Header = ({ transition }: { transition: boolean }) => {
  const animationVariants = useAnimationVariants("top");
  return (
    <motion.header
      variants={headerVariants}
      initial="center"
      animate={transition ? "topLeft" : "center"}
      transition={SPRING_TRANSITION_CONFIG}
      className="fixed z-40 flex items-center justify-between p-0"
      layout
    >
      <motion.a
        variants={logoVariants}
        initial="center"
        animate={transition ? "topLeft" : "center"}
        transition={SPRING_TRANSITION_CONFIG}
        href="/"
        layout
        className="flex justify-center items-center "
      >
        <Logo className="mx-8" />
      </motion.a>

      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate={transition ? "visible" : "hidden"}
        transition={{
          delay: 0.5,
          duration: 0.3,
          ease: gsapEasings["power1.in"],
        }}
        className="flex mx-8 justify-center items-center space-x-4"
      >
        <a
          href="https://github.com/YoucefBnm/"
          rel="noreferrer noopener"
          target="_blank"
          className="size-8 bg-secondary text-black inline-flex items-center justify-center rounded-full [&_svg]:size-5 transition-transform hover:scale-105"
        >
          <GithubIcon />
        </a>
        <a
          href="https://x.com/lbnm_yussef"
          rel="noreferrer noopener"
          target="_blank"
          className="size-8 bg-secondary text-black inline-flex items-center justify-center rounded-full [&_svg]:size-5 transition-transform hover:scale-105"
        >
          <XIcon />
        </a>
        <a
          href="https://21st.dev/YoucefBnm"
          rel="noreferrer noopener"
          target="_blank"
          className="size-8 bg-secondary text-black inline-flex items-center justify-center rounded-full [&_svg]:size-5 transition-transform hover:scale-105"
        >
          <TwentyFirstIcon />
        </a>
        <ThemeSwitcher />
      </motion.div>
    </motion.header>
  );
};
