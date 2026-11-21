/**
 * Page-view counter tests. Run: npm run test:security (included) or
 *   node --import tsx --test tests/pageviews.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { isBot, normalizePath } from "../src/lib/pageviews";

const root = path.resolve(__dirname, "..");

test("normalizePath keeps public pages and cleans them", () => {
  assert.equal(normalizePath("/"), "/");
  assert.equal(normalizePath("/about"), "/about");
  assert.equal(normalizePath("/About/"), "/about");
  assert.equal(normalizePath("/blog/my-post?utm=x#top"), "/blog/my-post");
  assert.equal(normalizePath("/services//lead-to-crm-automation"), "/services/lead-to-crm-automation");
});

test("normalizePath rejects admin, api, internals and junk", () => {
  for (const bad of ["/admin", "/admin/leads", "/api/pv", "/_next/static/x.js", "//evil.com", "about",
    "/favicon.ico", "/a b", "/<script>", "/" + "a".repeat(250), 42, null, undefined, "/%E0%A4%A"]) {
    assert.equal(normalizePath(bad as unknown), null, `should reject ${String(bad).slice(0, 30)}`);
  }
});

test("isBot flags crawlers, previews and missing user agents", () => {
  assert.equal(isBot(undefined), true);
  assert.equal(isBot(""), true);
  for (const ua of ["Googlebot/2.1", "facebookexternalhit/1.1", "WhatsApp/2.23", "Uptime-Kuma/1.23",
    "curl/8.0", "Mozilla/5.0 (compatible; AhrefsBot/7.0)", "GPTBot/1.0", "HeadlessChrome/120"]) {
    assert.equal(isBot(ua), true, ua);
  }
  const chrome = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
  const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  assert.equal(isBot(chrome), false);
  assert.equal(isBot(iphone), false);
});

test("the stored model holds no personal data columns", () => {
  const sql = readFileSync(path.join(root, "prisma/migrations/20261121120000_page_view_daily/migration.sql"), "utf8");
  assert.doesNotMatch(sql, /\b(ip|user_?agent|email|phone|session|cookie)\b/i);
});
