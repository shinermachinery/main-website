const LOGO_ROWS = [
  { id: "row-1", logos: Array.from({ length: 9 }, (_, i) => `logo-${i}`) },
  { id: "row-2", logos: Array.from({ length: 9 }, (_, i) => `logo-${i + 9}`) },
  { id: "row-3", logos: Array.from({ length: 9 }, (_, i) => `logo-${i + 18}`) },
];

export function OtherClientsSectionSkeleton() {
  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-64 animate-pulse" />
        <div className="h-7 bg-muted rounded-md w-[31.25rem] animate-pulse" />
      </div>

      {/* Logo Grid */}
      <div className="flex flex-col gap-10">
        {LOGO_ROWS.map((row) => (
          <div
            key={row.id}
            className="flex gap-10 items-center justify-center flex-wrap"
          >
            {row.logos.map((logoId) => (
              <div
                key={logoId}
                className="w-[7.5rem] h-[7.5rem] rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
