import type { LeadMagnetKey } from "@/config/leadMagnets";
import { brand } from "@/config/branding";
import type { WorkflowKey } from "@/config/workflows";

/*
 * Industry vertical landing pages. Copy lives here; the page files hold
 * layout only. Capability wording is "designed to ..." unless it describes
 * something we actually built (the proof section). No outcome numbers, no
 * response-time promises, no pricing while `showPricing` is false.
 */

export interface VerticalTier {
  kind: "starter" | "core" | "care";
  name: string;
  label: string;
  summary: string;
  includes: string[];
  example: string;
  humanInTheLoop: string;
  errorHandling: string;
  timeline: string;
  /** Never rendered unless the vertical's `showPricing` is true. */
  price?: { international: string; bangladesh: string };
  featured?: boolean;
}

export interface VerticalProof {
  title: string;
  label: string;
  body: string;
}

export interface VerticalReview {
  platform: "Upwork" | "Fiverr";
  project: string;
  /** Verbatim client text, without surrounding quote marks. */
  quote: string;
  link?: string;
}

export interface Vertical {
  slug: string;
  path: string;
  /** Short name, used in breadcrumbs and structured data. */
  name: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; subhead: string };
  whoFor: string[];
  painPoints: string[];
  painCaption: string;
  tiers: VerticalTier[];
  tierNote?: string;
  notIncluded: string[];
  trustNote?: string;
  proof: VerticalProof[];
  reviews: VerticalReview[];
  reviewsFraming: string;
  reviewsNote?: string;
  faq: { q: string; a: string }[];
  cta: { heading: string; body: string; button: string };
  showPricing: boolean;
  pricingReviewDate: string;
  /** Empty = no demo section and no demo wording anywhere on the page. */
  demoUrl?: string;
  demoFullUrl?: string;
  demoTitle?: string;
  demoCaption?: string;
  analyticsKey: "vertical_real_estate" | "vertical_ecommerce";
  /** Illustrative animated workflow shown after the pain points. */
  workflow?: WorkflowKey;
  /** Downloadable checklist shown above the final CTA. */
  leadMagnet?: LeadMagnetKey;
}

export interface ComingSoonVertical {
  name: string;
  body: string;
}

export const comingSoonVerticals: ComingSoonVertical[] = [
  {
    name: "Travel & Local Services",
    body: "For travel agencies, tour operators and local service businesses (rentals, repairs, cleaning, salons) that take enquiries and bookings on WhatsApp and Facebook. Hero product: Enquiry-to-Booking Assistant, designed to reply, collect trip or job details, and hand a ready booking request to your team.",
  },
  {
    name: "Agencies & B2B",
    body: "For marketing agencies, consultancies and B2B service firms whose leads arrive from many sources and get lost before anyone qualifies them. Hero product: Lead Qualification & CRM Automation, designed to capture every lead, score it with plain-language rules, and route it into your CRM, with a person on every handover.",
  },
];

