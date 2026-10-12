import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us",
  description:
    "ByteFlow AI Labs is a BD-first AI automation agency. We build self-hosted, AI-native systems on n8n, GPT-4o, and Claude so businesses automate operations without hiring more staff.",
  keywords: [
    "ByteFlow AI Labs",
    "AI automation agency Bangladesh",
    "n8n specialist agency",
    "self-hosted AI automation",
    "BD-first AI agency",
  ],
  openGraph: {
    title: "About ByteFlow AI Labs — BD-First AI Automation Agency",
    description:
      "We build self-hosted AI automation systems on n8n + GPT-4o/Claude. No SaaS lock-in — clients own every system we build. Based in Bangladesh, serving clients globally.",
    url: "/about",
  },
  twitter: {
    title: "About ByteFlow AI Labs",
    description:
      "BD-first AI automation agency. Self-hosted n8n systems, GPT-4o & Claude, Bengali + English — you own everything we build.",
  },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

const pillars = [
  {
    num: "01",
    title: "AI-Native",
    body: "Built around GPT-4o and Claude from the ground up — not retrofitted onto legacy systems. Every automation has AI embedded where it genuinely adds value, never as a checkbox.",
  },
  {
    num: "02",
    title: "You Own Everything",
    body: "Every system runs on your VPS. No SaaS seat fees that scale against you, no vendor lock-in, no single-point-of-failure subscriptions. You pay once and run it forever.",
  },
  {
    num: "03",
    title: "BD-First, Global-Ready",
    body: "Bengali and English natively. bKash, Nagad, and WhatsApp built into every relevant workflow. Designed for the Bangladeshi market — architecture that works anywhere in the world.",
  },
  {
    num: "04",
    title: "n8n Specialists",
    body: "400+ native integrations. Custom nodes when needed. Self-hosted, version-controlled, fully auditable. We've automated every corner of the n8n ecosystem across multiple industries.",
  },
];

