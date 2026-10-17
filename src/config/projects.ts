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

export interface Project {
  slug: string;
  /** Public name. Use a description, not a client name, unless permission is confirmed. */
  title: string;
  badge: string;
  summary: string;
  meta: { title: string; description: string };
  problem: string;
  built: { intro: string; points: string[]; note?: string };
  diagrams: ProjectDiagram[];
  diagramCaption: string;
  handling: string[];
  stack: string[];
  demo: ProjectVideo;
}

export const projectSectionLabels = {
  back: "All projects",
  problem: "The problem",
  built: "What we built",
  diagram: "How the workflow is connected",
  handling: "Errors and human handoff",
  stack: "Stack",
  demo: "Demo",
  ctaHeading: "Want something like this for your business?",
  ctaBody: "A free 30-minute consultation. Tell us where enquiries or orders get stuck, and we will tell you honestly what is worth automating.",
  ctaButton: "Book a free 30-minute consultation",
} as const;

export const projects: Project[] = [
  {
    slug: "mustaraka-properties",
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
    title: "Receipt verification on WhatsApp",
    badge: "A digital-products store (client project)",
    summary:
      "A WhatsApp workflow that reads payment-receipt screenshots, checks them against the order ledger, catches repeat submissions and confirms or rejects the customer, with staff alerted for edge cases.",
    meta: {
      title: "Receipt Verification on WhatsApp — Client Project",
      description:
        "A 69-node n8n workflow built for a digital-products store: OCR on payment-receipt screenshots, ledger check, duplicate detection and staff review for edge cases.",
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
