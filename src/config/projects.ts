/*
 * Project breakdown pages (/portfolio/[slug]). Copy is limited to what was
 * built and can be shown: no client names without written permission, no
 * metrics, no claims beyond the delivered system. Workflow diagrams are
 * simplified from sanitized structures (node names, types and connections
 * only) or, where no export may be used, from the public description.
 */

export interface DiagramStep {
  /** Node display name (sanitized) or plain step label. */
  title: string;
  /** Node type or a one-line explanation. */
  note?: string;
  /** Extra items attached to this step, e.g. an AI agent's model and tools. */
  attached?: { label: string; items: string[] };
}

export interface ProjectDiagram {
  title: string;
  steps: DiagramStep[];
}

export interface ProjectVideo {
  /** YouTube video id. Empty = the video section is not rendered. */
  youtubeId: string;
  title: string;
  /** Optional poster image under /public. A styled placeholder is used without one. */
  poster?: string;
}

export interface ProjectScreenshot {
  /** Image under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  /** Matching entry in caseStudies.ts; /portfolio links that section here. */
  caseStudyId: string;
  /** Public name. Use a description, not a client name, unless permission is confirmed. */
  title: string;
  badge: string;
  summary: string;
  meta: { title: string; description: string };
  problem: string;
  built: { intro: string; points: string[]; note?: string };
  diagrams: ProjectDiagram[];
  diagramCaption: string;
  /** Error handling, handoff and limits. Leave empty until confirmed; the section is then hidden. */
  handling: string[];
  stack: string[];
  demo: ProjectVideo;
  /** Screenshots the client agreed to show. Omit for none. */
  screenshots?: ProjectScreenshot[];
}

export const projectSectionLabels = {
  back: "All projects",
  problem: "The problem",
  built: "What we built",
  diagram: "How the workflow is connected",
  handling: "Errors and human handoff",
  stack: "Stack",
  demo: "Demo",
  screenshots: "Screenshots",
  screenshotsHeading: "The live site",
  ctaHeading: "Want something like this for your business?",
  ctaBody: "A free 30-minute consultation. Tell us where enquiries or orders get stuck, and we will tell you honestly what is worth automating.",
  ctaButton: "Book a free 30-minute consultation",
} as const;

