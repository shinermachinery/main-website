const LOGO_ROWS = [
  { id: "row-1", logos: Array.from({ length: 9 }, (_, i) => `logo-${i}`) },
  { id: "row-2", logos: Array.from({ length: 9 }, (_, i) => `logo-${i + 9}`) },
];

export function OtherClientsSkeleton() {
  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-64 animate-pulse" />
        <div className="h-7 bg-muted rounded-md w-lg animate-pulse" />
      </div>

      <div className="flex flex-col gap-6">
        {LOGO_ROWS.map((row) => (
          <div
            key={row.id}
            className="flex gap-6 items-center justify-center flex-wrap"
          >
            {row.logos.map((logoId) => (
              <div
                key={logoId}
                className="size-28 rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
