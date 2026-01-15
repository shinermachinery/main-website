"use client";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/sanity-types";
import { urlFor } from "@/sanity/lib/image";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter();
  if (!products || products.length === 0) {
    return (
      <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-[30px] leading-[40px] font-medium tracking-[-0.75px] mb-4 text-primary">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              No products available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="py-40"
      aria-labelledby="products-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Header with Title and Button */}
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h2
                id="products-heading"
                className="text-[30px] leading-[40px] font-medium text-foreground tracking-[-0.75px]"
              >
                Featured Products
              </h2>
            </div>
            <button
              onClick={() => router.push("/products")}
              className="flex items-center gap-2 px-4 py-2 rounded-full h-10 font-medium text-sm leading-5"
              style={{
                background: "linear-gradient(91.23deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%)",
                boxShadow: "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.4)",
              }}
            >
              <span
                className="bg-clip-text"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(90.59deg, #2a5e98 15.88%, #18b75a 115.02%)",
                }}
              >
                Explore Products
              </span>
              <ArrowRight className="w-5 h-5" style={{ color: "#18181b" }} />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const imageUrl = product?.images?.[0]
                ? urlFor(product.images?.[0]).width(600).height(400).url()
                : "/placeholder-product.jpg";

              return (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  description={product.description}
                  imageUrl={imageUrl}
                  imageAlt={product.images?.[0]?.alt || product.title}
                  onViewDetails={() => {
                    router.push(`/products/${product.slug.current}`);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
