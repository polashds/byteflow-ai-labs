"use client";

/**
 * Smart CTA that routes to Calendly (if NEXT_PUBLIC_CALENDLY_URL is set)
 * or the contact form (/contact#contact-form) otherwise.
 *
 * Client component only so a click can be reported to GA4 as
 * `service_cta_click` (a click is NOT a lead — `generate_lead` still fires
 * only after the form is accepted). NEXT_PUBLIC_* values are inlined at build
 * time, so the Calendly branch behaves exactly as before.
 */
import Link from "next/link";
import { trackServiceCtaClick } from "@/lib/analytics";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /** Where on the site the CTA sits, e.g. "home_hero". Used for reporting only. */
  location?: string;
}

function labelOf(children: React.ReactNode): string {
  return typeof children === "string" ? children : "cta";
}

export default function ConsultationCTA({ className, style, children, location = "unspecified" }: Props) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const onClick = () => trackServiceCtaClick(location, labelOf(children));
  const cls = `btn ${className ?? ""}`;

  if (calendlyUrl) {
    return (
      <a
        href={calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        style={style}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href="/contact#contact-form" className={cls} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
