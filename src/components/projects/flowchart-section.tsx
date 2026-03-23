import { SectionHeading } from "@/components/ui/section-heading";
import { getFlowchart } from "@/sanity/lib/actions";
import { FlowchartImage } from "./flowchart-image";

export async function FlowChartSection() {
  const flowchart = await getFlowchart();

  if (!flowchart) return null;

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <SectionHeading
        title={flowchart.title}
        description={flowchart.description}
      />

      <FlowchartImage image={flowchart.image} title={flowchart.title} />
    </section>
  );
}
