"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";
import { brand } from "@/config/branding";

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

export default function HeroContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reveal = (delayMs: number) =>
    mounted ? { className: "animate-fade-up", style: { animationDelay: `${delayMs}ms` } } : {};

  return (
    <div className="relative z-10 text-center max-w-[1000px] mx-auto px-6 lg:px-10 pt-20 pb-32">
      {/* Eyebrow */}
      <p
        className={`font-body text-[11px] tracking-[0.45em] text-accent/80 uppercase mb-8 ${reveal(0).className ?? ""}`}
        style={reveal(0).style}
      >
        {brand.motto}
      </p>

      {/* Headline */}
      <h1
        className={`font-heading font-semibold text-brand-text leading-[1.06] text-[2.15rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] mb-8 ${reveal(100).className ?? ""}`}
        style={reveal(100).style}
      >
        Transform Your Business{" "}
        <br className="hidden sm:block" />
        with{" "}
        <span className="inline-block" style={gradientText}>
          AI Automation
        </span>
      </h1>

      {/* Subline */}
      <p
        className={`font-body text-[15px] sm:text-base text-brand-muted leading-[1.85] max-w-[560px] mx-auto mb-12 ${reveal(200).className ?? ""}`}
        style={reveal(200).style}
      >
        AI agents, smart automations, and intelligent workflows that save time, cut
        costs, and accelerate growth — without hiring more staff.
      </p>

      {/* CTAs */}
      <div
        className={`flex flex-col sm:flex-row gap-4 justify-center ${reveal(300).className ?? ""}`}
        style={reveal(300).style}
      >
        <ConsultationCTA
          className="px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
          style={gradientBg}
        >
          Book Free Consultation
        </ConsultationCTA>
        <Link
          href="/services"
          className="px-10 py-4 bg-transparent text-brand-text font-body text-[11px] font-normal tracking-[0.2em] uppercase border border-white/20 hover:border-accent hover:text-accent transition-all duration-300"
        >
          Explore Services →
        </Link>
      </div>
    </div>
  );
}
