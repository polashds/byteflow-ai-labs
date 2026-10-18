import type { Metadata } from "next";
import WorkflowSection from "@/components/motion/WorkflowSection";
import Link from "next/link";
import { Clock, MessageCircle, MessagesSquare, Receipt, ReceiptText, Unplug, UsersRound } from "lucide-react";
import ReviewsMarquee from "@/components/motion/ReviewsMarquee";
import VideoEmbed from "@/components/project/VideoEmbed";
import { introVideo } from "@/config/videos";
import ConsultationCTA from "@/components/ConsultationCTA";
import LeadMagnetModal from "@/components/LeadMagnetModal";
import HeroContent from "@/components/HeroContent";
import Reveal from "@/components/Reveal";
import LoopGate from "@/components/motion/LoopGate";
import SectionHeading from "@/components/SectionHeading";
import { coreOffers, engagementSteps as steps } from "@/config/coreOffers";
import { caseStudies, projectTypeLabel } from "@/config/caseStudies";
import { faqs, homeFaqIndexes } from "@/config/faqs";
import { afterContactSteps, supportTerms } from "@/config/contact";
import { reviewsCopy } from "@/config/reviews";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "WhatsApp & Lead Automation Agency — ByteFlow AI Labs" },
  description:
    "ByteFlow AI Labs builds lead-to-CRM, WhatsApp AI assistant and order-verification systems for businesses in Bangladesh and abroad that sell through ads, websites and WhatsApp.",
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

/** Bento layout on lg: 6 columns, wide–narrow / narrow–wide. */
const painSpans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];
const painIcons = [Clock, MessagesSquare, Receipt, Unplug];
const offerIcons: Record<string, typeof UsersRound> = {
  "lead-to-crm-automation": UsersRound,
  "whatsapp-ai-assistant": MessageCircle,
  "order-payment-automation": ReceiptText,
};

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

