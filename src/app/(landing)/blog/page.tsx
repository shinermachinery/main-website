import { Suspense } from "react";
import { BlogsData } from "@/components/blog/blogs-data";
import { BlogsSkeleton } from "@/components/blog/blogs-skeleton";
import { SearchFilterBar } from "@/components/shared/search-filter-bar";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/site-config";
import { client } from "@/sanity/lib/client";

export const metadata = pageMetadata.blog;

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
    <div className="min-h-screen bg-secondary max-w-7xl mx-auto px-4 py-16 md:py-12">
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
  );
}
