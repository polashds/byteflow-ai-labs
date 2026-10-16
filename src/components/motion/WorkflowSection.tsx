import SectionHeading from "@/components/SectionHeading";
import LazyWorkflowFlow from "@/components/motion/LazyWorkflowFlow";
import { workflows, type WorkflowKey } from "@/config/workflows";

/** Section wrapper: heading and intro on the left, animated diagram on the right. */
export default function WorkflowSection({
  flow,
  className = "bg-brand-bg",
}: {
  flow: WorkflowKey;
  className?: string;
}) {
  const w = workflows[flow];
  return (
    <section className={`border-t border-primary/10 py-16 lg:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <SectionHeading eyebrow={w.eyebrow} align="left">
            {w.heading}
          </SectionHeading>
          <p className="-mt-6 font-body text-brand-muted text-base leading-relaxed max-w-lg">{w.intro}</p>
        </div>
        <div className="mx-auto w-full max-w-md">
          <LazyWorkflowFlow flow={flow} />
        </div>
      </div>
    </section>
  );
}
