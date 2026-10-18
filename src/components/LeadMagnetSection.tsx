import LeadMagnetModal from "@/components/LeadMagnetModal";
import Reveal from "@/components/Reveal";
import { leadMagnets, type LeadMagnetKey } from "@/config/leadMagnets";

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

/** Compact download block for a guide, used on vertical and landing pages. */
export default function LeadMagnetSection({ guide }: { guide: LeadMagnetKey }) {
  const g = leadMagnets[guide];
  return (
    <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal className="glow-hover rounded-card border border-primary/15 bg-brand-surface p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <div className="flex-1 min-w-0">
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase mb-3">{g.eyebrow}</p>
            <h2 className="font-heading font-semibold text-brand-text text-2xl sm:text-3xl leading-tight mb-3">
              {g.titleStart} <span style={gradientText}>{g.titleHighlight}</span>
            </h2>
            <p className="font-body text-sm text-brand-muted leading-relaxed">{g.blurb}</p>
          </div>
          <div className="shrink-0">
            <LeadMagnetModal guide={guide} label="Get the checklist" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
