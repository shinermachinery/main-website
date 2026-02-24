"use client";

import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/sections/products/product-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { Product } from "@/lib/sanity-types";
import { safeImageUrl } from "@/sanity/lib/image";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <EmptyState
        variant="filtered"
        message="No products found. Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const imageUrl = safeImageUrl(product?.images?.[0], 600, 400);

        return (
          <ProductCard
            key={product._id}
            title={product.title}
            description={product.description}
            category={product.collection?.title}
            imageUrl={imageUrl}
            imageAlt={product.images?.[0]?.alt || product.title}
            href={`/products/${product.slug.current}`}
            onViewDetails={() => {
              router.push(`/products/${product.slug.current}`);
            }}
          />
        );
      })}
    </div>
  );
}
