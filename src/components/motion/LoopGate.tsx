"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps a block that contains a looping CSS animation and sets
 * data-loop="off" while the block is off-screen, so the loop only runs
 * when someone can see it (see the [data-loop="off"] rule in globals.css).
 */
export default function LoopGate({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-loop={visible ? undefined : "off"} className={className}>
      {children}
    </div>
  );
}
