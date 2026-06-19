"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroSphereScene = dynamic(
  () =>
    import("./HeroSphereScene").then((m) => ({ default: m.HeroSphereScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-52 h-52 rounded-full bg-accent/10 animate-pulse" />
      </div>
    ),
  }
);

export function HeroSphere() {
  return (
    <motion.div
      className="relative w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-accent/12 blur-[80px]" />
      </div>

      <div className="relative w-full h-[440px] lg:h-[520px]">
        <HeroSphereScene />
      </div>
    </motion.div>
  );
}
