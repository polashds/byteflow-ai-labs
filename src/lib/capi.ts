import { createHash } from "crypto";
import { cookies, headers } from "next/headers";

const PIXEL_ID = process.env.META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

function hash(v?: string | null) {
  if (!v) return undefined;
  return createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
}

export async function sendCapiLead(opts: { eventId: string; email?: string | null; phone?: string | null }) {
  if (!PIXEL_ID || !TOKEN) return;
  try {
    const c = await cookies();
    const h = await headers();
    const user_data: Record<string, unknown> = {};
    const em = hash(opts.email); if (em) user_data.em = em;
    const ph = hash(opts.phone?.replace(/\D/g, "")); if (ph) user_data.ph = ph;
    const fbp = c.get("_fbp")?.value; if (fbp) user_data.fbp = fbp;
    const fbc = c.get("_fbc")?.value; if (fbc) user_data.fbc = fbc;
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim(); if (ip) user_data.client_ip_address = ip;
    const ua = h.get("user-agent"); if (ua) user_data.client_user_agent = ua;

    await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: opts.eventId,
          event_source_url: h.get("referer") || undefined,
          user_data,
        }],
      }),
    }).catch(() => {});
  } catch (e) {
    console.error("capi lead error", e);
  }
}
