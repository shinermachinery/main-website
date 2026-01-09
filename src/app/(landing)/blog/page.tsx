import { Search, X } from "lucide-react";
import { Suspense } from "react";
import { BlogsData } from "@/components/blog/blogs-data";
import { BlogsSkeleton } from "@/components/blog/blogs-skeleton";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "@/components/blog/category-filter";

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="font-semibold text-4xl text-foreground mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Our Blogs
            </h1>
            <p
              className="font-normal text-lg text-muted-foreground max-w-2xl"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Insights, updates, and stories from the world of precision
              engineering and industrial machinery.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search blogs"
                  defaultValue={params.q || ""}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-background border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  name="q"
                />
              </div>

              {/* Category Filter Dropdown */}
              {/* todo: */}
              <CategoryFilter />
            </div>

            {/* Active Filters (if any) */}
            {(params.q || params.category) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {params.q && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-full">
                    <span
                      className="font-medium text-sm text-foreground"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      Search: {params.q}
                    </span>
                    <button
                      type="button"
                      className="h-4 w-4 rounded-full bg-primary text-white flex items-center justify-center text-xs hover:bg-brand-blue transition-colors"
                      aria-label="Remove search filter"
                    >
                      ×
                    </button>
                  </div>
                )}
                {params.category && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-full">
                    <span
                      className="font-medium text-sm text-foreground"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {params.category}
                    </span>
                    <Button
                      variant={"ghost"}
                      type="button"
                      aria-label="Remove category filter"
                    >
                      <X className="size-4 text-foreground" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Blog Grid */}
          <Suspense fallback={<BlogsSkeleton />}>
            <BlogsData searchQuery={params.q} category={params.category} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
