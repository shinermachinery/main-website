export function BlogPostSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-60 py-20">
      <div className="flex flex-col gap-10 animate-pulse">
        {/* Back Button Skeleton */}
        <div className="flex gap-2 items-center">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-5 w-12 bg-muted rounded" />
        </div>

        {/* Category Badge Skeleton */}
        <div className="h-6 w-24 bg-muted rounded-full" />

        {/* Date and Title Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-5 w-40 bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-12 w-full bg-muted rounded" />
            <div className="h-12 w-3/4 bg-muted rounded" />
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="w-full h-80 bg-muted rounded-2xl" />

        {/* Content Sections Skeleton */}
        <div className="flex flex-col gap-10">
          {/* Section 1 */}
          <div className="flex flex-col gap-4">
            <div className="h-10 w-2/3 bg-muted rounded" />
            <div className="space-y-3">
              <div className="h-7 w-full bg-muted rounded" />
              <div className="h-7 w-full bg-muted rounded" />
              <div className="h-7 w-5/6 bg-muted rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-7 w-full bg-muted rounded" />
              <div className="h-7 w-full bg-muted rounded" />
              <div className="h-7 w-4/5 bg-muted rounded" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-4">
            <div className="h-10 w-3/5 bg-muted rounded" />
            <div className="space-y-3">
              <div className="h-7 w-full bg-muted rounded" />
              <div className="h-7 w-full bg-muted rounded" />
              <div className="h-7 w-5/6 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
