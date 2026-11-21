export type ResultItem = {
  label: string;
  value: string;
  /** If true, this is a placeholder the client should replace with a real metric */
  isPlaceholder?: boolean;
};

/**
 * How the project should be described publicly. Be strict: only mark a project
 * "client" when it was delivered for a third party, and never publish a metric
 * that has not been measured.
 */
export type ProjectType = "client" | "internal" | "demo" | "prototype";

export const projectTypeLabel: Record<ProjectType, string> = {
  client: "Client project",
  internal: "Internal system (our own venture)",
  demo: "Demonstration project",
  prototype: "Prototype",
};

export type CaseStudy = {
  id: string;
  /** See ProjectType — shown as a badge on the portfolio page */
  projectType?: ProjectType;
  client: string;
  industry: string;
  location: string;
  year: string;
  tagline: string;
  challenge: string;
  solution: string;
  technology: string[];
  results: ResultItem[];
  /** If true, renders as an empty "add your project" slot */
  isPlaceholder?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    // Named with the client's permission (given 21 Nov 2026).
    id: "shifa-advanced-dental",
    projectType: "client",
    client: "Shifa Advanced Dental Care & Implant Center",
    industry: "Dental Clinic",
    location: "Tongi, Gazipur, Bangladesh",
    year: "2026",
    tagline:
      "A bilingual clinic website with online booking that goes straight to the doctor: n8n saves each request to the clinic's own Google Sheet and sends a Telegram alert.",
    challenge:
      "The clinic had no website of its own; patients found it through Facebook and word of mouth. There was no way to ask for an appointment outside phone hours and no record of who had asked. Nothing was set up for Google search or AI answer engines, and patients search in both Bengali and English.",
    solution:
      "We built a mobile-first clinic website in English and Bengali, with pages for services, the doctor's profile, contact and location, and patient-education articles, and WhatsApp, call and directions buttons on each page. The booking form sends each request to an n8n workflow that checks a shared secret key, validates the details, saves the request to a sheet in the clinic's own Google account and sends the doctor a Telegram alert he can tap to call the patient back. If a booking fails to save, ByteFlow AI Labs gets an urgent alert. The website stores no patient data, bookings are deleted weekly and kept no longer than 14 days, and analytics loads only after the visitor accepts cookies. We added structured data, a sitemap verified in Google Search Console, an llms.txt file for AI assistants, and updated the clinic's Google Business Profile and Facebook page with a redrawn logo, cover and profile images. The site runs on our server in Docker, with a password-protected staging copy and a rollback for each release.",
    technology: [
      "Next.js",
      "n8n (self-hosted)",
      "Google Sheets",
      "Telegram Bot API",
      "GA4 with Consent Mode v2",
      "Google Search Console",
      "Docker + Traefik",
    ],
    results: [
      { label: "Website", value: "Live in English and Bengali (Nov 2026)" },
      { label: "Online Booking", value: "First real patient booking saved and both alerts sent (14 Nov 2026)" },
      { label: "Failure Alert", value: "A booking that fails to save alerts ByteFlow AI Labs, so it can be followed up" },
      { label: "Search", value: "Sitemap verified and submitted in Google Search Console" },
      {
        label: "Bookings & Search Traffic",
        value: "To be added after the first monthly report (December 2026)",
        isPlaceholder: true,
      },
    ],
  },

  {
    id: "mustaraka-properties",
    projectType: "internal",
    client: "Mustaraka Properties",
    industry: "Real Estate",
    location: "Dhaka, Bangladesh",
    year: "2025",
    tagline:
      "Full-stack AI-ready real estate platform — chatbot trained on live listings, automated lead pipeline, and self-hosted admin CRM.",
    challenge:
      "Mustaraka Properties is our own real estate venture in Dhaka, so we are both the builder and the operator. It was launching its digital presence from scratch and needed more than a website — an integrated system that could capture leads from Facebook Ads and the website simultaneously, notify agents automatically, handle initial enquiries via AI at any hour, and give the team complete control over listings, leads, and content without depending on any third-party SaaS tool that would become a recurring cost.",
    solution:
      "We built a complete Next.js platform (App Router, TypeScript, Tailwind CSS) with a property listings database and a built-in AI chatbot (now running on OpenRouter) that answers enquiries from live listing data. A WhatsApp lead agent qualifies enquiries, books viewings against real availability and hands over to a person when needed. Every lead from the website contact form or a Meta lead ad triggers an n8n workflow that sends automatic WhatsApp and Telegram alerts to agents — pre-formatted with the lead's name, phone, enquiry type, and property interest. A full admin CRM gives the team property CRUD with image upload, blog management, and lead tracking with status updates, all behind an authenticated admin panel. The entire stack is self-hosted on a VPS behind Traefik with automated SSL — no Vercel, no Zapier, no external CRM seats.",
    technology: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Prisma + PostgreSQL",
      "n8n (self-hosted)",
      "OpenRouter (LLM API)",
      "WhatsApp Cloud API",
      "Auth.js (admin authentication)",
      "Docker + Traefik",
      "Let's Encrypt SSL",
    ],
    results: [
      {
        label: "Platform Status",
        value: "Live from launch day",
        isPlaceholder: false,
      },
      {
        label: "AI Chatbot",
        value: "Answers property enquiries and captures requirements; designed to reply outside office hours",
        isPlaceholder: false,
      },
      {
        label: "Lead Pipeline",
        value: "Each submission → automatic WhatsApp + Telegram alert",
        isPlaceholder: false,
      },
      {
        label: "WhatsApp Booking",
        value: "Lead agent books viewings against live availability, with human handover",
        isPlaceholder: false,
      },
      {
        label: "SaaS Dependency",
        value: "None — no Zapier, HubSpot or paid CRM seats needed",
        isPlaceholder: false,
      },
    ],
  },

  {
    id: "nova-digital-store",
    projectType: "client",
    client: "Nova Digital Store",
    industry: "E-commerce (Digital Products)",
    location: "Latin America",
    year: "2025",
    tagline:
      "69-node WhatsApp receipt-verification workflow — manual approval replaced with automated validation and duplicate detection.",
    challenge:
      "A digital products store was receiving a large volume of payment receipt screenshots via WhatsApp. Customers would send images of bank transfers or mobile payment confirmations to complete their purchases. Staff were manually inspecting each image, matching reference numbers against transaction records, and approving or rejecting orders — a process that was slow, error-prone under load, and completely unscalable during promotions and peak demand periods.",
    solution:
      "We designed and built a 69-node n8n workflow on the client's VPS. When a customer sends a payment receipt to the WhatsApp Business number (via Evolution API), the workflow automatically extracts the transaction amount and reference number using OCR, cross-references the record against a Google Sheets order ledger, runs duplicate-detection logic to catch repeat submissions from the same transaction, and sends the customer a confirmation or rejection message — all without staff involvement. A separate alert notifies staff only for edge cases that fall outside the automated rules and require manual review. Full workflow documentation and handover was delivered in Spanish to match the client's working language.",
    technology: [
      "n8n (self-hosted, 69 nodes)",
      "Evolution API (WhatsApp Business)",
      "Google Sheets API",
      "OCR integration",
      "Duplicate-detection logic",
      "VPS deployment",
    ],
    results: [
      {
        label: "Automated Processing",
        value: "Standard transactions handled without staff intervention",
        isPlaceholder: false,
      },
      {
        label: "Duplicate Detection",
        value: "Double-submission attempts caught and flagged automatically",
        isPlaceholder: false,
      },
      {
        label: "Edge-Case Routing",
        value: "Ambiguous receipts flagged to staff with full context",
        isPlaceholder: false,
      },
      {
        label: "Documentation",
        value: "Full workflow docs and handover delivered in Spanish",
        isPlaceholder: false,
      },
    ],
  },
];
