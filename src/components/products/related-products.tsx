"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { Product } from "@/lib/sanity-types";
import { getDemoImageUrl } from "@/lib/demo-data/products";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filter out current product and limit to 4
  const relatedProducts = products
    .filter((p) => p._id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  // Helper to get image URL - handles both Sanity images and demo images
  const getImageUrl = (product: Product) => {
    try {
      const image = product.images?.[0];
      if (image?.asset?._ref && !image.asset._ref.startsWith("image-")) {
        return urlFor(image).width(400).height(300).url();
      }
      return getDemoImageUrl(image?.asset?._ref || "image-1");
    } catch (error) {
      console.error("Error getting image URL:", error);
      return getDemoImageUrl("image-1");
    }
  };

  return (
    <section className="space-y-8">
      {/* Ultra-thin Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-brand-blue" strokeWidth={1} />
          <h2 className="text-2xl font-light text-zinc-900">
            Related Products
          </h2>
        </div>
        <Link
          href="/products"
          className="group flex items-center gap-2 text-sm font-light text-zinc-600 hover:text-brand-blue transition-colors"
        >
          View all
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1} />
        </Link>
      </div>

      {/* Ultra-thin Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug.current}`}
            className="group relative overflow-hidden rounded-2xl bg-secondary border border-zinc-100 transition-all duration-300 hover:border-zinc-200 hover:shadow-lg"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100">
              {product.images?.[0] ? (
                <Image
                  src={getImageUrl(product)}
                  alt={product.images[0].alt || product.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-zinc-400 text-xs font-light">No image</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              {/* Collection Badge */}
              {product.collection && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-blue/5 text-brand-blue">
                  {product.collection.title}
                </span>
              )}

              {/* Title */}
              <h3 className="text-sm font-medium text-zinc-900 line-clamp-1 group-hover:text-brand-blue transition-colors">
                {product.title}
              </h3>

              {/* Description */}
              {product.description && (
                <p className="text-xs font-light text-zinc-500 line-clamp-2">
                  {product.description}
                </p>
              )}

              {/* Price or CTA */}
              <div className="pt-2 flex items-center justify-between">
                {product.price ? (
                  <span className="text-sm font-light text-zinc-900">
                    ${product.price.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-xs font-light text-zinc-500">
                    Learn more
                  </span>
                )}
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 transition-all duration-300 group-hover:text-brand-blue group-hover:translate-x-1" strokeWidth={1} />
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
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-200 bg-secondary text-sm font-light text-zinc-700 transition-all duration-300 hover:border-brand-blue hover:text-brand-blue hover:shadow-md hover:shadow-brand-blue/10"
          >
            Discover More Products
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1} />
          </Link>
        </div>
      )}
    </section>
  );
}