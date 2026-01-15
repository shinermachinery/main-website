/**
 * Product Card Component
 * Displays a single product with image, details, and features
 * Reusable component for product lists, grids, and detail pages
 */

"use client";

import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import type { Product } from "@/lib/sanity-types";
import { urlFor } from "@/sanity/lib/image";

export interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
  showPrice?: boolean;
  showFeatures?: boolean;
  showBrochure?: boolean;
}

export function ProductCard({
  product,
  variant = "default",
  showPrice = true,
  showFeatures = true,
  showBrochure = false,
}: ProductCardProps) {
  // Get primary image
  const primaryImage = product.images?.[0];
  const imageUrl = primaryImage
    ? urlFor(primaryImage).width(600).height(600).url()
    : "/placeholder-product.jpg";

  // Get brochure URL if available
  const brochureUrl = product.brochure?.asset._ref
    ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${product.brochure.asset._ref.replace("file-", "").replace("-pdf", ".pdf")}`
    : null;

  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group rounded-2xl border bg-card overflow-hidden transition-shadow hover:shadow-xl ${
        isFeatured ? "ring-2 ring-brand-green/50" : ""
      }`}
    >
      {/* Product Image */}
      <Link
        href={`/products/${product.slug.current}`}
        className="block relative aspect-square bg-muted overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={primaryImage?.alt || product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={isFeatured}
        />
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-blue to-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className={`p-6 space-y-4 ${isCompact ? "p-4 space-y-2" : ""}`}>
        <Link href={`/products/${product.slug.current}`}>
          <h3
            className={`font-semibold hover:text-brand-blue transition-colors ${
              isCompact ? "text-lg" : "text-2xl"
            }`}
          >
            {product.title}
          </h3>
        </Link>

        {product.description && !isCompact && (
          <p className="text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        {showPrice && product.price !== undefined && (
          <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
            ${product.price.toFixed(2)}
          </p>
        )}

        {/* Features List */}
        {showFeatures &&
          product.features &&
          product.features.length > 0 &&
          !isCompact && (
            <ul className="space-y-1 text-sm text-muted-foreground">
              {product.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-green mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-xs text-muted-foreground/70">
                  +{product.features.length - 3} more features
                </li>
              )}
            </ul>
          )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/products/${product.slug.current}`} className="flex-1">
            <GradientButton
              className="w-full"
              size={isCompact ? "sm" : "default"}
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </Link>

          {showBrochure && brochureUrl && (
            <a
              href={brochureUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Download product brochure"
            >
              <Download className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
