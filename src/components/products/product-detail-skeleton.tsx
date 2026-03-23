export function ProductDetailSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery Skeleton */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {/* Main Image */}
          <div className="aspect-[4/3] rounded-2xl bg-muted border border-border" />

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto py-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] w-20 rounded-xl bg-muted border border-border shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info & Download Skeleton */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Header */}
          <div className="space-y-3">
            {/* Collection Badge */}
            <div className="h-6 w-32 bg-muted rounded-full" />
            {/* Title */}
            <div className="h-10 bg-muted rounded-lg w-3/4" />
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-border mt-2 shrink-0" />
                <div className="h-4 bg-muted rounded flex-1" />
              </div>
            ))}
          </div>

          {/* Download Button */}
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded-2xl w-full" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 bg-muted rounded-xl" />
              <div className="h-10 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section Skeleton */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="h-7 bg-muted rounded w-64" />
          <div className="h-4 bg-muted rounded w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-3 rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded bg-muted shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-muted rounded w-20" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section Skeleton */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-7 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-20" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border overflow-hidden"
            >
              <div className="aspect-[4/3] bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
