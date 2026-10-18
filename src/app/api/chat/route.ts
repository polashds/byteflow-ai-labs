import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadSource } from "@prisma/client";
import { brand } from "@/config/branding";
import { sendCapiLead } from "@/lib/capi";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface CapturedLead {
  name: string;
  phone: string;
  email: string;
}

interface AiResponse {
  reply: string;
  lead: CapturedLead | null;
}

const FALLBACK_REPLY =
  `I'm having trouble connecting right now. Please email us at ${brand.email} or use the contact form and a person from our team will follow up.`;

// ── Chat lead de-duplication (temporary mitigation) ───────────────────────────
// The model may return the same contact on later turns because the full
// history is resent each time. We allow at most one saved lead per chat.
//
// Identity: `chatId` is a random v4 UUID created once per chat by the widget.
// Anything that is not a strict v4 UUID is ignored (legacy behaviour, no
// de-duplication). Keys are chat IDs only — never names, emails or phones — so a
// client can only affect captures in its own chat.
//
// NOT durable idempotency: this registry lives in this server process's memory.
// It is cleared on restart or redeploy and is not shared between processes. A
// durable fix needs a unique database key (separate change with a migration).
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isUuidV4 = (v: unknown): v is string => typeof v === "string" && UUID_V4.test(v);

const CHAT_LEAD_TTL_MS = 24 * 60 * 60 * 1000;
const CHAT_LEAD_MAX = 10_000;
const chatLeadClaims = new Map<string, number>(); // chatId -> claimed at (ms)

/**
 * Synchronous check-and-set. Node runs this without yielding, so of two
 * concurrent requests for the same chat only the first to get here wins.
 */
function claimChatLead(chatId: string): boolean {
  const now = Date.now();
  for (const [id, at] of chatLeadClaims) {
    if (now - at > CHAT_LEAD_TTL_MS) chatLeadClaims.delete(id);
  }
  while (chatLeadClaims.size >= CHAT_LEAD_MAX) {
    const oldest = chatLeadClaims.keys().next().value;
    if (oldest === undefined) break;
    chatLeadClaims.delete(oldest);
  }
  if (chatLeadClaims.has(chatId)) return false;
  chatLeadClaims.set(chatId, now);
  return true;
}

function fireWebhook(payload: Record<string, unknown>) {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {}
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch {}
  }
  return null;
}

