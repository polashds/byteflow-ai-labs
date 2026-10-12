import type { Metadata } from "next";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";
import LeadMagnetModal from "@/components/LeadMagnetModal";
import HeroContent from "@/components/HeroContent";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { coreOffers, engagementSteps as steps } from "@/config/coreOffers";
import { caseStudies, projectTypeLabel } from "@/config/caseStudies";
import { faqs, homeFaqIndexes } from "@/config/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "WhatsApp & Lead Automation Agency — ByteFlow AI Labs" },
  description:
    "ByteFlow AI Labs builds lead-to-CRM, WhatsApp AI assistant and order-verification systems for businesses that sell through ads, websites and WhatsApp.",
  openGraph: {
    title: "WhatsApp & Lead Automation Agency — ByteFlow AI Labs",
    description:
      "Capture and answer every lead, hand repeat WhatsApp questions to an AI assistant, and verify orders and payments automatically — on infrastructure you own.",
    url: "/",
  },
  twitter: {
    title: "WhatsApp & Lead Automation Agency — ByteFlow AI Labs",
    description:
      "Lead-to-CRM, WhatsApp AI assistant and order-verification automation for businesses that sell through ads, websites and WhatsApp.",
  },
};

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

/** Reveal stagger: short, so the last card in a row is never far behind. */
const STAGGER_MS = 90;

const painPoints = [
  {
    title: "Leads go cold before anyone replies",
    body: "Enquiries arrive from ads, forms and WhatsApp at all hours. The business that answers first usually wins — and that is rarely the one checking messages by hand.",
  },
  {
    title: "Staff are buried in repeat questions",
    body: "Prices, availability, order status, opening hours — the same answers typed out all day instead of serving the customers who need a person.",
  },
  {
    title: "Orders and payments are checked by hand",
    body: "Payment screenshots, reference numbers and spreadsheets are matched one at a time, so confirmations are slow and duplicates slip through.",
  },
  {
    title: "Your tools don't talk to each other",
    body: "Ads, WhatsApp, the CRM and a spreadsheet each hold a piece of the picture, so nobody can say where a lead came from or what happened to it.",
  },
];

const reliability = [
  {
    title: "A person stays in the loop",
    body: "Automations follow rules you approve. Anything unclear, sensitive or high-value is handed to your team with the full context.",
  },
  {
    title: "Failures raise alerts",
    body: "Error handling, retries and failure alerts are built in, so a broken step is noticed instead of silently dropping a lead or an order.",
  },
  {
    title: "You own the system",
    body: "It runs on your server and your accounts, documented and handed over. There are no per-seat SaaS fees that grow against you.",
  },
  {
    title: "Built for how you sell",
    body: "Bengali and English, WhatsApp-first, aware of local payment methods like bKash and Nagad — and we have delivered for clients outside Bangladesh too.",
  },
];

