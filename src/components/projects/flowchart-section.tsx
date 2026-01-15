import Image from "next/image";
import { getFlowchart } from "@/sanity/lib/actions";

export async function FlowChartSection() {
  const flowchart = await getFlowchart();

  if (!flowchart) {
    return (
      <section className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 font-medium">
          <h2 className="text-4xl font-medium text-primary">
            Flow Chart of Rice Re-Processing Plant
          </h2>
          <p className="text-lg text-muted-foreground">
            Detailed process flow for rice re-processing operations
          </p>
        </div>
        <p className="text-lg text-muted-foreground text-center py-8">
          No flowchart available at this time.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium text-primary">{flowchart.title}</h2>
        {flowchart.description && (
          <p className="text-lg text-muted-foreground">
            {flowchart.description}
          </p>
        )}
      </div>

      {/* Flow Chart Image */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image
          src={flowchart.image}
          alt={flowchart.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
