import Link from "next/link";
import OpenChatButton from "@/components/OpenChatButton";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden bg-brand-bg">
        {/* Blue radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_55%_40%,rgba(37,99,235,0.12)_0%,transparent_60%)]" />
        {/* Cyan accent glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_70%_35%,rgba(34,211,238,0.06)_0%,transparent_55%)]" />
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 text-center max-w-[960px] mx-auto px-6 lg:px-10">
          {/* Eyebrow */}
          <p className="font-body text-[11px] tracking-[0.45em] text-accent/80 uppercase mb-8">
            AI Automation Agency
          </p>

          {/* Headline */}
          <h1 className="font-heading font-semibold text-brand-text leading-[1.06] text-[2rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] mb-8">
            Build smarter workflows{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with AI
            </span>
          </h1>

          {/* Subline */}
          <p className="font-body text-[15px] text-brand-muted leading-[1.8] max-w-[520px] mx-auto mb-12">
            We design, build, and deploy AI automation systems that help businesses save time,
            reduce costs, and scale intelligently.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.4)]"
              style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
            >
              Get a Demo
            </Link>
            <OpenChatButton className="px-10 py-4 bg-transparent text-brand-text font-body text-[11px] font-normal tracking-[0.2em] uppercase border border-white/20 hover:border-accent hover:text-accent transition-all duration-300 cursor-pointer" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-brand-muted/60">
            Scroll
          </span>
          <div
            className="w-px h-14"
            style={{ background: "linear-gradient(to bottom, rgba(34,211,238,0.5), transparent)" }}
          />
        </div>
      </section>

      {/* ── Coming soon placeholder ────────────────────────────────────────── */}
      <section className="bg-brand-surface py-32 border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-body text-[10px] tracking-[0.45em] text-accent uppercase mb-4">
            Under Construction
          </p>
          <h2 className="font-heading font-semibold text-brand-text text-3xl sm:text-4xl mb-6">
            Full site launching soon
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.8] max-w-[480px] mx-auto mb-10">
            Services, case studies, and more are on their way. In the meantime, reach out and
            let&apos;s talk about what we can automate for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 font-body text-[11px] font-medium tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
