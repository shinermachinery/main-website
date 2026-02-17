import { Suspense } from "react";
import { getAllProductCollections } from "@/actions/products";
import { ProductsData } from "@/components/products/products-data";
import { ProductsGridSkeleton } from "@/components/products/products-grid-skeleton";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/site-config";

export const metadata = pageMetadata.products;

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
          <SectionHeading
            as="h1"
            title="Our Products"
            description="Explore our comprehensive range of products and projects. High-quality machinery and equipment for food processing plants."
            className="mb-12"
          />

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
        </div>
      </div>
    </div>
  );
}
