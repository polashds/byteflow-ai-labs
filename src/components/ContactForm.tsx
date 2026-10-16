"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { submitContact } from "@/lib/actions";
import { serviceCategories } from "@/config/services";
import { BUDGET_OPTIONS } from "@/config/contact";
import { trackGA4Lead, trackPixelLead } from "@/lib/analytics";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const eventId = crypto.randomUUID();
      formData.append("eventId", eventId);
      const result = await submitContact(formData);
      if (result.success) {
        trackGA4Lead("contact_form");
        trackPixelLead(eventId);
        setSubmitted(true);
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="py-16 text-center border border-primary/20 rounded-card bg-brand-surface">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-8 bg-primary/40" />
          <p className="font-body text-[10px] font-medium tracking-[0.35em] text-accent uppercase">
            Enquiry Received
          </p>
          <span className="h-px w-8 bg-primary/40" />
        </div>
        <h2 className="font-heading font-semibold text-brand-text text-3xl mb-4">
          Thank you
        </h2>
        <p className="font-body text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
          We&apos;ve received your enquiry and passed it to our team&apos;s workflow. Next, a person
          reads your description and contacts you to set up a free 30-minute call. After that call we send a scoped proposal if
          there is a fit. In the meantime, feel free to explore our{" "}
          <Link href="/services" className="text-accent hover:underline">
            services
          </Link>{" "}
          or{" "}
          <Link href="/portfolio" className="text-accent hover:underline">
            case studies
          </Link>
          .
        </p>
      </div>
    );
  }

  const fieldCls =
    "w-full bg-brand-bg border border-primary/15 rounded-field text-brand-text font-body text-sm px-4 py-3.5 placeholder:text-brand-muted/40 focus:outline-none focus:border-primary/50 transition-colors duration-150";

  const labelCls =
    "block font-body text-[11px] tracking-[0.2em] text-brand-muted uppercase mb-1.5";

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Full Name *</label>
          <input
            type="text"
            name="name"
            id="cf-name"
            required
            placeholder="Your name"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelCls}>Company</label>
          <input
            type="text"
            name="company"
            id="cf-company"
            placeholder="Company or business name"
            className={fieldCls}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-email" className={labelCls}>Email Address</label>
          <input
            type="email"
            name="email"
            id="cf-email"
            placeholder="you@company.com"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone / WhatsApp</label>
          <input
            type="tel"
            name="phone"
            id="cf-phone"
            placeholder="+880 1700 000000"
            className={fieldCls}
          />
        </div>
      </div>

      {/* Service + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-service" className={labelCls}>Service Interested In</label>
          <select name="service" id="cf-service" className={fieldCls} defaultValue="">
            <option value="" disabled>
              Select a service category…
            </option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.title}>
                {cat.icon} {cat.title}
              </option>
            ))}
            <option value="Not sure — need advice">Not sure — need advice</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className={labelCls}>Approximate Budget</label>
          <select name="budget" id="cf-budget" className={fieldCls} defaultValue="">
            <option value="" disabled>
              Select a budget range…
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project details */}
      <div>
        <label htmlFor="cf-message" className={labelCls}>Project Details</label>
        <textarea
          name="message"
          id="cf-message"
          rows={5}
          placeholder="Where do leads, messages or orders get stuck today? Which tools do you use (ads, WhatsApp, CRM, spreadsheets)? What would a good outcome look like?"
          className={`${fieldCls} resize-none`}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="font-body text-sm text-red-400 border border-red-400/20 rounded-field bg-red-400/5 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-btn w-full py-4 text-white font-body text-[11px] font-semibold tracking-[0.2em] uppercase transition-opacity duration-200 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
      >
        {isPending ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="font-body text-[11px] text-brand-muted text-center">
        A person follows up · Free 30-minute call · No spam, ever
      </p>
    </form>
  );
}
