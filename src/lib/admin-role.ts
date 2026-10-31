import type { Session } from "next-auth";

/** True only for a signed-in user whose role is ADMIN. Pure, so it can be unit-tested. */
export function isAdminSession(session: Session | null | undefined): boolean {
  const role = (session?.user as { role?: unknown } | undefined)?.role;
  return Boolean(session?.user) && role === "ADMIN";
}
