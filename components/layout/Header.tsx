"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, Moon, Instagram } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top contact strip — desktop only */}
      <div className="hidden bg-royal-700 text-white/80 md:block">
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-2 text-xs">
          <span className="tracking-wide">{SITE.tagline}</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.phoneDisplay.replace(/\s/g, "")}`} data-track="call_click" data-track-source="header_strip" className="flex items-center gap-1.5 hover:text-gold-400">
              <Phone className="h-3.5 w-3.5" />
              {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-gold-400">
              <Mail className="h-3.5 w-3.5" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-royal-100/60 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-royal-900/90">
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-3.5">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-600 text-gold-400">
              <Moon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg font-semibold text-royal-600 dark:text-white">
                {SITE.name}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.16em] text-gold-500">
                {SITE.handle}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-royal-500 dark:text-white/80 dark:hover:text-gold-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-track="instagram_click"
              data-track-source="header"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-royal-100 text-royal-600 transition-colors hover:border-gold-400 hover:text-gold-500 dark:border-white/15 dark:text-white/80"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <ThemeToggle />
            <Link href="/booking" className="btn-primary">
              Book Consultation
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-royal-600 dark:text-white"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-royal-950/60" onClick={() => setOpen(false)} aria-hidden="true" />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 bg-white px-6 py-6 shadow-xl transition-transform duration-300 dark:bg-royal-900 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-heading text-base font-semibold text-royal-600 dark:text-white">Menu</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-1">
              <X className="h-5 w-5 text-royal-600 dark:text-white" />
            </button>
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-mist dark:text-white dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
            Book Consultation
          </Link>
          <a href={`tel:${SITE.phoneDisplay.replace(/\s/g, "")}`} data-track="call_click" data-track-source="mobile_drawer" className="btn-outline mt-2 w-full">
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
