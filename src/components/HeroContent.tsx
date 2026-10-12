import Link from "next/link";
import ConsultationCTA from "@/components/ConsultationCTA";

/**
 * Homepage hero. Server component: the entrance animation is pure CSS
 * (`animate-fade-up`, disabled under prefers-reduced-motion in globals.css),
 * so the headline is part of the initial HTML and there is no JS-driven
 * re-render / flash.
 */

const gradientText = {
  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const gradientBg = { background: "linear-gradient(135deg, #2563EB, #22D3EE)" } as const;

/** Describes the lead-handling system we build — read left to right. */
const flow = [
  { title: "Lead arrives", body: "Ad form, website or WhatsApp" },
  { title: "First reply", body: "Sent on WhatsApp straight away" },
  { title: "Scored and saved", body: "To your CRM, with its source" },
  { title: "Team alerted", body: "The right person, instantly" },
  { title: "Follow-up", body: "Runs until they reply or book" },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function HeroContent() {
  return (
    <div className="relative z-10 text-center max-w-[1040px] mx-auto px-6 lg:px-10 pt-20 pb-28">
      {/* Eyebrow */}
      <p
        className="animate-fade-up font-body text-[11px] tracking-[0.4em] text-accent/80 uppercase mb-7"
        style={delay(0)}
      >
        AI automation that runs real business operations
      </p>

      {/* Headline: who + pain + outcome */}
      <h1
        className="animate-fade-up font-heading font-semibold text-brand-text leading-[1.08] text-[2rem] sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] mb-7"
        style={delay(80)}
      >
        Stop losing leads and orders to{" "}
        <span className="inline-block" style={gradientText}>
          slow, manual follow-up
        </span>
      </h1>

      {/* Specific supporting statement */}
      <p
        className="animate-fade-up font-body text-[15px] sm:text-base text-brand-muted leading-[1.8] max-w-[640px] mx-auto mb-10"
        style={delay(160)}
      >
        We build connected systems for businesses that sell through Facebook ads, websites and
        WhatsApp: leads captured and answered, saved to your CRM, routed to the right person and
        followed up automatically — running on infrastructure you own.
      </p>

      {/* CTAs */}
      <div
        className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center"
        style={delay(240)}
      >
        <ConsultationCTA
          location="home_hero"
          className="px-10 py-4 font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)]"
          style={gradientBg}
        >
          Discuss Your Workflow
        </ConsultationCTA>
        <Link
          href="/portfolio"
          className="px-10 py-4 bg-transparent text-brand-text font-body text-[11px] font-normal tracking-[0.2em] uppercase border border-white/20 hover:border-accent hover:text-accent transition-all duration-300"
        >
          See What We&apos;ve Built →
        </Link>
      </div>
      <p
        className="animate-fade-up font-body text-xs text-brand-muted/70 mt-5"
        style={delay(300)}
      >
        Free 30-minute call. Tell us where leads or orders get stuck — a person from our team follows up.
      </p>

      {/* What the system does, in order */}
      <ol
        aria-label="How a lead moves through the system we build"
        className="relative mt-16 grid grid-cols-1 sm:grid-cols-5 gap-5 sm:gap-3 text-left sm:text-center"
      >
        <span
          aria-hidden="true"
          className="hidden sm:block absolute top-[15px] left-[10%] right-[10%] h-px bg-primary/20"
        />
        {flow.map((step, i) => (
          <li
            key={step.title}
            className="animate-fade-up relative flex sm:flex-col items-start sm:items-center gap-4 sm:gap-3"
            style={delay(380 + i * 90)}
          >
            <span className="relative z-10 shrink-0 w-[31px] h-[31px] rounded-full border border-primary/35 bg-brand-bg flex items-center justify-center font-heading font-semibold text-xs">
              <span style={gradientText}>{i + 1}</span>
            </span>
            <span>
              <span className="block font-heading font-semibold text-brand-text text-sm leading-snug">
                {step.title}
              </span>
              <span className="block font-body text-xs text-brand-muted leading-snug mt-1">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
