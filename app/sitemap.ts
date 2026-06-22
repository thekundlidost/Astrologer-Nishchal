import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/about", "/services", "/booking", "/reviews", "/blog", "/contact",
    "/privacy-policy", "/terms-conditions", "/refund-policy", "/disclaimer",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/booking" || route === "/services" ? 0.9 : 0.7,
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
