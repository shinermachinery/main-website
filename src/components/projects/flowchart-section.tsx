import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { getFlowchart } from "@/sanity/lib/actions";

export async function FlowChartSection() {
  const flowchart = await getFlowchart();

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium text-primary">
          {flowchart?.title || "Flow Chart of Rice Re-Processing Plant"}
        </h2>
        {(flowchart?.description || !flowchart) && (
          <p className="text-lg text-muted-foreground">
            {flowchart?.description ||
              "Detailed process flow for rice re-processing operations"}
          </p>
        )}
      </div>

      {!flowchart ? (
        <EmptyState
          size="sm"
          message="No flowchart available at this time."
        />
      ) : (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
          <Image
            src={flowchart.image}
            alt={flowchart.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </section>
  );
}
