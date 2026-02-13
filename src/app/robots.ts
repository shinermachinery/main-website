import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Robots.txt Configuration
 *
 * Controls how search engines crawl and index the site.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio/", // Sanity Studio - admin only
          "/api/", // API routes - not for indexing
          "/_next/", // Next.js internal files
          "/private/", // Private content if any
        ],
      },
      {
        // Block aggressive crawlers
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
