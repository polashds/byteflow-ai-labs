#!/usr/bin/env node
/**
 * Live security check against a running site (no dependencies).
 *   node scripts/security-check.mjs                      # http://localhost:3000
 *   node scripts/security-check.mjs https://byteflowailabs.com
 * Read-only: sends GET requests only, never logs in, never writes data.
 */
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const ADMIN_MARKERS = ["Admin Panel", ">Leads<", ">Dashboard<"];
let failed = 0;

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const body = res.status >= 300 && res.status < 400 ? "" : await res.text();
  return { status: res.status, location: res.headers.get("location") || "", body };
}

/** Follows same-site redirects (e.g. trailing-slash 308s), up to 5 hops. */
async function follow(path) {
  let r = await get(path);
  const hops = [r.status];
  for (let i = 0; i < 5 && r.status >= 300 && r.status < 400 && r.location; i++) {
    const next = new URL(r.location, BASE);
    if (next.origin !== new URL(BASE).origin || next.pathname === "/admin/login") break;
    r = await get(next.pathname + next.search);
    hops.push(r.status);
  }
  return { ...r, hops };
}

function check(name, ok, detail) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
  if (!ok) failed++;
}

// 1. Admin pages without a session: must redirect to login and never show admin content.
const adminPaths = [
  "/admin", "/admin/", "/admin/leads", "/admin/blog", "/admin/blog/new",
  "/admin//leads", "/admin/./leads", "/%61dmin/leads", "/admin/%6ceads", "/ADMIN/leads",
  "/admin/leads?__nextLocale=en", "/admin/leads/",
];
for (const p of adminPaths) {
  const r = await follow(p);
  const leaked = ADMIN_MARKERS.some((m) => r.body.includes(m));
  const toLogin = r.status >= 300 && r.status < 400 && r.location.includes("/admin/login");
  const ok = !leaked && (r.status === 404 || toLogin);
  check(`no admin content at ${p}`, ok, `${r.hops.join(" → ")}${toLogin ? " → login" : ""}`);
}

// 2. Login page itself stays reachable.
const login = await get("/admin/login");
check("login page reachable", login.status === 200, String(login.status));

// 3. Image optimizer: refuses SVG (dangerouslyAllowSVG: false) and hosts outside remotePatterns.
const svg = await get("/_next/image?url=" + encodeURIComponent("/file.svg") + "&w=64&q=75");
check("image optimizer refuses SVG", svg.status === 400, String(svg.status));
const evil = await get("/_next/image?url=" + encodeURIComponent("https://example.com/x.png") + "&w=64&q=75");
check("image optimizer refuses unlisted host", evil.status >= 400, String(evil.status));

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
