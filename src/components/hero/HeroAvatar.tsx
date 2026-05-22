"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function HeroAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const moveX = useTransform(springX, [-200, 200], [-15, 15]);
  const moveY = useTransform(springY, [-200, 200], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className="relative flex justify-center items-center w-full h-full min-h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-accent/30 via-accent-glow/10 to-transparent blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10"
        style={{ x: moveX, y: moveY }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/avatar.png"
          alt="Gabrielle Campelo"
          width={340}
          height={567}
          priority
          className="drop-shadow-[0_0_60px_rgba(167,139,250,0.5)] select-none"
        />
      </motion.div>

      <div className="absolute bottom-8 w-48 h-3 bg-accent/40 blur-2xl rounded-full" />
    </motion.div>
  );
}