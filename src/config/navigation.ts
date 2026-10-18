/**
 * One source for the Solutions menu (header dropdown + mobile menu) and the
 * footer columns, so every public page is reachable in one or two clicks.
 * Add a page here and it shows up in both places.
 */
export interface NavItem {
  href: string;
  label: string;
  /** Short line shown under the label in the desktop dropdown. */
  note?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const solutionGroups: NavGroup[] = [
  {
    title: "By industry",
    items: [
      { href: "/real-estate-automation", label: "Real estate", note: "Enquiry to booked viewing on WhatsApp" },
      // CC-2: add { href: "/ecommerce-payment-automation", label: "E-commerce & digital products", note: "…" }
    ],
  },
  {
    title: "By need",
    items: [
      { href: "/services/lead-to-crm-automation", label: "Lead capture & CRM", note: "Leads from all your sources in one pipeline" },
      { href: "/services/whatsapp-ai-assistant", label: "WhatsApp AI assistant", note: "Bengali and English, with handover" },
      { href: "/services/order-payment-automation", label: "Order & payment checks", note: "Screenshot checks and order updates" },
    ],
  },
  {
    title: "In Bangladesh",
    items: [
      { href: "/ai-automation-agency-bangladesh", label: "AI automation in Bangladesh" },
      { href: "/whatsapp-chatbot-bangladesh", label: "WhatsApp chatbot" },
      { href: "/bkash-payment-verification-automation", label: "bKash & Nagad verification" },
      { href: "/n8n-automation-agency-bangladesh", label: "n8n automation agency" },
    ],
  },
];

export const companyLinks: NavItem[] = [
  { href: "/services", label: "All services" },
  { href: "/solutions", label: "All solutions" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
