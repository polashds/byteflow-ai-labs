import type { Metadata } from "next";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { brand } from "@/config/branding";

/*
 * Bangladesh-focused landing page for "n8n automation agency Bangladesh".
 * Facts only: drawn from the n8n VPS Infrastructure service category and the
 * Mustaraka / Nova case studies. No prices, uptime or client-count claims.
 */

const PATH = "/n8n-automation-agency-bangladesh";
const TITLE = "n8n Automation Agency in Bangladesh — Self-Hosted Workflows";
const DESCRIPTION =
  "n8n automation agency in Bangladesh. We install self-hosted n8n on your own server, build custom workflows, migrate from Zapier or Make, and maintain them — so you own your automations with no per-task fees.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} — ${brand.name}`, description: DESCRIPTION, url: PATH, type: "website" },
  twitter: { title: `${TITLE} — ${brand.name}`, description: DESCRIPTION },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

const capabilities = [
  {
    title: "Self-hosted n8n setup",
    body: "A production n8n instance on your own VPS with Docker, Traefik, automatic SSL, hardening and a backup plan.",
  },
  {
    title: "Custom workflows",
    body: "Workflows designed around your process, from simple 3-step automations to multi-branch logic with error handling and retries.",
  },
  {
    title: "Integrations",
    body: "WhatsApp, Meta lead forms, Google Sheets, CRMs, payment checks and any REST API or webhook your business uses.",
  },
  {
    title: "Zapier and Make migration",
    body: "We audit your existing automations, find failure points and rebuild them on self-hosted n8n, with a cost comparison.",
  },
  {
    title: "Failure alerts",
    body: "If a workflow fails, your team gets a WhatsApp, Telegram or Slack alert instead of finding out from a customer.",
  },
  {
    title: "Ongoing management",
    body: "An optional monthly retainer for monitoring, fixes and new workflows, with response times agreed in your contract.",
  },
];

const audiences = [
  "Businesses paying growing Zapier or Make bills",
  "Teams with automations nobody maintains",
  "Real estate, travel and clinics handling leads",
  "E-commerce and Facebook shops",
  "Companies that must keep data on their own server",
];

const steps = [
  { title: "Free 30-minute call", body: "We map the process you want to automate and the tools involved." },
  { title: "Scope and design", body: "A workflow design and architecture you approve before we build." },
  { title: "Build and test", body: "Built on your server, tested with real data, with failure alerts switched on." },
  { title: "Handover and support", body: "Documentation, a recorded walkthrough and 30 days of post-launch support." },
];

const faqs = [
  {
    q: "What is n8n?",
    a: "n8n is a workflow automation tool, similar to Zapier or Make, that can be self-hosted. Running it on your own server means you own the workflows and data and pay for the server instead of per task.",
  },
  {
    q: "Why self-host n8n instead of using Zapier or Make?",
    a: "Self-hosting removes per-task pricing and keeps customer data on infrastructure you control. The trade-off is that the server needs setting up and maintaining, which is the part we handle.",
  },
  {
    q: "Can you migrate our existing Zapier or Make automations?",
    a: "Yes. We audit what you have, identify failure points, and rebuild the workflows on self-hosted n8n, with a cost comparison in the handover report.",
  },
  {
    q: "Which server do we need?",
    a: "A small VPS is usually enough to start. We advise on the provider and size during scoping, and the server is registered in your name.",
  },
  {
    q: "Do you work with businesses outside Bangladesh?",
    a: "Yes. We are based in Bangladesh and work remotely with clients locally and worldwide.",
  },
  {
    q: "What happens if a workflow breaks?",
    a: "Workflows include error handling and failure alerts. After the 30-day support period you can handle fixes in-house using the documentation, or choose a monthly management retainer.",
  },
];

