export function ProductsSkeleton() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mb-4" />
            <div className="h-6 w-96 bg-muted animate-pulse rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 space-y-4">
                <div className="aspect-square bg-muted animate-pulse rounded-xl" />
                <div className="h-7 w-3/4 bg-muted animate-pulse rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-6 w-24 bg-muted animate-pulse rounded-lg" />
                <div className="h-12 w-full bg-muted animate-pulse rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
