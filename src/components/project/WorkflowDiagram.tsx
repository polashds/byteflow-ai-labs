import type { ProjectDiagram } from "@/config/projects";

/**
 * Static workflow diagram (adapted from WorkflowDiagram on siddiquehossain.com).
 * Server component, HTML and CSS only: numbered steps joined by arrows,
 * vertical on small screens, a wrapping row on large ones. Steps can carry
 * attached items (an AI agent's model, memory and tools).
 */
export default function WorkflowDiagram({ diagram }: { diagram: ProjectDiagram }) {
  return (
    <div className="rounded-card border border-primary/15 bg-brand-surface p-5 sm:p-6">
      <p className="mb-4 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-accent">{diagram.title}</p>
      <ol className="grid grid-cols-1 gap-y-1 md:grid-cols-2 lg:grid-cols-3 md:items-start md:gap-x-6 md:gap-y-4">
        {diagram.steps.map((s, i) => (
          <li key={`${i}-${s.title}`} className="flex flex-col">
            <div className="flex h-full items-start gap-3 rounded-field border border-primary/20 bg-brand-bg/60 p-3.5">
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 font-heading text-xs font-semibold text-brand-text"
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block break-words font-heading text-sm font-semibold leading-snug text-brand-text">{s.title}</span>
                {s.note && <span className="mt-0.5 block font-body text-xs leading-snug text-brand-muted">{s.note}</span>}
                {s.attached && (
                  <span className="mt-2 block">
                    <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-accent/80">{s.attached.label}</span>
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {s.attached.items.map((it) => (
                        <span key={it} className="rounded-full border border-accent/20 px-2 py-0.5 font-body text-[11px] text-brand-text">
                          {it}
                        </span>
                      ))}
                    </span>
                  </span>
                )}
              </span>
            </div>
            {i < diagram.steps.length - 1 && (
              <span aria-hidden="true" className="flex justify-center py-1 text-accent md:hidden">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
