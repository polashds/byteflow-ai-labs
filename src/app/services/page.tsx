import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — ByteFlow AI Labs",
  description: "AI automation services: workflow automation, intelligent chatbots, data pipelines, and custom AI integrations for modern businesses.",
};

const services = [
  {
    icon: "⚡",
    title: "Workflow Automation",
    body: "Replace manual, repetitive tasks with intelligent automated workflows. From data entry to approval routing — we build pipelines that run without human intervention.",
    points: ["n8n & Zapier orchestration", "API integrations", "Trigger-based automation", "Error handling & monitoring"],
  },
  {
    icon: "🤖",
    title: "AI Chatbots & Assistants",
    body: "Deploy conversational AI that answers questions, qualifies leads, and handles support — trained on your specific business context and integrated into your existing tools.",
    points: ["Custom LLM fine-tuning", "CRM integration", "Multi-channel deployment", "Lead capture & handoff"],
  },
  {
    icon: "🔗",
    title: "Data Pipelines",
    body: "Move, transform, and sync data across your stack reliably. We design pipelines that keep your systems in sync and your data clean.",
    points: ["ETL / ELT pipelines", "Real-time sync", "Data transformation", "Warehouse integration"],
  },
  {
    icon: "🧠",
    title: "Custom AI Integrations",
    body: "Embed AI capabilities — classification, summarisation, extraction, generation — directly into your existing software and workflows.",
    points: ["LLM API integration", "Document processing", "Semantic search", "AI-powered reporting"],
  },
];

const whyUs = [
  { label: "Outcome-Focused", body: "We measure success by hours saved and revenue generated, not by features shipped." },
  { label: "Rapid Delivery", body: "Most automations are live within days, not months. We iterate fast and adjust as you grow." },
  { label: "Built to Last", body: "Every system we build is documented, observable, and easy for your team to maintain." },
  { label: "AI-Native", body: "AI isn't bolted on — it's embedded thoughtfully where it genuinely adds value." },
];

export default function ServicesPage() {
  return (
    <div className="bg-brand-bg">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              What We Offer
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-8">
            AI Automation{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We design and deploy AI automation systems that help your business save time,
            reduce costs, and scale without adding headcount.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="border border-primary/15 bg-brand-surface p-8 hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-5">{s.icon}</div>
              <h2 className="font-heading font-semibold text-brand-text text-2xl mb-4">{s.title}</h2>
              <p className="font-body text-sm text-brand-muted leading-relaxed mb-6">{s.body}</p>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-body text-sm text-brand-muted">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: "#22D3EE" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-brand-surface border-t border-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                The Difference
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-4xl">Why ByteFlow</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w) => (
              <div key={w.label} className="border border-primary/15 bg-brand-bg p-7">
                <h3
                  className="font-heading font-semibold text-lg mb-3"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {w.label}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-24 text-center">
        <h2 className="font-heading font-semibold text-brand-text text-4xl mb-6">
          Ready to automate?
        </h2>
        <p className="font-body text-brand-muted mb-10 leading-relaxed">
          Tell us what you want to automate and we&apos;ll scope it with you — no obligation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-10 py-4 text-white font-body text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
        >
          Get a Demo
        </Link>
      </section>
    </div>
  );
}
