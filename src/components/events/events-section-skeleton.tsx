const SKELETON_IDS = ["event-1", "event-2", "event-3", "event-4"];

export function EventsSectionSkeleton() {
  return (
    <section className="flex flex-col gap-10 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-10 bg-muted rounded-md w-72" />
        <div className="h-6 bg-muted rounded-md w-96 max-w-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {SKELETON_IDS.map((id) => (
          <div key={id} className="h-96 rounded-3xl bg-muted" />
        ))}
      </div>
    </section>
  );
}
