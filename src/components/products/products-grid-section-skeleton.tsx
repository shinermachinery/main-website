const SKELETON_PROJECTS = Array.from({ length: 16 }, (_, i) => ({
  id: `skeleton-project-${i}`,
}));

export function ProductsGridSectionSkeleton() {
  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-72 animate-pulse" />
        <div className="h-7 bg-muted rounded-md w-lg animate-pulse" />
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        {/* Search Input Skeleton */}
        <div className="w-full md:w-xl h-12 rounded-full bg-muted animate-pulse" />

        {/* Filter & Categories Skeleton */}
        <div className="flex items-center gap-4">
          <div className="w-28 h-10 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-px bg-muted" />
          <div className="w-28 h-10 rounded-full bg-muted animate-pulse" />
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SKELETON_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-muted flex flex-col gap-4 px-4 py-3 rounded-2xl w-full"
          >
            {/* Image Skeleton */}
            <div className="aspect-282/168 rounded-2xl bg-muted animate-pulse" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-2">
              <div className="h-3.5 bg-muted rounded-md w-3/4 animate-pulse" />
              <div className="h-3.5 bg-muted rounded-md w-full animate-pulse" />
              <div className="h-3.5 bg-muted rounded-md w-5/6 animate-pulse" />
            </div>

            {/* Button Skeleton */}
            <div className="h-10 rounded-full bg-muted animate-pulse w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
