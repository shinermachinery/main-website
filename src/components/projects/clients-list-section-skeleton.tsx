const SKELETON_COLUMNS = [
  {
    id: "col-1",
    items: ["client-1", "client-2", "client-3"],
    hasHighlight: false,
  },
  {
    id: "col-2",
    items: ["client-4", "client-5", "client-6"],
    hasHighlight: false,
  },
  { id: "col-3", items: ["client-7", "client-8"], hasHighlight: true },
];

export function ClientsListSectionSkeleton() {
  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-96 animate-pulse" />
        <div className="h-7 bg-muted rounded-md w-lg animate-pulse" />
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKELETON_COLUMNS.map((column) => (
          <div key={column.id} className="flex flex-col gap-6">
            {column.items.map((id) => (
              <div
                key={id}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-muted animate-pulse"
              >
                {/* Company Name Skeleton */}
                <div className="h-7 bg-muted-foreground/20 rounded-md w-3/4" />

                {/* Projects List Skeleton */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded-full" />
                    <div className="h-5 bg-muted-foreground/20 rounded-md flex-1" />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded-full" />
                    <div className="h-5 bg-muted-foreground/20 rounded-md flex-1 w-5/6" />
                  </div>
                </div>
              </div>
            ))}
            {/* Highlight Card in last column */}
            {column.hasHighlight && (
              <div className="flex flex-col items-start justify-center p-5 rounded-2xl h-40 bg-muted animate-pulse">
                <div className="h-7 bg-muted-foreground/20 rounded-md w-3/4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
