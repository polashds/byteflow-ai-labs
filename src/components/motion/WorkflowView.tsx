import type { Ref } from "react";
import { workflowCaption, workflowUi, workflows, type WorkflowKey } from "@/config/workflows";

/**
 * Markup for the illustrative workflow diagram. Presentational only: the
 * static (server-rendered) version and the animated WorkflowFlow share it,
 * so swapping one for the other never changes the layout.
 */
export default function WorkflowView({
  flow,
  current = -1,
  live = true,
  onToggle,
  listRef,
}: {
  flow: WorkflowKey;
  /** Index of the active step; -1 shows every step idle. */
  current?: number;
  live?: boolean;
  onToggle?: () => void;
  listRef?: Ref<HTMLOListElement>;
}) {
  const { label, steps } = workflows[flow];
  const stateOf = (i: number) => (current < 0 ? "idle" : i === current ? "active" : i < current ? "passed" : "idle");
  const titleId = `wf-${flow}-title`;

  return (
    <figure className="w-full" aria-labelledby={titleId}>
      <div className="rounded-card border border-primary/20 bg-brand-surface/80 p-4 shadow-card sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p id={titleId} className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
            {label}
          </p>
          <button
            type="button"
            onClick={onToggle}
            disabled={!onToggle}
            className="motion-reduce:hidden min-h-[44px] rounded-btn border border-white/15 px-3 font-body text-xs text-brand-text hover:border-accent hover:text-accent disabled:cursor-default"
          >
            {live ? workflowUi.pause : workflowUi.play}
          </button>
        </div>
        <ol ref={listRef}>
          {steps.map((s, i) => {
            const state = stateOf(i);
            return (
              <li key={s.title} data-state={state} className="wf-step relative">
                <div className="wf-node relative flex items-center gap-3 rounded-field px-3 py-2.5">
                  <span
                    aria-hidden="true"
                    className="wf-dot relative flex size-6 shrink-0 items-center justify-center rounded-full font-heading text-xs font-semibold"
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-sm font-semibold leading-tight text-brand-text">{s.title}</span>
                    <span className="block font-body text-xs leading-snug text-brand-muted">{s.note}</span>
                  </span>
                  {/* Fixed-width slot, always rendered, so the row never reflows. */}
                  <span aria-hidden="true" className="ml-auto flex w-[5.25rem] shrink-0 justify-end">
                    {state === "active" ? (
                      <span key="run" className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 font-body text-[11px] font-semibold text-accent">
                        <span className="wf-spin size-2.5 rounded-full border-2 border-accent border-t-transparent" /> {workflowUi.running}
                      </span>
                    ) : state === "passed" ? (
                      <span key="done" className="rounded-full bg-white/5 px-2 py-0.5 font-body text-[11px] font-semibold text-brand-muted">
                        ✓ {workflowUi.done}
                      </span>
                    ) : null}
                  </span>
                </div>
                {i < steps.length - 1 ? (
                  <span aria-hidden="true" data-on={current > i || undefined} className="wf-link ml-[1.4rem] block h-3 w-0.5 rounded" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="mt-3 text-center font-body text-xs text-brand-muted">{workflowCaption}</figcaption>
    </figure>
  );
}
