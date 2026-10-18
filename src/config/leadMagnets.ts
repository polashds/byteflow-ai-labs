/**
 * Downloadable guides (lead magnets). The API stores `service` on the Lead
 * and sends `guide` to the n8n webhook, so follow-up emails can differ by guide.
 * PDFs live in /public.
 */
export const leadMagnets = {
  general: {
    titleStart: "10 AI Automations Every",
    titleHighlight: "Business Needs",
    pdf: "/ByteFlow-10-AI-Automations-Every-Business-Needs.pdf",
    service: "Lead Magnet: 10 AI Automations",
    eyebrow: "Free Guide",
    blurb: "Ten practical automations grouped by industry, with the first step for each.",
  },
  realEstate: {
    titleStart: "The property lead checklist:",
    titleHighlight: "7 places enquiries get lost",
    pdf: "/ByteFlow-Property-Lead-Checklist.pdf",
    service: "Lead Magnet: Property lead checklist",
    eyebrow: "Free checklist",
    blurb:
      "Tick the gaps that happen in your agency. Each comes with a way to close it by hand this week, and a way to close it with automation.",
  },
  ecommerce: {
    titleStart: "Payment screenshot checklist:",
    titleHighlight: "9 checks before you confirm an order",
    pdf: "/ByteFlow-Payment-Screenshot-Checklist.pdf",
    service: "Lead Magnet: Payment screenshot checklist",
    eyebrow: "Free checklist",
    blurb:
      "For bKash, Nagad and bank-transfer screenshots: what to check by hand, what can be automated, and what should stay with a person.",
  },
} as const;

export type LeadMagnetKey = keyof typeof leadMagnets;
export const leadMagnetKeys = Object.keys(leadMagnets) as [LeadMagnetKey, ...LeadMagnetKey[]];
