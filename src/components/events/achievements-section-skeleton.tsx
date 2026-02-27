const SKELETON_IDS = ["achieve-1", "achieve-2", "achieve-3"];

export function AchievementsSectionSkeleton() {
  return (
    <section className="flex flex-col gap-10 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 bg-muted rounded-md w-56" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {SKELETON_IDS.map((id) => (
          <div
            key={id}
            className="bg-background rounded-2xl p-4 flex flex-col gap-4"
          >
            {/* Image Skeleton */}
            <div className="w-full aspect-square rounded-2xl bg-muted" />

            {/* Info Skeleton */}
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-muted rounded-md w-1/2" />
              <div className="h-6 bg-muted rounded-md w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
