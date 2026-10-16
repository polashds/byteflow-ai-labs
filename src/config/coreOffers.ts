/**
 * Core offers — the three systems ByteFlow leads with.
 *
 * Source of truth for the homepage "what we build" cards and the dedicated
 * /services/<slug> pages. Every claim here is traceable to the existing
 * service catalogue (`services.ts`), the case studies (`caseStudies.ts`) or
 * the FAQ. Do not add metrics, guarantees or client names without evidence.
 *
 * Broader catalogue (voice agents, tracking, websites, retainers…) stays on
 * /services — it is intentionally not promoted on the homepage.
 */

export type CoreOfferFaq = { q: string; a: string };
export type CoreOfferStep = { title: string; body: string };

export type CoreOfferStepNumbered = { num: string; title: string; body: string };

export type CoreOffer = {
  slug: string;
  /** Short label used on cards and breadcrumbs */
  shortTitle: string;
  /** Page <h1> */
  title: string;
  /** <title> without the site suffix (the layout template appends it) */
  metaTitle: string;
  metaDescription: string;
  /** One-line summary for homepage cards */
  cardSummary: string;
  /** The customer pain this offer answers, in the customer's words */
  painTag: string;
  heroSub: string;
  forWho: string;
  painPoints: CoreOfferStep[];
  ifUnsolved: string;
  flow: CoreOfferStep[];
  integrations: string[];
  deliverables: string[];
  customerProvides: string[];
  notIncluded: string[];
  reliability: string[];
  measure: string[];
  /** id in caseStudies.ts */
  caseStudyId: string;
  /** Why this case study is relevant (plain, no numbers) */
  caseStudyNote: string;
  faqs: CoreOfferFaq[];
  /** ids in services.ts — linked from the page as "full scope" */
  relatedServiceIds: string[];
};

