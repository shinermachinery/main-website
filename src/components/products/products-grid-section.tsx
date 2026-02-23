"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/sections/products/product-card";
import type { Category, Product } from "@/lib/sanity-types";
import { imageBuilder } from "@/sanity/lib/image";
import { Button } from "../ui/button";
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
        <h1 className="font-medium text-4xl text-foreground">
          Our Products
        </h1>
        <p className="font-medium text-lg text-muted-foreground">
          Explore our complete range of precision-engineered machinery and
          equipment built for performance and durability.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full ">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-12 px-6 rounded-full bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {/* Filter & Categories */}
        <div className="flex items-center gap-4">
          {/* Active Filter Chip */}
          <div className="flex items-center gap-2 px-4 h-10 rounded-full bg-background">
            <span className="text-sm font-medium text-foreground">
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
          <div className="h-6 w-px bg-foreground" />

          {/* Categories Dropdown */}
          <Select>
            <SelectTrigger className="w-full h-10 rounded-full border-muted">
              <SelectValue
                placeholder="Categories"
                className="text-sm font-medium text-foreground"
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category.slug.current}
                  className="text-sm"
                >
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              category={product.collection?.title}
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
