"use client";
import { TextStaggerInview } from "@/registry/new-york/ui/text-stagger-inview";
import { motion, useInView } from "motion/react";
import * as React from "react";

export const Hero = ({ transition }: { transition: boolean }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      className="min-h-svh place-content-center pt-20 pb-12 px-8"
      initial="hidden"
      animate={transition && inView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.2 }}
    >
      <TextStaggerInview
        text="UI Components distrubution for your next project"
        animation="z"
        className="block text-center text-5xl font-bold"
        as="h1"
      />
    </motion.section>
  );
};
