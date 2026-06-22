import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import CTASection from "@/components/ui/CTASection";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-posts";
import { getServiceBySlug, SITE } from "@/lib/constants";
import { jsonLd, blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = post.serviceSlug ? getServiceBySlug(post.serviceSlug) : undefined;
  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="section">
        <div className="container-px mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-royal-500 hover:underline dark:text-gold-300">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="eyebrow">{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-ink/45 dark:text-white/40">
              <Clock className="h-3 w-3" /> {post.readMinutes} min read
            </span>
            <span className="text-xs text-ink/45 dark:text-white/40">{formatDate(post.date)}</span>
          </div>

          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-royal-600 dark:text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="gold-divider mt-5" />

          <p className="mt-6 text-lg leading-relaxed text-ink/75 dark:text-white/75">{post.intro}</p>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-xl font-semibold text-royal-600 dark:text-white">{section.heading}</h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="mt-3 text-base leading-relaxed text-ink/70 dark:text-white/70">{p}</p>
                ))}
              </section>
            ))}
          </div>

          {/* In-article CTA */}
          {related && (
            <div className="mt-12 rounded-2xl bg-royal-gradient p-7 text-center text-white">
              <h3 className="font-heading text-lg font-bold">Ready to go deeper?</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
                Book a {related.title.toLowerCase()} with Astrologer Nishchal for guidance specific to your chart.
              </p>
              <Link href={`/booking?service=${related.slug}`} className="btn-primary mt-5 inline-flex">
                Book {related.shortTitle} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* More articles */}
          <div className="mt-14">
            <h3 className="font-heading text-lg font-semibold text-royal-600 dark:text-white">More guides</h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {more.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card card-hover p-5">
                  <span className="eyebrow">{p.category}</span>
                  <h4 className="mt-2 font-heading text-base font-semibold text-royal-600 dark:text-white">{p.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <CTASection />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogPostingSchema(post))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ]))} />
    </>
  );
}