const systemInstruction = `You are the AI assistant for ByteFlow AI Labs — a BD-first AI automation agency based in Bangladesh.

COMPANY CONTEXT:
- Name: ByteFlow AI Labs
- Positioning: We design, build, and deploy self-hosted AI automation systems using n8n + GPT-4o/Claude. Clients own everything — no SaaS lock-in, no monthly seat fees.
- Email: ${brand.email}
- Free 30-min consultation: /contact

4 CORE PILLARS:
1. AI-Native — AI models built into the workflows, not bolted on
2. You Own Everything — self-hosted VPS, pay once
3. BD-First, Global-Ready — Bengali + English, bKash/Nagad payment-screenshot checks and WhatsApp flows
4. Built on n8n — we build with n8n, which offers 400+ integrations, plus custom nodes where needed

OUR 8 SERVICE CATEGORIES:
A. n8n VPS Infrastructure — self-hosted n8n setup, custom workflow builds, migration from Zapier/Make, monthly management
B. WhatsApp Automation & Chatbots — WhatsApp Business API, AI chatbot (Bengali+English, designed to reply at any hour), broadcast campaigns, order/booking flows with bKash/Nagad payment-screenshot checks
C. AI Voice Agents & Receptionists — voice receptionist (designed to answer inbound calls and hand over to a person), post-call summaries & CRM logging, appointment booking
D. AI Lead Scoring & CRM Automation — lead capture + enrichment pipeline, AI scoring, CRM pipeline automation, multi-channel follow-up sequences
E. Meta Pixel, CAPI & Server-Side Tracking — Pixel setup/audit, Conversions API, custom audiences, attribution dashboard
F. AI Content Automation & SEO — blog/article pipeline, social media repurposing, SEO metadata & schema, email nurture automation
G. Websites, Landing Pages & Funnels — Next.js websites, landing pages, sales funnels, ad-ready pages
H. Maintenance & Retainers — failure alerts to a named person, CRM maintenance, growth retainer (10–20h/month), annual system review

HOW WE WORK (4 steps):
1. Discovery & Scope — free 30-min call, map processes, identify which automations to build first
2. Build & Configure — staging environment, weekly updates, milestone approvals
3. Deploy & Train — production launch + Loom walkthroughs for the team
4. Support & Improve — 30 days of post-launch support for what we delivered, then an optional maintenance retainer; we review what the system actually recorded and tune it

YOUR BEHAVIOUR:
1. Answer questions about services, process, or AI automation clearly. Keep replies to 2–4 sentences unless more detail is explicitly requested.
2. When a visitor describes a problem, identify the most relevant service category and briefly explain how we'd solve it.
3. Qualify visitors naturally by understanding: what business they run, what they want to automate, and (if mentioned) budget or timeline.
4. Suggest booking a free consultation at /contact for serious enquiries.
5. Never invent prices or timelines — say pricing is scoped on a project basis after the discovery call.
6. Do not promise monitoring hours, response times, results or compliance outcomes, and do not use the words "24/7", "always", "never", "every", "guaranteed" or "compliant" in your replies. Describe features with "designed to" wording, e.g. "designed to reply at any hour" or "designed to answer inbound calls and flag unclear ones to your team". For WhatsApp opt-in and opt-out, say rules vary by market and the client should check theirs; never describe anything as compliant. For support, say failure alerts go to a named person and response times are agreed in the client's contract. Do not call the team certified, experts or specialists; say we build with n8n. Say that a person on the team confirms scope in writing before any work starts.
7. If the visitor asks about Bengali support, bKash, Nagad, or WhatsApp — say we build these flows; payment checks read screenshots and match them to the client's records. There is no direct bKash/Nagad integration, and the system does not move money.
8. If asked about call answering or availability, say voice agents are designed to answer inbound calls and flag unclear ones to the team, and that hours and availability depend on the phone provider and setup and are agreed in writing. Do not deny or promise round-the-clock answering.
9. Answer only what the visitor asked. Do not bring up other services (for example payment screenshot checks) unless they ask.

LEAD CAPTURE:
When the visitor provides a NAME and either a PHONE NUMBER or EMAIL ADDRESS in any message, capture them. A lead is only valid if it includes a name plus at least one contact method (phone or email).

IMPORTANT — Always reply with ONLY a valid JSON object in exactly this shape, no extra text outside the JSON:
{"reply": "<your response>", "lead": null}

When you capture a valid lead (name + phone and/or email):
{"reply": "<warm acknowledgement — confirm a person from the team will follow up (never promise a specific response time), offer to answer any questions in the meantime>", "lead": {"name": "<name>", "phone": "<phone number or empty string>", "email": "<email or empty string>"}}`;

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  let eventId: string = crypto.randomUUID();
  let chatId: string | null = null;
  let leadAlreadyCaptured = false;

  try {
    const body = await req.json();
    if (Array.isArray(body.messages)) {
      messages = body.messages;
    } else if (typeof body.message === "string" && body.message) {
      messages = [{ role: "user", text: body.message }];
    }
    if (typeof body.eventId === "string" && body.eventId) {
      eventId = body.eventId;
    }
    if (isUuidV4(body.chatId)) {
      chatId = body.chatId;
      // Client hint: this chat already has a saved lead (survives a server restart).
      leadAlreadyCaptured = body.leadAlreadyCaptured === true;
    }
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "no user message" }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }

  const firstUserIdx = messages.findIndex((m) => m.role === "user");
  const chatMessages = messages.slice(firstUserIdx).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.text,
  }));
  const messagesPayload = [
    { role: "system", content: systemInstruction },
    ...chatMessages,
  ];

  const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messagesPayload,
        temperature: 0.35,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter API error", res.status, await res.text());
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const data = await res.json();
    const rawText: string = data?.choices?.[0]?.message?.content ?? "";

    let reply = FALLBACK_REPLY;
    let capturedLead: CapturedLead | null = null;

    const parsed = extractJson(rawText) as AiResponse | null;
    if (parsed && typeof parsed.reply === "string") {
      reply = parsed.reply;
      const l = parsed.lead;
      if (
        l &&
        typeof l.name === "string" &&
        l.name.trim() &&
        ((typeof l.phone === "string" && l.phone.trim()) ||
          (typeof l.email === "string" && l.email.trim()))
      ) {
        capturedLead = {
          name: l.name.trim(),
          phone: typeof l.phone === "string" ? l.phone.trim() : "",
          email: typeof l.email === "string" ? l.email.trim() : "",
        };
      }
    } else if (rawText) {
      reply = rawText;
    }

    let leadSaved = false;
    // One lead per chat: skip if the client says it already has one, or if this
    // process has already claimed (or is saving) a lead for this chat.
    const allowCapture =
      capturedLead !== null && (chatId === null || (!leadAlreadyCaptured && claimChatLead(chatId)));

    if (capturedLead && allowCapture) {
      let lead: Awaited<ReturnType<typeof prisma.lead.create>> | null = null;
      try {
        const lastUserMessage = [...messages]
          .reverse()
          .find((m) => m.role === "user")?.text;

        lead = await prisma.lead.create({
          data: {
            name: capturedLead.name,
            phone: capturedLead.phone || null,
            email: capturedLead.email || null,
            message: lastUserMessage ?? null,
            source: LeadSource.Chatbot,
          },
        });
      } catch (e) {
        console.error("Chatbot lead creation failed", e);
        // Release the claim so a later message in this chat can retry the save.
        if (chatId) chatLeadClaims.delete(chatId);
      }

      // Webhook and CAPI only after a confirmed save, and at most once per chat.
      // Once the save succeeds the claim is kept. fireWebhook and sendCapiLead
      // swallow their own errors, so a failed n8n or Meta request fails silently
      // (not logged) and is NOT retried: the lead stays in the database (visible in
      // /admin/leads) and leadCaptured is still returned, so the browser Pixel
      // Lead still fires. Same as before this change.
      if (lead) {
        fireWebhook({
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          message: lead.message,
          source: lead.source,
          createdAt: lead.createdAt,
        });
        await sendCapiLead({ eventId, email: capturedLead.email, phone: capturedLead.phone });
        leadSaved = true;
      }
    }

    return NextResponse.json({ reply, ...(leadSaved ? { leadCaptured: true } : {}) });
  } catch (e) {
    console.error("Chat route error", e);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
