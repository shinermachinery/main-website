import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { client } from "@/sanity/lib/client";

/**
 * Dynamic Sitemap Generation
 *
 * Generates a sitemap.xml with all static and dynamic routes.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/mission-vision`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/director`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Fetch dynamic content from Sanity
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // Fetch all products
    const products = await client.fetch<
      Array<{ slug: { current: string }; _updatedAt: string }>
    >(`*[_type == "product" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`);

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Fetch all blog posts
    const posts = await client.fetch<
      Array<{ slug: { current: string }; _updatedAt: string }>
    >(`*[_type == "post" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`);

    const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    dynamicPages = [...productPages, ...blogPages];
  } catch (error) {
    console.error("Error fetching sitemap data from Sanity:", error);
    // Continue with static pages only if Sanity fails
  }

  return [...staticPages, ...dynamicPages];
}
