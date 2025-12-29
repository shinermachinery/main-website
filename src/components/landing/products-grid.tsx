"use client";

import { ProductCard } from "@/components/landing/product-card";
import { imageBuilder } from "@/sanity/lib/image";

interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  price?: number;
  features?: string[];
}

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-white">
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
      className="py-24 md:py-32 bg-white"
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
              const imageUrl = product.image
                ? imageBuilder.image(product.image).width(600).height(400).url()
                : "/placeholder-product.jpg";

              return (
                <ProductCard
                  key={product._id}
                  title={product.title}
                  description={product.description}
                  imageUrl={imageUrl}
                  imageAlt={product.image?.alt || product.title}
                  onViewDetails={() => {
                    // TODO: Navigate to product details page
                    console.log("View details for:", product.slug.current);
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
