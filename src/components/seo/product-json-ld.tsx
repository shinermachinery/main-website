import { siteConfig } from "@/lib/site-config";

interface ProductJsonLdProps {
  name: string;
  description?: string;
  image?: string;
  brand?: string;
  url: string;
}

/**
 * Product JSON-LD structured data for product detail pages.
 */
export function ProductJsonLd({
  name,
  description,
  image,
  brand,
  url,
}: ProductJsonLdProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    ...(description && { description }),
    ...(image && { image }),
    url,
    brand: {
      "@type": "Brand",
      name: brand ?? siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  );
}
