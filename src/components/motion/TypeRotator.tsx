"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { heroRotator } from "@/config/workflows";

const { prefix, srLabel, phrases } = heroRotator;
const longest = Math.max(...phrases.map((p) => p.length));

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Terminal-style line that types, holds and deletes each phrase in turn
 * (adapted from siddiquehossain.com). Screen readers get the whole list once;
 * the moving text is aria-hidden. Width is reserved for the longest phrase,
 * so nothing reflows. Reduced motion shows the first phrase, fixed. Typing
 * and the caret stop while the line is off-screen.
 */
export default function TypeRotator() {
  const reduced = useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => true);
  const [visible, setVisible] = useState(false);
  const [i, setI] = useState(0);
  const [len, setLen] = useState<number>(phrases[0].length);
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !reduced;
  useEffect(() => {
    if (!running) return;
    const full = phrases[i];
    let t: number;
    if (!deleting && len === full.length) t = window.setTimeout(() => setDeleting(true), 1800);
    else if (deleting && len === 0)
      t = window.setTimeout(() => {
        setDeleting(false);
        setI((x) => (x + 1) % phrases.length);
      }, 300);
    else t = window.setTimeout(() => setLen((n) => n + (deleting ? -1 : 1)), deleting ? 30 : 60);
    return () => window.clearTimeout(t);
  }, [running, i, len, deleting]);

  const shown = reduced ? phrases[0] : phrases[i].slice(0, len);
  return (
    <p
      ref={ref}
      data-loop={running ? undefined : "off"}
      className="inline-flex max-w-full items-center gap-2 rounded-field border border-accent/25 bg-black/30 px-3 py-2 font-mono text-sm text-brand-muted sm:text-[15px]"
    >
      <span className="sr-only">
        {srLabel}: {phrases.join(", ")}.
      </span>
      <span aria-hidden="true" className="text-accent">
        &gt;
      </span>
      <span aria-hidden="true" className="whitespace-nowrap text-left" style={{ width: `${prefix.length + 1 + longest + 1}ch` }}>
        {prefix} <span className="text-brand-text">{shown}</span>
        <span className="type-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-accent" />
      </span>
    </p>
  );
}
