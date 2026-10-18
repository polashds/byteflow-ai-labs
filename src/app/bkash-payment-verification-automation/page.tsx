import type { Metadata } from "next";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WorkflowSection from "@/components/motion/WorkflowSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import { brand } from "@/config/branding";

/*
 * Bangladesh-focused landing page for "bKash payment verification automation".
 * Facts only: drawn from the order & payment verification offer and the Nova
 * case study. We verify screenshots against the client's records; we do not
 * claim a direct bKash/Nagad API integration and never move money.
 */

const PATH = "/bkash-payment-verification-automation";
const TITLE = "bKash & Nagad Payment Verification Automation for Bangladeshi Businesses";
const DESCRIPTION =
  "Stop checking bKash, Nagad and bank-transfer screenshots by hand. We automate payment verification: read the screenshot, match it to the order, catch duplicates and confirm the customer on WhatsApp.";

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
    title: "Reads payment screenshots",
    body: "Extracts the amount and transaction reference from bKash, Nagad and bank-transfer screenshots customers send on WhatsApp.",
  },
  {
    title: "Matches the order",
    body: "Checks the amount and reference against your order ledger — a Google Sheet or your own database.",
  },
  {
    title: "Catches duplicates",
    body: "Flags a screenshot or transaction reference that has already been used for another order.",
  },
  {
    title: "Confirms the customer",
    body: "Sends an automatic confirmation or a clear rejection message on WhatsApp, using wording you approve.",
  },
  {
    title: "Escalates the unclear ones",
    body: "Anything that doesn't fit your rules goes to a staff member with the screenshot and order details attached.",
  },
  {
    title: "Keeps a record",
    body: "Every check is logged against the order, so you can see what was approved, rejected or escalated, and why.",
  },
];

const audiences = [
  "Facebook and Instagram shops",
  "E-commerce stores",
  "Digital product sellers",
  "Coaching and course providers",
  "Travel agencies taking advances",
  "Any business confirming orders on WhatsApp",
];

const steps = [
  { title: "Free 30-minute call", body: "We look at how you take orders and payments today and where checking slows you down." },
  { title: "Agree the rules", body: "Together we write down what counts as approved, rejected or needs a person." },
  { title: "Build and test", body: "We test with a set of your real receipts and orders before anything goes live." },
  { title: "Launch and support", body: "Documentation, a recorded walkthrough and 30 days of post-launch support." },
];

const faqs = [
  {
    q: "How does bKash payment verification automation work?",
    a: "The customer sends a payment screenshot on WhatsApp. The workflow reads the amount and transaction reference, matches them against your order records, checks for duplicates, and replies with a confirmation or rejection. Unclear cases go to your staff.",
  },
  {
    q: "Does it connect directly to my bKash or Nagad account?",
    a: "No. It verifies the screenshot details against your own order records. It does not log in to your payment accounts and never moves or releases money.",
  },
  {
    q: "Can it approve payments on its own?",
    a: "Only within rules you approve. Anything outside those rules — a mismatched amount, an unreadable screenshot, a reused reference — is sent to a person to decide.",
  },
  {
    q: "What if a customer sends the same screenshot twice?",
    a: "Duplicate detection flags a screenshot or transaction reference that has already been used, so the same payment cannot confirm two orders.",
  },
  {
    q: "Does it work with bank transfers too?",
    a: "Yes. Bank-transfer screenshots are handled the same way, as long as the amount and reference are visible.",
  },
  {
    q: "Where does it run?",
    a: "On your own server, built with self-hosted n8n, so you own the workflow and the order data.",
  },
];

export default function BkashPaymentVerificationPage() {
  const pageUrl = `${brand.siteUrl}${PATH}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "bKash and Nagad payment verification automation",
    description: DESCRIPTION,
    url: pageUrl,
    serviceType: "Payment verification automation",
    areaServed: { "@type": "Country", name: "Bangladesh" },
    provider: { "@id": `${brand.siteUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "bKash payment verification automation", item: pageUrl },
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
            bKash · Nagad · Bank transfer
          </p>
          <h1
            className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6"
            style={{ animationDelay: "80ms" }}
          >
            bKash payment verification, <span style={gradientText}>automated</span>
          </h1>
          <p
            className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl mb-9"
            style={{ animationDelay: "160ms" }}
          >
            ByteFlow AI Labs automates payment checking for Bangladeshi businesses. When a customer
            sends a bKash, Nagad or bank-transfer screenshot on WhatsApp, the workflow reads it,
            matches it to the order, catches duplicates and confirms the customer — and sends anything
            unclear to your team. It runs on your own server and never moves money.
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "240ms" }}>
            <ConsultationCTA
              location="bkash_verify_hero"
              className="rounded-btn inline-flex justify-center px-9 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book a Free 30-Minute Call
            </ConsultationCTA>
            <Link
              href="/services/order-payment-automation"
              className="inline-flex justify-center px-9 py-4 text-brand-text font-body text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-btn hover:border-accent hover:text-accent transition-all duration-300"
            >
              Full service details →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why WhatsApp ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-4">
            The problem
          </p>
          <p className="font-heading text-brand-text text-xl sm:text-2xl leading-snug">
            Many Bangladeshi businesses confirm orders by checking payment screenshots by hand —
            opening each image, finding the transaction ID, searching the spreadsheet and replying. It
            is slow on busy days, easy to get wrong, and a reused screenshot can slip through.
          </p>
        </div>
      </section>

      {/* ── What it does ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What it does">
            What the workflow <span style={gradientText}>does</span>
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

      {/* ── Illustrative payment flow ─────────────────────────────────────── */}
      <WorkflowSection flow="payment" className="bg-brand-surface" />

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
            Any business that confirms orders by checking payment screenshots.
          </p>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Built and running">
            Built and <span style={gradientText}>delivered</span>
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-7">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                What you get
              </p>
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">A documented workflow you own</h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed">
                Validation rules agreed with you, duplicate detection, customer messages, an exception
                route to staff, failure alerts, documentation and a recorded walkthrough.
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
            From call to <span style={gradientText}>automatic checks</span>
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

      {/* ── Downloadable checklist ────────────────────────────────────────── */}
      <LeadMagnetSection guide="ecommerce" />

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10 bg-brand-surface py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl leading-tight mb-5">
            Show us how you check payments today.{" "}
            <span style={gradientText}>We&apos;ll show you what can be automated.</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">
            Free 30-minute call, no commitment. A person from our team follows up after you send the form.
          </p>
          <ConsultationCTA
            location="bkash_verify_final"
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
