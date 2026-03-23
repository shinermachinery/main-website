import { siteConfig } from "@/lib/site-config";

interface ArticleJsonLdProps {
  title: string;
  description?: string;
  image?: string;
  datePublished?: string;
  author?: string;
  url: string;
}

/**
 * Article/BlogPosting JSON-LD structured data for blog post pages.
 */
export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  author,
  url,
}: ArticleJsonLdProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    ...(description && { description }),
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    url,
    author: {
      "@type": author ? "Person" : "Organization",
      name: author ?? siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/shiner-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema),
      }}
    />
  );
}
