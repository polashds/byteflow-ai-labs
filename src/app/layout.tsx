import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/PublicShell";
import { brand } from "@/config/branding";
import GA4Script from "@/components/analytics/GA4Script";
import MetaPixelScript from "@/components/analytics/MetaPixelScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.description,
  verification: {
    other: {
      "facebook-domain-verification": "av5s8rj6l96q9umcmqn31dxxa6ng8i",
    },
  },
  keywords: [
    "AI automation agency",
    "AI agent development",
    "n8n automation",
    "WhatsApp automation",
    "AI consulting",
    "n8n VPS",
    "workflow automation Bangladesh",
    "AI chatbot Bangladesh",
    "AI voice agent",
    "lead scoring automation",
    "self-hosted automation",
  ],
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    url: brand.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${brand.siteUrl}/#organization`,
  name: brand.name,
  alternateName: "ByteFlow",
  foundingDate: "2025",
  url: brand.siteUrl,
  logo: `${brand.siteUrl}/logo-square.png`,
  image: `${brand.siteUrl}/logo-square.png`,
  description: brand.description,
  email: brand.email,
  areaServed: [
    { "@type": "Country", name: "Bangladesh" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Guatemala" },
  ],
  knowsAbout: [
    "AI automation",
    "n8n workflow automation",
    "WhatsApp Business API chatbots",
    "AI WhatsApp assistants in Bengali and English",
    "Lead-to-CRM automation",
    "AI lead scoring",
    "Order and payment verification automation",
    "bKash and Nagad payment verification",
    "Meta Pixel and Conversions API",
    "AI voice agents",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: brand.email,
    url: `${brand.siteUrl}/contact`,
    availableLanguage: ["English", "Bengali"],
  },
  founder: {
    "@type": "Person",
    "@id": `${brand.siteUrl}/about#founder`,
    name: "Md. Siddique Hossain",
    jobTitle: "Founder, AI Systems Architect & Automation Consultant",
    url: `${brand.siteUrl}/about`,
    image: `${brand.siteUrl}/images/siddique-circle-320.webp`,
    sameAs: [
      "https://siddiquehossain.com",
      "https://www.linkedin.com/in/siddique-ai-automation/",
      "https://github.com/polashds",
      "https://x.com/polashtechai",
    ],
  },
  sameAs: Object.values(brand.social),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brand.name,
  url: brand.siteUrl,
  publisher: { "@id": `${brand.siteUrl}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-brand-bg text-brand-text font-body antialiased flex flex-col min-h-screen">
        <PublicShell>{children}</PublicShell>
        <GA4Script />
        <MetaPixelScript />
      </body>
    </html>
  );
}
