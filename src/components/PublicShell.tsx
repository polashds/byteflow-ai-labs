"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import RevealObserver from "./RevealObserver";
import PageViewTracker from "./PageViewTracker";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const isAdmin = segment === "admin";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
      <RevealObserver />
      <PageViewTracker />
    </>
  );
}