export const realEstate: Vertical = {
  slug: "real-estate-automation",
  path: "/real-estate-automation",
  name: "Real Estate Lead Automation",
  meta: {
    title: "Real Estate Lead Automation — WhatsApp Lead-to-Viewing System",
    description:
      "A WhatsApp system designed to reply to property enquiries, ask the qualifying questions and book viewings against real availability — with your agents taking over whenever it matters.",
  },
  hero: {
    eyebrow: "Real Estate",
    headline: "Every property enquiry answered, qualified and booked for a viewing.",
    subhead:
      "A Lead-to-Viewing System designed to reply on WhatsApp, ask budget, area and timing, log every lead in your CRM and book viewings against real slots — with your agents taking over whenever it matters.",
  },
  whoFor: [
    "Property agencies, brokers and developers that get buyer and tenant enquiries from Facebook and Instagram ads, property portals, their website and WhatsApp.",
    "Bangladesh: developers and agencies running Facebook lead ads, mostly handled on WhatsApp in Bengali.",
    "UK and US: lettings and sales agencies with web-form and portal leads that already use a CRM.",
  ],
  painPoints: [
    "\"Leads come in at 11 pm and we reply the next morning. By then they've messaged three other agencies.\"",
    "\"Half of them just ask the price and disappear.\"",
    "\"Nobody knows who called whom. Leads sit in five agents' phones.\"",
    "\"Booking a site visit takes ten messages back and forth.\"",
    "\"We spend on Facebook ads but can't tell which ad brought the buyer who actually closed.\"",
  ],
  painCaption:
    "Typical things agencies tell us. Your situation may differ — that's what the call is for.",
  tiers: [
    {
      kind: "starter",
      label: "Starter",
      name: "Property Lead Auto-Reply",
      summary:
        "One lead source connected to an automatic WhatsApp reply, so no enquiry sits unanswered while your team is busy.",
      includes: [
        "Facebook lead form OR website form",
        "Automatic WhatsApp reply in Bengali or English",
        "Alert to the right agent",
        "Every lead logged to a Google Sheet",
      ],
      example:
        "A Dhaka agency's lead ad triggers a WhatsApp reply — \"Thanks — what area and budget are you looking at?\" — and the agent on duty is alerted.",
      humanInTheLoop: "Your agent is alerted on every lead.",
      errorHandling: "Failure alert if the reply or the sheet write fails.",
      timeline: "3–5 working days",
      price: { international: "$500–800", bangladesh: "৳22k–49k" },
    },
    {
      kind: "core",
      label: "Core",
      name: "Lead-to-Viewing System",
      featured: true,
      summary: "The full system, designed to take a lead from first message to booked viewing.",
      includes: [
        "Leads from ads, website and WhatsApp in one place",
        "AI asks budget, area, property type and timeline",
        "Lead scored with rules you can read and change",
        "CRM stages with agent assignment",
        "Viewing booked against real slots — one booking per slot",
        "Follow-ups that stop when the lead replies",
        "Handover to a person for price talks",
        "Documentation, recorded walkthrough and 30 days of support",
      ],
      example:
        "A buyer replies \"Gulshan, 3 bed, under 2 crore\" → scored high → offered three viewing times → books Saturday 11 am → the agent gets the summary and takes over when the buyer wants to negotiate.",
      humanInTheLoop:
        "Hands over on negotiation, complaints, low-confidence answers, or whenever the lead asks for a person.",
      errorHandling:
        "Failure alerts, no double-booking, and a fallback message if booking is unavailable.",
      timeline: "2–3 weeks",
      price: { international: "$1,500–2,500", bangladesh: "৳65k–154k" },
    },
    {
      kind: "care",
      label: "Care Plan",
      name: "Property Pipeline Care",
      summary:
        "Monthly care so the system keeps working as your projects, slots and team change.",
      includes: [
        "Monitoring and fixes for what we built",
        "Slot and agent updates",
        "Small changes up to 3 hours a month",
        "Monthly report",
      ],
      example:
        "A new project launches: new qualifying questions and viewing slots are added the same month.",
      humanInTheLoop: "Monthly review of handovers and failures with you.",
      errorHandling: "Included.",
      timeline: "Monthly, 3-month minimum",
      price: { international: "$300–400/mo", bangladesh: "৳13k–25k/mo" },
    },
  ],
  tierNote:
    "Optional add-ons: a website listings chatbot that answers from your live listings, and a voice receptionist designed to answer calls and hand over to your team (voice and phone costs are billed to you directly by the provider). Timelines start once we have access and your inputs; WhatsApp number and template approval is decided by Meta.",
  notIncluded: [
    "Running ads",
    "Portal subscriptions",
    "Legal or financial advice",
    "Price negotiation by AI",
  ],
  demoTitle: "See a property lead go from a Facebook ad to a booked viewing",
  demoCaption: "Demo on test listings and test slots. No real customer data.",
  proof: [
    {
      title: "Mustaraka Properties — our own venture",
      label: "Built · internal",
      body: "A WhatsApp lead agent that qualifies enquiries, scores them, books viewings against real availability and hands over to an advisor with the full conversation. Plus a listings-aware website chatbot, WhatsApp and Telegram lead alerts, and an admin CRM. The booking flow was tested end to end over live WhatsApp. It's our own business, not a client deployment, and no performance figures are published.",
    },
  ],
  reviewsFraming: "What clients say about our lead and CRM work",
  reviewsNote:
    "These reviews are for lead-qualification and CRM projects, not real-estate clients.",
  reviews: [
    {
      platform: "Upwork",
      project: "Lead Qualification & CRM Automation",
      quote:
        "Siddique delivered exactly what we needed for ai lead qualification and automation. The scoring and auto-tagging system was clear, practical, and easy to adjust. Good communication, solid work, and a smooth delivery. I'd definitely work with him again.",
      link: brand.upworkUrl,
    },
    {
      platform: "Upwork",
      project: "n8n CRM & lead-gen workflow",
      quote:
        "Great work. Siddique understood the workflow quickly, handled the Zoho mapping and duplicate logic well, and delivered on time. Would work with him again.",
    },
    {
      platform: "Fiverr",
      project: "GoHighLevel CRM organisation",
      quote:
        "Great experience working with Siddique. He organized my GHL CRM, set up the workflows and smart list, and handled the small changes I requested without any issues. Good communication and everything was delivered as expected.",
      link: brand.fiverrUrl,
    },
  ],
  faq: [
    {
      q: "Will the AI negotiate price or promise availability?",
      a: "No. It's designed to qualify, answer from your approved listing information and book viewings against real slots. Price negotiation, offers and anything uncertain go to your agent with the full chat.",
    },
    {
      q: "Does it work with our CRM?",
      a: "If your CRM has an API or webhooks, we can connect to it. If you don't have one, we set up a simple self-hosted CRM or a Google Sheet as part of Core.",
    },
    {
      q: "Can it reply in Bengali?",
      a: "Yes — Bengali and English, tested on your real enquiries before launch. For other markets it's English only for now; Arabic is not offered yet.",
    },
    {
      q: "What if two buyers want the same viewing slot?",
      a: "Each slot can only be booked once. The second buyer is offered the next available times.",
    },
    {
      q: "What do we need to provide?",
      a: "Access to your lead forms or ads, your WhatsApp number, your CRM or sheet, your listings, viewing hours, and who handles which leads.",
    },
  ],
  cta: {
    heading: "Find out if this fits your agency",
    body: "A free 30-minute consultation. Tell us where enquiries get stuck — we'll tell you honestly whether Starter, Core or nothing at all makes sense.",
    button: "Book a free 30-minute consultation",
  },
  // Pricing review date: 15 Nov 2026 — do not enable without Polash's approval.
  showPricing: false,
  pricingReviewDate: "2026-11-15",
  // Demo hook: leave empty until the demo exists (task CC-6). Empty = no demo section.
  demoUrl: "",
  demoFullUrl: "",
  analyticsKey: "vertical_real_estate",
  leadMagnet: "realEstate",
  workflow: "lead",
};
