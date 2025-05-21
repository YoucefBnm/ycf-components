"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function HomePage() {
  const [transition, setTransition] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 2000);
    const timer2 = setTimeout(() => setIsLoaded(true), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className={cn("relative h-dvh", !isLoaded && "overflow-y-hidden")}>
      <Header transition={transition} />
      <Hero transition={transition} />
    </main>
  );
}
