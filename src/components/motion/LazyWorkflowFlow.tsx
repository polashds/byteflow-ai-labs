"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import WorkflowView from "@/components/motion/WorkflowView";
import type { WorkflowKey } from "@/config/workflows";

type FlowComponent = ComponentType<{ flow: WorkflowKey }>;

/**
 * Renders the static diagram (identical markup, every step idle) and only
 * downloads the animated WorkflowFlow once the diagram is within ~300px of
 * the viewport. Under reduced motion the animation code is never loaded.
 */
export default function LazyWorkflowFlow({ flow }: { flow: WorkflowKey }) {
  const [Flow, setFlow] = useState<FlowComponent | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("@/components/motion/WorkflowFlow").then((m) => {
          if (!cancelled) setFlow(() => m.default);
        });
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return <div ref={ref}>{Flow ? <Flow flow={flow} /> : <WorkflowView flow={flow} />}</div>;
}
