import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadSource } from "@prisma/client";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface GeminiResponse {
  reply: string;
  lead: { name: string; phone: string } | null;
}

const FALLBACK_REPLY =
  "I'm having trouble connecting right now. For immediate assistance, please email us at hello@byteflow.ai — we'll get back to you promptly.";

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

const systemInstruction = `You are the AI assistant for ByteFlow AI Labs — an AI automation agency.
Be helpful, professional, and concise.

Company details:
- Name: ByteFlow AI Labs
- What we do: design, build, and deploy AI automation systems for businesses
- Services: workflow automation, AI chatbots, data pipelines, custom AI integrations, n8n automation, API orchestration
- Email: hello@byteflow.ai

Guidelines:
1. Answer questions about AI automation, our services, how we work, and pricing (say pricing is discussed on a project basis).
2. If the visitor has a specific automation need, help them articulate it and offer to connect them with the team.
3. Keep replies concise — 2–4 sentences unless more detail is asked for.
4. Encourage serious inquiries to email hello@byteflow.ai or use the contact form.

LEAD CAPTURE: When the visitor provides both a NAME and a PHONE NUMBER in any message, set the "lead" field.

IMPORTANT — Reply with ONLY a valid JSON object in exactly this shape, no extra text:
{"reply": "<your response>", "lead": null}

When you detect name + phone:
{"reply": "<your response acknowledging you've passed their details to the team>", "lead": {"name": "<name>", "phone": "<phone>"}}`;

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];

  try {
    const body = await req.json();
    if (Array.isArray(body.messages)) {
      messages = body.messages;
    } else if (typeof body.message === "string" && body.message) {
      messages = [{ role: "user", text: body.message }];
    }
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "no user message" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }

  const firstUserIdx = messages.findIndex((m) => m.role === "user");
  const contents = messages.slice(firstUserIdx).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.text }],
  }));

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.4,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!res.ok) {
      console.error("Gemini API error", res.status, await res.text());
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const data = await res.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    let reply = FALLBACK_REPLY;
    let capturedLead: GeminiResponse["lead"] = null;

    const parsed = extractJson(rawText) as GeminiResponse | null;
    if (parsed && typeof parsed.reply === "string") {
      reply = parsed.reply;
      if (
        parsed.lead &&
        typeof parsed.lead.name === "string" &&
        typeof parsed.lead.phone === "string" &&
        parsed.lead.name.trim() &&
        parsed.lead.phone.trim()
      ) {
        capturedLead = parsed.lead;
      }
    } else if (rawText) {
      reply = rawText;
    }

    if (capturedLead) {
      try {
        const lastUserMessage = [...messages]
          .reverse()
          .find((m) => m.role === "user")?.text;
        const lead = await prisma.lead.create({
          data: {
            name: capturedLead.name.trim(),
            phone: capturedLead.phone.trim(),
            message: lastUserMessage ?? null,
            source: LeadSource.Chatbot,
          },
        });
        fireWebhook({
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          message: lead.message,
          source: lead.source,
          createdAt: lead.createdAt,
        });
      } catch (e) {
        console.error("Chatbot lead creation failed", e);
      }
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat route error", e);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
