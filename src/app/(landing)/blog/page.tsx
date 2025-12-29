import { Search } from "lucide-react";
import { Suspense } from "react";
import { BlogsData } from "@/components/blog/blogs-data";
import { BlogsSkeleton } from "@/components/blog/blogs-skeleton";

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="font-semibold text-[36px] leading-[44px] tracking-[-0.9px] text-[#18181b] mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Our Blogs
            </h1>
            <p
              className="font-normal text-[16px] leading-[24px] text-[#71717a] max-w-2xl"
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#71717a]" />
                <input
                  type="text"
                  placeholder="Search blogs"
                  defaultValue={params.q || ""}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#f9f9fb] border-none text-[#18181b] placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  name="q"
                />
              </div>

              {/* Category Filter Dropdown */}
              <select
                name="category"
                defaultValue={params.category || ""}
                className="h-12 px-4 rounded-xl bg-[#f9f9fb] border-none text-[#18181b] focus:outline-none focus:ring-2 focus:ring-brand-blue"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                <option value="">All Categories</option>
                <option value="machinery">Machinery</option>
                <option value="engineering">Engineering</option>
                <option value="innovation">Innovation</option>
                <option value="industry">Industry News</option>
              </select>
            </div>

            {/* Active Filters (if any) */}
            {(params.q || params.category) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {params.q && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f9f9fb] rounded-full">
                    <span
                      className="font-medium text-[14px] text-[#18181b]"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      Search: {params.q}
                    </span>
                    <button
                      type="button"
                      className="h-4 w-4 rounded-full bg-[#18181b] text-white flex items-center justify-center text-xs hover:bg-brand-blue transition-colors"
                      aria-label="Remove search filter"
                    >
                      ×
                    </button>
                  </div>
                )}
                {params.category && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f9f9fb] rounded-full">
                    <span
                      className="font-medium text-[14px] text-[#18181b]"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {params.category}
                    </span>
                    <button
                      type="button"
                      className="h-4 w-4 rounded-full bg-[#18181b] text-white flex items-center justify-center text-xs hover:bg-brand-blue transition-colors"
                      aria-label="Remove category filter"
                    >
                      ×
                    </button>
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