const trustPoints = [
  {
    label: "50% Advance",
    body: "We take 50% before work begins and 50% on delivery. You only pay the remainder when you're satisfied with what's built.",
  },
  {
    label: "Milestone Approvals",
    body: "Nothing moves to the next phase without your sign-off. You review and approve each deliverable before we proceed.",
  },
  {
    label: "Loom Walkthroughs",
    body: "Every system handover includes Loom video walkthroughs so your team understands exactly what was built and how to use it.",
  },
  {
    label: "Full Documentation",
    body: "Every workflow, integration, and credential is documented. If you ever need to work with another developer, they can pick it up without us.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-bg">
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.10)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Who We Are
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-5xl md:text-6xl leading-[1.08] mb-8">
            The AI Studio That Builds{" "}
            <br className="hidden sm:block" />
            <span style={gradientText}>Systems You Actually Own</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            ByteFlow AI Labs is a BD-first AI automation agency. We design, build, and deploy
            self-hosted AI systems that help businesses automate their operations, close more
            leads, and grow without hiring more staff.
          </p>
        </div>
      </section>

      {/* ── Story ───────────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Story text */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-8 bg-primary/40" />
                <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                  Our Story
                </p>
              </div>
              <h2 className="font-heading font-semibold text-brand-text text-[1.5rem] sm:text-3xl leading-snug mb-6">
                Built in Bangladesh. Deployed Everywhere.
              </h2>
              <div className="space-y-4 font-body text-sm text-brand-muted leading-relaxed">
                <p>
                  ByteFlow AI Labs was founded with a single observation: businesses across
                  Bangladesh — real estate agencies, clinics, e-commerce stores, travel
                  companies — were drowning in manual work that AI could handle in seconds.
                  Leads going cold because nobody responded fast enough. Staff copying data
                  between systems by hand. Appointments missed because reminders were never sent.
                </p>
                <p>
                  The tools to fix these problems existed — n8n, GPT-4o, Claude, WhatsApp
                  Business API. But no agency in the market was putting them together into
                  systems that clients actually owned, without monthly SaaS subscriptions
                  and without vendor lock-in.
                </p>
                <p>
                  So we built it ourselves. A studio that designs AI-native automations,
                  deploys them on client infrastructure, documents them properly, and
                  hands over systems that clients can run indefinitely — with or without us.
                </p>
                <p>
                  We started with the BD market because it&apos;s our home and it&apos;s
                  underserved by quality automation agencies. But the stack we build — Next.js,
                  n8n, GPT-4o, self-hosted infrastructure — works for any business,
                  anywhere. We now serve clients in South Asia, Latin America, and beyond.
                </p>
              </div>
            </div>

            {/* Mission + Vision cards */}
            <div className="space-y-5">
              <div className="border border-primary/15 bg-brand-bg p-8">
                <p className="font-body text-[10px] tracking-[0.35em] text-accent uppercase mb-4">
                  Our Mission
                </p>
                <p className="font-heading font-semibold text-brand-text text-xl sm:text-2xl leading-snug">
                  Every business has repetitive, manual work that shouldn&apos;t need a
                  human. We find it, automate it, and hand back the hours.
                </p>
              </div>
              <div className="border border-primary/15 bg-brand-bg p-8">
                <p className="font-body text-[10px] tracking-[0.35em] text-accent uppercase mb-4">
                  Our Vision
                </p>
                <p className="font-heading font-semibold text-brand-text text-xl sm:text-2xl leading-snug">
                  A world where business owners control their AI systems outright —
                  not rent them month-to-month from a SaaS company they can&apos;t afford
                  to leave.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founder ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-primary/10 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                The Team
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-[1.5rem] sm:text-4xl">
              Meet the Founder
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="border border-primary/15 bg-brand-surface p-8 sm:p-10 text-center">
              <Image
                src="/images/siddique-circle-320.webp"
                alt="Md. Siddique Hossain, founder of ByteFlow AI Labs"
                width={128}
                height={128}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-primary/30 mx-auto mb-6 object-cover"
              />

              <h3 className="font-heading font-semibold text-brand-text text-2xl mb-1">
                Md. Siddique Hossain
              </h3>
              <p className="font-body text-xs text-accent tracking-[0.2em] uppercase mb-6">
                Founder · AI Systems Architect &amp; Automation Consultant
              </p>

              <div className="font-body text-[15px] text-brand-muted leading-relaxed max-w-lg mx-auto space-y-4 text-left sm:text-center">
                <p>
                  I founded ByteFlow AI Labs to build AI-powered automation that takes
                  repetitive enquiry, follow-up and data-entry work off a team&apos;s
                  plate: n8n workflows, WhatsApp and website chat assistants, and CRM
                  integrations.
                </p>
                <p>My education is in data science and AI.</p>
                <p>
                  I map a process before automating it, keep people in control at clear
                  handoff points, and build for what happens when something fails, not
                  only when it works.
                </p>
              </div>

              <p className="font-body text-xs text-brand-muted/80 mt-6">
                Based in Gazipur, Bangladesh (UTC+6) · working remotely
              </p>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 font-body text-sm">
                <a href="https://www.linkedin.com/in/siddique-ai-automation/" target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
                  LinkedIn
                </a>
                <a href="https://github.com/polashds" target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
                  GitHub
                </a>
                <a href="https://siddiquehossain.com" target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
                  siddiquehossain.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose ByteFlow ─────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-8 bg-primary/40" />
              <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                The Difference
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="font-heading font-semibold text-brand-text text-[1.5rem] sm:text-4xl mb-4">
              Why Choose ByteFlow
            </h2>
            <p className="font-body text-brand-muted text-[15px] max-w-xl mx-auto leading-relaxed">
              There are many agencies that will automate your workflows. Here is what
              makes working with ByteFlow different.
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="border border-primary/15 bg-brand-bg p-7 hover:border-primary/30 transition-colors duration-300"
              >
                <div
                  className="font-heading font-semibold text-[1.75rem] leading-none mb-5 opacity-20"
                  style={gradientText}
                >
                  {p.num}
                </div>
                <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Trust commitments */}
          <div className="border border-primary/15 bg-brand-bg p-8 lg:p-10">
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-7">
              How We Protect Your Investment
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustPoints.map((t) => (
                <div key={t.label}>
                  <h4
                    className="font-heading font-semibold text-base mb-2"
                    style={gradientText}
                  >
                    {t.label}
                  </h4>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Global Reach ────────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-primary/10 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-8 bg-primary/40" />
                <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                  Where We Work
                </p>
              </div>
              <h2 className="font-heading font-semibold text-brand-text text-[1.5rem] sm:text-3xl leading-snug mb-6">
                Bangladesh-Based.{" "}
                <span style={gradientText}>Globally Delivered.</span>
              </h2>
              <div className="space-y-4 font-body text-sm text-brand-muted leading-relaxed">
                <p>
                  Our primary market is Bangladesh — real estate agencies, clinics,
                  e-commerce stores, travel companies, and local service businesses
                  across Dhaka, Chittagong, and beyond. We understand the local stack:
                  bKash, Nagad, WhatsApp, Bengali-language chatbots, and BD business
                  culture.
                </p>
                <p>
                  But the systems we build travel. We work with global clients —
                  sourced through Fiverr and Upwork — across Latin America, the
                  Middle East, and Southeast Asia. Our deliverables are platform-agnostic
                  and fully documented in the client&apos;s working language where needed.
                </p>
                <p>
                  Whether you&apos;re a Dhaka real estate agency or a Latin American
                  e-commerce store, you get the same: a self-hosted, AI-native system
                  that you own outright from day one.
                </p>
              </div>
            </div>

            {/* Reach stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Home Market", value: "Bangladesh", sub: "BD-first stack: bKash, Nagad, WhatsApp, Bengali" },
                { label: "Global Clients", value: "Latin America & Beyond", sub: "Fiverr & Upwork engagements, multi-language handovers" },
                { label: "Deployment Model", value: "Self-Hosted VPS", sub: "Your server, your data, your system — always" },
                { label: "Working Languages", value: "Bengali · English · Spanish", sub: "Documentation delivered in client's working language" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-primary/15 bg-brand-surface p-6"
                >
                  <p className="font-body text-[10px] tracking-[0.2em] text-accent/60 uppercase mb-2">
                    {item.label}
                  </p>
                  <p className="font-heading font-semibold text-brand-text text-base mb-1.5 leading-snug">
                    {item.value}
                  </p>
                  <p className="font-body text-[11px] text-brand-muted/70 leading-snug">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-surface border-t border-primary/10 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.09)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Work With Us
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
            Let&apos;s Build Something{" "}
            <span style={gradientText}>That Lasts</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-10">
            Book a free 30-minute consultation. We&apos;ll audit your current operations,
            identify the highest-ROI automations, and give you a clear scope — at no cost,
            no obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ConsultationCTA
              className="px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book a Free Consultation
            </ConsultationCTA>
            <Link
              href="/portfolio"
              className="font-body text-[11px] text-brand-muted hover:text-accent tracking-[0.2em] uppercase transition-colors duration-200"
            >
              See Our Work →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
