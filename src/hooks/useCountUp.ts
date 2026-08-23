import { useEffect, useState } from "react";
import { useInView } from "./useInView";

type UseCountUpOptions = {
  duration?: number;
  threshold?: number;
};

export function useCountUp<T extends HTMLElement>(
  target: number,
  { duration = 1500, threshold = 0.3 }: UseCountUpOptions = {}
) {
  const { ref, inView } = useInView<T>({ threshold });
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!inView) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // initial state already equals target — no animation needed
    }

    const start = performance.now();
    setValue(0);

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return { ref, value };
}
