"use client";

import { useEffect, useRef, useState } from "react";
import { reviews, reviewsCopy } from "@/config/reviews";
import ReviewCard from "@/components/ReviewCard";

/**
 * Reviews in one slow, endless row (adapted from siddiquehossain.com).
 * Pauses on hover, keyboard focus, with the button (WCAG 2.2.2) and while
 * off-screen. Screen readers get the static list; under reduced motion the
 * static list is shown as a normal grid and the moving row is hidden.
 */
export default function ReviewsMarquee() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const row = (copy: number) =>
    reviews.map((r) => (
      <li key={`${copy}-${r.project}`} className="w-[19rem] shrink-0 pr-5 sm:w-[24rem]">
        <ReviewCard r={r} focusable={false} compact />
      </li>
    ));

  return (
    <>
      <div
        ref={ref}
        data-loop={visible ? undefined : "off"}
        className={`marquee marquee-reviews overflow-hidden ${paused ? "marquee-paused" : ""}`}
      >
        <ul className="marquee-static gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <li key={r.project}>
              <ReviewCard r={r} compact />
            </li>
          ))}
        </ul>
        <div className="marquee-track items-stretch py-1" aria-hidden="true">
          <ul className="flex items-stretch">{row(1)}</ul>
          <ul className="flex items-stretch">{row(2)}</ul>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className="motion-reduce:hidden inline-flex min-h-[44px] items-center gap-2 rounded-btn border border-white/15 px-4 font-body text-sm text-brand-text hover:border-accent hover:text-accent"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            {paused ? <path d="M3 1.5v9l7-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
          </svg>
          {paused ? reviewsCopy.play : reviewsCopy.pause}
        </button>
      </div>
      <p className="mt-4 text-center font-body text-xs text-brand-muted">{reviewsCopy.note}</p>
    </>
  );
}
