import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProductCollections } from "@/actions/products";
import { ProductsData } from "@/components/products/products-data";
import { ProductsGridSkeleton } from "@/components/products/products-grid-skeleton";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Our Projects | SHINER",
  description:
    "Explore our comprehensive range of products and projects. High-quality machinery and equipment for food processing plants.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProductsPageProps) {
  const [params, collections] = await Promise.all([
    searchParams,
    getAllProductCollections(),
  ]);

  const categoryOptions = collections.map((c) => ({
    label: c.title,
    value: c.slug.current,
  }));

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="font-medium text-4xl leading-10 tracking-[-0.0563rem] text-foreground mb-4"
            >
              Our Products
            </h1>
            <p
              className="font-medium text-lg leading-6 tracking-[-0.0313rem] text-muted-foreground"
            
            >
              Explore our comprehensive range of products and projects.
              High-quality machinery and equipment for food processing plants.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <SearchFilterBar
            basePath="/products"
            searchPlaceholder="Search products..."
            categoryPlaceholder="All Categories"
            categories={categoryOptions}
            currentSearch={params.q}
            currentCategory={params.category}
          />

          {/* Products Grid */}
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsData searchQuery={params.q} category={params.category} />
          </Suspense>
          <SanityLive />
        </div>
      </div>
    </div>
  );
}
