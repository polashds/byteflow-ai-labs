import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — ByteFlow AI Labs",
  description: "Learn about ByteFlow AI Labs — who we are, what drives us, and why we build AI automation systems.",
};

const values = [
  {
    title: "Clarity",
    body: "We cut through the AI hype and build things that genuinely work — systems you understand, own, and can maintain.",
  },
  {
    title: "Speed",
    body: "We ship fast. Most projects go from scoping to live automation within days, not months.",
  },
  {
    title: "Craft",
    body: "Every pipeline, every prompt, every integration is built with care. We don't ship spaghetti.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-bg">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Who We Are
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-6">
            Built on{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Purpose
            </span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            ByteFlow AI Labs is an AI automation agency. We exist to make AI useful — not as a demo
            or a slide deck, but as running, reliable systems that free up human time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        <div className="border border-primary/15 bg-brand-surface p-10 lg:p-16">
          <p className="font-body text-[10px] tracking-[0.35em] text-accent uppercase mb-6">Our Mission</p>
          <p className="font-heading font-semibold text-brand-text text-2xl sm:text-3xl leading-snug max-w-3xl">
            Every business has repetitive, manual work that shouldn&apos;t need a human.
            We find it, automate it, and hand back the hours.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-surface border-t border-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                What Drives Us
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-4xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="border border-primary/15 bg-brand-bg p-8 hover:border-primary/35 transition-colors">
                <h3
                  className="font-heading font-semibold text-xl mb-4"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {v.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-24 text-center">
        <h2 className="font-heading font-semibold text-brand-text text-3xl mb-6">
          Let&apos;s work together
        </h2>
        <p className="font-body text-brand-muted mb-10 leading-relaxed">
          Tell us what you&apos;d like to automate and we&apos;ll figure out the best path forward.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-10 py-4 text-white font-body text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
