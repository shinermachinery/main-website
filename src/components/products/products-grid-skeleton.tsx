const SKELETON_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: `skeleton-product-${i}`,
}));

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SKELETON_ITEMS.map((item) => (
        <div
          key={item.id}
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
  );
}
