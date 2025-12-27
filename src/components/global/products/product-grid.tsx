/**
 * Product Grid Component
 * Displays a grid of product cards
 * Client component for interactive product browsing
 */

"use client";

import type { Product } from "@/lib/sanity-types";
import { ProductCard } from "./product-card";

export interface ProductGridProps {
  products: Product[];
  variant?: "default" | "compact" | "featured";
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3;
    desktop?: 3 | 4;
  };
  showPrice?: boolean;
  showFeatures?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  variant = "default",
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  showPrice = true,
  showFeatures = true,
  emptyMessage = "No products available at the moment.",
}: ProductGridProps) {
  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  // Build grid classes based on column configuration
  const gridClasses = `grid gap-6 md:gap-8 
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}`;

  return (
    <div 
      className={gridClasses}
      role="list"
      aria-label="Product grid"
    >
      {products.map((product, index) => (
        <div key={product._id} role="listitem">
          <ProductCard
            product={product}
            variant={index === 0 && variant === "featured" ? "featured" : variant}
            showPrice={showPrice}
            showFeatures={showFeatures}
          />
        </div>
      ))}
    </div>
  );
}
