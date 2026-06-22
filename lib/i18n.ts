/**
 * ──────────────────────────────────────────────────────────────────────────
 * MULTI-LANGUAGE SCAFFOLD (English + Hindi)
 * ──────────────────────────────────────────────────────────────────────────
 * Architecture is prepared for two languages. Full translation of every string
 * is a larger content task, so the switcher ships in a "ready" state: the
 * language list, types, and a persistence hook are here. To go live:
 *   1. Add translated strings to the `dictionaries` map (or per-page JSON).
 *   2. Set NEXT_PUBLIC_I18N_ENABLED=true to show the switcher in the header.
 *   3. Wire `useLanguage()` into components that should translate.
 *
 * This keeps the door open without shipping a half-translated UI today.
 */

export type Lang = "en" | "hi";

export const I18N_ENABLED = process.env.NEXT_PUBLIC_I18N_ENABLED === "true";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
];

export const DEFAULT_LANG: Lang = "en";

// Minimal starter dictionary. Expand as translation work proceeds.
export const dictionaries: Record<Lang, Record<string, string>> = {
  en: {
    book_consultation: "Book Consultation",
    chat_whatsapp: "Chat on WhatsApp",
    view_services: "View Services",
  },
  hi: {
    book_consultation: "परामर्श बुक करें",
    chat_whatsapp: "व्हाट्सएप पर चैट करें",
    view_services: "सेवाएँ देखें",
  },
};

export function t(lang: Lang, key: string): string {
  return dictionaries[lang]?.[key] ?? dictionaries[DEFAULT_LANG][key] ?? key;
}
