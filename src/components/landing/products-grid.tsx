"use client";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/landing/product-card";
import type { Product } from "@/lib/sanity-types";
import { imageBuilder, urlFor } from "@/sanity/lib/image";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter();
  if (!products || products.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#18181b]">
              Featured Products
            </h2>
            <p className="text-[#71717a]">
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
      className="py-24 md:py-32 bg-secondary"
      aria-labelledby="products-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2
              id="products-heading"
              className="text-4xl md:text-5xl font-bold mb-4 text-[#18181b]"
            >
              Featured Products
            </h2>
            <p className="text-lg text-[#71717a]">
              Discover our precision-engineered solutions built to perform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              console.log("PRODUCT",product);
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
