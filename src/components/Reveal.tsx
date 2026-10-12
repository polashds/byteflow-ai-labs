/**
 * Scroll reveal, adapted from siddiquehossain.com.
 *
 * Server component: the motion is the CSS `.reveal` class (scroll-driven,
 * inside @supports in globals.css). Content is in the initial HTML and fully
 * visible where scroll-driven animation is unsupported, with reduced motion,
 * or without JavaScript — there is no hidden-until-hydrated state and no
 * visible-then-hidden flash.
 *
 * `index` staggers siblings (0, 1, 2…). `delay` is accepted for backwards
 * compatibility and converted to an index (90ms ≈ one step).
 */
type RevealProps = {
  children: React.ReactNode;
  index?: number;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, index, delay = 0, className = "h-full" }: RevealProps) {
  const i = index ?? Math.round(delay / 90);
  return (
    <div className={`reveal ${className}`} style={{ "--i": i } as React.CSSProperties}>
      {children}
    </div>
  );
}
