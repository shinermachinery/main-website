import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Container wrapper for consistent width */}
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Gray Background Area */}
          <div className="bg-zinc-400 min-h-screen flex items-end">
            {/* Flex container for Typography Card and Featured Product Card */}
            <div className="w-full flex flex-col lg:flex-row gap-6 items-end justify-between pb-0">
              {/* Typography Card - Left (Less than 50%) */}
              <div className="bg-background rounded-t-[3rem] w-full lg:max-w-[45%] px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-normal tracking-tight mb-4 leading-[1.15] text-primary">
                  Precision Engineered Machinery. Delivered With Confidence.
                </h1>

                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed font-light">
                  Equip your production line with industry-grade machines designed
                  for reliability, efficiency, and precision.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Request a Quote Button - Outline */}
                  <Button
                    variant="outline"
                    size="default"
                    className="h-10 px-5 text-sm font-normal rounded-full"
                  >
                    Request a Quote
                  </Button>

                  {/* View Products Button - Gradient like navbar */}
                  <button
                    className="h-10 px-5 text-sm font-semibold rounded-full bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)] inline-flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  >
                    View Products
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Featured Product Card - Right (Smaller) */}
              <div className="w-full lg:w-[270px]">
                {/* Featured Product Card */}
                <div className="bg-background rounded-[16px] p-3 flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium leading-5 text-primary flex-1">
                      Featured Product
                    </p>
                    <div className="opacity-50 pt-[2px]">
                      <ArrowRight className="w-4 h-4 rotate-180 scale-y-[-1] text-primary" />
                    </div>
                  </div>

                  {/* Product Image Placeholder with Pagination Dots */}
                  <div className="relative">
                    {/* Gray placeholder - will be replaced with actual image */}
                    <div className="w-full h-[160.85px] bg-muted-foreground/30 rounded-[16px]" />

                    {/* Pagination Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-white" />
                      <div className="w-3 h-3 rounded-full bg-white/50" />
                      <div className="w-3 h-3 rounded-full bg-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
