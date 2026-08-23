"use client";

import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className = "h-full" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${className} ${inView ? "animate-fade-up" : ""}`}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
