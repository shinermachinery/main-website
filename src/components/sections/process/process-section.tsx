import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: 1,
    title: "Consultation",
    description: "Align requirements & goals",
  },
  {
    step: 2,
    title: "Custom Configuration",
    description: "Tailored machine design",
  },
  {
    step: 3,
    title: "Installation & Training",
    description: "Ready-to-operate, supported",
  },
];

export function ProcessSection() {
  return (
    <section className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-2xl text-foreground">How It Works</h2>
        <Button variant="shiner" size="lg" asChild className="rounded-full">
          <Link href="/contact">
            <span>Schedule a Demo</span>
            <ArrowUpRight className="size-5" />
          </Link>
        </Button>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex flex-col gap-4 rounded-2xl bg-muted p-6"
          >
            <span className="text-sm font-medium text-brand-green">
              Step {item.step}
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-lg text-foreground">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
