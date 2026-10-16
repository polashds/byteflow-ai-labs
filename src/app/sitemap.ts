import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { PostStatus } from "@prisma/client";
import { coreOffers } from "@/config/coreOffers";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://byteflowailabs.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE, changeFrequency: "weekly", priority: 1 },
  { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
  ...coreOffers.map((o) => ({
    url: `${BASE}/services/${o.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  })),
  { url: `${BASE}/whatsapp-chatbot-bangladesh`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/bkash-payment-verification-automation`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/n8n-automation-agency-bangladesh`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/real-estate-automation`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/solutions`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If the database is briefly unreachable, still serve the static routes
  // instead of returning a 500 to crawlers.
  let posts: { slug: string; updatedAt: Date }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: PostStatus.Published },
      select: { slug: true, updatedAt: true },
    });
  } catch (e) {
    console.error("sitemap: could not load blog posts", e);
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
