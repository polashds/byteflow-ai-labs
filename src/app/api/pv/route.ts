import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { isBot, normalizePath } from "@/lib/pageviews";

export const runtime = "nodejs";

/**
 * Counts one page view for /admin/stats. Stores only (day, path, count):
 * no cookies, IP addresses or user agents, so it runs regardless of the
 * analytics consent choice. Always answers 204 so it never affects the page.
 */
export async function POST(req: NextRequest) {
  try {
    const purpose = `${req.headers.get("purpose") ?? ""} ${req.headers.get("sec-purpose") ?? ""}`;
    if (/prefetch/i.test(purpose) || isBot(req.headers.get("user-agent"))) {
      return new Response(null, { status: 204 });
    }
    const body = (await req.json().catch(() => null)) as { path?: unknown } | null;
    const path = normalizePath(body?.path);
    if (path) {
      await prisma.$executeRaw`
        INSERT INTO "PageViewDaily" ("day", "path", "views")
        VALUES ((now() AT TIME ZONE 'Asia/Dhaka')::date, ${path}, 1)
        ON CONFLICT ("day", "path")
        DO UPDATE SET "views" = "PageViewDaily"."views" + 1`;
    }
  } catch (err) {
    console.error("[pv] failed to record page view", err);
  }
  return new Response(null, { status: 204 });
}
