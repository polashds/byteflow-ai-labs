import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationCTA from "@/components/ConsultationCTA";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VideoEmbed from "@/components/project/VideoEmbed";
import WorkflowDiagram from "@/components/project/WorkflowDiagram";
import { brand } from "@/config/branding";
import { getProject, projectSectionLabels as L, projects } from "@/config/projects";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const path = `/portfolio/${p.slug}`;
  return {
    title: p.meta.title,
    description: p.meta.description,
    alternates: { canonical: path },
    openGraph: { title: `${p.meta.title} — ${brand.name}`, description: p.meta.description, url: path, type: "article" },
    twitter: { title: `${p.meta.title} — ${brand.name}`, description: p.meta.description },
  };
}

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;
const label = "font-body text-[10px] font-medium uppercase tracking-[0.3em] text-accent mb-4";

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${brand.siteUrl}/portfolio` },
      { "@type": "ListItem", position: 3, name: p.title, item: `${brand.siteUrl}/portfolio/${p.slug}` },
    ],
  };

  return (
    <div className="bg-brand-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.12)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/portfolio" className="arrow-link mb-8 inline-flex min-h-[44px] items-center font-body text-sm text-brand-muted hover:text-accent">
            <span aria-hidden="true" className="mr-1.5">←</span> {L.back}
          </Link>
          <p className="mb-5">
            <span className="inline-block rounded-full border border-accent/25 px-3 py-1 font-body text-[10px] uppercase tracking-[0.2em] text-accent">
              {p.badge}
            </span>
          </p>
          <h1 className="animate-fade-up font-heading font-semibold text-brand-text text-[2rem] sm:text-5xl leading-[1.1] mb-6">
            {p.title}
          </h1>
          <p className="animate-fade-up font-body text-brand-muted text-base md:text-lg leading-relaxed max-w-3xl" style={{ animationDelay: "80ms" }}>
            {p.summary}
          </p>
        </div>
      </section>

      {/* ── Problem / what we built ───────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal index={0} className="h-full rounded-card border border-primary/15 bg-brand-bg p-7">
            <p className={label}>{L.problem}</p>
            <p className="font-body text-sm text-brand-muted leading-relaxed">{p.problem}</p>
          </Reveal>
          <Reveal index={1} className="h-full rounded-card border border-primary/15 bg-brand-bg p-7">
            <p className={label}>{L.built}</p>
            <p className="font-body text-sm text-brand-text leading-relaxed mb-3">{p.built.intro}</p>
            <ul className="space-y-2">
              {p.built.points.map((pt) => (
                <li key={pt} className="flex gap-2.5 font-body text-sm text-brand-muted leading-relaxed">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {p.built.note && <p className="mt-4 font-body text-xs text-brand-muted leading-relaxed">{p.built.note}</p>}
          </Reveal>
        </div>
      </section>

      {/* ── Workflow diagram(s) ───────────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Workflow" align="left">
            {L.diagram}
          </SectionHeading>
          <figure className="space-y-5">
            {p.diagrams.map((d, i) => (
              <Reveal key={d.title} index={i}>
                <WorkflowDiagram diagram={d} />
              </Reveal>
            ))}
            <figcaption className="font-body text-xs text-brand-muted">{p.diagramCaption}</figcaption>
          </figure>
        </div>
      </section>

      {/* ── Errors and handoff / stack ────────────────────────────────────── */}
      <section className="border-t border-primary/10 bg-brand-surface py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-card border border-primary/15 bg-brand-bg p-7">
            <p className={label}>{L.handling}</p>
            <ul className="space-y-3">
              {p.handling.map((h) => (
                <li key={h} className="flex gap-2.5 font-body text-sm text-brand-muted leading-relaxed">
                  <span aria-hidden="true" className="mt-[7px] size-[5px] shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-primary/15 bg-brand-bg p-7">
            <p className={label}>{L.stack}</p>
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-primary/20 px-3 py-1.5 font-body text-xs text-brand-text">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Demo (hidden until a video id is set in config) ───────────────── */}
      {p.demo.youtubeId && (
        <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading eyebrow={L.demo} align="left">
              {p.demo.title}
            </SectionHeading>
            <VideoEmbed youtubeId={p.demo.youtubeId} title={p.demo.title} poster={p.demo.poster} />
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-primary/10 bg-brand-surface py-20">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-semibold text-brand-text text-[1.75rem] sm:text-4xl leading-tight mb-5">{L.ctaHeading}</h2>
          <p className="font-body text-brand-muted text-[15px] leading-[1.85] max-w-xl mx-auto mb-9">{L.ctaBody}</p>
          <ConsultationCTA
            location={`project_${p.slug.replace(/-/g, "_")}`}
            className="rounded-btn inline-flex min-h-[44px] px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white"
            style={gradientBg}
          >
            {L.ctaButton}
          </ConsultationCTA>
        </div>
      </section>
    </div>
  );
}
