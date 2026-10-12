export type Faq = { q: string; a: string };

/** Site-wide FAQ. The homepage shows a subset (see `homeFaqIndexes`). */
export const faqs: Faq[] = [
  {
    q: "What does ByteFlow AI Labs actually do?",
    a: "We build connected automation systems that remove manual work from how a business handles leads, customer messages and orders: lead capture and CRM routing with automatic follow-up, AI WhatsApp assistants, and order and payment verification — plus custom integrations when those don't fit. We design, deploy and support each system, and it runs on infrastructure you own.",
  },
  {
    q: "Who is a typical ByteFlow client?",
    a: "Small and medium businesses that sell through Facebook ads, websites and WhatsApp — real estate, e-commerce, travel, clinics and local services — and lose time or leads to slow follow-up, repeat customer questions or hand-checked orders.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "No. We handle all the technical implementation. You describe the problem or outcome you want — we translate that into an automation system. We communicate in plain language throughout the engagement.",
  },
  {
    q: "What tools and platforms do you work with?",
    a: "We work across a broad stack: n8n, Make, Zapier for workflow automation; OpenAI, Anthropic Claude, Google Gemini for AI models; PostgreSQL, Supabase, Airtable for data; and custom Next.js / Python systems when off-the-shelf tools aren't the right fit.",
  },
  {
    q: "How long does a typical project take?",
    a: "A focused automation (one workflow, one integration) typically takes 1–2 weeks from scoping to deployment. A full AI system with multiple workflows, a custom chatbot, and a data pipeline typically runs 4–8 weeks. We'll give you a realistic timeline during the scoping call.",
  },
  {
    q: "How do you price your services?",
    a: "We price per project based on scope, not by the hour. You'll receive a fixed quote after an initial scoping call so there are no billing surprises. Ongoing maintenance retainers are available for clients who want continuous support.",
  },
  {
    q: "What happens after the automation is built?",
    a: "We document everything, walk your team through how it works, and hand over full ownership. Delivery includes 30 days of post-launch support to fix issues in what we built. If you'd like ongoing support — monitoring, updates, adding new steps — we offer monthly retainer packages.",
  },
  {
    q: "Will an automation break if a connected app changes its API?",
    a: "APIs do occasionally change. For clients on a maintenance retainer we monitor for breakage and fix issues proactively. For project clients, delivery includes 30 days of post-launch support to fix issues in what we built; longer-term cover is available as a retainer. Your proposal states the exact terms.",
  },
  {
    q: "Can you integrate with tools we've already built internally?",
    a: "Yes. If your internal tool has a REST API, webhook support, or a database we can read from, we can integrate it. We've connected custom CRMs, internal dashboards, and proprietary databases into automation workflows.",
  },
  {
    q: "How do I get started?",
    a: "Send us a message on our Contact page describing the process you want to automate. Your enquiry is saved and passed to our workflow straight away, and a person from our team follows up to arrange a free 30-minute scoping call. You can also ask our website AI assistant questions at any time. No commitment required.",
  },
];

/** Indexes into `faqs` shown on the homepage. */
export const homeFaqIndexes = [0, 1, 4, 5, 6, 7];
