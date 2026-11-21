"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sends one anonymous page-view ping per public page view to /api/pv.
 * No cookies or identifiers; the server stores only daily counts per page.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const payload = JSON.stringify({ path: pathname });
    try {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon && navigator.sendBeacon("/api/pv", blob)) return;
    } catch {
      // fall through to fetch
    }
    fetch("/api/pv", {
      method: "POST",
      body: payload,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
