import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { coreOffers, engagementSteps, getCoreOffer } from "@/config/coreOffers";
import { caseStudies, projectTypeLabel } from "@/config/caseStudies";
import { serviceCategories } from "@/config/services";
import { brand } from "@/config/branding";

type Params = Promise<{ slug: string }>;

/** Only the core-offer slugs exist; anything else is a 404 (not a soft page). */
export const dynamicParams = false;

export function generateStaticParams() {
  return coreOffers.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const offer = getCoreOffer(slug);
  if (!offer) return {};
  const url = `/services/${offer.slug}`;
  return {
    title: offer.metaTitle,
    description: offer.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${offer.metaTitle} — ${brand.name}`,
      description: offer.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      title: `${offer.metaTitle} — ${brand.name}`,
      description: offer.metaDescription,
    },
  };
}

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

const STAGGER_MS = 90;

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-body text-sm text-brand-muted leading-relaxed">
          <span
            aria-hidden="true"
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={gradientBg}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CoreOfferPage({ params }: { params: Params }) {
  const { slug } = await params;
  const offer = getCoreOffer(slug);
  if (!offer) notFound();

  const caseStudy = caseStudies.find((c) => c.id === offer.caseStudyId);
  const related = serviceCategories.filter((c) => offer.relatedServiceIds.includes(c.id));
  const others = coreOffers.filter((o) => o.slug !== offer.slug);
  const pageUrl = `${brand.siteUrl}/services/${offer.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.title,
    description: offer.metaDescription,
    url: pageUrl,
    serviceType: offer.shortTitle,
    provider: { "@type": "Organization", name: brand.name, url: brand.siteUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${brand.siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: offer.shortTitle, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: offer.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="bg-brand-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.12)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 font-body text-xs text-brand-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-brand-text">
                {offer.shortTitle}
              </li>
            </ol>
          </nav>

          <p className="animate-fade-up font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-6">
            {offer.painTag}
          </p>
          <h1
            className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6"
            style={{ animationDelay: "80ms" }}
          >
            {offer.title}
          </h1>
          <p
            className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl mb-9"
            style={{ animationDelay: "160ms" }}
          >
            {offer.heroSub}
          </p>
          <div
            className="animate-fade-up flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <ConsultationCTA
              location={`service_${offer.slug}_hero`}
              className="rounded-btn inline-flex justify-center px-9 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
              style={gradientBg}
            >
              Discuss Your Workflow
            </ConsultationCTA>
            {caseStudy && (
              <a
                href="#reference"
                className="inline-flex justify-center px-9 py-4 text-brand-text font-body text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-btn hover:border-accent hover:text-accent transition-all duration-300"
              >
                See a working example
              </a>
            )}
          </div>
          <p className="mt-5 font-body text-xs text-brand-muted">
            Free 30-minute call — you describe the workflow, we tell you honestly whether and how we
            would automate it.
          </p>
        </div>
      </section>

      {/* ── Who it is for ─────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-4">
            Who this is for
          </p>
          <p className="font-heading text-brand-text text-xl sm:text-2xl leading-snug">
            {offer.forWho}
          </p>
        </div>
      </section>

      {/* ── The problem ───────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="The problem">
            What this looks like{" "}
            <span style={gradientText}>day to day</span>
          </SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {offer.painPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * STAGGER_MS}>
                <div className="glow-hover h-full border border-primary/15 rounded-card bg-brand-surface p-7">
                  <h3 className="font-heading font-semibold text-brand-text text-lg leading-snug mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="max-w-3xl mx-auto text-center font-body text-brand-muted text-[15px] leading-relaxed">
            <span className="text-brand-text font-medium">If it stays unsolved: </span>
            {offer.ifUnsolved}
          </p>
        </div>
      </section>

      {/* ── How the system works ──────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="The system">
            How it{" "}
            <span style={gradientText}>works</span>
          </SectionHeading>
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-5">
            {offer.flow.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * STAGGER_MS}>
                  <div className="glow-hover h-full border border-primary/15 rounded-card bg-brand-bg p-6">
                    <span
                      className="block font-heading font-semibold text-2xl leading-none mb-4 opacity-60"
                      style={gradientText}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading font-semibold text-brand-text text-base leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-[13px] text-brand-muted leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
              Works with
            </p>
            <ul className="flex flex-wrap gap-2">
              {offer.integrations.map((tool) => (
                <li
                  key={tool}
                  className="font-body text-[12px] text-brand-muted border border-primary/15 rounded-full px-3 py-1.5"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Scope: included / needed / excluded ───────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Scope">
            What is included,{" "}
            <span style={gradientText}>and what is not</span>
          </SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-8">
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-5">
                What you receive
              </h3>
              <BulletList items={offer.deliverables} />
            </div>
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-8">
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-5">
                What we need from you
              </h3>
              <BulletList items={offer.customerProvides} />
            </div>
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-8">
              <h3 className="font-heading font-semibold text-brand-text text-lg mb-5">
                Not included
              </h3>
              <BulletList items={offer.notIncluded} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reliability and measurement ───────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-bg p-8">
              <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent uppercase mb-3">
                Reliability
              </p>
              <h2 className="font-heading font-semibold text-brand-text text-2xl mb-5">
                When something goes wrong
              </h2>
              <BulletList items={offer.reliability} />
            </div>
            <div className="glow-hover border border-primary/15 rounded-card bg-brand-bg p-8">
              <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent uppercase mb-3">
                Measurement
              </p>
              <h2 className="font-heading font-semibold text-brand-text text-2xl mb-5">
                How we tell whether it works
              </h2>
              <BulletList items={offer.measure} />
              <p className="mt-6 font-body text-xs text-brand-muted leading-relaxed">
                We agree these measures during scoping and report what the system actually records.
                We don&apos;t promise a specific result in advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reference system ──────────────────────────────────────────────── */}
      {caseStudy && (
        <section id="reference" className="border-t border-primary/10 bg-brand-bg py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading eyebrow="A working example" align="left">
              Where we have{" "}
              <span style={gradientText}>built this</span>
            </SectionHeading>
            <div className="glow-hover border border-primary/20 rounded-card bg-brand-surface p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="font-body text-[10px] font-medium tracking-[0.25em] text-accent uppercase border border-accent/20 rounded-full px-2.5 py-1">
                  {caseStudy.industry}
                </span>
                {caseStudy.projectType && (
                  <span className="font-body text-[10px] tracking-[0.18em] text-brand-muted uppercase">
                    {projectTypeLabel[caseStudy.projectType]}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-semibold text-brand-text text-2xl mb-3">
                {caseStudy.client}
              </h3>
              <p className="font-body text-sm text-brand-muted leading-relaxed mb-6">
                {offer.caseStudyNote}
              </p>
              <Link
                href={`/portfolio#${caseStudy.id}`}
                className="font-body text-[11px] text-accent tracking-[0.18em] uppercase hover:underline"
              >
                Read the full case study →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Engagement process ────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Working together">
            What happens{" "}
            <span style={gradientText}>after you get in touch</span>
          </SectionHeading>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {engagementSteps.map((step, i) => (
              <li key={step.num}>
                <Reveal delay={i * STAGGER_MS}>
                  <div className="glow-hover h-full border border-primary/15 rounded-card bg-brand-bg p-6">
                    <span
                      className="block font-heading font-semibold text-2xl leading-none mb-4 opacity-60"
                      style={gradientText}
                    >
                      {step.num}
                    </span>
                    <h3 className="font-heading font-semibold text-brand-text text-base leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-[13px] text-brand-muted leading-relaxed">
                      {step.body}
                    </p>
                  </div>
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
            Common{" "}
            <span style={gradientText}>questions</span>
          </SectionHeading>
          <div className="divide-y divide-primary/10 border-t border-primary/10">
            {offer.faqs.map((item) => (
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
        </div>
      </section>

      {/* ── Related ───────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
              Full scope in the catalogue
            </p>
            <ul className="space-y-2">
              {related.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/services#${c.id}`}
                    className="font-body text-sm text-brand-muted hover:text-accent transition-colors"
                  >
                    {c.title} →
                  </Link>
                </li>
              ))}
              {offer.relatedServiceIds.includes("n8n-infrastructure") && (
                <li>
                  <Link
                    href="/n8n-automation-agency-bangladesh"
                    className="font-body text-sm text-brand-muted hover:text-accent transition-colors"
                  >
                    n8n automation agency in Bangladesh →
                  </Link>
                </li>
              )}
              {offer.slug === "order-payment-automation" && (
                <li>
                  <Link
                    href="/bkash-payment-verification-automation"
                    className="font-body text-sm text-brand-muted hover:text-accent transition-colors"
                  >
                    bKash and Nagad payment verification →
                  </Link>
                </li>
              )}
              {offer.slug === "whatsapp-ai-assistant" && (
                <li>
                  <Link
                    href="/whatsapp-chatbot-bangladesh"
                    className="font-body text-sm text-brand-muted hover:text-accent transition-colors"
                  >
                    WhatsApp chatbot for businesses in Bangladesh →
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="font-body text-[10px] font-medium tracking-[0.3em] text-accent/70 uppercase mb-4">
              Other systems we build
            </p>
            <ul className="space-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="font-body text-sm text-brand-muted hover:text-accent transition-colors"
                  >
                    {o.shortTitle} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10 bg-brand-bg py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl leading-tight mb-5">
            Describe the workflow.{" "}
            <span style={gradientText}>We&apos;ll tell you what is possible.</span>
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">
            Send a short description through the contact form. It reaches our workflow straight away,
            and a person follows up to set up a free 30-minute call — no commitment required.
          </p>
          <ConsultationCTA
            location={`service_${offer.slug}_final`}
            className="rounded-btn inline-flex px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
            style={gradientBg}
          >
            Discuss Your Workflow
          </ConsultationCTA>
        </div>
      </section>
    </div>
  );
}
