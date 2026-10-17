import { brand } from "@/config/branding";

/*
 * Client reviews shown in the homepage reviews row. Quotes are verbatim from
 * the public Upwork and Fiverr profiles (same source as siddiquehossain.com).
 * Client names are not shown: each review is attributed to the platform and
 * the project. Do not edit the quotes, and add no review without the source.
 */

export interface Review {
  platform: "Upwork" | "Fiverr";
  project: string;
  quote: string;
  link: string;
}

export const reviews: Review[] = [
  {
    platform: "Upwork",
    project: "n8n CRM & lead-gen workflow",
    quote:
      "Great work. Siddique understood the workflow quickly, handled the Zoho mapping and duplicate logic well, and delivered on time. Would work with him again.",
    link: brand.upworkUrl,
  },
  {
    platform: "Upwork",
    project: "Lead Qualification & CRM Automation",
    quote:
      "Siddique delivered exactly what we needed for ai lead qualification and automation. The scoring and auto-tagging system was clear, practical, and easy to adjust. Good communication, solid work, and a smooth delivery. I'd definitely work with him again.",
    link: brand.upworkUrl,
  },
  {
    platform: "Fiverr",
    project: "Starter WhatsApp AI workflow",
    quote:
      "Great experience working with Siddique. He understood what I needed and built the starter WhatsApp AI workflow exactly around my use case. Communication was clear, delivery was smooth, and he was helpful throughout. I'll definitely come back for the next stage.",
    link: brand.fiverrUrl,
  },
  {
    platform: "Fiverr",
    project: "GoHighLevel CRM organisation and workflows",
    quote:
      "Great experience working with Siddique. He organized my GHL CRM, set up the workflows and smart list, and handled the small changes I requested without any issues. Good communication and everything was delivered as expected.",
    link: brand.fiverrUrl,
  },
];

/** Visible copy around the reviews row. */
export const reviewsCopy = {
  eyebrow: "Client reviews",
  heading: "What clients say about our work",
  note: "Verbatim reviews left for our founder, Siddique, on Upwork and Fiverr. Client names are not shown; each review links to the public profile where it was left.",
  pause: "Pause reviews",
  play: "Play reviews",
  viewOn: "View on",
} as const;
