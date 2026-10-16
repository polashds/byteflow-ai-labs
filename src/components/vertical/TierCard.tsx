import Reveal from "@/components/Reveal";
import type { Vertical, VerticalTier } from "@/config/verticals";

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-body text-[10px] tracking-[0.25em] text-accent uppercase mb-1">{label}</dt>
      <dd className="font-body text-sm text-brand-text leading-relaxed">{children}</dd>
    </div>
  );
}

export default function TierCard({
  tier,
  index,
  showPricing,
}: {
  tier: VerticalTier;
  index: number;
  showPricing: Vertical["showPricing"];
}) {
  const featured = tier.featured === true;
  return (
    <Reveal index={index} className="h-full">
      <article
        className={`lift relative flex h-full flex-col bg-brand-surface p-6 sm:p-7 ${
          featured ? "border border-accent/60" : "border border-primary/15"
        }`}
      >
        {featured && (
          <span
            className="absolute -top-3 left-6 px-3 py-1 font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-white"
            style={gradientBg}
          >
            Most complete
          </span>
        )}
        <p className="font-body text-[10px] tracking-[0.3em] text-accent uppercase mb-2">{tier.label}</p>
        <h3 className="font-heading font-semibold text-brand-text text-xl mb-3">{tier.name}</h3>
        <p className="font-body text-sm text-brand-muted leading-relaxed mb-5">{tier.summary}</p>

        <ul className="mb-5 space-y-2">
          {tier.includes.map((item) => (
            <li key={item} className="flex gap-2.5 font-body text-sm text-brand-text leading-relaxed">
              <span aria-hidden="true" className="text-accent mt-0.5 shrink-0">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mb-5 border-l-2 border-primary/30 pl-3 font-body text-[13px] italic text-brand-muted leading-relaxed">
          {tier.example}
        </p>

        <dl className="mt-auto space-y-4 border-t border-primary/10 pt-5">
          <Row label="Human in the loop">{tier.humanInTheLoop}</Row>
          <Row label="Error handling">{tier.errorHandling}</Row>
          <Row label="Timeline">{tier.timeline}</Row>
          <Row label="Price">
            {showPricing && tier.price
              ? `${tier.price.international} · ${tier.price.bangladesh}`
              : "Pricing discussed on the call."}
          </Row>
        </dl>
      </article>
    </Reveal>
  );
}
