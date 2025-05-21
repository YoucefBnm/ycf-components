import { Variants } from "motion/react";

export const headerVariants = {
  center: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  topLeft: {
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
    height: 72,
  },
};

export const logoVariants: Variants = {
  center: {
    position: "fixed",
    top: 0,
    width: "100vw",
    height: "100vh",
  },
  topLeft: {
    position: "relative",
    width: "auto",
    height: "auto",
  },
};
