import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllCategories, getAllProducts } from "@/actions/products";
import { ProductsGridSection } from "@/components/products/products-grid-section";
import { ProductsGridSectionSkeleton } from "@/components/products/products-grid-section-skeleton";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Our Projects | SHINER",
  description:
    "Explore our comprehensive range of products and projects. High-quality machinery and equipment for food processing plants.",
};

export default async function ProjectsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-24">
        <Suspense fallback={<ProductsGridSectionSkeleton />}>
          <ProductsGridSection products={products} categories={categories} />
          <SanityLive />
        </Suspense>
      </div>
    </div>
  );
}
