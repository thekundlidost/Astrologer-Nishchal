import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { getLatestPosts } from "@/lib/blog-posts";

export default function LatestArticles() {
  const posts = getLatestPosts(3);

  return (
    <section className="section">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="From the Blog"
          title="Astrology Guides & Insights"
          subtitle="Practical, jargon-free reading to help you make sense of your chart."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card card-hover flex h-full flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="eyebrow">{post.category}</span>
                <span className="flex items-center gap-1 text-xs text-ink/45 dark:text-white/40">
                  <Clock className="h-3 w-3" /> {post.readMinutes} min
                </span>
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold leading-snug text-royal-600 dark:text-white">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65 dark:text-white/65">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                Read <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog" className="btn-outline">View All Articles</Link>
        </div>
      </div>
    </section>
  );
}
