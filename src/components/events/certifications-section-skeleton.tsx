const SKELETON_IDS = ["cert-1", "cert-2", "cert-3"];

export function CertificationsSectionSkeleton() {
  return (
    <section className="flex flex-col gap-10 w-full lg:flex-row lg:items-start animate-pulse">
      {/* Left: Heading Skeleton */}
      <div className="shrink-0 lg:w-1/2">
        <div className="h-8 bg-muted rounded-md w-72 max-w-full" />
        <div className="h-8 bg-muted rounded-md w-48 mt-2" />
      </div>

      {/* Right: Certifications List Skeleton */}
      <div className="flex flex-col gap-10 flex-1">
        {SKELETON_IDS.map((id) => (
          <div key={id} className="flex gap-6 items-center">
            {/* Icon Skeleton */}
            <div className="w-10 h-10 bg-muted rounded-full shrink-0" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-6 bg-muted rounded-md w-3/4" />
              <div className="h-4 bg-muted rounded-md w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
