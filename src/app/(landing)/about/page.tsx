import { PortableText } from "@portabletext/react";
import {
  ArrowUpRight,
  Building2,
  ChartLine,
  Globe,
  Headset,
  Medal,
  PhoneCall,
  Settings,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAboutPage } from "@/actions/about";
import { ProductCard } from "@/components/sections/products/product-card";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site-config";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { urlFor } from "@/sanity/lib/image";
import { getFeaturedProducts } from "@/sanity/lib/actions";

export const metadata = pageMetadata.about;

// Icon mapping for CMS icon names
const iconMap: Record<string, React.ElementType> = {
  settings: Settings,
  headset: Headset,
  sparkles: Sparkles,
  globe: Globe,
  building: Building2,
  trending: ChartLine,
  phone: PhoneCall,
  award: Medal,
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


export default async function AboutPage() {
  const [aboutData, featuredProducts] = await Promise.all([
    getAboutPage(),
    getFeaturedProducts(4),
  ]);

  const heroTitle =
    aboutData?.heroTitle || "Engineering Excellence for Modern Manufacturing";
  const heroDescription = aboutData?.heroDescription;
  const missionTitle = aboutData?.mission?.title || "Our Mission";
  const missionDescription = aboutData?.mission?.description;
  const features = aboutData?.features?.length
    ? aboutData.features
    : fallbackFeatures;
  const bottomFeatures = aboutData?.bottomFeatures?.length
    ? aboutData.bottomFeatures
    : fallbackBottomFeatures;
  const visionTitle = aboutData?.vision?.title || "Our Vision";
  const visionDescription = aboutData?.vision?.description;
  const mainImage = aboutData?.mainImage?.asset
    ? urlFor(aboutData.mainImage).width(600).height(400).url()
    : null;
  const mainImageAlt = aboutData?.mainImage?.alt || "About Shiner";

  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-6">
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="text-3xl font-medium text-foreground md:text-2xl">
              {heroTitle}
            </h1>
            {heroDescription && (
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <PortableText value={heroDescription} />
              </div>
            )}
          </div>
          <div className="h-60 w-full flex-1 overflow-hidden rounded-2xl bg-muted md:h-80 md:w-xl">
            {mainImage && (
              <Image
                src={mainImage}
                alt={mainImageAlt}
                width={600}
                height={400}
                className="h-full w-full object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            )}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="w-full grid grid-cols-1 gap-6">
          <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-1 flex-col justify-start gap-4 rounded-2xl bg-brand-blue-10 p-6">
              <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-lg">
                {missionTitle}
              </p>
              {missionDescription && (
                <div className="prose prose-sm max-w-none text-foreground">
                  <PortableText value={missionDescription} />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 rounded-2xl bg-brand-green-10 p-6">
              <p className="text-lg font-medium text-brand-green">
                {visionTitle}
              </p>
              {visionDescription && (
                <div className="prose prose-sm max-w-none text-foreground">
                  <PortableText value={visionDescription} />
                </div>
              )}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon || ""] || Settings;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col gap-3 rounded-2xl bg-background p-6"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-6 text-brand-blue" />
                    <p className="font-medium text-lg bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                      {feature.title}
                    </p>
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Feature Cards */}
        {/* <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {bottomFeatures.map((feature) => {
            const Icon = iconMap[feature.icon || ""] || Building2;
            return (
              <div
                key={feature.title}
                className="flex flex-col justify-end gap-10 rounded-2xl bg-background p-6"
              >
                <Icon className="size-6 text-foreground" />
                <p className="text-lg font-medium text-foreground">
                  {feature.title}
                </p>
              </div>
            );
          })}
        </div> */}
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
      <section className="container mx-auto px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-foreground">
            Featured Products
          </h2>
          <Button variant="shiner" size="lg" asChild className="rounded-full">
            <Link href="/products">
              <span>Explore Products</span>
              <ArrowUpRight className="size-5" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              category={product.collection?.title}
              imageUrl={product.primaryImage}
              imageAlt={product.title}
              href={`/products/${product.slug}`}
            />
          ))}
        </div>
      </section>
      )}
    </div>
  );
}