/** Common to the three core systems — see each offer's `deliverables` for specifics. */
const included = [
  "Workflow mapping and a written scope",
  "Build and testing on staging with your real data",
  "Setup on your own server and accounts",
  "Error handling and failure alerts",
  "Documentation and recorded walkthroughs",
  supportTerms.short.charAt(0).toUpperCase() + supportTerms.short.slice(1),
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
        {/* Static line grid, faded toward the edges with a mask; decorative only. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_30%,transparent_80%)]"
          style={{
            backgroundImage:
              "linear-gradient(#22D3EE 1px, transparent 1px), linear-gradient(90deg, #22D3EE 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <HeroContent />
      </section>

      {/* ── Intro video (hidden until a video id is set in src/config/videos.ts) ── */}
      {introVideo.youtubeId && (
        <section className="bg-brand-bg border-t border-primary/10 py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading eyebrow={introVideo.eyebrow}>{introVideo.heading}</SectionHeading>
            <figure>
              <VideoEmbed youtubeId={introVideo.youtubeId} title={introVideo.title} poster={introVideo.poster} />
              <figcaption className="mt-3 text-center font-body text-xs text-brand-muted">{introVideo.caption}</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ── Pain points ───────────────────────────────────────────────────── */}
      <section className="bg-brand-surface border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Where it goes wrong">
            Where leads and orders{" "}
            <span style={gradientText}>get lost</span>
          </SectionHeading>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {painPoints.map((p, i) => {
              const Icon = painIcons[i];
              const wide = painSpans[i] === "lg:col-span-4";
              return (
                <li key={p.title} className={painSpans[i]}>
                  <Reveal index={i}>
                    <div className="problem-card h-full rounded-card border border-primary/15 bg-brand-bg p-7">
                      {wide && (
                        <span
                          aria-hidden="true"
                          className="grid-dots pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 opacity-60 lg:block [mask-image:linear-gradient(90deg,transparent,#000)]"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="relative mb-5 inline-flex size-11 items-center justify-center rounded-field border border-accent/25 bg-accent/10 text-accent"
                      >
                        <Icon className="size-5" />
                      </span>
                      <h3 className={`relative font-heading font-semibold text-brand-text leading-snug mb-3 ${wide ? "text-xl lg:max-w-md" : "text-lg"}`}>
                        {p.title}
                      </h3>
                      <p className={`relative font-body text-sm text-brand-muted leading-relaxed ${wide ? "lg:max-w-lg" : ""}`}>{p.body}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Illustrative lead flow ─────────────────────────────────────────── */}
      <WorkflowSection flow="lead" />

      {/* ── Core systems mapped to those problems ─────────────────────────── */}
      <section id="systems" className="bg-brand-bg border-t border-primary/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What we build">
            Three systems,{" "}
            <span style={gradientText}>each fixing one problem</span>
          </SectionHeading>

          {/* Bento on lg: the first system is a tall card, the other two stack beside it. */}
          <ul className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6 mb-10">
            {coreOffers.map((offer, i) => {
              const Icon = offerIcons[offer.slug] ?? UsersRound;
              return (
              <li key={offer.slug} className={i === 0 ? "lg:row-span-2" : ""}>
              <Reveal index={i}>
                <Link
                  href={`/services/${offer.slug}`}
                  className={`lift group relative flex h-full flex-col overflow-hidden border border-primary/15 rounded-card bg-brand-surface ${i === 0 ? "p-8 lg:p-10" : "p-8"}`}
                >
                  {i === 0 && (
                    <span
                      aria-hidden="true"
                      className="grid-dots pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-50 [mask-image:linear-gradient(180deg,transparent,#000)]"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`relative mb-6 inline-flex items-center justify-center rounded-field border border-accent/25 bg-accent/10 text-accent ${i === 0 ? "size-14" : "size-11"}`}
                  >
                    <Icon className={i === 0 ? "size-6" : "size-5"} />
                  </span>
                  <p className="relative font-body text-[10px] font-medium tracking-[0.25em] text-accent/80 uppercase mb-4">
                    {offer.painTag}
                  </p>
                  <h3 className={`relative font-heading font-semibold text-brand-text leading-snug mb-4 ${i === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}>
                    {offer.shortTitle}
                  </h3>
                  <p className={`relative font-body text-brand-muted leading-relaxed mb-6 ${i === 0 ? "text-base max-w-md" : "text-sm"}`}>
                    {offer.cardSummary}
                  </p>
                  <span className="relative mt-auto font-body text-[11px] text-accent tracking-[0.18em] uppercase">
                    How it works{" "}
                    <span aria-hidden="true" className="arrow">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
              </li>
              );
            })}
          </ul>

          <p className="text-center font-body text-sm text-brand-muted">
            Need something these don&apos;t cover — a voice agent, tracking, or a custom integration?{" "}
            <Link href="/services" className="text-accent underline underline-offset-2 hover:text-brand-text">
              See the full service catalogue
            </Link>{" "}
            or{" "}
            <Link href="/contact#contact-form" className="text-accent underline underline-offset-2 hover:text-brand-text">
              describe your workflow
            </Link>
            .
          </p>
          <p className="mt-4 text-center font-body text-sm text-brand-muted">
            Based in Bangladesh: see our{" "}
            <Link href="/ai-automation-agency-bangladesh" className="text-accent underline underline-offset-2 hover:text-brand-text">
              AI automation for Bangladeshi businesses
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

          <LoopGate className="tl relative">
            <div aria-hidden="true" className="tl-line hidden lg:block absolute top-[22px] left-[13%] right-[13%] h-px">
              <span className="tl-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              {steps.map((step, i) => (
                <Reveal key={step.num} delay={i * STAGGER_MS} className="">
                  <div>
                    <div
                      className="tl-badge w-11 h-11 rounded-full flex items-center justify-center mb-7 relative z-10 lg:mx-auto border border-primary/30 bg-brand-surface"
                    >
                      <span aria-hidden="true" className="tl-ring" style={{ "--i": i } as React.CSSProperties} />
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
          </LoopGate>

          <div className="glow-hover mt-16 border border-primary/15 rounded-card bg-brand-bg p-7 lg:p-9">
            <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent uppercase mb-5">
              Included in every core-system engagement
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 font-body text-sm text-brand-muted">
                  <span aria-hidden="true" className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-body text-xs text-brand-muted">
              Third-party costs such as WhatsApp Business API fees, AI model usage and hosting are billed
              at cost or paid directly by you. Exact scope is written into your proposal.
            </p>
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
                  className="lift group block h-full border border-primary/15 rounded-card bg-brand-surface p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="font-body text-[10px] font-medium tracking-[0.25em] text-accent uppercase border border-accent/20 rounded-full px-2.5 py-1">
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
                    <span aria-hidden="true" className="arrow">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="text-center font-body text-xs text-brand-muted">
            We publish what was built and what it does. Results appear only once they have been measured.
          </p>

          <div className="mt-20">
            <SectionHeading eyebrow={reviewsCopy.eyebrow}>{reviewsCopy.heading}</SectionHeading>
            <ReviewsMarquee />
          </div>
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
                <div className="glow-hover h-full border border-primary/15 rounded-card bg-brand-bg p-7">
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
                <span style={gradientText}>Every Business Needs</span>
              </h2>
              <p className="font-body text-brand-muted text-[15px] leading-relaxed mb-8 max-w-lg">
                Not ready to talk yet? Ten practical automations grouped by industry, with the
                first step for each — free, no credit card required.
              </p>
              <LeadMagnetModal />
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.12)_0%,transparent_70%)]" />

              <div
                className="relative w-[240px] sm:w-[280px] aspect-[3/4] border border-primary/25 rounded-card bg-brand-surface flex flex-col justify-between p-7"
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
                    Every Business Needs
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
                        <span className="font-body text-[11px] text-brand-muted">{item}</span>
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
            <Link href="/faq" className="text-accent underline underline-offset-2 hover:text-brand-text">
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
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-10">
            Describe the workflow in the contact form — no commitment required. Here is what happens
            after you send it.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-10">
            {afterContactSteps.map((s, i) => (
              <li key={s.title} className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-5">
                <span className="block font-heading font-semibold text-xs mb-2" style={gradientText}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block font-heading font-semibold text-brand-text text-sm mb-1.5">
                  {s.title}
                </span>
                <span className="block font-body text-xs text-brand-muted leading-relaxed">{s.body}</span>
              </li>
            ))}
          </ol>
          <ConsultationCTA
            location="home_final"
            className="rounded-btn inline-flex px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
            style={gradientBg}
          >
            Discuss Your Workflow
          </ConsultationCTA>
        </div>
      </section>
    </>
  );
}
