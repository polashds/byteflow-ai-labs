/**
 * Security regression tests. Run: npm run test:security
 * Uses Node's built-in test runner through tsx (no extra dependencies).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { Session } from "next-auth";
import { isAdminSession } from "../src/lib/admin-role";
import nextConfig from "../next.config";

const root = path.resolve(__dirname, "..");
const read = (p: string) => readFileSync(path.join(root, p), "utf8");
const expires = new Date(Date.now() + 3_600_000).toISOString();

test("isAdminSession: only a signed-in ADMIN passes", () => {
  assert.equal(isAdminSession(null), false);
  assert.equal(isAdminSession(undefined), false);
  assert.equal(isAdminSession({ expires } as Session), false);
  assert.equal(isAdminSession({ user: {}, expires } as Session), false);
  assert.equal(isAdminSession({ user: { role: "USER" }, expires } as unknown as Session), false);
  assert.equal(isAdminSession({ user: { role: "admin" }, expires } as unknown as Session), false);
  assert.equal(isAdminSession({ user: { role: "ADMIN" }, expires } as unknown as Session), true);
});

test("every admin page except /admin/login calls requireAdmin()", () => {
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === "page.tsx") pages.push(path.relative(root, full));
    }
  };
  walk(path.join(root, "src/app/admin"));
  assert.ok(pages.length >= 5, `expected admin pages, found ${pages.length}`);
  for (const p of pages) {
    if (p.includes(`${path.sep}login${path.sep}`)) continue;
    assert.match(read(p), /await requireAdmin\(\)/, `${p} must call await requireAdmin()`);
  }
});

test("every exported admin server action except logout calls requireAdmin()", () => {
  const src = read("src/lib/admin-actions.ts");
  const fns = [...src.matchAll(/export async function (\w+)\([^)]*\)[^{]*\{([\s\S]*?)\n\}/g)];
  assert.ok(fns.length >= 5, "expected admin actions");
  for (const [, name, body] of fns) {
    if (name === "logoutAction") continue;
    assert.match(body, /await requireAdmin\(\)/, `${name} must call await requireAdmin()`);
  }
});

test("only one proxy file exists, and it protects /admin", () => {
  assert.equal(existsSync(path.join(root, "proxy.ts")), false, "root proxy.ts must not exist (Next.js uses src/proxy.ts)");
  const proxy = read("src/proxy.ts");
  assert.match(proxy, /\/admin\/:path\*/);
});

test("image optimizer hardening stays in place", () => {
  const images = nextConfig.images ?? {};
  assert.equal(images.dangerouslyAllowSVG, false);
  assert.equal(images.contentDispositionType, "attachment");
  assert.match(String(images.contentSecurityPolicy), /script-src 'none'/);
  for (const p of images.remotePatterns ?? []) {
    const pat = p as { protocol?: string; hostname?: string };
    assert.equal(pat.protocol, "https");
    assert.ok(pat.hostname && !pat.hostname.includes("*"), `wildcard host not allowed: ${pat.hostname}`);
  }
});

test("patched versions of next, next-auth and zod are installed", () => {
  const ver = (pkg: string) =>
    JSON.parse(read(`node_modules/${pkg}/package.json`)).version as string;
  const parts = (v: string) => v.split(/[.-]/).map((x) => (/^\d+$/.test(x) ? Number(x) : x));
  const atLeast = (v: string, min: string) => {
    const a = parts(v), b = parts(min);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = a[i] ?? 0, y = b[i] ?? 0;
      if (x === y) continue;
      if (typeof x === "number" && typeof y === "number") return x > y;
      return String(x) > String(y);
    }
    return true;
  };
  assert.ok(atLeast(ver("next"), "16.4.3"), `next ${ver("next")} < 16.4.3`);
  assert.ok(atLeast(ver("zod"), "4.6.6"), `zod ${ver("zod")} < 4.6.6`);
  assert.ok(atLeast(ver("@auth/core"), "0.41.3"), `@auth/core ${ver("@auth/core")} < 0.41.3`);
  assert.ok(atLeast(ver("next-auth"), "5.0.0-beta.32"), `next-auth ${ver("next-auth")} < 5.0.0-beta.32`);
});

test("uploads accept raster images only", () => {
  const src = read("src/lib/admin-actions.ts");
  assert.match(src, /ALLOWED_UPLOAD_EXTENSIONS = new Set\(\[[^\]]*\]\)/);
  const exts = src.match(/ALLOWED_UPLOAD_EXTENSIONS = new Set\(\[([^\]]*)\]\)/)![1];
  for (const bad of [".svg", ".html", ".htm", ".js"]) assert.ok(!exts.includes(`"${bad}"`), `${bad} must not be allowed`);
});

test("create-admin script has no default credentials", () => {
  const src = read("scripts/create-admin.ts");
  assert.doesNotMatch(src, /ADMIN_EMAIL\s*\?\?/, "ADMIN_EMAIL must not have a fallback");
  assert.doesNotMatch(src, /ADMIN_PASSWORD\s*\?\?/, "ADMIN_PASSWORD must not have a fallback");
  assert.doesNotMatch(src, /console\.log\([^)]*,\s*password\)/, "password must not be printed");
});
