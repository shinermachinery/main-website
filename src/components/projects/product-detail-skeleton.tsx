export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col gap-[120px] animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="flex gap-[24px] items-start flex-col lg:flex-row">
        {/* Left: Image Gallery Skeleton */}
        <div className="flex-1 w-full flex flex-col gap-[24px]">
          {/* Main Image */}
          <div className="aspect-[282/168] rounded-[16px] bg-zinc-200 w-full" />

          {/* Thumbnails */}
          <div className="flex gap-[24px] w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[38/38] flex-1 bg-zinc-200 rounded-[8px]"
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details Skeleton */}
        <div className="flex-1 flex flex-col gap-[20px] w-full">
          {/* Title */}
          <div className="h-[40px] bg-zinc-200 rounded-md w-3/4" />

          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="h-[20px] bg-zinc-200 rounded-md w-full" />
            <div className="h-[20px] bg-zinc-200 rounded-md w-full" />
            <div className="h-[20px] bg-zinc-200 rounded-md w-5/6" />
          </div>

          {/* Features List Skeleton */}
          <div className="flex flex-col gap-[20px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-[12px] items-center">
                <div className="size-[24px] bg-zinc-200 rounded-full shrink-0" />
                <div className="h-[20px] bg-zinc-200 rounded-md flex-1" />
              </div>
            ))}
          </div>

          {/* Download Button Skeleton */}
          <div className="h-[40px] bg-zinc-200 rounded-full w-full" />
        </div>
      </section>

      {/* Specifications Section Skeleton */}
      <section className="flex flex-col gap-[40px] w-full">
        {/* Header */}
        <div className="flex flex-col gap-[8px]">
          <div className="h-[32px] bg-zinc-200 rounded-md w-64" />
          <div className="h-[28px] bg-zinc-200 rounded-md w-96" />
        </div>

        {/* Specifications Grid */}
        <div className="flex flex-wrap gap-[20px]">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex gap-[12px] items-center w-[567px]">
              <div className="size-[24px] bg-zinc-200 rounded-full shrink-0" />
              <div className="h-[20px] bg-zinc-200 rounded-md flex-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Other Products Section Skeleton */}
      <section className="flex flex-col gap-[40px] w-full">
        {/* Header */}
        <div className="flex gap-[24px] items-center w-full">
          <div className="h-[40px] bg-zinc-200 rounded-md flex-1 max-w-[384px]" />
          <div className="h-[40px] bg-zinc-200 rounded-full w-[180px]" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#f9f9fb] flex flex-col gap-[16px] px-[16px] py-[12px] rounded-[16px] w-full"
            >
              <div className="aspect-[282/168] rounded-[16px] bg-zinc-200" />
              <div className="flex flex-col gap-[8px]">
                <div className="h-[14px] bg-zinc-200 rounded-md w-3/4" />
                <div className="h-[14px] bg-zinc-200 rounded-md w-full" />
                <div className="h-[14px] bg-zinc-200 rounded-md w-5/6" />
              </div>
              <div className="h-[40px] rounded-full bg-zinc-200 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
