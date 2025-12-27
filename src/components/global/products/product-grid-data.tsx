/**
 * Product Grid Data Component (Server Component)
 * Fetches products from Sanity and renders ProductGrid
 * Follows component-based server data pattern
 */

import { client } from "@/sanity/lib/client";
import type { Product } from "@/lib/sanity-types";
import { ProductGrid } from "./product-grid";

export interface ProductGridDataProps {
  featured?: boolean;
  collectionSlug?: string;
  limit?: number;
  variant?: "default" | "compact" | "featured";
  showPrice?: boolean;
  showFeatures?: boolean;
}

export async function ProductGridData({
  featured,
  collectionSlug,
  limit,
  variant = "default",
  showPrice = true,
  showFeatures = true,
}: ProductGridDataProps) {
  // Build GROQ query based on filters
  let query = '*[_type == "product"';

  const filters: string[] = [];
  if (featured !== undefined) {
    filters.push(`featured == ${featured}`);
  }
  if (collectionSlug) {
    filters.push(`collection->slug.current == $collectionSlug`);
  }

  if (filters.length > 0) {
    query += ` && ${filters.join(" && ")}`;
  }

  query += "] | order(order asc, _createdAt desc)";

  if (limit) {
    query += `[0...${limit}]`;
  }

  query += ` {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    descriptionBulletPoints,
    images[] {
      asset,
      alt,
      hotspot
    },
    brochure {
      asset
    },
    specifications,
    price,
    features,
    featured,
    order,
    collection-> {
      _id,
      title,
      slug
    }
  }`;

  // Fetch products
  const products = await client.fetch<Product[]>(
    query,
    collectionSlug ? { collectionSlug } : {},
  );

  return (
    <ProductGrid
      products={products}
      variant={variant}
      showPrice={showPrice}
      showFeatures={showFeatures}
    />
  );
}
