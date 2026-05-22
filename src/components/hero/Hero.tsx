"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { HeroAvatar } from "./HeroAvatar";
import { HeroIdentity } from "./HeroIdentity";
import { HeroStatusBar } from "./HeroStatusBar";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6">
        <HeroStatusBar />
      </div>

      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 lg:px-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center w-full max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <HeroIdentity />

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 5 }}
            >
              <Button href="#cases" variant="primary">
                Ver cases
                <ArrowDown size={16} />
              </Button>
              <Button href="/cv.pdf" variant="secondary">
                <Download size={16} />
                Baixar CV
              </Button>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <HeroAvatar />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 5.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-fg-dim/50"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
            scroll
          </span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}