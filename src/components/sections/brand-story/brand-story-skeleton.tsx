export function BrandStorySkeleton() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
            <div className="flex-1">
              <div className="h-10 bg-muted rounded w-48 animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-7 bg-muted rounded w-full animate-pulse" />
              <div className="h-7 bg-muted rounded w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-6 min-w-max md:min-w-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-60 h-96 bg-muted rounded-3xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
