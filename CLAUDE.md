# ByteFlow AI Labs — Build Guide for Claude Code

## What this is
The marketing/agency website for ByteFlow AI Labs — an AI automation agency
(n8n workflows, WhatsApp chatbots, AI voice agents, lead scoring) serving
Bangladesh-first, global-ready clients. Public site + a small admin panel
for blog and lead management.

## CRITICAL working rule
Ask before adding any new npm dependency. Keep changes small and reviewable.
After each task, tell me exactly how to run/verify it.

## Deployment — this is a LIVE site
Deployed via Docker + Traefik on a VPS (`docker-compose.yml`), domain
`byteflowailabs.com`, Postgres running in the same stack. The container's
start command runs `npx prisma migrate deploy` automatically before
`npm run start` (see `Dockerfile`) — **any committed Prisma migration gets
applied to the production DB on the next deploy, with no manual approval
step.** Treat schema changes and anything touching `prisma/schema.prisma`
or `prisma/migrations/` with extra care. Flag any change that affects the
production build or DB before making it.

## Stack (verified from package.json)
- Next.js 16.2.7 (App Router) + React 19.2.4 + TypeScript
- Tailwind CSS v4 — **CSS-based config only**, via `@theme` in
  `src/app/globals.css`. There is no `tailwind.config.js` — don't look for one.
- Prisma 7.8 + PostgreSQL (`@prisma/adapter-pg`, `pg`)
- Auth.js / NextAuth v5 (beta) for admin login
- zod v4 for validation, react-hook-form + @hookform/resolvers for forms
- lucide-react for icons; marked + react-markdown for blog content
- No animation library (no framer-motion, no GSAP) — animation today is
  three hand-written `@keyframes` in `globals.css` (pulse, slide-up,
  typing-dot), all used by `ChatWidget.tsx`.
- No i18n library — the site is English-only, no locale routing.

## Directory map
- `src/app/` — route segments. Public pages live directly under `src/app/`
  (home, `about`, `services`, `solutions`, `portfolio`, `contact`, `blog`,
  `faq`, `privacy`, `terms`, `disclaimer`). `admin/` is the protected admin
  panel (dashboard, blog CRUD, leads). `api/` holds route handlers: NextAuth,
  `chat` (AI chat), `lead-magnet`.
- `src/components/` — shared UI: `Header`, `Footer`, `PublicShell` (wraps
  public pages with Header/Footer/ChatWidget, skips them under `/admin`),
  `ChatWidget`, `ConsultationCTA`, `ContactForm`, `LeadMagnetModal`,
  `OpenChatButton`, plus `analytics/` (`GA4Script`, `MetaPixelScript`).
- `src/config/` — **this is where content lives** (see below).
- `src/lib/` — `db.ts` (Prisma client), `actions.ts` / `admin-actions.ts`
  (server actions), `analytics.ts` / `capi.ts` (GA4 + Meta CAPI), `nav.ts`,
  `constants.ts`.
- `src/auth.ts` — NextAuth config. `proxy.ts` — Next.js 16's replacement for
  middleware, protects `/admin/:path*` (see Gotchas — this file is
  duplicated).
- `prisma/schema.prisma` — models: `User` (admin auth), `Lead` (source:
  Contact/Chatbot/LeadMagnet), `Category` + `Post` (blog).
- `scripts/create-admin.ts` — CLI to create an admin user.

## Content vs. code
Marketing copy and structured content is deliberately pulled out of the
page components into `src/config/*.ts`, typed with exported interfaces:
- `caseStudies.ts` — portfolio/case study data. **To add a project, append
  a `CaseStudy` object to the array** — `src/app/portfolio/page.tsx` renders
  every non-placeholder entry automatically. The last array entry is a
  `isPlaceholder: true` "coming soon" slot.
- `services.ts` — service catalogue (`ServiceCategory[]`), rendered on
  `/services` and the homepage "What We Do" grid.
- `solutions.ts` — solutions page content.
- `branding.ts` — single source of truth for brand name, tagline, colors,
  nav links, social links, chat widget copy.
- `contact.ts` — contact page config.
Page components (`page.tsx` files) hold layout/JSX, not copy — prefer
editing the relevant `config/*.ts` file over hardcoding strings in a page.

## Brand (verified from `branding.ts` and `globals.css` — use exactly)
- Primary (blue): `#2563EB`
- Accent (cyan): `#22D3EE`
- Background: `#070B16`
- Surface: `#0F1729`
- Text: `#E6EDF7`
- Muted text: `#8B95A7`
- Border: `rgba(45,125,249,0.16)`
- Signature gradient: `linear-gradient(135deg, #2563EB, #22D3EE)` — used
  repeatedly for gradient text/buttons across pages.
- Heading font: Geist (`--font-heading`), loaded via `next/font/google` in
  `layout.tsx`, exposed as `--font-geist`.
- Body font: Inter (`--font-body`), same loading pattern, `--font-inter`.
- Tailwind tokens are declared under `@theme` in `globals.css` as
  `--color-primary`, `--color-brand-bg`, etc. — use the Tailwind classes
  (`text-brand-text`, `bg-brand-surface`, ...) rather than hardcoding hex.
- Tagline (from `branding.ts`): "AI Automation for Modern Business".

## Conventions observed in the existing code
- Server Components by default; `"use client"` only where needed for
  interactivity/hooks (`Header`, `PublicShell`, forms, modals).
- Styling is Tailwind utility classes throughout; gradients that Tailwind
  can't express are done with small inline `style={{ background: "..." }}`
  objects, redefined per-page (`gradientText` / `gradientBg` constants at
  the top of several `page.tsx` files) rather than shared from one place.
- Forms use `react-hook-form` + `zod` via `@hookform/resolvers`.
- Server actions (`src/lib/actions.ts`, `admin-actions.ts`) handle writes
  (leads, blog posts) rather than API routes, except where an external
  webhook/integration needs an HTTP endpoint (`api/chat`, `api/lead-magnet`).
- Lead capture fans out to n8n via webhook URLs (`N8N_LEAD_WEBHOOK_URL`,
  `N8N_LEAD_MAGNET_WEBHOOK_URL`) in addition to being saved to the `Lead`
  table — check `.env.example` for the full env var list before wiring new
  integrations.
- AI chat (`api/chat`) calls OpenRouter (`OPENROUTER_API_KEY`,
  `OPENROUTER_MODEL`, default `openai/gpt-4o-mini`).

## House rules
- Ask before adding any new npm dependency.
- This site is deployed on a VPS behind Traefik with migrations applied
  automatically on deploy — flag anything that touches the Prisma schema,
  env vars, `Dockerfile`, or `docker-compose.yml` before changing it.
- Prefer lightweight solutions over heavy libraries for this marketing
  site (e.g. CSS transitions / IntersectionObserver over pulling in
  framer-motion or GSAP) unless a task specifically needs more.

## Gotchas
- `Header.tsx` calls `usePathname()` but never uses the result — there's no
  active-state styling on the current nav link.
- `proxy.ts` exists **twice**, byte-for-byte identical, at both the repo
  root (`./proxy.ts`) and `./src/proxy.ts`. Only one is actually picked up
  by Next.js — worth confirming which before editing either, so you don't
  edit the dead copy.
- Two slightly different taglines are in circulation: `branding.ts` says
  "AI Automation for Modern Business," while the homepage's `<meta>`
  description/title say "AI Automation Agency." Not a bug, just inconsistent
  copy if you're auditing SEO text.
- No i18n and no animation library are present yet — if a task asks for
  either, it's a real addition, not a config toggle.
