import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors",
        variant === "default" &&
          "bg-fg/5 text-fg-muted border border-border-default",
        variant === "accent" &&
          "bg-accent/10 text-accent border border-border-accent",
        variant === "outline" &&
          "border border-border-default text-fg-dim",
        className
      )}
    >
      {children}
    </span>
  );
}