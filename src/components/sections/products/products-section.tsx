"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/sanity-types";
import { safeImageUrl } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="products" className="w-full flex flex-col gap-10" aria-labelledby="products-heading">
       
          {/* Header with Title and Button */}
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h2
                id="products-heading"
                className="text-2xl font-medium text-foreground"
              >
                Featured Products
              </h2>
            </div>
            <Button
              variant={"shiner"}
              asChild
              className="flex items-center gap-2 px-4 py-2 rounded-full h-10 font-medium text-sm w-fit"
            >
              <Link href="/products">
                Explore Products
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </Button>
          </div>

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
                />
              );
            })}
          </div>
       
    </section>
  );
}
