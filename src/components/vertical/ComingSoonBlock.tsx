import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { ComingSoonVertical } from "@/config/verticals";

export default function ComingSoonBlock({ items }: { items: ComingSoonVertical[] }) {
  return (
    <section className="border-t border-primary/10 bg-brand-bg py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="Next">Other industries — coming soon</SectionHeading>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <li key={item.name}>
              <Reveal index={i} className="h-full border border-primary/10 rounded-card bg-brand-surface/60 p-6">
                <span className="inline-block mb-3 border border-primary/20 rounded-full px-2.5 py-1 font-body text-[10px] tracking-[0.2em] text-brand-muted uppercase">
                  Coming soon
                </span>
                <h3 className="font-heading font-semibold text-brand-muted text-base mb-2">{item.name}</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
