import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    step: 1,
    title: "Grain Cleaning",
    description:
      "Raw paddy enters cleaning machines that remove dust, stones, and impurities to prepare grains for processing.",
  },
  {
    step: 2,
    title: "Moisture Testing",
    description:
      "Precision moisture analyzers check water content in grains to ensure proper drying and consistent quality.",
  },
  {
    step: 3,
    title: "Husking & Milling",
    description:
      "Paddy husker removes the outer husk from rice, converting raw paddy into clean, milled grains.",
  },
  {
    step: 4,
    title: "Sorting & Quality Check",
    description:
      "Optical color sorters separate broken, damaged, or discolored grains — ensuring only premium quality passes through.",
  },
  {
    step: 5,
    title: "Storage",
    description:
      "Processed grains are stored in climate-controlled silos and bins, preserving freshness and preventing spoilage.",
  },
  {
    step: 6,
    title: "Packaging",
    description:
      "Automatic bagging machines fill and seal grain bags (5 kg – 75 kg) ready for distribution and sale.",
  },
];

export function ProcessSection() {
  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading
          title="How It Works"
          description="From raw paddy to packaged product — our automated PLC-controlled machines with optical sensors and Japanese precision technology power every step of the grain processing chain."
        />
        <Button
          variant="shiner"
          size="lg"
          asChild
          className="rounded-full shrink-0 hidden md:inline-flex"
        >
          <Link href="/contact">
            <span>Schedule a Demo</span>
            <ArrowUpRight className="size-5" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex flex-col gap-4 rounded-2xl bg-muted p-6"
          >
            <span className="text-sm font-medium text-brand-green">
              Step {item.step}
            </span>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg text-foreground">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="shiner"
        size="lg"
        asChild
        className="rounded-full self-center md:hidden"
      >
        <Link href="/contact">
          <span>Schedule a Demo</span>
          <ArrowUpRight className="size-5" />
        </Link>
      </Button>
    </section>
  );
}
