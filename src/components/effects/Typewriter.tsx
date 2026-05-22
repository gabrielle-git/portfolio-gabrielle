"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
};

export function Typewriter({ text, delay = 0, speed = 40, className }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, text, speed, started]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}