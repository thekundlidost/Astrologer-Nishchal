"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { LANGUAGES, DEFAULT_LANG, I18N_ENABLED, Lang } from "@/lib/i18n";

/**
 * Language switcher. Renders ONLY when NEXT_PUBLIC_I18N_ENABLED === "true",
 * so it stays hidden until translations are ready. Persists the choice in
 * localStorage. Wiring the chosen language into rendered copy is the remaining
 * step when translations are added.
 */
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) setLang(stored);
  }, []);

  if (!I18N_ENABLED || !mounted) return null;

  function choose(next: Lang) {
    setLang(next);
    localStorage.setItem("lang", next);
    // Future: trigger re-render of translated content / route to /[lang].
  }

  return (
    <div className={`flex items-center gap-1 rounded-full border border-royal-100 px-1 py-1 dark:border-white/15 ${className}`}>
      <Globe className="ml-1.5 h-4 w-4 text-royal-500 dark:text-gold-400" />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => choose(l.code)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            lang === l.code
              ? "bg-gold-400 text-royal-900"
              : "text-ink/60 hover:text-royal-600 dark:text-white/60"
          }`}
          aria-pressed={lang === l.code}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}
