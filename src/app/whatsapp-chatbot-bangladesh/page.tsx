import type { Metadata } from "next";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { brand } from "@/config/branding";

/*
 * Bangladesh-focused landing page for "WhatsApp chatbot Bangladesh" searches.
 * Facts only: everything here is drawn from the WhatsApp assistant offer and
 * the Mustaraka / Nova case studies. No prices, metrics or client claims.
 */

const PATH = "/whatsapp-chatbot-bangladesh";
const TITLE = "WhatsApp Chatbot for Businesses in Bangladesh (Bengali + English)";
const DESCRIPTION =
  "AI WhatsApp chatbots for Bangladeshi businesses: answers customers in Bengali and English, takes bookings, checks bKash and Nagad payments and hands over to your team. Built on your own server.";

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
    title: "Answers in Bengali and English",
    body: "Prices, availability, delivery, order status and opening hours, answered from your own FAQs and price lists.",
  },
  {
    title: "Captures leads",
    body: "Collects name, phone and requirement, and saves them to your CRM or Google Sheet.",
  },
  {
    title: "Books appointments and viewings",
    body: "Checks real availability in your calendar before confirming a slot.",
  },
  {
    title: "Verifies payments",
    body: "Reads bKash, Nagad and bank-transfer screenshots and matches them against your orders.",
  },
  {
    title: "Hands over to a person",
    body: "Anything uncertain, sensitive or high-value goes to your team with the full chat attached.",
  },
  {
    title: "Alerts your team",
    body: "WhatsApp, Telegram or email notifications for new leads, so nobody misses an enquiry.",
  },
];

const audiences = [
  "Real estate agencies",
  "Clinics and diagnostic centres",
  "Travel agencies",
  "Coaching and education centres",
  "E-commerce and Facebook shops",
  "Local service businesses",
];

const steps = [
  { title: "Free 30-minute call", body: "We map your most common questions and where chats get stuck." },
  { title: "Build", body: "We set up the knowledge base, booking or payment rules, and handover rules." },
  { title: "Test", body: "We run it against your real customer questions in Bengali and English before launch." },
  { title: "Launch and support", body: "Documentation, a recorded walkthrough and 30 days of post-launch support." },
];

const faqs = [
  {
    q: "Does the chatbot understand Bengali?",
    a: "Yes. It replies in Bengali or English depending on the customer, and we test both with your real customer questions before launch.",
  },
  {
    q: "Do I need the official WhatsApp Business API?",
    a: "To automate a business number it must be connected through an API. We recommend the official WhatsApp Business API and help you apply and get message templates approved; Meta makes the final approval decision.",
  },
  {
    q: "What does WhatsApp messaging cost?",
    a: "Meta charges WhatsApp messaging fees directly, and the AI provider bills usage separately. We explain the expected running costs on the call before you commit.",
  },
  {
    q: "Can it take bKash or Nagad payments?",
    a: "It can send payment links and verify payment screenshots against your orders. It never moves money itself.",
  },
  {
    q: "Will it replace my staff?",
    a: "No. It handles the repetitive questions so your team can spend time on conversations that need a person.",
  },
  {
    q: "Where does the chatbot run?",
    a: "On your own server, built with self-hosted n8n, so you own the workflows and the customer data. There is no per-seat chatbot subscription to us.",
  },
];

export default function WhatsAppChatbotBangladeshPage() {
  const pageUrl = `${brand.siteUrl}${PATH}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WhatsApp chatbot for businesses in Bangladesh",
    description: DESCRIPTION,
    url: pageUrl,
    serviceType: "AI WhatsApp chatbot",
    areaServed: { "@type": "Country", name: "Bangladesh" },
    availableLanguage: ["Bengali", "English"],
    provider: { "@id": `${brand.siteUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "WhatsApp chatbot Bangladesh", item: pageUrl },
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
            Bengali · English · bKash · Nagad
          </p>
          <h1
            className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6"
            style={{ animationDelay: "80ms" }}
          >
            WhatsApp chatbot for <span style={gradientText}>businesses in Bangladesh</span>
          </h1>
          <p
            className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl mb-9"
            style={{ animationDelay: "160ms" }}
          >
            ByteFlow AI Labs builds AI WhatsApp chatbots for Bangladeshi businesses. The chatbot
            answers customers in Bengali and English, books appointments or viewings, checks bKash and
            Nagad payment screenshots, and hands conversations over to your team with full context.
            It runs on your own server, so you own the workflows and the customer data.
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "240ms" }}>
            <ConsultationCTA
              location="whatsapp_bd_hero"
              className="rounded-btn inline-flex justify-center px-9 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book a Free 30-Minute Call
            </ConsultationCTA>
            <Link
              href="/services/whatsapp-ai-assistant"
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
            Why WhatsApp
          </p>
          <p className="font-heading text-brand-text text-xl sm:text-2xl leading-snug">
            In Bangladesh, most customer enquiries from Facebook ads, Instagram and the website end up
            on WhatsApp. When staff answer every message by hand, replies are slow at night and on
            peak days, and leads go cold.
          </p>
        </div>
      </section>

      {/* ── What it does ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What it does">
            One chatbot, <span style={gradientText}>six jobs</span>
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
            Any business that gets the same WhatsApp questions all day.
          </p>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Built and running">
            Built in Bangladesh, <span style={gradientText}>running live</span>
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-7">
              <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                Our own venture · Dhaka
              </p>
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">Mustaraka Properties</h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed">
                A WhatsApp agent qualifies property enquiries, books viewings against real availability
                and hands over to an agent. New leads trigger automatic WhatsApp and Telegram alerts.
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
            From call to <span style={gradientText}>live chatbot</span>
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
            Tell us your top WhatsApp questions.{" "}
            <span style={gradientText}>We&apos;ll show you what can be automated.</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">
            Free 30-minute call, no commitment. A person from our team follows up after you send the form.
          </p>
          <ConsultationCTA
            location="whatsapp_bd_final"
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
