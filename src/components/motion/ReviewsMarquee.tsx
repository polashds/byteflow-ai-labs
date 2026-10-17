"use client";

import { useEffect, useRef, useState } from "react";
import { reviews, reviewsCopy, type Review } from "@/config/reviews";

function ReviewCard({ r, focusable = true }: { r: Review; focusable?: boolean }) {
  return (
    <figure className="flex h-full flex-col rounded-card border border-primary/15 bg-brand-surface p-6">
      <figcaption className="mb-3 font-body text-[10px] uppercase tracking-[0.22em] text-accent">
        {r.platform} · {r.project}
      </figcaption>
      <blockquote className="flex-1 font-body text-sm leading-relaxed text-brand-text">&ldquo;{r.quote}&rdquo;</blockquote>
      <a
        href={r.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={focusable ? undefined : -1}
        className="arrow-link mt-4 inline-flex min-h-[44px] items-center font-body text-sm text-accent hover:underline underline-offset-4"
      >
        {reviewsCopy.viewOn} {r.platform} <span aria-hidden="true" className="arrow ml-1">→</span>
      </a>
    </figure>
  );
}

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
        <ReviewCard r={r} focusable={false} />
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
              <ReviewCard r={r} />
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
