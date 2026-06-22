import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Hero from "@/components/ui/Hero";
import CTASection from "@/components/ui/CTASection";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Astrology Blog & Guides",
  description:
    "Practical, jargon-free guides on Kundli reading, career and marriage astrology, numerology and gemstones from Astrologer Nishchal (@thekundlidost).",
  alternates: { canonical: "/blog" },
};

const CATEGORIES = ["All", "Career", "Marriage", "Numerology", "Gemstones", "Kundli"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Hero
        compact
        eyebrow="Blog & Guides"
        title="Insights on Astrology, Tarot & Numerology"
        subtitle="Practical, jargon-free articles to help you think through career, marriage, finance and life decisions."
      />

      <section className="section">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-royal-100 px-4 py-1.5 text-xs font-medium text-ink/60 dark:border-white/15 dark:text-white/60"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card card-hover flex h-full flex-col p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="eyebrow">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-ink/45 dark:text-white/40">
                    <Clock className="h-3 w-3" /> {post.readMinutes} min
                  </span>
                </div>
                <h2 className="mt-3 font-heading text-lg font-semibold leading-snug text-royal-600 dark:text-white">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65 dark:text-white/65">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-ink/45 dark:text-white/40">{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-ink/50 dark:text-white/50">
            New articles are published regularly — follow along on Instagram{" "}
            <span className="font-semibold text-royal-600 dark:text-gold-300">@thekundlidost</span> for the latest.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
