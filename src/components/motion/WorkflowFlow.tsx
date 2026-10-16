"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import WorkflowView from "@/components/motion/WorkflowView";
import { workflows, type WorkflowKey } from "@/config/workflows";

/** One step every 2s. */
const STEP_MS = 2000;

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const subscribeVis = (cb: () => void) => {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
};

/**
 * Animated workflow, adapted from AutomationFlow on siddiquehossain.com.
 * Loaded on demand by LazyWorkflowFlow. One step is active at a time, passed
 * steps keep a tint and the connector into the active step fills (see .wf-*
 * in globals.css: colours, opacity and transform only). The loop stops while
 * the diagram is off-screen, the tab is hidden, or reduced motion is on.
 */
export default function WorkflowFlow({ flow }: { flow: WorkflowKey }) {
  const count = workflows[flow].steps.length;
  const [live, setLive] = useState(true);
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => true);
  const tabVisible = useSyncExternalStore(subscribeVis, () => document.visibilityState === "visible", () => true);
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = live && visible && tabVisible && !reduced;
  useEffect(() => {
    if (!running) return;
    let id = 0;
    const first = window.setTimeout(() => {
      setStep((s) => (s < 0 ? 0 : (s + 1) % count));
      id = window.setInterval(() => setStep((s) => (s + 1) % count), STEP_MS);
    }, 600);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [running, count]);

  return (
    <WorkflowView
      flow={flow}
      current={reduced ? -1 : step}
      live={live}
      onToggle={() => setLive((v) => !v)}
      listRef={ref}
    />
  );
}
