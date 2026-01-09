import { Button } from "@/components/ui/button";
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

export const metadata: Metadata = {
  title: "About Us - Shiner Machinery",
  description:
    "Shiner Machinery designs and delivers precision-engineered machines that empower manufacturers to build faster, smarter, and more efficiently.",
};

export default function AboutPage() {
  return (
    <div className="bg-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-6">
          {/* Left: Text Content */}
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="text-[2.5rem] font-medium leading-[3rem] tracking-[-0.0563rem] text-foreground md:text-[1.875rem]">
              Engineering Excellence for Modern Manufacturing
            </h1>
            <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-muted-foreground md:text-lg">
              Shiner Machinery designs and delivers precision-engineered
              machines that empower manufacturers to build faster, smarter, and
              more efficiently.
            </p>
          </div>

          {/* Right: Image Placeholder */}
          <div className="h-[15rem] w-full flex-1 rounded-2xl bg-muted md:h-[20rem] md:w-[35.375rem]" />
        </div>
      </section>

      {/* Who We Are & Mission Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Column: Who We Are + Mission */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Who We Are Card */}
            <div className="flex flex-1 flex-col gap-10 rounded-2xl bg-brand-green-10 p-6">
              <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-brand-green">
                Who We Are
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                  Built on Precision. Driven by Performance.
                </p>
                <p className="text-sm leading-5 text-muted-foreground">
                  Shiner Machinery is a global provider of industrial
                  fabrication machinery, specializing in high-performance
                  solutions for window, door, and glass production lines. With a
                  focus on reliability, automation, and long-term value, we
                  support manufacturers at every stage — from consultation to
                  installation and beyond.
                </p>
              </div>
            </div>

            {/* Our Mission Card */}
            <div className="flex flex-1 flex-col justify-between gap-10 rounded-2xl bg-brand-blue-10 p-6">
              <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem]">
                Our Mission
              </p>
              <p className="text-[1.5rem] font-medium leading-8 tracking-[-0.0375rem] text-foreground">
                To enable manufacturers worldwide with reliable, efficient, and
                future-ready machinery.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Precision Engineering */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2">
                <Settings className="size-6 text-foreground" />
                <p className="bg-clip-text font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem] text-foreground">
                  Precision Engineering
                </p>
              </div>
              <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                Every machine is built for accuracy and consistency.
              </p>
            </div>

            {/* Customer-First Support */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2">
                <div
                  className="size-6 relative"
                  style={{
                    background:
                      "linear-gradient(to right, var(--brand-blue), var(--brand-green))",
                  }}
                >
                  <Headset
                    className="size-6 absolute inset-0"
                    style={{
                      stroke: "url(#headset-gradient)",
                      fill: "none",
                    }}
                  />
                  <svg className="absolute w-0 h-0" aria-hidden="true">
                    <defs>
                      <linearGradient
                        id="headset-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="var(--brand-blue)" />
                        <stop offset="100%" stopColor="var(--brand-green)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem]">
                  Customer-First Support
                </p>
              </div>
              <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                Long-term partnerships over one-time sales.
              </p>
            </div>

            {/* Innovation-Driven */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-6 text-foreground" />
                <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem]">
                  Innovation-Driven
                </p>
              </div>
              <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                Continuous improvement in automation and design.
              </p>
            </div>

            {/* Global Standards */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2">
                <Globe className="size-6 text-foreground" />
                <p className="bg-linear-to-r from-brand-blue to-brand-green bg-clip-text text-transparent font-medium text-[1.25rem] leading-6 tracking-[-0.0313rem]">
                  Global Standards
                </p>
              </div>
              <p className="text-[1.25rem] font-medium leading-6 tracking-[-0.0313rem] text-foreground">
                Built to perform across markets and climates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom 4 Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {/* Industry-tested components */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-background p-6">
            <Building2 className="size-6 text-foreground" />
            <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-foreground">
              Industry-tested components
            </p>
          </div>

          {/* Scalable production solutions */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-background p-6">
            <TrendingUp className="size-6 text-foreground" />
            <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-foreground">
              Scalable production solutions
            </p>
          </div>

          {/* Dedicated after-sales support */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-background p-6">
            <Phone className="size-6 text-foreground" />
            <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-foreground">
              Dedicated after-sales support
            </p>
          </div>

          {/* Proven results worldwide */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-background p-6">
            <Award className="size-6 text-foreground" />
            <p className="text-[1.25rem] font-medium leading-[1.75rem] tracking-[-0.0313rem] text-foreground">
              Proven results worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-[75rem] px-6 py-16">
        {/* Section Header */}
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl bg-background p-4"
            >
              {/* Product Image */}
              <div className="relative aspect-282/168 w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-5 text-foreground">
                  {product.name}
                </p>
                <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* CTA Button */}
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

// Temporary product data (can be replaced with CMS data later)
const products = [
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
