import Image from "next/image";

export function FlowChartSection() {
  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium leading-[48px] text-zinc-900 tracking-[-0.9px]">
          Flow Chart of Rice Re-Processing Plant
        </h2>
        <p className="text-xl leading-7 text-zinc-500 tracking-[-0.5px]">
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* Flow Chart Image */}
      <div className="relative w-full aspect-[1024/723]">
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
          alt="Flow Chart of Rice Re-Processing Plant"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
