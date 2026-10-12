"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    /** Path of the last page_view sent — stops the init script and the route effect double-counting. */
    __bfLastPageView?: string;
  }
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function GA4Script() {
  const pathname = usePathname();

  // page_view is sent manually (config has send_page_view: false). On first
  // load gtag may not exist yet when this effect runs; the init script then
  // sends the landing page_view itself. __bfLastPageView makes whichever runs
  // second skip, so each page is counted once in either order.
  useEffect(() => {
    if (!window.gtag) return;
    if (window.__bfLastPageView === pathname) return;
    window.__bfLastPageView = pathname;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  if (!GA4_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA4_ID}', { send_page_view: false });
        if (window.__bfLastPageView !== location.pathname) {
          window.__bfLastPageView = location.pathname;
          gtag('event', 'page_view', { page_path: location.pathname });
        }
      `}</Script>
    </>
  );
}
