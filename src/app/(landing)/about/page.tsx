import {
  ArrowRight,
  Award,
  Building2,
  Globe,
  Headset,
  Phone,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAboutPage } from "@/actions/about";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "About Us - Shiner Machinery",
  description:
    "Shiner Machinery designs and delivers precision-engineered machines that empower manufacturers to build faster, smarter, and more efficiently.",
};

// Icon mapping for CMS icon names
const iconMap: Record<string, React.ElementType> = {
  settings: Settings,
  headset: Headset,
  sparkles: Sparkles,
  globe: Globe,
  building: Building2,
  trending: TrendingUp,
  phone: Phone,
  award: Award,
};

// Fallback data when CMS is empty
const fallbackFeatures = [
  {
    icon: "settings",
    title: "Precision Engineering",
    description: "Every machine is built for accuracy and consistency.",
  },
  {
    icon: "headset",
    title: "Customer-First Support",
    description: "Long-term partnerships over one-time sales.",
  },
  {
    icon: "sparkles",
    title: "Innovation-Driven",
    description: "Continuous improvement in automation and design.",
  },
  {
    icon: "globe",
    title: "Global Standards",
    description: "Built to perform across markets and climates.",
  },
];

const fallbackBottomFeatures = [
  { icon: "building", title: "Industry-tested components" },
  { icon: "trending", title: "Scalable production solutions" },
  { icon: "phone", title: "Dedicated after-sales support" },
  { icon: "award", title: "Proven results worldwide" },
];

const fallbackProducts = [
  {
    id: 1,
    name: "Vernier Caliper Mitutoyo (Japan)",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee67274f4b58?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Shiner Lab Polisher",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus",
    image:
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Shiner Weighing Scale 0.01g",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus",
    image:
      "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "KETT PQ-520",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
  },
];

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  const heroTitle =
    aboutData?.heroTitle || "Engineering Excellence for Modern Manufacturing";
  const heroDescription =
    aboutData?.heroDescription ||
    "Shiner Machinery designs and delivers precision-engineered machines that empower manufacturers to build faster, smarter, and more efficiently.";
  const whoWeAreTitle = aboutData?.whoWeAre?.title || "Who We Are";
  const whoWeAreText =
    "Shiner Machinery is a global provider of industrial fabrication machinery, specializing in high-performance solutions for window, door, and glass production lines. With a focus on reliability, automation, and long-term value, we support manufacturers at every stage — from consultation to installation and beyond.";
  const missionTitle = aboutData?.mission?.title || "Our Mission";
  const missionText =
    aboutData?.mission?.description ||
    "To enable manufacturers worldwide with reliable, efficient, and future-ready machinery.";
  const features = aboutData?.features?.length
    ? aboutData.features
    : fallbackFeatures;
  const bottomFeatures = aboutData?.bottomFeatures?.length
    ? aboutData.bottomFeatures
    : fallbackBottomFeatures;
  const whoWeAreImage = aboutData?.whoWeAre?.image?.asset
    ? urlFor(aboutData.whoWeAre.image).width(600).height(400).url()
    : null;

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="text-[2.5rem] font-medium leading-[3rem] tracking-[-0.0563rem] text-foreground md:text-[1.875rem]">
              {heroTitle}
            </h1>
            <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-muted-foreground md:text-lg">
              {heroDescription}
            </p>
          </div>
          <div className="h-[15rem] w-full flex-1 overflow-hidden rounded-2xl bg-muted md:h-[20rem] md:w-[35.375rem]">
            {whoWeAreImage && (
              <Image
                src={whoWeAreImage}
                alt={aboutData?.whoWeAre?.image?.alt || "About Shiner"}
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Who We Are & Mission Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-1 flex-col gap-10 rounded-2xl bg-brand-green-10 p-6">
              <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-brand-green">
                {whoWeAreTitle}
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                  Built on Precision. Driven by Performance.
                </p>
                <p className="text-sm leading-5 text-muted-foreground">
                  {whoWeAreText}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-10 rounded-2xl bg-brand-blue-10 p-6">
              <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem]">
                {missionTitle}
              </p>
              <p className="text-[1.5rem] font-medium leading-8 tracking-[-0.0375rem] text-foreground">
                {missionText}
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="flex flex-1 flex-col gap-6">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon || ""] || Settings;
              const useGradient = index > 0;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col gap-3 rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={`size-6 ${useGradient ? "text-brand-blue" : "text-foreground"}`}
                    />
                    <p
                      className={`font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem] ${useGradient ? "bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent" : "text-foreground"}`}
                    >
                      {feature.title}
                    </p>
                  </div>
                  <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {bottomFeatures.map((feature) => {
            const Icon = iconMap[feature.icon || ""] || Building2;
            return (
              <div
                key={feature.title}
                className="flex flex-col justify-end gap-10 rounded-2xl bg-background p-6"
              >
                <Icon className="size-6 text-foreground" />
                <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-foreground">
                  {feature.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-[75rem] px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[1.875rem] font-medium leading-10 tracking-[-0.0469rem] text-foreground">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="flex h-10 items-center gap-2 rounded-full bg-linear-to-r from-brand-blue/10 to-brand-green/10 px-4 py-2 shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.4)]"
          >
            <span className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-sm leading-5">
              Explore Products
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fallbackProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl bg-background p-4"
            >
              <div className="relative aspect-282/168 w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-5 text-foreground">
                  {product.name}
                </p>
                <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <Button className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-blue to-brand-green shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)]">
                <span className="text-sm font-medium leading-5 text-white">
                  View Details
                </span>
                <ArrowRight className="size-4 text-white" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
