export const BUDGET_OPTIONS = [
  "Under ৳12,000 (~under $100)",
  "৳12,000 – ৳50,000 (~$100–$400)",
  "৳50,000 – ৳1,50,000 (~$400–$1,250)",
  "৳1,50,000 – ৳3,00,000 (~$1,250–$2,500)",
  "৳3,00,000+ (~$2,500+)",
  "Not sure yet / need guidance",
] as const;

/**
 * What happens after someone contacts us.
 *
 * These describe what the site actually does (verified in code): the website
 * chat assistant answers immediately via /api/chat, and contact-form leads are
 * saved to the database and posted to the n8n lead webhook as soon as they are
 * accepted. They are NOT a promise about how fast a person replies — do not add
 * a response-time guarantee here without confirming the team can meet it.
 */
export const afterContactSteps = [
  {
    title: "Saved and routed",
    body: "Your enquiry is saved and passed to our automation workflow the moment you send it. Questions in the website chat are answered straight away by our AI assistant.",
  },
  {
    title: "A person reviews it",
    body: "Someone from our team reads what you wrote and contacts you to arrange a free 30-minute call about your workflow.",
  },
  {
    title: "A scoped proposal",
    body: "If there is a fit, you get a fixed quote listing what is included, what we need from you and what is not covered — including 30 days of post-launch support.",
  },
] as const;

/** One-line version for form footers and metadata. */
export const responseNote =
  "Your enquiry reaches our workflow instantly; a person follows up to arrange a free 30-minute call.";

/**
 * Standard post-launch support for a delivered project. Applies to the three
 * core systems and project builds; a signed proposal can set different terms.
 */
export const supportTerms = {
  short: "30 days of post-launch support",
  full: "30 days of post-launch support to fix issues in what we delivered. Longer cover, monitoring or new features are available through a maintenance retainer. Your proposal states the exact terms for your project.",
} as const;
