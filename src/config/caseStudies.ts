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
    id: "mustaraka-properties",
    projectType: "internal",
    client: "Mustaraka Properties",
    industry: "Real Estate",
    location: "Dhaka, Bangladesh",
    year: "2025",
    tagline:
      "Full-stack AI-ready real estate platform — chatbot trained on live listings, automated lead pipeline, and self-hosted admin CRM.",
    challenge:
      "Mustaraka Properties is our own real estate venture in Dhaka, so we are both the builder and the operator. It was launching its digital presence from scratch and needed more than a website — an integrated system that could capture leads from Facebook Ads and the website simultaneously, notify agents instantly, handle initial enquiries via AI at any hour, and give the team complete control over listings, leads, and content without depending on any third-party SaaS tool that would become a recurring cost.",
    solution:
      "We built a complete Next.js platform (App Router, TypeScript, Tailwind CSS) with a property listings database and a built-in AI chatbot (now running on OpenRouter) that answers enquiries from live listing data. A WhatsApp lead agent qualifies enquiries, books viewings against real availability and hands over to a person when needed. Every lead from the website contact form or a Meta lead ad triggers an n8n workflow that fires instant WhatsApp and Telegram alerts to agents — pre-formatted with the lead's name, phone, enquiry type, and property interest. A full admin CRM gives the team property CRUD with image upload, blog management, and lead tracking with status updates, all behind an authenticated admin panel. The entire stack is self-hosted on a VPS behind Traefik with automated SSL — no Vercel, no Zapier, no external CRM seats.",
    technology: [
      "Next.js 15 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Prisma + PostgreSQL",
      "n8n (self-hosted)",
      "OpenRouter (LLM API)",
      "Evolution API (WhatsApp Business)",
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
        value: "Handling property enquiries 24/7",
        isPlaceholder: false,
      },
      {
        label: "Lead Pipeline",
        value: "Every submission → instant WhatsApp + Telegram alert",
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
      {
        label: "Lead Conversion Rate",
        value: "[ To be updated after 60 days live ]",
        isPlaceholder: true,
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
        value: "Ambiguous receipts routed to staff with full context — no case dropped",
        isPlaceholder: false,
      },
      {
        label: "Documentation",
        value: "Full workflow docs and handover delivered in Spanish",
        isPlaceholder: false,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PLACEHOLDER — Add your next case study here.
  // Replace all fields below. Set isPlaceholder: false when ready to publish.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "coming-soon",
    client: "Your Business",
    industry: "Your Industry",
    location: "Your Location",
    year: "",
    tagline: "Your project could be the next case study here.",
    challenge: "",
    solution: "",
    technology: [],
    results: [],
    isPlaceholder: true,
  },
];
