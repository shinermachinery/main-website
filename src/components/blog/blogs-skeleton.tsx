// Generate stable unique IDs for skeleton items
const SKELETON_IDS = Array.from(
  { length: 6 },
  (_, i) => `skeleton-${i}-${Date.now()}`,
);

export function BlogsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SKELETON_IDS.map((id) => (
        <div key={id} className="bg-muted rounded-2xl p-4 animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full aspect-282/168 rounded-xl bg-muted mb-4" />

          {/* Content Skeleton */}
          <div className="flex flex-col gap-2">
            {/* Title Skeleton */}
            <div className="h-7 bg-muted rounded-md w-full" />
            <div className="h-7 bg-muted rounded-md w-3/4" />

            {/* Description Skeleton */}
            <div className="h-5 bg-muted rounded-md w-full mt-1" />
            <div className="h-5 bg-muted rounded-md w-5/6" />

            {/* Meta Info Skeleton */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-4 bg-muted rounded-md w-16" />
              <div className="h-4 bg-muted rounded-md w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
