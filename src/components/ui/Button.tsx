"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 30 });

  const x = useTransform(springX, [-100, 100], [-8, 8]);
  const y = useTransform(springY, [-50, 50], [-4, 4]);

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

  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-colors group",
    variant === "primary" &&
      "bg-accent text-bg-primary hover:bg-accent-glow",
    variant === "secondary" &&
      "border border-border-default text-fg hover:border-accent hover:text-accent backdrop-blur-sm",
    className
  );

  const content = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-accent blur-xl opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseStyles}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </motion.button>
  );
}