export default function N8nAgencyBangladeshPage() {
  const pageUrl = `${brand.siteUrl}${PATH}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "n8n automation agency in Bangladesh",
    description: DESCRIPTION,
    url: pageUrl,
    serviceType: "n8n workflow automation",
    areaServed: { "@type": "Country", name: "Bangladesh" },
    provider: { "@id": `${brand.siteUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "n8n automation agency Bangladesh", item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="bg-brand-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.12)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <p className="animate-fade-up font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-6">
            Self-hosted · Your server · No per-task fees
          </p>
          <h1
            className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6"
            style={{ animationDelay: "80ms" }}
          >
            n8n automation agency <span style={gradientText}>in Bangladesh</span>
          </h1>
          <p
            className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl mb-9"
            style={{ animationDelay: "160ms" }}
          >
            ByteFlow AI Labs is an n8n automation agency based in Bangladesh. We install self-hosted n8n
            on your own server, build custom workflows around your process, migrate automations from
            Zapier or Make, and keep them running — so you own the workflows and the data, with no
            per-task fees.
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "240ms" }}>
            <ConsultationCTA
              location="n8n_bd_hero"
              className="rounded-btn inline-flex justify-center px-9 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book a Free 30-Minute Call
            </ConsultationCTA>
            <Link
              href="/services#n8n-infrastructure"
              className="inline-flex justify-center px-9 py-4 text-brand-text font-body text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-btn hover:border-accent hover:text-accent transition-all duration-300"
            >
              Full service details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why self-hosted ───────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-4">
            Why self-hosted n8n
          </p>
          <p className="font-heading text-brand-text text-xl sm:text-2xl leading-snug">
            Hosted automation tools charge per task, so costs rise as the business grows, and customer
            data sits on someone else&apos;s platform. Self-hosted n8n runs on your own server for a flat
            server cost — but it needs setting up, securing and maintaining properly.
          </p>
        </div>
      </section>

      {/* ── What it does ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What it does">
            What we <span style={gradientText}>do</span>
          </SectionHeading>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c, i) => (
              <li key={c.title}>
                <Reveal index={i} className="glow-hover h-full border border-primary/15 rounded-card bg-brand-surface p-6">
                  <h3 className="font-heading font-semibold text-brand-text text-base mb-2">{c.title}</h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Who it is for ─────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-6">
            Who it is for
          </p>
          <ul className="flex flex-wrap gap-3">
            {audiences.map((a) => (
              <li key={a} className="border border-primary/20 rounded-full px-4 py-2 font-body text-sm text-brand-text">
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-body text-sm text-brand-muted">
            Any business that wants automations it owns and can rely on.
          </p>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Built and running">
            Built on n8n, <span style={gradientText}>running live</span>
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-7">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                Our own venture · Dhaka
              </p>
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">Mustaraka Properties</h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed">
                Every lead from the website or a Meta lead ad triggers a self-hosted n8n workflow that
                sends automatic WhatsApp and Telegram alerts to agents, alongside a WhatsApp booking agent.
              </p>
            </div>
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-7">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                Client project
              </p>
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">Nova Digital Store</h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed">
                A 69-node n8n workflow verifies WhatsApp payment receipts with OCR and duplicate
                detection, replacing manual checking.
              </p>
            </div>
          </div>
          <p className="mt-6 text-center">
            <Link href="/portfolio" className="font-body text-sm text-accent hover:underline underline-offset-4">
              See the full case studies →
            </Link>
          </p>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="How a project works">
            From call to <span style={gradientText}>running workflows</span>
          </SectionHeading>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal index={i} className="glow-hover h-full border border-primary/15 rounded-card bg-brand-bg p-6">
                  <span className="font-heading text-sm" style={gradientText}>
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-heading font-semibold text-brand-text text-base mb-2">{s.title}</h3>
                  <p className="font-body text-[13px] text-brand-muted leading-relaxed">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Questions">
            Common <span style={gradientText}>questions</span>
          </SectionHeading>
          <div className="divide-y divide-primary/10 border-t border-primary/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-heading font-semibold text-brand-text text-base leading-snug">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="text-accent text-xl shrink-0 -mt-0.5 group-open:rotate-45 transition-transform duration-200"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 font-body text-sm text-brand-muted leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10 bg-brand-surface py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl leading-tight mb-5">
            Tell us the process you want to automate.{" "}
            <span style={gradientText}>We&apos;ll show you what can be automated.</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">
            Free 30-minute call, no commitment. A person from our team follows up after you send the form.
          </p>
          <ConsultationCTA
            location="n8n_bd_final"
            className="rounded-btn inline-flex px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
            style={gradientBg}
          >
            Book a Free 30-Minute Call
          </ConsultationCTA>
        </div>
      </section>
    </div>
  );
}