export const projects: Project[] = [
  {
    slug: "shifa-advanced-dental",
    caseStudyId: "shifa-advanced-dental",
    title: "Shifa Advanced Dental Care — Clinic Website and Online Booking",
    badge: "Client project · Shifa Advanced Dental Care & Implant Center",
    summary:
      "A bilingual website for a dental and implant clinic in Tongi, with an online booking form that saves each request to the clinic's own Google Sheet and alerts the doctor on Telegram.",
    meta: {
      title: "Dental Clinic Website & Booking Automation",
      description:
        "A bilingual dental clinic website in Tongi with n8n booking, designed to send each request to the clinic's Google Sheet and alert the doctor on Telegram.",
    },
    problem:
      "The clinic had no website of its own; patients found it through Facebook and word of mouth. There was no way to ask for an appointment outside phone hours and no record of who had asked. Nothing was set up for Google search or AI answer engines, and patients search in both Bengali and English.",
    built: {
      intro: "A clinic website and a booking workflow, with the clinic owning its own data:",
      points: [
        "A mobile-first website in English and Bengali: services, the doctor's profile, contact and location, FAQ and patient-education articles",
        "WhatsApp, call and directions buttons on each page",
        "An online booking form that saves each request to a sheet in the clinic's own Google account",
        "A Telegram alert to the doctor for each booking, with the patient's number to tap and call back",
        "Structured data for the clinic, the doctor and articles; a sitemap verified in Google Search Console; an llms.txt file for AI assistants",
        "Google Business Profile and Facebook page updated, with a redrawn high-resolution logo, cover and profile images",
      ],
      note: "Named with the client's permission. The full booking path was tested before launch, and the first real patient booking (14 Nov 2026) was saved and both alerts were sent. Booking and search figures will be added after the first monthly report.",
    },
    diagrams: [
      {
        title: "Booking intake",
        steps: [
          { title: "Booking Request Webhook", note: "Webhook (POST) from the website form" },
          { title: "Is Secret Valid", note: "IF — a missing or wrong key gets Respond Unauthorized" },
          { title: "Normalize Booking", note: "Set" },
          { title: "Is Booking Valid", note: "IF — an incomplete request gets Respond Invalid Booking" },
          { title: "Save Booking to Clinic Sheet", note: "Google Sheets (append)" },
          { title: "Respond Booking Saved", note: "Respond to Webhook" },
          { title: "Notify Clinic New Booking", note: "Telegram, to the doctor" },
          { title: "Notify ByteFlow New Booking", note: "Telegram, to ByteFlow AI Labs" },
        ],
      },
      {
        title: "If the booking cannot be saved",
        steps: [
          { title: "Save Booking to Clinic Sheet", note: "Error output" },
          { title: "Respond Save Failed", note: "Respond to Webhook" },
          { title: "Alert Booking Save Failed", note: "Telegram, urgent alert to ByteFlow AI Labs" },
        ],
      },
    ],
    diagramCaption: "Node names from the live n8n workflow (Shifa Booking Intake v2); credentials and settings removed.",
    handling: [
      "Requests without the shared secret key are refused, so fake submissions do not reach the sheet.",
      "Incomplete requests are rejected with a clear response instead of being saved.",
      "If a booking fails to save, ByteFlow AI Labs gets an urgent Telegram alert, so the patient can still be called back.",
      "The website stores no patient data. Bookings are deleted weekly and kept no longer than 14 days.",
      "Analytics loads only after the visitor accepts cookies (Google Consent Mode v2), and the data is kept for 2 months.",
      "Each change goes to a password-protected staging copy first and reaches the live site only after approval, with the previous version kept ready to restore.",
    ],
    stack: [
      "Next.js",
      "n8n (self-hosted)",
      "Google Sheets",
      "Telegram Bot API",
      "GA4 + Consent Mode v2",
      "Google Search Console",
      "Docker + Traefik",
    ],
    demo: { youtubeId: "", title: "Shifa booking demo" },
    screenshots: [
      {
        src: "/images/portfolio/shifa-dental-homepage.webp",
        alt: "Homepage of shifaadvanceddental.com: the heading 'Dental care and implant treatment in Tongi' with buttons to book an appointment, call and message on WhatsApp",
        width: 1220,
        height: 676,
        caption: "Homepage of shifaadvanceddental.com (November 2026). The clinic labels the photo as an illustrative image.",
      },
    ],
  },
  {
    slug: "pustihaat-ecommerce-automation",
    caseStudyId: "pustihaat",
    title: "Pustihaat — E-commerce Order, Lead and Cart Automation",
    badge: "Client project · Pustihaat",
    summary:
      "Three automations for an online store in Bangladesh: WooCommerce orders sent to Steadfast Courier, WhatsApp replies to Facebook lead-ad enquiries, and abandoned-cart recovery emails. Live since September 2026.",
    meta: {
      title: "WooCommerce, Steadfast & WhatsApp Automation",
      description:
        "E-commerce automation for Pustihaat, designed to send WooCommerce orders to Steadfast Courier, reply to Facebook lead ads on WhatsApp and email abandoned carts.",
    },
    problem:
      "Pustihaat sells online through a WooCommerce store. The goal was to take three repetitive jobs off the team: booking each order with the courier, replying to enquiries from Facebook lead ads, and following up shoppers who leave items in their cart.",
    built: {
      intro: "Three n8n automations that work alongside the store team:",
      points: [
        "New WooCommerce orders sent to Steadfast Courier to book the parcel",
        "A WhatsApp reply to each new Facebook lead-ad enquiry",
        "Abandoned-cart recovery emails to shoppers who leave items in their cart",
      ],
      note: "Named with the client's permission. Delivered in September 2026 and still running (November 2026). Order, reply and recovery figures will be added when available.",
    },
    diagrams: [
      {
        title: "Order to courier",
        steps: [
          { title: "New order", note: "WooCommerce" },
          { title: "Book the parcel", note: "Steadfast Courier" },
        ],
      },
      {
        title: "Lead-ad reply",
        steps: [
          { title: "New lead-ad enquiry", note: "Facebook Lead Ads" },
          { title: "Reply to the enquiry", note: "WhatsApp" },
        ],
      },
      {
        title: "Cart recovery",
        steps: [
          { title: "Cart left without checkout", note: "WooCommerce" },
          { title: "Recovery email", note: "Email" },
        ],
      },
    ],
    diagramCaption: "Simplified view of the three live workflows; node names, credentials and settings not shown.",
    handling: [],
    stack: ["n8n", "WooCommerce", "Steadfast Courier", "Facebook Lead Ads", "WhatsApp", "Email"],
    demo: { youtubeId: "", title: "Pustihaat automation demo" },
  },
  {
    slug: "mustaraka-properties",
    caseStudyId: "mustaraka-properties",
    title: "Mustaraka Properties",
    badge: "Internal system (our own venture)",
    summary:
      "A WhatsApp lead system for our own real estate venture in Dhaka: it qualifies enquiries, scores them, books viewings against real availability and hands over to a person.",
    meta: {
      title: "Mustaraka Properties — WhatsApp Lead Agent (Internal System)",
      description:
        "How we built the WhatsApp lead agent for our own real estate venture: qualification, scoring, viewing booking against real availability and handover to a person.",
    },
    problem:
      "Mustaraka Properties is our own real estate venture in Dhaka, so we are both the builder and the operator. It needed one system to capture enquiries from Facebook ads, the website and WhatsApp, ask the qualifying questions, alert the right agent and book viewings, without relying on paid SaaS tools.",
    built: {
      intro: "A self-hosted system built on n8n, PostgreSQL and the WhatsApp Cloud API:",
      points: [
        "A WhatsApp lead agent that asks the qualifying questions and saves the answers to the lead record",
        "Lead scoring with rules we can read and change, and an alert to the team for high-scoring leads",
        "Viewing booking against real availability",
        "Handover to an advisor with the full conversation, and a manual-send path for when a person takes over",
        "A listings-aware website chatbot, WhatsApp and Telegram lead alerts, and an admin CRM",
      ],
      note: "The booking flow was tested end to end over live WhatsApp. It is our own business, not a client deployment, and no performance figures are published.",
    },
    diagrams: [
      {
        title: "Lead agent",
        steps: [
          { title: "WhatsApp Inbound (POST)", note: "Webhook" },
          { title: "Parse Inbound", note: "Code" },
          { title: "Load / Create Lead", note: "Postgres" },
          { title: "Log Inbound", note: "Postgres" },
          { title: "Human Mode?", note: "IF — if a person has taken over, the agent does not reply" },
          { title: "Prep Agent Input", note: "Code" },
          {
            title: "AI Lead Qualifier",
            note: "AI Agent",
            attached: {
              label: "Connected to",
              items: [
                "AI model (via OpenRouter)",
                "Conversation Memory (Postgres)",
                "Tool: save_lead_field",
                "Tool: score_and_qualify",
                "Tool: handoff_to_agent",
                "Tool: check_availability",
                "Tool: book_viewing",
              ],
            },
          },
          { title: "Send WhatsApp Reply", note: "HTTP Request" },
          { title: "Log Outbound", note: "Postgres" },
        ],
      },
      {
        title: "Handoff to agent (called by the lead agent)",
        steps: [
          { title: "When called by another workflow", note: "Execute Workflow Trigger" },
          { title: "Set Handed Off", note: "Postgres" },
          { title: "Notify Salesperson", note: "HTTP Request" },
        ],
      },
      {
        title: "Manual send (human takeover)",
        steps: [
          { title: "Manual send webhook", note: "Webhook" },
          { title: "Validate Input", note: "Code" },
          { title: "Send via Cloud API", note: "HTTP Request" },
          { title: "Log Message", note: "Postgres" },
          { title: "Update human_mode", note: "Postgres" },
          { title: "Respond 200", note: "Respond to Webhook" },
        ],
      },
    ],
    diagramCaption: "Simplified view of the real workflow; node details removed.",
    handling: [
      "When a person takes over a conversation, a flag on the lead stops the AI agent from replying until the team hands it back.",
      "The handoff tool marks the lead as handed off and notifies the salesperson.",
      "High-scoring leads trigger an alert to the team after scoring.",
      "Inbound and outbound messages are logged against the lead.",
    ],
    stack: [
      "n8n (self-hosted)",
      "WhatsApp Cloud API",
      "PostgreSQL",
      "AI agent via OpenRouter",
      "Next.js",
      "Telegram alerts",
      "Docker + Traefik",
    ],
    demo: { youtubeId: "", title: "Mustaraka lead agent demo" },
  },
  {
    slug: "receipt-verification",
    caseStudyId: "nova-digital-store",
    title: "Receipt verification on WhatsApp — Nova Digital Store",
    badge: "Client project · Nova Digital Store",
    summary:
      "A WhatsApp workflow that reads payment-receipt screenshots, checks them against the order ledger, catches repeat submissions and confirms or rejects the customer, with staff alerted for edge cases.",
    meta: {
      title: "Receipt Verification on WhatsApp — Nova Digital Store (Client Project)",
      description:
        "A 69-node n8n workflow built for Nova Digital Store, a digital-products store: OCR on payment-receipt screenshots, ledger check, duplicate detection and staff review for edge cases.",
    },
    problem:
      "Customers sent payment-receipt screenshots on WhatsApp to complete their purchases. Staff checked each image by hand, matched the reference number against the order records and approved or rejected the order, which was slow on busy days.",
    built: {
      intro: "A 69-node n8n workflow on the client's server:",
      points: [
        "Customers send payment-receipt screenshots on WhatsApp",
        "OCR reads the amount and transaction reference",
        "The details are checked against a Google Sheets order ledger",
        "Repeat submissions of the same transaction are caught",
        "The customer gets a confirmation or a rejection; staff are alerted for edge cases",
      ],
      note: "Documentation and handover were delivered in the client's working language (Spanish). This client's payments were not bKash or Nagad, but the receipt-checking method is the same. No time-saved or accuracy figures are published.",
    },
    diagrams: [
      {
        title: "Receipt check",
        steps: [
          { title: "Receipt on WhatsApp" },
          { title: "OCR extraction" },
          { title: "Ledger check" },
          { title: "Duplicate detection" },
          { title: "Reply or staff review" },
        ],
      },
    ],
    diagramCaption: "Simplified view based on the delivered workflow; client system details not shown.",
    handling: [
      "Receipts that fall outside the agreed rules go to staff for manual review instead of being approved.",
      "A repeat submission of the same transaction is flagged.",
      "Staff are alerted only for the cases that need a person.",
    ],
    stack: ["n8n (self-hosted)", "WhatsApp Business (Evolution API)", "OCR", "Google Sheets", "VPS"],
    demo: { youtubeId: "", title: "Receipt verification demo" },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectForCaseStudy(caseStudyId: string): Project | undefined {
  return projects.find((p) => p.caseStudyId === caseStudyId);
}
