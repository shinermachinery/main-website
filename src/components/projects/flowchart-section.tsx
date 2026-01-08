import Image from "next/image";

export function FlowChartSection() {
  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium text-primary">
          Flow Chart of Rice Re-Processing Plant
        </h2>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* Flow Chart Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
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
