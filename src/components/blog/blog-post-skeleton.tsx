export function BlogPostSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-[236px] py-[80px]">
      <div className="flex flex-col gap-[40px] animate-pulse">
        {/* Back Button Skeleton */}
        <div className="flex gap-2 items-center">
          <div className="h-4 w-4 bg-[#e5e5e5] rounded" />
          <div className="h-5 w-12 bg-[#e5e5e5] rounded" />
        </div>

        {/* Category Badge Skeleton */}
        <div className="h-6 w-24 bg-[#e5e5e5] rounded-full" />

        {/* Date and Title Skeleton */}
        <div className="flex flex-col gap-[16px]">
          <div className="h-5 w-40 bg-[#e5e5e5] rounded" />
          <div className="space-y-3">
            <div className="h-12 w-full bg-[#e5e5e5] rounded" />
            <div className="h-12 w-3/4 bg-[#e5e5e5] rounded" />
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="w-full h-[339px] bg-[#e5e5e5] rounded-[16px]" />

        {/* Content Sections Skeleton */}
        <div className="flex flex-col gap-[40px]">
          {/* Section 1 */}
          <div className="flex flex-col gap-4">
            <div className="h-10 w-2/3 bg-[#e5e5e5] rounded" />
            <div className="space-y-3">
              <div className="h-7 w-full bg-[#e5e5e5] rounded" />
              <div className="h-7 w-full bg-[#e5e5e5] rounded" />
              <div className="h-7 w-5/6 bg-[#e5e5e5] rounded" />
            </div>
            <div className="space-y-3">
              <div className="h-7 w-full bg-[#e5e5e5] rounded" />
              <div className="h-7 w-full bg-[#e5e5e5] rounded" />
              <div className="h-7 w-4/5 bg-[#e5e5e5] rounded" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-4">
            <div className="h-10 w-3/5 bg-[#e5e5e5] rounded" />
            <div className="space-y-3">
              <div className="h-7 w-full bg-[#e5e5e5] rounded" />
              <div className="h-7 w-full bg-[#e5e5e5] rounded" />
              <div className="h-7 w-5/6 bg-[#e5e5e5] rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
