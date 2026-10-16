import type { Metadata } from "next";
import VerticalPage from "@/components/vertical/VerticalPage";
import { brand } from "@/config/branding";
import { realEstate } from "@/config/verticals";

const { meta, path } = realEstate;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: path },
  openGraph: { title: `${meta.title} — ${brand.name}`, description: meta.description, url: path, type: "website" },
  twitter: { title: `${meta.title} — ${brand.name}`, description: meta.description },
};

export default function RealEstateAutomationPage() {
  return <VerticalPage vertical={realEstate} />;
}
