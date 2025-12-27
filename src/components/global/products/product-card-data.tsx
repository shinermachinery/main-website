/**
 * Product Card Data Component (Server Component)
 * Fetches a single product by slug and renders ProductCard
 * Follows component-based server data pattern
 */

import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import type { Product } from "@/lib/sanity-types";
import { ProductCard } from "./product-card";

export interface ProductCardDataProps {
  slug: string;
  variant?: "default" | "compact" | "featured";
  showPrice?: boolean;
  showFeatures?: boolean;
  showBrochure?: boolean;
}

export async function ProductCardData({
  slug,
  variant = "default",
  showPrice = true,
  showFeatures = true,
  showBrochure = false,
}: ProductCardDataProps) {
  const query = `
    *[_type == "product" && slug.current == $slug][0] {
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
      },
      relatedProducts[]-> {
        _id,
        title,
        slug,
        images[0] {
          asset,
          alt
        },
        price
      }
    }
  `;

  const product = await client.fetch<Product | null>(query, { slug });

  if (!product) {
    notFound();
  }

  return (
    <ProductCard
      product={product}
      variant={variant}
      showPrice={showPrice}
      showFeatures={showFeatures}
      showBrochure={showBrochure}
    />
  );
}
