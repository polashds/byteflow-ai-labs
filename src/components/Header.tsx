"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";
import { brand } from "@/config/branding";
import { trackServiceCtaClick } from "@/lib/analytics";
import { solutionGroups } from "@/config/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const solutionHrefs = solutionGroups.flatMap((g) => g.items.map((i) => i.href));
  const solutionsActive =
    pathname === "/solutions" || solutionHrefs.some((h) => pathname === h || pathname.startsWith(`${h}/`));

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => { setOpen(false); setMenuOpen(false); }, [pathname]);

  // Close the desktop Solutions menu on Escape or a click outside it.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Logo lockup */}
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src="/logo_byteflowailabs.png"
              alt=""
              width={44}
              height={44}
              loading="eager"
              style={{ height: "44px", width: "auto" }}
              priority
            />
            <span className="font-heading text-[20px] leading-none">
              <span className="font-bold text-brand-text">ByteFlow</span>
              {" "}
              <span
                className="font-light"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >AI Labs</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              if (href === "/solutions") {
                return (
                  <div
                    key={href}
                    ref={menuRef}
                    className="relative"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setMenuOpen(true)}
                      aria-expanded={menuOpen}
                      aria-controls="solutions-menu"
                      className={`relative flex items-center gap-1.5 font-body text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                        solutionsActive || menuOpen ? "text-accent" : "text-brand-muted hover:text-accent"
                      }`}
                    >
                      {label}
                      <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true"
                        className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}>
                        <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 right-0 -bottom-2 h-px origin-left transition-transform duration-300 ${
                          solutionsActive ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
                      />
                    </button>
                    {/* Hover bridge + panel */}
                    <div
                      id="solutions-menu"
                      hidden={!menuOpen}
                      className="fixed left-1/2 -translate-x-1/2 top-12 pt-8"
                    >
                      <div className="w-[min(760px,calc(100vw-3rem))] rounded-card border border-primary/20 bg-brand-surface shadow-card p-6 grid grid-cols-3 gap-6">
                        {solutionGroups.map((g) => (
                          <div key={g.title} className="min-w-0">
                            <p className="font-body text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-3">{g.title}</p>
                            <ul className="space-y-1">
                              {g.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    aria-current={pathname === item.href ? "page" : undefined}
                                    className="block rounded-btn px-3 py-2 -mx-3 hover:bg-brand-bg/60 transition-colors"
                                  >
                                    <span className="block font-body text-sm text-brand-text">{item.label}</span>
                                    {item.note && (
                                      <span className="block font-body text-xs text-brand-muted mt-0.5">{item.note}</span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="col-span-3 border-t border-primary/10 pt-4 flex items-center justify-between gap-4">
                          <p className="font-body text-xs text-brand-muted">Not sure where to start? A free 30-minute call is the quickest way to find out.</p>
                          <Link href="/solutions" onClick={() => setMenuOpen(false)} className="shrink-0 font-body text-xs font-medium tracking-[0.15em] uppercase text-accent hover:text-brand-text transition-colors">
                            All solutions →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative font-body text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                    active ? "text-accent" : "text-brand-muted hover:text-accent"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-2 h-px origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            onClick={() => trackServiceCtaClick("header", "Discuss Your Workflow")}
            className="hidden lg:inline-flex items-center rounded-btn px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-200 shrink-0 text-brand-bg font-body"
            style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
          >
            Discuss Your Workflow
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className={`block w-6 h-[1.5px] bg-brand-text origin-center transition-all duration-300 ${
                open ? "translate-y-[7.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-brand-text transition-all duration-300 ${
                open ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-brand-text origin-center transition-all duration-300 ${
                open ? "-translate-y-[7.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile nav drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[60] w-[280px] bg-brand-bg border-l border-primary/20 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-primary/20 shrink-0">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image
              src="/logo_byteflowailabs.png"
              alt=""
              width={44}
              height={44}
              loading="eager"
              style={{ height: "44px", width: "auto" }}
            />
            <span className="font-heading text-[18px] leading-none">
              <span className="font-bold text-brand-text">ByteFlow</span>
              {" "}
              <span
                className="font-light"
                style={{
                  background: "linear-gradient(135deg, #2563EB, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >AI Labs</span>
            </span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-6 py-6 flex-1 overflow-y-auto">
          {navLinks.map(({ href, label }) => {
            if (href === "/solutions") {
              return (
                <div key={href} className="border-b border-b-primary/10">
                  <button
                    type="button"
                    onClick={() => setMobileSolutionsOpen((v) => !v)}
                    aria-expanded={mobileSolutionsOpen}
                    aria-controls="mobile-solutions"
                    className={`w-full flex items-center justify-between font-body text-sm font-medium tracking-[0.15em] uppercase py-4 pl-3 border-l-2 transition-colors duration-200 ${
                      solutionsActive ? "text-accent border-l-accent" : "text-brand-muted hover:text-accent border-l-transparent"
                    }`}
                  >
                    {label}
                    <svg width="10" height="7" viewBox="0 0 9 6" fill="none" aria-hidden="true"
                      className={`mr-1 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`}>
                      <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div id="mobile-solutions" hidden={!mobileSolutionsOpen} className="pb-4 pl-5 space-y-4">
                    {solutionGroups.map((g) => (
                      <div key={g.title}>
                        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-accent mb-1.5">{g.title}</p>
                        <ul>
                          {g.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                aria-current={pathname === item.href ? "page" : undefined}
                                className={`block font-body text-sm py-1.5 transition-colors ${
                                  pathname === item.href ? "text-accent" : "text-brand-text/85 hover:text-accent"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link href="/solutions" onClick={() => setOpen(false)} className="block font-body text-xs tracking-[0.15em] uppercase text-accent">
                      All solutions →
                    </Link>
                  </div>
                </div>
              );
            }
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block font-body text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 py-4 pl-3 border-b border-l-2 border-b-primary/10 last:border-b-0 ${
                  active
                    ? "text-accent border-l-accent"
                    : "text-brand-muted hover:text-accent border-l-transparent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-6 pb-8 shrink-0">
          <Link
            href="/contact"
            onClick={() => {
              trackServiceCtaClick("mobile_menu", "Discuss Your Workflow");
              setOpen(false);
            }}
            className="flex items-center justify-center rounded-btn px-5 py-3.5 text-brand-bg font-body text-xs font-medium tracking-[0.15em] uppercase"
            style={{ background: "linear-gradient(135deg, #2563EB, #22D3EE)" }}
          >
            Discuss Your Workflow
          </Link>
        </div>
      </nav>
    </>
  );
}
