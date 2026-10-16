"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal fallback for browsers without CSS scroll-driven animation
 * (Firefox, older Safari). Renders nothing.
 *
 * Order matters so on-screen content never flashes hidden:
 *  1. .reveal elements already in the viewport are left alone (visible);
 *  2. the rest get data-io="wait";
 *  3. html.io-reveal is added, which hides only the "wait" elements;
 *  4. an IntersectionObserver switches each to data-io="in" as it scrolls in.
 * Runs in a layout effect (before paint) and again on each route change.
 * Skipped entirely where CSS handles it, under reduced motion, or without
 * IntersectionObserver, so content is never hidden in those cases.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const vh = window.innerHeight;
    const waiting = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-io])")).filter((el) => {
      const r = el.getBoundingClientRect();
      return !(r.top < vh && r.bottom > 0);
    });
    waiting.forEach((el) => el.setAttribute("data-io", "wait"));
    document.documentElement.classList.add("io-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-io", "in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    waiting.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
