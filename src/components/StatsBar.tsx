"use client";

import { useCountUp } from "@/hooks/useCountUp";

type Stat = { value: string; label: string };

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { number: Number(match[1]), suffix: match[2] } : { number: 0, suffix: value };
}

function StatItem({ stat, bordered }: { stat: Stat; bordered: boolean }) {
  const { number, suffix } = parseStat(stat.value);
  const { ref, value } = useCountUp<HTMLDivElement>(number);

  return (
    <div
      ref={ref}
      className={`py-10 px-6 text-center ${bordered ? "border-l border-primary/10" : ""}`}
    >
      <div className="font-heading font-semibold text-3xl sm:text-4xl mb-2" style={gradientText}>
        {value}{suffix}
      </div>
      <p className="font-body text-[11px] text-brand-muted tracking-[0.12em] uppercase leading-snug">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-brand-surface border-y border-primary/10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} bordered={i !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
