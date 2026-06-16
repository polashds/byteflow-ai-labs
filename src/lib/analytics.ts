export function trackGA4Lead() {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "generate_lead");
}

export function trackPixelLead(eventId?: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead", {}, eventId ? { eventID: eventId } : undefined);
}
