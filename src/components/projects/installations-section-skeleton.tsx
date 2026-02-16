const SKELETON_IDS = Array.from(
  { length: 6 },
  (_, i) => `installation-skeleton-${i}`,
);

export function InstallationsSectionSkeleton() {
  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-96 animate-pulse" />
        <div className="h-7 bg-muted rounded-md w-[31.25rem] animate-pulse" />
      </div>

      {/* Grid - First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SKELETON_IDS.slice(0, 3).map((id) => (
          <div key={id} className="flex flex-col gap-6">
            {/* Image Skeleton */}
            <div className="h-[30rem] w-full rounded-2xl bg-muted animate-pulse" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-4">
              {/* Badge Skeleton */}
              <div className="h-6 w-32 bg-muted rounded-full animate-pulse" />

              {/* Title and Location Skeleton */}
              <div className="flex flex-col gap-1">
                <div className="h-7 bg-muted rounded-md w-3/4 animate-pulse" />
                <div className="h-5 bg-muted rounded-md w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {SKELETON_IDS.slice(3, 6).map((id) => (
          <div key={id} className="flex flex-col gap-6">
            {/* Image Skeleton */}
            <div className="h-[30rem] w-full rounded-2xl bg-muted animate-pulse" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-4">
              {/* Badge Skeleton */}
              <div className="h-6 w-32 bg-muted rounded-full animate-pulse" />

              {/* Title and Location Skeleton */}
              <div className="flex flex-col gap-1">
                <div className="h-7 bg-muted rounded-md w-3/4 animate-pulse" />
                <div className="h-5 bg-muted rounded-md w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
