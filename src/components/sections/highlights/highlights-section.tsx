import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

const sizeBreakdown = [
  { label: "Small", count: "300+", dots: 10 },
  { label: "Medium", count: "100+", dots: 8 },
  { label: "Large", count: "100+", dots: 7 },
  { label: "Huge", count: "100+", dots: 5 },
];

export function HighlightsSection() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
         
            {/* Left Card */}
            <div className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="size-5 text-brand-green" />
                <Link
                  href="/about"
                  className="text-sm font-medium text-brand-green inline-flex items-center gap-1 hover:underline"
                >
                  Explore
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Delivering precision-engineered machinery across industries.{" "}
                <span className="font-semibold text-foreground">
                  Trusted by food processing plants
                </span>{" "}
                for quality equipment.{" "}
                <span className="font-semibold text-foreground">
                  Reliable service and pellentesque support.
                </span>
              </p>
            </div>

            {/* Middle Card - Stats */}
            <div className="bg-background border border-border rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <p className="text-3xl font-semibold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">
                  Companies served
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {sizeBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-xs text-muted-foreground w-14 shrink-0">
                      {item.label}
                    </span>
                    <div className="flex-1 flex items-center gap-1">
                      {Array.from({ length: item.dots }).map((_, i) => (
                        <div
                          key={`${item.label}-${i}`}
                          className="size-2.5 rounded-full bg-brand-green"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card - Green gradient */}
            <div className="bg-linear-to-br from-brand-blue to-brand-green rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="size-5 text-white/80" />
                <Link
                  href="/products"
                  className="text-sm font-medium text-white inline-flex items-center gap-1 hover:underline"
                >
                  Explore
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <p className="text-sm text-white/80">
                Industry-grade solutions built for scale.{" "}
                <span className="font-semibold text-white">
                  Turpis bibendum
                </span>{" "}
                eget adipiscing{" "}
                <span className="font-semibold text-white">
                  scelerisque proin.
                </span>{" "}
                Neque tincidunt et pellentesque proin.
              </p>
            </div>
          
    </section>
  );
}
