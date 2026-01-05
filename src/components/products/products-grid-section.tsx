"use client"
import type { Category, Product } from "@/lib/sanity-types";
import { ProductCard } from "../landing/product-card";
import { imageBuilder } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface ProductsGridSectionProps {
  products: Product[];
  categories: Category[];
}

export function ProductsGridSection({
  products,
  categories,
}: ProductsGridSectionProps) {
  const router = useRouter();
  return (
    <section className="flex flex-col gap-[40px] w-full">
      {/* Header */}
      <div className="flex flex-col gap-[16px]">
        <h1
          className="font-medium text-[36px] leading-[48px] tracking-[-0.9px] text-[#18181b]"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          Our Products
        </h1>
        <p
          className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#71717a]"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-[24px] items-start md:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-[566px]">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-[48px] px-[24px] rounded-full bg-[#f9f9fb] text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          />
        </div>

        {/* Filter & Categories */}
        <div className="flex items-center gap-[16px]">
          {/* Active Filter Chip */}
          <div className="flex items-center gap-[8px] px-[16px] h-[40px] rounded-full bg-[#f9f9fb]">
            <span
              className="text-[14px] font-medium text-zinc-900"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Machinery
            </span>
            <button
              type="button"
              className="text-zinc-500 hover:text-zinc-900"
              aria-label="Remove filter"
            >
              ×
            </button>
          </div>

          {/* Divider */}
          <div className="h-[24px] w-px bg-zinc-300" />

          {/* Categories Dropdown */}
          <button
            type="button"
            className="flex items-center gap-[8px] px-[16px] h-[40px] rounded-full bg-[#f9f9fb] hover:bg-zinc-200 transition-colors"
          >
            <span
              className="text-[14px] font-medium text-zinc-900"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Categories
            </span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        {products.map((product) => {
          console.log("PRODUCT", product);
          const imageUrl = product?.images?.[0]
            ? imageBuilder
                .image(product.images?.[0])
                .width(600)
                .height(400)
                .url()
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
    </section>
  );
}
