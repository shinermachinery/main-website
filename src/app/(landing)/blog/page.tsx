import { Suspense } from "react";
import { BlogsData } from "@/components/blog/blogs-data";
import { BlogsSkeleton } from "@/components/blog/blogs-skeleton";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { client } from "@/sanity/lib/client";

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

interface SanityCategory {
  title: string;
  slug: { current: string };
}

async function getBlogCategories() {
  try {
    const categories = await client.fetch<SanityCategory[]>(
      `*[_type == "category"] | order(title asc) { title, "slug": slug }`,
    );
    return categories ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [params, categories] = await Promise.all([
    searchParams,
    getBlogCategories(),
  ]);

  const categoryOptions = categories.map((c) => ({
    label: c.title,
    value: c.slug.current,
  }));

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="font-semibold text-4xl text-foreground mb-4"
            >
              Our Blogs
            </h1>
            <p
              className="font-normal text-lg text-muted-foreground max-w-2xl"
            >
              Insights, updates, and stories from the world of precision
              engineering and industrial machinery.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchFilterBar
            basePath="/blog"
            searchPlaceholder="Search blogs"
            categoryPlaceholder="All Categories"
            categories={categoryOptions}
            currentSearch={params.q}
            currentCategory={params.category}
          />

          {/* Blog Grid */}
          <Suspense fallback={<BlogsSkeleton />}>
            <BlogsData searchQuery={params.q} category={params.category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
