import Link from "next/link";
import { reviewsCopy, type Review } from "@/config/reviews";
import { getProjectForCaseStudy } from "@/config/projects";

/**
 * One verbatim client review. In the homepage row (`compact`) long quotes are
 * clamped and link to the project page, where the full text is shown.
 */
export default function ReviewCard({
  r,
  focusable = true,
  compact = false,
}: {
  r: Review;
  focusable?: boolean;
  compact?: boolean;
}) {
  const project = r.caseStudyId ? getProjectForCaseStudy(r.caseStudyId) : undefined;
  const clamp = compact && r.quote.includes("\n\n") && !!project;
  // Clamping needs one block of text, so a clamped quote is shown as one paragraph.
  const paragraphs = clamp ? [r.quote.replace(/\n\n/g, " ")] : r.quote.split("\n\n");
  const tab = focusable ? undefined : -1;

  return (
    <figure className="flex h-full flex-col rounded-card border border-primary/15 bg-brand-surface p-6">
      <p className="mb-3 font-body text-[10px] uppercase tracking-[0.22em] text-accent">
        {r.platform} · {r.project}
      </p>
      <blockquote
        className="flex-1 space-y-3 font-body text-sm leading-relaxed text-brand-text"
      >
        {paragraphs.map((para, i) => (
          <p key={i} className={clamp ? "line-clamp-6" : undefined}>
            {i === 0 && "“"}
            {para}
            {i === paragraphs.length - 1 && "”"}
          </p>
        ))}
      </blockquote>
      {r.name && (
        <figcaption className="mt-4 font-body text-sm">
          <span className="block font-medium text-brand-text">{r.name}</span>
          {r.role && <span className="block text-xs text-brand-muted">{r.role}</span>}
        </figcaption>
      )}
      {clamp && project ? (
        <Link
          href={`/portfolio/${project.slug}`}
          tabIndex={tab}
          className="arrow-link mt-4 inline-flex min-h-[44px] items-center font-body text-sm text-accent hover:underline underline-offset-4"
        >
          {reviewsCopy.readFull} <span aria-hidden="true" className="arrow ml-1">→</span>
        </Link>
      ) : (
        r.link && (
          <a
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={tab}
            className="arrow-link mt-4 inline-flex min-h-[44px] items-center font-body text-sm text-accent hover:underline underline-offset-4"
          >
            {reviewsCopy.viewOn} {r.platform} <span aria-hidden="true" className="arrow ml-1">→</span>
          </a>
        )
      )}
    </figure>
  );
}
