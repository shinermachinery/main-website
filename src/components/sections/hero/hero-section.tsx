import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  headline?: string;
  description?: string;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  backgroundImage?: string;
}

export function HeroSection({
  headline = "Precision Engineered Machinery. Delivered With Confidence.",
  description = "Equip your production line with industry-grade machines designed for reliability, efficiency, and precision.",
  primaryCta = { text: "Request a Quote", link: "/contact" },
  secondaryCta = { text: "View Products", link: "/products" },
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden" aria-label="Hero section">
      {/* Container wrapper for consistent width */}
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Gray Background Area */}
          <div
            className="bg-zinc-400 min-h-screen flex items-end"
            style={
              backgroundImage
                ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            {/* Flex container for Typography Card and Featured Product Card */}
            <div className="w-full flex flex-col lg:flex-row gap-6 items-end justify-between pb-0">
              {/* Typography Card - Left (Less than 50%) */}
              <div className="bg-background rounded-t-4xl w-full lg:max-w-[45%] px-6 lg:px-8 py-12 lg:py-16">
                {/* Main Heading */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-4 text-primary">
                  {headline}
                </h1>

                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground mb-6 font-light">
                  {description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Primary CTA Button - Outline */}
                  <Button
                    variant="outline"
                    size="default"
                    className="h-10 px-5 text-sm font-normal rounded-full"
                    asChild
                  >
                    <Link href={primaryCta.link}>{primaryCta.text}</Link>
                  </Button>

                  {/* Secondary CTA Button - Gradient */}
                  <Link
                    href={secondaryCta.link}
                    className="h-10 px-5 text-sm font-semibold rounded-full bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-[inset_0rem_0.25rem_1.806rem_0rem_rgba(244,244,245,0.2)] inline-flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  >
                    {secondaryCta.text}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Featured Product Card - Right (Smaller) */}
              <div className="w-full lg:w-64">
                {/* Featured Product Card */}
                <div className="bg-background rounded-2xl p-3 flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-primary flex-1">
                      Featured Product
                    </p>
                    <div className="opacity-50 pt-0.5">
                      <ArrowRight className="w-4 h-4 rotate-180 scale-y-[-1] text-primary" />
                    </div>
                  </div>

                  {/* Product Image Placeholder with Pagination Dots */}
                  <div className="relative">
                    {/* Gray placeholder - will be replaced with actual image */}
                    <div className="w-full h-40 bg-muted-foreground/30 rounded-2xl" />

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
