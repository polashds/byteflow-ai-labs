import type { Metadata } from "next";
import AdminLayoutShell from "./_components/AdminLayoutShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — ByteFlow AI Labs",
};

// Route protection has two layers: proxy.ts redirects unauthenticated
// /admin/* requests, and every admin page and server action also calls
// requireAdmin() from src/lib/auth-guard.ts, so admin data is never served
// on the strength of the proxy alone. This layout only provides the chrome
// (it also wraps /admin/login, so it must not redirect).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
