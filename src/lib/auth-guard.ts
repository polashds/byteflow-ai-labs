import { redirect } from "next/navigation";
import type { Session } from "next-auth";
import { auth } from "@/auth";
import { isAdminSession } from "@/lib/admin-role";

export { isAdminSession };

/**
 * Server-side admin checks. Every admin page and server action calls one of
 * these, so admin data is never served on the strength of proxy.ts alone
 * (see GHSA-6gpp-xcg3-4w24: a proxy/middleware bypass in Next.js 16 < 16.2.11).
 */

/** For admin pages and server actions: redirects to the login page unless the visitor is an admin. */
export async function requireAdmin(): Promise<Session> {
  const session = await auth();
  if (!session || !isAdminSession(session)) redirect("/admin/login");
  return session;
}