const proof = caseStudies.filter((c) => !c.isPlaceholder);
const homeFaqs = homeFaqIndexes.map((i) => faqs[i]).filter(Boolean);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-brand-bg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(37,99,235,0.14)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_72%_38%,rgba(34,211,238,0.07)_0%,transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <HeroContent />
      </section>

      {/* ── Pain points ───────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Where it goes wrong">
            Where leads and orders{" "}
            <span style={gradientText}>get lost</span>
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * STAGGER_MS}>
                <div className="h-full border border-primary/15 bg-brand-bg p-7 hover:border-primary/30 transition-colors duration-300">
                  <h3 className="font-heading font-semibold text-brand-text text-lg leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core systems mapped to those problems ─────────────────────────── */}
      <section id="systems" className="bg-brand-bg border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What we build">
            Three systems,{" "}
            <span style={gradientText}>each fixing one problem</span>
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {coreOffers.map((offer, i) => (
              <Reveal key={offer.slug} delay={i * STAGGER_MS}>
                <Link
                  href={`/services/${offer.slug}`}
                  className="group flex h-full flex-col border border-primary/15 bg-brand-surface p-8 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <p className="font-body text-[10px] font-medium tracking-[0.25em] text-accent/80 uppercase mb-4">
                    {offer.painTag}
                  </p>
                  <h3 className="font-heading font-semibold text-brand-text text-xl leading-snug mb-4">
                    {offer.shortTitle}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-6">
                    {offer.cardSummary}
                  </p>
                  <span className="mt-auto font-body text-[11px] text-accent tracking-[0.18em] uppercase">
                    How it works{" "}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <p className="text-center font-body text-sm text-brand-muted">
            Need something these don&apos;t cover — a voice agent, tracking, or a custom integration?{" "}
            <Link href="/services" className="text-accent hover:underline">
              See the full service catalogue
            </Link>{" "}
            or{" "}
            <Link href="/contact#contact-form" className="text-accent hover:underline">
              describe your workflow
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── How we work ───────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="How an engagement works">
            From first call to{" "}
            <span style={gradientText}>a system that runs</span>
          </SectionHeading>

          <div className="relative">
            <div className="hidden lg:block absolute top-[22px] left-[13%] right-[13%] h-px bg-primary/15" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * STAGGER_MS} className="">
                  <div>
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center mb-7 relative z-10 lg:mx-auto border border-primary/30 bg-brand-surface"
                    >
                      <span style={gradientText} className="font-heading font-semibold text-sm">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-brand-text text-lg mb-3 lg:text-center">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-brand-muted leading-relaxed lg:text-center">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Proof">
            Systems we have{" "}
            <span style={gradientText}>built and run</span>
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {proof.map((cs, i) => (
              <Reveal key={cs.id} delay={i * STAGGER_MS}>
                <Link
                  href={`/portfolio#${cs.id}`}
                  className="group block h-full border border-primary/15 bg-brand-surface p-8 hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="font-body text-[10px] font-medium tracking-[0.25em] text-accent uppercase border border-accent/20 px-2.5 py-1">
                      {cs.industry}
                    </span>
                    {cs.projectType && (
                      <span className="font-body text-[10px] tracking-[0.18em] text-brand-muted uppercase">
                        {projectTypeLabel[cs.projectType]}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-semibold text-brand-text text-xl leading-snug mb-3">
                    {cs.client}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">
                    {cs.tagline}
                  </p>
                  <span className="font-body text-[11px] text-accent tracking-[0.18em] uppercase">
                    Read the case study{" "}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="text-center font-body text-xs text-brand-muted/80">
            We publish what was built and what it does. Results appear only once they have been measured.
          </p>
        </div>
      </section>

      {/* ── Reliability and oversight ─────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="How we keep it dependable">
            Automation your team can{" "}
            <span style={gradientText}>trust and oversee</span>
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reliability.map((r, i) => (
              <Reveal key={r.title} delay={i * STAGGER_MS}>
                <div className="h-full border border-primary/15 bg-brand-bg p-7 hover:border-primary/30 transition-colors duration-300">
                  <h3 className="font-heading font-semibold text-brand-text text-lg leading-snug mb-3">
                    {r.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free guide (lead magnet) ──────────────────────────────────────── */}
      <section className="bg-brand-bg border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-8 bg-primary/40" />
                <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
                  Free Guide
                </p>
              </div>
              <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-5">
                10 AI Automations{" "}
                <span style={gradientText}>Every BD Business Needs</span>
              </h2>
              <p className="font-body text-brand-muted text-[15px] leading-relaxed mb-8 max-w-lg">
                Not ready to talk yet? A practical playbook of automations used by growing
                businesses in Bangladesh — free, no credit card required.
              </p>
              <LeadMagnetModal />
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_70%)]" />

              <div
                className="relative w-[240px] sm:w-[280px] aspect-[3/4] border border-primary/25 bg-brand-surface flex flex-col justify-between p-7"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(37,99,235,0.06), 0 24px 60px rgba(37,99,235,0.10)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-25"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                />

                <div>
                  <p className="font-body text-[9px] tracking-[0.4em] text-accent/80 uppercase mb-4">
                    ByteFlow AI Labs
                  </p>
                  <div className="h-px w-full bg-primary/20 mb-5" />
                  <h3 className="font-heading font-semibold text-brand-text text-xl leading-snug mb-1">
                    10 AI Automations
                  </h3>
                  <p className="font-heading text-brand-muted text-base leading-snug">
                    Every BD Business Needs
                  </p>
                </div>

                <div>
                  <div className="h-px w-full bg-primary/20 mb-4" />
                  <ul className="space-y-2.5">
                    {[
                      "WhatsApp Lead Bots",
                      "AI Voice Receptionists",
                      "Auto Follow-Up Flows",
                      "AI Content Pipelines",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
                        />
                        <span className="font-body text-[11px] text-brand-muted/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Questions">
            Before you{" "}
            <span style={gradientText}>get in touch</span>
          </SectionHeading>

          <div className="divide-y divide-primary/10 border-t border-primary/10">
            {homeFaqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-heading font-semibold text-brand-text text-base leading-snug">
                    {item.q}
                  </span>
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
          <p className="mt-8 text-center font-body text-sm text-brand-muted">
            More answers on the{" "}
            <Link href="/faq" className="text-accent hover:underline">
              FAQ page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-bg border-t border-primary/10 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Next step
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl lg:text-5xl leading-tight mb-6">
            Tell us where leads or orders{" "}
            <span style={gradientText}>get stuck</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-8">
            Describe the workflow in the contact form. We reply within one business day to set up
            a free 30-minute call, then send a scoped proposal if there is a fit — no commitment
            required.
          </p>
          <ConsultationCTA
            location="home_final"
            className="inline-flex px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
            style={gradientBg}
          >
            Discuss Your Workflow
          </ConsultationCTA>
        </div>
      </section>
    </>
  );
}
