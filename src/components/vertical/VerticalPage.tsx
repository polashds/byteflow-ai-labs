import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WorkflowSection from "@/components/motion/WorkflowSection";
import ComingSoonBlock from "@/components/vertical/ComingSoonBlock";
import TierCard from "@/components/vertical/TierCard";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import { brand } from "@/config/branding";
import { comingSoonVerticals, type Vertical } from "@/config/verticals";

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

const ctaClass =
  "rounded-btn inline-flex justify-center px-9 py-4 min-h-[44px] font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]";

/** Layout for a vertical landing page. All copy comes from the Vertical config. */
export default function VerticalPage({ vertical: v }: { vertical: Vertical }) {
  const pageUrl = `${brand.siteUrl}${v.path}`;
  const core = v.tiers.find((t) => t.kind === "core") ?? v.tiers[0];

  // No `offers` or price in structured data: pricing is hidden (showPricing: false).
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: core.name,
    description: v.meta.description,
    url: pageUrl,
    serviceType: v.name,
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
    ],
    provider: { "@id": `${brand.siteUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${brand.siteUrl}/solutions` },
      { "@type": "ListItem", position: 3, name: v.name, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: v.faq.map((f) => ({
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
            {v.hero.eyebrow}
          </p>
          <h1
            className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6"
            style={{ animationDelay: "80ms" }}
          >
            {v.hero.headline}
          </h1>
          <p
            className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl mb-9"
            style={{ animationDelay: "160ms" }}
          >
            {v.hero.subhead}
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "240ms" }}>
            <ConsultationCTA location={`${v.analyticsKey}_hero`} className={ctaClass} style={gradientBg}>
              {v.cta.button}
            </ConsultationCTA>
            <a
              href="#packages"
              className="inline-flex justify-center items-center px-9 py-4 min-h-[44px] text-brand-text font-body text-[11px] tracking-[0.2em] uppercase border border-white/20 rounded-btn hover:border-accent hover:text-accent transition-all duration-300"
            >
              See the packages
            </a>
          </div>
        </div>
      </section>

      {/* ── Who it's for ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-6">
            Who it&apos;s for
          </p>
          <ul className="space-y-4">
            {v.whoFor.map((line) => (
              <li key={line} className="font-body text-brand-text text-base leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pain points ───────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="The problem">Sound familiar?</SectionHeading>
          <ul className="space-y-4">
            {v.painPoints.map((p, i) => (
              <li key={p}>
                <Reveal index={i} className="h-full border-l-2 border-primary/30 bg-brand-surface px-5 py-4">
                  <p className="font-heading text-brand-text text-base sm:text-lg leading-snug">{p}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-body text-sm text-brand-muted">{v.painCaption}</p>
        </div>
      </section>

      {/* ── Illustrative workflow ─────────────────────────────────────────── */}
      {v.workflow && <WorkflowSection flow={v.workflow} />}

      {/* ── Packages ──────────────────────────────────────────────────────── */}
      <section id="packages" className="scroll-mt-20 border-t border-primary/10 bg-brand-surface py-16 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Packages">Three ways to start</SectionHeading>
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 pt-3">
            {v.tiers.map((tier, i) => (
              <li key={tier.kind}>
                <TierCard tier={tier} index={i} showPricing={v.showPricing} />
              </li>
            ))}
          </ul>
          {v.tierNote && (
            <p className="mt-8 max-w-3xl mx-auto text-center font-body text-sm text-brand-muted leading-relaxed">
              {v.tierNote}
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <ConsultationCTA location={`${v.analyticsKey}_tiers`} className={ctaClass} style={gradientBg}>
              Ask which package fits
            </ConsultationCTA>
          </div>
        </div>
      </section>

      {/* ── Not included ──────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-6">
            Not included
          </p>
          <ul className="flex flex-wrap gap-3">
            {v.notIncluded.map((item) => (
              <li key={item} className="border border-primary/20 rounded-full px-4 py-2 font-body text-sm text-brand-text">
                {item}
              </li>
            ))}
          </ul>
          {v.trustNote && (
            <p className="mt-8 border border-accent/40 rounded-card bg-brand-surface p-5 font-body text-sm text-brand-text leading-relaxed">
              {v.trustNote}
            </p>
          )}
        </div>
      </section>

      {/* ── Demo (hidden until demoUrl is set — wired up in a later task) ─── */}
      {v.demoUrl && (
        <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <SectionHeading eyebrow="Demo">{v.demoTitle ?? "Demo"}</SectionHeading>
            {/* The click-to-load embed replaces this link in the demo task. */}
            <a
              href={v.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-3 min-h-[44px] items-center border border-accent rounded-btn text-accent font-body text-[11px] tracking-[0.2em] uppercase"
            >
              Open the demo
            </a>
            {v.demoCaption && <p className="mt-4 font-body text-sm text-brand-muted">{v.demoCaption}</p>}
          </div>
        </section>
      )}

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Proof">What we&apos;ve built</SectionHeading>
          <div className="grid grid-cols-1 gap-6">
            {v.proof.map((p, i) => (
              <Reveal key={p.title} index={i} className="glow-hover border border-primary/15 rounded-card bg-brand-surface p-6 sm:p-7">
                <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-3">{p.label}</p>
                <h3 className="font-heading font-semibold text-brand-text text-lg mb-3">{p.title}</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <p className="font-heading font-semibold text-brand-text text-lg mb-5 text-center">
              {v.reviewsFraming}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {v.reviews.map((r, i) => (
                <li key={`${r.platform}-${r.project}`}>
                  <Reveal index={i} className="glow-hover flex h-full flex-col border border-primary/15 rounded-card bg-brand-surface p-6">
                    <p className="font-body text-[10px] tracking-[0.25em] text-accent uppercase mb-2">
                      {r.platform} · {r.project}
                    </p>
                    <blockquote className="font-body text-sm text-brand-text leading-relaxed">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center min-h-[44px] font-body text-sm text-accent hover:underline underline-offset-4"
                      >
                        View on {r.platform} →
                      </a>
                    )}
                  </Reveal>
                </li>
              ))}
            </ul>
            {v.reviewsNote && (
              <p className="mt-4 text-center font-body text-xs text-brand-muted">{v.reviewsNote}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Questions">Common questions</SectionHeading>
          <div className="divide-y divide-primary/10 border-t border-primary/10">
            {v.faq.map((item) => (
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

      {/* ── Coming soon ───────────────────────────────────────────────────── */}
      <ComingSoonBlock items={comingSoonVerticals} />

      {/* ── Downloadable checklist ────────────────────────────────────────── */}
      {v.leadMagnet && <LeadMagnetSection guide={v.leadMagnet} />}

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10 bg-brand-surface py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(37,99,235,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl leading-tight mb-5">
            {v.cta.heading}
          </h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">
            {v.cta.body}
          </p>
          <ConsultationCTA location={`${v.analyticsKey}_footer`} className={ctaClass} style={gradientBg}>
            {v.cta.button}
          </ConsultationCTA>
        </div>
      </section>
    </div>
  );
}
