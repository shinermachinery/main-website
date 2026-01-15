/**
 * Product Grid Skeleton Component
 * Loading placeholder for ProductGrid
 * Matches the grid layout structure
 */

export interface ProductGridSkeletonProps {
  count?: number;
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3;
    desktop?: 3 | 4;
  };
}

export function ProductGridSkeleton({
  count = 6,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
}: ProductGridSkeletonProps) {
  // Build grid classes based on column configuration
  const gridClasses = `grid gap-6 md:gap-8 
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}`;

  return (
    <div className={gridClasses} role="status" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-card overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="aspect-square bg-muted" />

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-7 bg-muted rounded w-3/4" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>

            {/* Price */}
            <div className="h-6 bg-muted rounded w-1/3" />

            {/* Features */}
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-4/5" />
              <div className="h-3 bg-muted rounded w-5/6" />
            </div>

            {/* Button */}
            <div className="h-10 bg-muted rounded" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading products...</span>
    </div>
  );
}
