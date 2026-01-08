"use client"
import type { Category, Product } from "@/lib/sanity-types";
import { ProductCard } from "../landing/product-card";
import { imageBuilder } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    <section className="flex flex-col gap-y-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-y-4">
        <h1
          className="font-medium text-4xl leading-10 tracking-[-0.9px] text-primary"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          Our Products
        </h1>
        <p
          className="font-medium text-lg leading-6 tracking-[-0.5px] text-muted-foreground"
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
            className="w-full h-12 px-6 rounded-full bg-background text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          />
        </div>

        {/* Filter & Categories */}
        <div className="flex items-center gap-[16px]">
          {/* Active Filter Chip */}
          <div className="flex items-center gap-2 px-4 h-10 rounded-full bg-background">
            <span
              className="text-sm font-medium text-primary"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Machinery
            </span>
            <Button
            variant={"ghost"}
              type="button"
              className="text-muted-foreground hover:text-primary px-0"
              aria-label="Remove filter"
            >
              <X className="size-4" />
            </Button>
          </div>
    
          {/* Divider */}
          <div className="h-6 w-px bg-primary" />

          {/* Categories Dropdown */}
          <Select>
            <SelectTrigger className="w-[180px] h-10 rounded-full border-zinc-200">
              <SelectValue
                placeholder="Categories"
                className="text-[14px] font-medium text-zinc-900"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category.slug.current}
                  className="text-[14px]"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
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
