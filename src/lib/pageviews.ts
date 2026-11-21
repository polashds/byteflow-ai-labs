/**
 * Helpers for the self-hosted page-view counter (/api/pv → PageViewDaily).
 * Pure functions, so they can be unit-tested without a database.
 * Only aggregate counts are stored: no cookies, IPs or user agents.
 */

const MAX_PATH_LENGTH = 200;

/** Crawlers, link previewers and monitoring tools (not human visitors). */
const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|skypeuripreview|headless|lighthouse|pagespeed|gtmetrix|pingdom|uptime|kuma|curl|wget|python-requests|axios|node-fetch|go-http-client|httpclient|scrapy|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|perplexity|ccbot/i;

export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true; // real browsers always send one
  return BOT_PATTERN.test(userAgent);
}

/**
 * Normalises a pathname for counting, or returns null when it should not be
 * counted (admin, API, Next.js internals, files, malformed input).
 */
export function normalizePath(input: unknown): string | null {
  if (typeof input !== "string") return null;
  let path = input.split(/[?#]/)[0].trim();
  if (!path.startsWith("/") || path.startsWith("//")) return null;
  try {
    path = decodeURIComponent(path);
  } catch {
    return null;
  }
  path = path.toLowerCase().replace(/\/{2,}/g, "/");
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.length > MAX_PATH_LENGTH) return null;
  if (!/^\/[a-z0-9\-_/]*$/.test(path)) return null;
  if (/^\/(admin|api|_next)(\/|$)/.test(path)) return null;
  return path;
}
