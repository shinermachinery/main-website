import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroFeaturedProduct } from "./hero-featured-product";

interface FeaturedProduct {
  _id: string;
  title: string;
  slug: string | { current: string; _type?: string };
  primaryImage?: {
    url: string;
    alt?: string;
  };
}

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
  featuredProducts?: FeaturedProduct[];
}

export function HeroSection({
  headline = "Precision Engineered Machinery. Delivered With Confidence.",
  description = "Equip your production line with industry-grade machines designed for reliability, efficiency, and precision.",
  primaryCta = { text: "Request a Quote", link: "/contact" },
  secondaryCta = { text: "View Products", link: "/products" },
  backgroundImage,
  featuredProducts = [],
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden" aria-label="Hero section">
      {/* Container wrapper for consistent width */}
      <div className="container mx-auto px-4">
          {/* Gray Background Area */}
          <div
            className="bg-zinc-400 min-h-[calc(100vh-5rem)] flex items-end rounded-3xl"
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
            <div className="w-full flex flex-col lg:flex-row gap-6 items-end justify-between pb-0 relative">
              {/* Typography Card - Left (Less than 50%) */}
              <div className="bg-background rounded-t-4xl w-full lg:max-w-[40%] px-6 lg:px-8 py-12 lg:py-16 rounded-bl-xl">
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
                    className="h-10 px-5 text-sm font-semibold rounded-full bg-linear-to-r from-brand-blue to-brand-green text-white shadow-[inset_0rem_0.25rem_1.806rem_0rem_rgba(244,244,245,0.2)] inline-flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  >
                    {secondaryCta.text}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Featured Product Card - Right (floating above bottom) */}
              {featuredProducts.length > 0 && (
                <div className="w-full lg:w-64 absolute bottom-3 right-6 hidden sm:block">
                  <HeroFeaturedProduct products={featuredProducts} />
                </div>
              )}
            </div>
          </div>
      </div>
    </section>
  );
}
