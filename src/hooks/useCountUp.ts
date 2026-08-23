import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  duration?: number;
  threshold?: number;
};

export function useCountUp<T extends HTMLElement>(
  target: number,
  { duration = 1500, threshold = 0.3 }: UseCountUpOptions = {}
) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // initial state already equals target — no animation needed
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        setValue(0);

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return { ref, value };
}
