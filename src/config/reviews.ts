import { brand } from "@/config/branding";

/*
 * Client reviews shown in the homepage reviews row. Quotes are verbatim from
 * the public Upwork and Fiverr profiles (same source as siddiquehossain.com)
 * and from LinkedIn recommendations. Client names are shown only where the
 * client agreed to be named (`name`/`role`); otherwise the review is
 * attributed to the platform and the project. Do not edit the quotes, and add
 * no review without the source.
 */

export interface Review {
  platform: "Upwork" | "Fiverr" | "LinkedIn";
  project: string;
  quote: string;
  /** Public profile where the review can be seen. Omit if there is no public link to give. */
  link?: string;
  /** Only with the client's permission to be named. */
  name?: string;
  role?: string;
  /** Matching entry in caseStudies.ts: the review is also shown on that project page. */
  caseStudyId?: string;
}

export const reviews: Review[] = [
  {
    // LinkedIn recommendation, 9 Nov 2026. Named with permission (21 Nov 2026).
    platform: "LinkedIn",
    project: "Dental clinic website & booking",
    name: "Dr. Md. Shahadat Hossain",
    role: "Shifa Advanced Dental Care & Implant Center · Consultant at Dhaka Imperial Hospital PLC",
    caseStudyId: "shifa-advanced-dental",
    link: "https://www.linkedin.com/in/siddique-ai-automation/details/recommendations/",
    quote:
      "I had a great experience working with Siddique Hossain and ByteFlow AI Labs on the digital transformation of Shifa Advanced Dental Care & Implants Centre.\n\nSiddique demonstrated a strong understanding of how modern technology can support healthcare businesses. His work goes beyond traditional website development, focusing on building an AI-ready digital presence with capabilities such as AI automation, appointment booking systems, AI-powered chatbots, and intelligent customer engagement.\n\nI particularly appreciate his forward-thinking approach to SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and AI-driven search optimization (AIO), helping businesses prepare for the evolving digital landscape.\n\nHis professionalism, technical knowledge, and commitment to delivering practical business solutions make him a valuable technology partner.\n\nI would happily recommend Siddique Hossain and ByteFlow AI Labs to businesses looking to strengthen their digital presence and embrace AI-powered growth.",
  },
  {
    // LinkedIn recommendation, 12 Nov 2026. Named with permission (22 Nov 2026).
    platform: "LinkedIn",
    project: "E-commerce automation",
    name: "Abdus Salam",
    role: "Director, Business Technology Marketing Limited · Pustihaat",
    caseStudyId: "pustihaat",
    link: "https://www.linkedin.com/in/siddique-ai-automation/details/recommendations/",
    quote:
      "I had a great experience working with Siddique Hossain and ByteFlow AI Labs on Pustihaat's eCommerce operations, automation, and business support.\n\nSiddique demonstrated a strong understanding of business needs and how technology can simplify day-to-day operations. He contributed to improving our eCommerce processes through automation, operational support, and practical technology solutions.\n\nWhat I particularly appreciated was his problem-solving mindset, willingness to understand our business requirements, and focus on building solutions that support efficiency and business growth.\n\nHis combination of technical knowledge, automation expertise, and business-oriented thinking makes him a valuable technology partner.\n\nI would gladly recommend Siddique Hossain and ByteFlow AI Labs to businesses looking to streamline their operations, adopt AI-powered automation, and grow their digital capabilities.",
  },
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
  note: "Verbatim reviews left for our founder, Siddique, on Upwork, Fiverr and LinkedIn. Clients are named only where they agreed to be; Upwork and Fiverr reviews link to the public profile where they were left.",
  pause: "Pause reviews",
  play: "Play reviews",
  viewOn: "View on",
  readFull: "Read the full recommendation",
  sectionHeading: "What the client said",
} as const;

export function getReviewsForCaseStudy(caseStudyId: string): Review[] {
  return reviews.filter((r) => r.caseStudyId === caseStudyId);
}
