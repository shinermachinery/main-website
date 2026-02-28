"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import type { Product } from "@/lib/sanity-types";
import { toPlainText } from "@/lib/utils";
import { safeImageUrl } from "@/sanity/lib/image";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  // Filter out current product and limit to 4
  const relatedProducts = products
    .filter((p) => p._id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  const getImageUrl = (product: Product) =>
    safeImageUrl(product.images?.[0], 400, 300);

  return (
    <section className="space-y-8">
      {/* Ultra-thin Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-brand-blue" strokeWidth={1} />
          <h2 className="text-xl font-light text-foreground">
            Related Products
          </h2>
        </div>
        <Link
          href="/products"
          className="group flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-brand-blue transition-colors"
        >
          View all
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={1}
          />
        </Link>
      </div>

      {/* Ultra-thin Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug.current}`}
            className="group relative overflow-hidden rounded-2xl bg-secondary border border-muted transition-all duration-300 hover:border-muted-foreground hover:shadow-lg"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={getImageUrl(product) || "/shiner-logo.png"}
                alt={product.images?.[0]?.alt || product.title}
                width={400}
                height={300}
                className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${getImageUrl(product) ? "object-cover" : "object-contain p-8 opacity-60"}`}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              {/* Collection Badges */}
              {product.collections && product.collections.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product.collections.map((col) => (
                    <span
                      key={col._id}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-blue/5 text-brand-blue"
                    >
                      {col.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-brand-blue transition-colors">
                {product.title}
              </h3>

              {/* Description */}
              {product.description && product.description.length > 0 && (
                <p className="text-xs font-light text-muted-foreground line-clamp-2">
                  {toPlainText(product.description)}
                </p>
              )}

              {/* Price or CTA */}
              <div className="pt-2 flex items-center justify-between">
                {product.price ? (
                  <span className="text-sm font-light text-foreground">
                    ${product.price.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-xs font-light text-muted-foreground">
                    Learn more
                  </span>
                )}
                <ArrowRight
                  className="w-3.5 h-3.5 text-muted-foreground transition-all duration-300 group-hover:text-brand-blue group-hover:translate-x-1"
                  strokeWidth={1}
                />
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Link>
        ))}
      </div>

      {/* View All Products - Ultra-thin Button */}
      {products.length > 4 && (
        <div className="flex justify-center pt-4">
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-muted bg-secondary text-sm font-light text-muted-foreground transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-md hover:shadow-brand-blue/10"
          >
            Discover More Products
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={1}
            />
          </Link>
        </div>
      )}
    </section>
  );
}