export const coreOffers: CoreOffer[] = [
  {
    slug: "lead-to-crm-automation",
    shortTitle: "Lead-to-CRM Automation",
    title: "Lead-to-CRM Automation with WhatsApp Follow-Up",
    metaTitle: "Lead-to-CRM Automation with WhatsApp",
    metaDescription:
      "Capture leads from Facebook ads, forms and WhatsApp into one pipeline, send an automatic first reply, score and route them to your CRM, and follow up automatically.",
    cardSummary:
      "Every enquiry from ads, forms and WhatsApp lands in one pipeline, gets a first reply, is scored, saved to your CRM and followed up — without anyone having to remember.",
    painTag: "Leads go cold before anyone replies",
    heroSub:
      "We connect your lead sources to your CRM and WhatsApp so every enquiry is captured with its source, answered quickly, prioritised, assigned to a person and followed up on a schedule — on infrastructure you own.",
    forWho:
      "Businesses that generate enquiries from Facebook or Instagram ads, a website or WhatsApp — real estate, travel, clinics, education and local services — and rely on staff to notice, reply to and chase each one by hand.",
    painPoints: [
      {
        title: "Enquiries are noticed late",
        body: "Leads arrive in several places — Meta lead forms, a website form, WhatsApp. Whoever happens to see one first replies, sometimes hours later.",
      },
      {
        title: "Nobody knows who to call first",
        body: "Every lead looks the same in the inbox, so a serious buyer waits in the same queue as someone just browsing.",
      },
      {
        title: "Follow-up depends on memory",
        body: "The second and third message only go out when someone remembers. Most leads stop hearing from you after one attempt.",
      },
      {
        title: "Ad spend can't be traced to customers",
        body: "Leads live in chat threads and spreadsheets with no source attached, so you can't tell which campaigns produced real enquiries.",
      },
    ],
    ifUnsolved:
      "Leads you paid to attract go to whichever business answers first, and you can't tell which of your campaigns or channels are actually producing customers.",
    flow: [
      {
        title: "Capture",
        body: "Meta lead forms, website forms, landing pages and WhatsApp feed one pipeline. Duplicate enquiries are detected and merged.",
      },
      {
        title: "Respond",
        body: "An automated first reply goes out on WhatsApp straight away, and can ask the qualifying questions you define.",
      },
      {
        title: "Qualify and score",
        body: "Answers are recorded and each lead gets a priority score based on rules we agree with you — enquiry type, budget, location, activity.",
      },
      {
        title: "Route and alert",
        body: "The lead is saved to your CRM with its source and assigned to the right person, who gets an automatic WhatsApp or chat alert.",
      },
      {
        title: "Follow up",
        body: "If there is no reply, a timed follow-up sequence continues on your behalf and stops automatically when the lead replies or books.",
      },
    ],
    integrations: [
      "Meta lead forms and Meta Ads",
      "WhatsApp Business API",
      "Website and landing-page forms",
      "n8n (self-hosted)",
      "Google Sheets",
      "CRMs with an API or webhooks (including self-hosted EspoCRM)",
      "Email, Slack and Telegram alerts",
    ],
    deliverables: [
      "A working lead pipeline running on your own server",
      "Lead capture from the sources you use, with source recorded on every lead",
      "Scoring rules, documented in plain language",
      "CRM pipeline stages, fields and assignment rules",
      "Automatic alerts to the assigned person",
      "Follow-up sequences with auto-pause on reply or booking",
      "Failure alerts, written documentation and a recorded walkthrough for your team",
      "30 days of post-launch support for what we delivered",
    ],
    customerProvides: [
      "Access to your ad accounts, forms and WhatsApp number (or help getting one)",
      "Access to your CRM or spreadsheet",
      "What a good lead looks like, and the questions worth asking",
      "Who should be alerted for which type of lead",
    ],
    notIncluded: [
      "Running your ad campaigns or buying media",
      "WhatsApp number and message-template approvals — Meta decides those",
      "Replacing your sales team's judgement: the system prioritises, people close",
    ],
    reliability: [
      "Duplicate leads are detected before they reach your team",
      "Errors trigger failure alerts instead of failing silently",
      "Messages follow rules you approve; anything outside them goes to a person",
      "Built and tested on staging before it touches real leads",
      "Data lives in your own database and server, not a shared SaaS account",
    ],
    measure: [
      "Time from enquiry to first reply",
      "Share of leads with a recorded source",
      "Leads contacted within the window you set",
      "Follow-ups sent versus replies received",
      "Movement through your pipeline stages",
    ],
    caseStudyId: "mustaraka-properties",
    caseStudyNote:
      "The lead pipeline for our own real estate venture, which we built and operate: website and Meta ad leads trigger automatic WhatsApp and Telegram alerts to agents, with leads tracked in a self-hosted admin CRM.",
    faqs: [
      {
        q: "Who is lead-to-CRM automation for?",
        a: "Businesses that get enquiries from Facebook or Instagram ads, a website or WhatsApp — real estate, travel, clinics, education and local services — and currently rely on staff to notice, reply to and chase each one by hand.",
      },
      {
        q: "What is included in a lead-to-CRM automation project?",
        a: "A working lead pipeline on your own server: capture from the sources you use with the source recorded on every lead, scoring rules in plain language, CRM stages and assignment rules, automatic alerts to the right person, and follow-ups that pause automatically on reply or booking. It also includes failure alerts, documentation, a recorded walkthrough and 30 days of post-launch support.",
      },
      {
        q: "What do you need from us to start?",
        a: "Access to your ad accounts, forms and WhatsApp number (or help getting one), access to your CRM or spreadsheet, a description of what a good lead looks like and which questions to ask, and who should be alerted for which type of lead.",
      },
      {
        q: "Do I need a CRM already?",
        a: "No. If you already use a CRM with an API or webhooks we connect to it. If you don't, we can set up a simple one as part of the build.",
      },
      {
        q: "Will it message my customers without me seeing it?",
        a: "Only within rules you approve. You decide what the first reply says, which questions it may ask and when it must hand over to a person. Anything outside those rules is routed to your team.",
      },
      {
        q: "Which channels can follow-ups use?",
        a: "WhatsApp, email and SMS. WhatsApp business messaging has its own opt-in and template rules, so we set up consent handling as part of the work.",
      },
      {
        q: "How long does it take?",
        a: "A focused automation typically takes 3–5 working days once we have your access and inputs. A full system typically takes 2–3 weeks. Larger multi-system builds take longer and are scoped individually. Your written scope confirms the timeline.",
      },
    ],
    relatedServiceIds: ["lead-scoring-crm", "whatsapp-automation", "n8n-infrastructure"],
  },

  {
    slug: "whatsapp-ai-assistant",
    shortTitle: "AI WhatsApp Assistant",
    title: "AI WhatsApp Assistant for Support and Booking",
    metaTitle: "AI WhatsApp Assistant for Support",
    metaDescription:
      "A bilingual AI assistant on your WhatsApp number that answers repeat questions, captures leads, books appointments and hands over to your team with full context.",
    cardSummary:
      "A Bengali and English assistant on your WhatsApp number that answers repeat questions, captures details, books appointments and hands over to a person when it should.",
    painTag: "Staff are buried in repeat WhatsApp questions",
    heroSub:
      "We build an AI assistant on your own WhatsApp number that answers the questions you get every day, captures customer details, books appointments where you want it to, and passes anything uncertain or sensitive to your team with the whole conversation attached.",
    forWho:
      "Businesses whose customers message on WhatsApp all day with the same questions — prices, availability, order status, appointments — so staff spend their time answering instead of serving.",
    painPoints: [
      {
        title: "The same questions, all day",
        body: "Prices, opening hours, availability, delivery — each answered by hand, again and again, by someone who has other work to do.",
      },
      {
        title: "After-hours messages wait until morning",
        body: "A customer who messages at night often moves on to whoever replies first.",
      },
      {
        title: "Booking takes a long back-and-forth",
        body: "Finding a time that works can take a dozen messages that nobody has time for.",
      },
      {
        title: "Handover loses context",
        body: "When a person finally steps in, they have to scroll through the thread to work out what was already said.",
      },
    ],
    ifUnsolved:
      "Staff time goes on repeat answers, after-hours customers go elsewhere, and urgent or sensitive messages sit in the same queue as simple FAQs.",
    flow: [
      {
        title: "Learn your business",
        body: "The assistant answers from your FAQs, product or service information and the rules you approve — not from guesswork.",
      },
      {
        title: "Talk to customers",
        body: "It replies in Bengali or English on your WhatsApp number, at any hour.",
      },
      {
        title: "Capture and book",
        body: "It collects name, contact details and requirement, and — where booking is in scope — checks availability and books the slot.",
      },
      {
        title: "Hand over",
        body: "Uncertain, sensitive or high-value conversations go to a person with the full conversation history.",
      },
      {
        title: "Log",
        body: "Every conversation and lead is recorded in your CRM so nothing lives only in a chat thread.",
      },
    ],
    integrations: [
      "WhatsApp Business API",
      "OpenAI, Anthropic Claude and Google Gemini models",
      "n8n (self-hosted)",
      "Google Sheets and Google Calendar",
      "PostgreSQL and your own database via API",
      "Your CRM via API or webhooks",
      "bKash and Nagad payment links for order flows",
    ],
    deliverables: [
      "An assistant running on your WhatsApp number",
      "Bengali and English support",
      "A knowledge base built from your FAQs and business information, tested against real questions",
      "Handover rules to your team, with conversation context",
      "A booking flow, if booking is in scope",
      "Conversation and lead logging to your CRM",
      "Written documentation and a recorded walkthrough for your team",
      "30 days of post-launch support for what we delivered",
    ],
    customerProvides: [
      "Your FAQs, price lists, policies and service information",
      "A WhatsApp number (or help to get one approved)",
      "The situations where a person must take over",
      "Calendar or booking system access, if booking is in scope",
    ],
    notIncluded: [
      "Medical, legal or financial advice — those conversations stay with your people",
      "WhatsApp account and template approvals — Meta decides those",
      "Messaging and AI usage fees — WhatsApp and the AI provider bill these separately",
    ],
    reliability: [
      "The assistant answers from approved information and says when it doesn't know instead of guessing",
      "Uncertain, sensitive or high-value messages are escalated to a person",
      "We test it against your real questions before launch, and review early transcripts with you",
      "Failures raise alerts instead of leaving customers unanswered",
      "AI can still make mistakes — which is why handover rules and transcript review are part of the build",
    ],
    measure: [
      "Conversations handled without staff involvement",
      "Handover rate and reasons for handover",
      "Response time, including after hours",
      "Leads and bookings captured",
      "Sampled transcripts reviewed together",
    ],
    caseStudyId: "mustaraka-properties",
    caseStudyNote:
      "Our own real estate venture: a WhatsApp lead agent that qualifies enquiries, books viewings against live availability and hands over to a person, plus a website chatbot that answers from live listings and feeds the lead pipeline and admin CRM.",
    faqs: [
      {
        q: "Who is an AI WhatsApp assistant for?",
        a: "Businesses whose customers message on WhatsApp all day with the same questions — prices, availability, order status, appointments — so staff spend their time answering instead of serving.",
      },
      {
        q: "What is included in an AI WhatsApp assistant project?",
        a: "An assistant on your WhatsApp number that works in Bengali and English, a knowledge base built from your FAQs and tested against real customer questions, handover rules that pass the full conversation to your team, a booking flow if booking is in scope, and conversation and lead logging to your CRM. It also includes documentation, a recorded walkthrough and 30 days of post-launch support.",
      },
      {
        q: "How long does setup take?",
        a: "It depends mostly on how quickly Meta approves your WhatsApp number and message templates, and on how much business information the assistant needs to learn. We confirm a realistic timeline on the scoping call.",
      },
      {
        q: "What do you need from us?",
        a: "Your FAQs, price lists, policies and service information, a WhatsApp number (or help getting it approved), the situations where a person must take over, and calendar or booking access if booking is in scope.",
      },
      {
        q: "Does it replace my staff?",
        a: "No. It takes the repetitive questions so your team can spend time on conversations that need a person.",
      },
      {
        q: "What happens when it doesn't know the answer?",
        a: "It is set up to say so and hand the conversation to your team with the full history, rather than invent an answer.",
      },
      {
        q: "Does it work in Bengali?",
        a: "Yes. It supports Bengali and English, and we test both with your real customer questions.",
      },
      {
        q: "Can customers pay inside WhatsApp?",
        a: "Order flows can include bKash or Nagad payment links. Whether that fits depends on your business, which we cover on the scoping call.",
      },
    ],
    relatedServiceIds: ["whatsapp-automation", "voice-agents", "n8n-infrastructure"],
  },

  {
    slug: "order-payment-automation",
    shortTitle: "Order & Payment Automation",
    title: "Order and Payment Verification Automation",
    metaTitle: "Order & Payment Verification Automation",
    metaDescription:
      "Automate order and payment-proof checking from WhatsApp: read receipts, match them to your records, catch duplicates and send only edge cases to staff.",
    cardSummary:
      "Payment proofs and orders sent on WhatsApp are read, matched against your records, checked for duplicates and confirmed — and only unclear cases reach your staff.",
    painTag: "Orders and payments are checked by hand",
    heroSub:
      "We automate the checking that eats your day: payment screenshots and order messages are read, matched to your records, screened for duplicates and answered, while unclear cases go to your team with the context they need.",
    forWho:
      "Businesses that take orders or payments through WhatsApp, Facebook or a website and verify each one manually — transfer screenshots, reference numbers, spreadsheets.",
    painPoints: [
      {
        title: "Every receipt is checked one by one",
        body: "Staff open each screenshot, find the reference number and compare it with the records — slow, repetitive work.",
      },
      {
        title: "Duplicates and mistakes slip through",
        body: "The same transaction can be submitted twice, and amounts get mismatched when the queue is long.",
      },
      {
        title: "Peak days break the process",
        body: "Promotions create a backlog and customers wait for confirmation.",
      },
      {
        title: "Unclear cases have no owner",
        body: "Exceptions get lost between chat threads and nobody can say what happened to them.",
      },
    ],
    ifUnsolved:
      "Customers wait for confirmation, staff time goes on mechanical checking, and duplicate or mismatched payments are caught late or not at all.",
    flow: [
      {
        title: "Intake",
        body: "The payment proof or order arrives on WhatsApp (or a form) and is picked up automatically.",
      },
      {
        title: "Extract",
        body: "The amount and reference are read from the image or message using OCR.",
      },
      {
        title: "Validate",
        body: "Details are matched against your order ledger, and duplicate-detection blocks repeat submissions.",
      },
      {
        title: "Respond",
        body: "The customer receives a confirmation or rejection, and your ledger or CRM is updated.",
      },
      {
        title: "Escalate",
        body: "Designed to flag unclear cases to a person on your team, with the full context.",
      },
    ],
    integrations: [
      "WhatsApp Business API",
      "Google Sheets as an order ledger",
      "OCR for payment screenshots",
      "n8n (self-hosted)",
      "PostgreSQL or your own database via API",
      "bKash and Nagad payment links",
      "Telegram, Slack or WhatsApp alerts for staff",
    ],
    deliverables: [
      "A working verification workflow on your own server",
      "Validation rules agreed with you and documented",
      "Duplicate-detection logic",
      "Customer confirmation and rejection messages",
      "An exception route to staff with context",
      "Failure alerts, written documentation and a recorded walkthrough",
      "30 days of post-launch support for what we delivered",
    ],
    customerProvides: [
      "Access to your order ledger or database",
      "A set of real receipts and orders to test with",
      "Your rules for approving, rejecting and escalating",
      "Who handles exceptions",
    ],
    notIncluded: [
      "Moving money — the system verifies and records, it does not release funds",
      "Changing your payment provider or bank arrangements",
      "WhatsApp account and template approvals — Meta decides those",
    ],
    reliability: [
      "OCR is not perfect, so unclear or low-confidence cases are routed to staff instead of auto-approved",
      "Duplicate detection runs before any confirmation is sent",
      "Every decision is recorded so it can be reviewed",
      "We test with your real receipt samples before launch",
      "Failures raise alerts to a named person",
    ],
    measure: [
      "Share of submissions processed automatically versus escalated",
      "Duplicate submissions caught",
      "Time from submission to confirmation",
      "Backlog on peak days",
    ],
    caseStudyId: "nova-digital-store",
    caseStudyNote:
      "A 69-node n8n workflow that reads WhatsApp payment receipts, matches them to an order ledger, detects duplicates and routes edge cases to staff.",
    faqs: [
      {
        q: "Who is order and payment verification automation for?",
        a: "Businesses that take orders or payments through WhatsApp, Facebook or a website and check each one by hand — transfer screenshots, reference numbers, spreadsheets.",
      },
      {
        q: "What is included in an order and payment verification project?",
        a: "A verification workflow on your own server, validation rules agreed with you and documented, duplicate detection, confirmation and rejection messages to customers, and an exception route that sends unclear cases to staff with context. It also includes failure alerts, documentation, a recorded walkthrough and 30 days of post-launch support.",
      },
      {
        q: "How long does it take?",
        a: "It depends on access to your order records and how many payment methods need rules. We confirm a realistic timeline on the scoping call.",
      },
      {
        q: "What do you need from us?",
        a: "Access to your order ledger or database, a set of real receipts and orders to test with, your rules for approving, rejecting and escalating, and who handles exceptions.",
      },
      {
        q: "How accurate is the receipt reading?",
        a: "No OCR is perfect. That is why low-confidence or mismatched cases go to your staff rather than being approved automatically, and why we test with your own receipts before launch.",
      },
      {
        q: "Does it only work on WhatsApp?",
        a: "WhatsApp is the most common intake, but orders and proofs can also arrive through forms or webhooks from your website.",
      },
      {
        q: "Can it approve payments on its own?",
        a: "It confirms only what matches your rules. Anything unclear is escalated to a person, and the system never moves money.",
      },
      {
        q: "Can it connect to our order system?",
        a: "If your order or inventory system has an API, webhooks or a database we can read from, yes. We confirm this during scoping.",
      },
    ],
    relatedServiceIds: ["whatsapp-automation", "n8n-infrastructure", "maintenance"],
  },
];

export function getCoreOffer(slug: string): CoreOffer | undefined {
  return coreOffers.find((o) => o.slug === slug);
}

/** The four-stage engagement, shown on the homepage and every service page. */
export const engagementSteps: CoreOfferStepNumbered[] = [
  {
    num: "01",
    title: "Discovery and scope",
    body: "A free 30-minute call. We map where leads, messages or orders get stuck today and agree what to automate first and how success will be measured.",
  },
  {
    num: "02",
    title: "Build and test",
    body: "Work starts on staging with progress updates and milestone approvals. We test with your real messages, receipts or leads before anything goes live.",
  },
  {
    num: "03",
    title: "Launch and hand over",
    body: "We move to production, watch the first live runs, and give your team documentation and recorded walkthroughs so they can operate it with confidence.",
  },
  {
    num: "04",
    title: "Support and improve",
    body: "30 days of post-launch support to fix issues in what we delivered, then an optional maintenance retainer. We review what the system actually recorded and tune it from there.",
  },
];
