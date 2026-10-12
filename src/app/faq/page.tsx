import { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/config/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description:
    "Frequently asked questions about ByteFlow AI Labs' AI automation services, how we work, pricing structure, and what to expect from a project.",
  openGraph: {
    title: "FAQ — ByteFlow AI Labs",
    description:
      "Answers to common questions about our AI automation services, project process, pricing, and support.",
    url: "/faq",
  },
  twitter: {
    title: "FAQ — ByteFlow AI Labs",
    description:
      "Common questions about ByteFlow AI Labs automation services, how we work, and project expectations.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="bg-brand-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07)_0%,transparent_65%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-8 bg-primary/40" />
            <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
              Help Centre
            </p>
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <h1 className="font-heading font-semibold text-brand-text text-5xl sm:text-6xl leading-[1.08] mb-6">
            Frequently Asked<br />
            <span className="text-accent">Questions</span>
          </h1>
          <p className="font-body text-brand-muted text-base md:text-lg leading-relaxed">
            Can&apos;t find what you need?{" "}
            <Link href="/contact" className="text-accent hover:underline">
              Contact us directly.
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
        <div className="divide-y divide-primary/10 border-t border-primary/10">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-start justify-between gap-4">
                <span className="font-heading font-semibold text-brand-text text-lg leading-snug">
                  {item.q}
                </span>
                <span className="text-accent text-xl shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <p className="mt-4 font-body text-sm text-brand-muted leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
