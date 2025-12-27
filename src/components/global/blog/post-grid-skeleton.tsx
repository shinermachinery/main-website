/**
 * Post Grid Skeleton Component
 * Loading placeholder for PostGrid
 * Matches the grid layout structure
 */

export interface PostGridSkeletonProps {
  count?: number;
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3;
    desktop?: 2 | 3 | 4;
  };
}

export function PostGridSkeleton({
  count = 6,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
}: PostGridSkeletonProps) {
  // Build grid classes based on column configuration
  const gridClasses = `grid gap-6 md:gap-8 
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}`;

  return (
    <div className={gridClasses} role="status" aria-label="Loading blog posts">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-card overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="aspect-video bg-muted" />

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Categories */}
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded-full w-20" />
              <div className="h-6 bg-muted rounded-full w-24" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-7 bg-muted rounded w-full" />
              <div className="h-7 bg-muted rounded w-2/3" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-4/5" />
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-4 bg-muted rounded w-2" />
              <div className="h-4 bg-muted rounded w-32" />
            </div>

            {/* Read More */}
            <div className="h-5 bg-muted rounded w-24" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading blog posts...</span>
    </div>
  );
}
