const SKELETON_PROJECTS = Array.from({ length: 16 }, (_, i) => ({
  id: `skeleton-project-${i}`,
}));

export function ProjectsGridSectionSkeleton() {
  return (
    <section className="flex flex-col gap-[40px] w-full">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-[16px]">
        <div className="h-[48px] bg-zinc-200 rounded-md w-[300px] animate-pulse" />
        <div className="h-[28px] bg-zinc-200 rounded-md w-[500px] animate-pulse" />
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-[24px] items-start md:items-center justify-between">
        {/* Search Input Skeleton */}
        <div className="w-full md:w-[566px] h-[48px] rounded-full bg-zinc-200 animate-pulse" />

        {/* Filter & Categories Skeleton */}
        <div className="flex items-center gap-[16px]">
          <div className="w-[120px] h-[40px] rounded-full bg-zinc-200 animate-pulse" />
          <div className="h-[24px] w-px bg-zinc-300" />
          <div className="w-[120px] h-[40px] rounded-full bg-zinc-200 animate-pulse" />
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
        {SKELETON_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-[#f9f9fb] flex flex-col gap-[16px] px-[16px] py-[12px] rounded-[16px] w-full"
          >
            {/* Image Skeleton */}
            <div className="aspect-[282/168] rounded-[16px] bg-zinc-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-[8px]">
              <div className="h-[14px] bg-zinc-200 rounded-md w-3/4 animate-pulse" />
              <div className="h-[14px] bg-zinc-200 rounded-md w-full animate-pulse" />
              <div className="h-[14px] bg-zinc-200 rounded-md w-5/6 animate-pulse" />
            </div>

            {/* Button Skeleton */}
            <div className="h-[40px] rounded-full bg-zinc-200 animate-pulse w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
