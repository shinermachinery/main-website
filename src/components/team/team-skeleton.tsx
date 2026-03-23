export function TeamSkeleton() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="h-10 w-64 bg-muted animate-pulse rounded-lg mb-4 mx-auto" />
            <div className="h-6 w-96 bg-muted animate-pulse rounded-lg mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="aspect-square bg-muted animate-pulse rounded-2xl mx-auto max-w-72" />
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-lg mx-auto" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded mx-auto" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-muted animate-pulse rounded" />
                  <div className="h-3 w-5/6 bg-muted animate-pulse rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
