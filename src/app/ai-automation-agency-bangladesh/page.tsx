import type { Metadata } from "next";
import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { brand } from "@/config/branding";
import { engagementSteps } from "@/config/coreOffers";
import { projects } from "@/config/projects";

/*
 * Bangladesh-focused hub page for "AI automation agency Bangladesh" searches.
 * Facts only: drawn from the existing landing pages, the core-offer FAQs and
 * the approved project pages. No prices, metrics or client claims.
 * Add an /ecommerce-payment-automation card once that page exists (CC-2).
 */

const PATH = "/ai-automation-agency-bangladesh";
const TITLE = "AI Automation Agency in Bangladesh";
const DESCRIPTION =
  "AI automation agency in Bangladesh building lead-to-CRM systems, WhatsApp assistants in Bengali and English, and bKash and Nagad payment checks.";

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

const areas = [
  {
    href: "/whatsapp-chatbot-bangladesh",
    title: "WhatsApp chatbots",
    body: "AI WhatsApp assistants that answer customers in Bengali and English, take bookings and hand over to your team with the full chat.",
  },
  {
    href: "/bkash-payment-verification-automation",
    title: "bKash and Nagad payment verification",
    body: "Reads payment screenshots, matches them to the order, catches duplicates and confirms the customer on WhatsApp.",
  },
  {
    href: "/n8n-automation-agency-bangladesh",
    title: "Self-hosted n8n",
    body: "n8n installed on your own server, custom workflows, and migration from Zapier or Make, with no per-task fees.",
  },
  {
    href: "/real-estate-automation",
    title: "Real estate lead automation",
    body: "A lead-to-viewing system designed to reply on WhatsApp, ask budget, area and timing, log each lead in your CRM and book viewings against real slots.",
  },
];

const proofSlugs = ["mustaraka-properties", "receipt-verification"];
const proof = proofSlugs.map((s) => projects.find((p) => p.slug === s)).filter((p) => p !== undefined);

const faqs: { q: string; a: string; cta?: boolean }[] = [
  {
    q: "How much does AI automation cost?",
    a: "We price per project based on scope, not by the hour. You receive a fixed quote after a free 30-minute scoping call, so there are no billing surprises. Third-party costs such as WhatsApp Business API fees, AI model usage and hosting are billed at cost or paid directly by you.",
    cta: true,
  },
  {
    q: "Does it work in Bengali?",
    a: "Yes. WhatsApp assistants support Bengali and English, and we test both with your real customer questions before launch.",
  },
  {
    q: "Why self-hosted n8n instead of Zapier?",
    a: "Self-hosting removes per-task pricing and keeps customer data on infrastructure you control. The trade-off is that the server needs setting up and maintaining, which is the part we handle. If you already use Zapier or Make, we can audit those automations and rebuild them on n8n.",
  },
  {
    q: "How long does a first system take?",
    a: "A focused automation typically takes 3–5 working days once we have your access and inputs. A full system typically takes 2–3 weeks. Larger multi-system builds take longer and are scoped individually. Your written scope confirms the timeline.",
  },
  {
    q: "What do you need from us?",
    a: "Access to the tools involved — ad accounts, forms, your WhatsApp number, CRM, spreadsheet or order records — plus your FAQs and price lists, your rules for what is approved or handed to a person, and who on your team should be alerted. The written scope lists exactly what we need.",
  },
];

export default function AiAutomationBangladeshPage() {
  const pageUrl = `${brand.siteUrl}${PATH}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI automation agency in Bangladesh",
    description: DESCRIPTION,
    url: pageUrl,
    serviceType: "AI automation",
    areaServed: { "@type": "Country", name: "Bangladesh" },
    availableLanguage: ["Bengali", "English"],
    provider: { "@id": `${brand.siteUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "AI automation agency Bangladesh", item: pageUrl },
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
            Bengali · English · bKash · Nagad · Self-hosted
          </p>
          <h1
            className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6"
            style={{ animationDelay: "80ms" }}
          >
            AI automation agency <span style={gradientText}>in Bangladesh</span>
          </h1>
          <p
            className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl mb-9"
            style={{ animationDelay: "160ms" }}
          >
            ByteFlow AI Labs is an AI automation agency based in Bangladesh. We build systems that
            capture leads from ads, forms and WhatsApp into your CRM, WhatsApp AI assistants designed to
            reply in Bengali and English, and workflows that check bKash and Nagad payment screenshots
            against your orders. They run on self-hosted n8n on your own server, so you own the
            workflows and the data.
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "240ms" }}>
            <ConsultationCTA
              location="ai_bd_hero"
              className="rounded-btn inline-flex justify-center px-9 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Book a Free 30-Minute Call
            </ConsultationCTA>
            <Link
              href="/services"
              className="inline-flex justify-center px-9 py-4 text-brand-text font-body text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-btn hover:border-accent hover:text-accent transition-all duration-300"
            >
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── What we automate ──────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="What we automate">
            Where automation <span style={gradientText}>helps first</span>
          </SectionHeading>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {areas.map((a, i) => (
              <li key={a.href}>
                <Reveal index={i}>
                  <Link
                    href={a.href}
                    className="lift group flex h-full flex-col border border-primary/15 rounded-card bg-brand-bg p-6"
                  >
                    <h3 className="font-heading font-semibold text-brand-text text-base mb-2">{a.title}</h3>
                    <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">{a.body}</p>
                    <span className="mt-auto font-body text-[11px] text-accent tracking-[0.18em] uppercase">
                      Learn more{" "}
                      <span aria-hidden="true" className="arrow">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Built and running">
            Systems we have <span style={gradientText}>built</span>
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proof.map((p, i) => (
              <Reveal key={p.slug} index={i}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="lift group flex h-full flex-col border border-primary/15 rounded-card bg-brand-surface p-7"
                >
                  <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-3">{p.badge}</p>
                  <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">{p.title}</h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">{p.summary}</p>
                  <span className="mt-auto font-body text-[11px] text-accent tracking-[0.18em] uppercase">
                    See the project breakdown{" "}
                    <span aria-hidden="true" className="arrow">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How an engagement works ───────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="How an engagement works">
            From first call to <span style={gradientText}>a system that runs</span>
          </SectionHeading>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {engagementSteps.map((s, i) => (
              <li key={s.num}>
                <Reveal index={i} className="glow-hover h-full border border-primary/15 rounded-card bg-brand-bg p-6">
                  <span className="font-heading text-sm" style={gradientText}>
                    {s.num}
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
                {item.cta && (
                  <ConsultationCTA
                    location="ai_bd_faq_cost"
                    className="mt-3 inline-flex min-h-[44px] items-center font-body text-sm text-accent underline underline-offset-4 hover:text-brand-text"
                  >
                    Book a free 30-minute consultation
                  </ConsultationCTA>
                )}
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
            Tell us where leads or orders get stuck.{" "}
            <span style={gradientText}>We&apos;ll show you what can be automated.</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">
            Free 30-minute call, no commitment. A person from our team follows up after you send the form.
          </p>
          <ConsultationCTA
            location="ai_bd_final"
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
