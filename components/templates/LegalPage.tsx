import type { ReactNode } from "react";
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-ink/50 dark:text-white/50">Last updated: {updated}</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/70 dark:text-white/70 sm:text-base [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-royal-600 dark:[&_h2]:text-white">
          {children}
        </div>
      </div>
    </section>
  );
}
