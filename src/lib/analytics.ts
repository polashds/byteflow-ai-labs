type EventParams = Record<string, string | number | boolean | undefined>;

export type LeadType = "contact_form" | "chatbot" | "lead_magnet";

/**
 * Generic GA4 event helper. Never pass personal data (names, emails, phone
 * numbers, form contents) as parameters.
 */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/**
 * Fires GA4's recommended `generate_lead` event. Call it only after the server
 * has accepted the submission. `lead_type` lets reports separate high-intent
 * enquiries from guide downloads.
 */
export function trackGA4Lead(leadType?: LeadType) {
  trackEvent("generate_lead", leadType ? { lead_type: leadType } : undefined);
}

/** Click on a primary conversion CTA (consultation / contact). Not a lead. */
export function trackServiceCtaClick(location: string, label: string) {
  trackEvent("service_cta_click", { cta_location: location, cta_label: label });
}

export function trackPixelLead(eventId?: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead", {}, eventId ? { eventID: eventId } : undefined);
}
