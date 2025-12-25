import {
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-6">
          {/* Left: Text Content */}
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="text-4xl font-medium leading-[48px] tracking-[-0.9px] text-gray-900 md:text-[36px]">
              Engineering Excellence for Modern Manufacturing
            </h1>
            <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-500 md:text-[20px]">
              Shiner Machinery designs and delivers precision-engineered
              machines that empower manufacturers to build faster, smarter, and
              more efficiently.
            </p>
          </div>

          {/* Right: Image Placeholder */}
          <div className="h-[240px] w-full flex-1 rounded-2xl bg-gray-100 md:h-[337px] md:w-[566px]" />
        </div>
      </section>

      {/* Who We Are & Mission Section */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left Column: Who We Are + Mission */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Who We Are Card */}
            <div className="flex flex-1 flex-col gap-10 rounded-2xl bg-brand-green-10 p-6">
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-brand-green">
                Who We Are
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                  Built on Precision. Driven by Performance.
                </p>
                <p className="text-sm leading-5 text-gray-500">
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
            <div className="flex flex-1 flex-col justify-end gap-10 rounded-2xl bg-brand-blue-10 p-6">
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-brand-blue">
                Our Mission
              </p>
              <p className="text-2xl font-medium leading-8 tracking-[-0.6px] text-gray-900">
                To enable manufacturers worldwide with reliable, efficient, and
                future-ready machinery.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Precision Engineering */}
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2">
                <Settings className="size-6 text-gray-900" />
                <p className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-xl font-medium leading-[28px] tracking-[-0.5px] text-transparent">
                  Precision Engineering
                </p>
              </div>
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Every machine is built for accuracy and consistency.
              </p>
            </div>

            {/* Customer-First Support */}
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2">
                <Headset className="size-6 text-gray-900" />
                <p className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-xl font-medium leading-[28px] tracking-[-0.5px] text-transparent">
                  Customer-First Support
                </p>
              </div>
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Long-term partnerships over one-time sales.
              </p>
            </div>

            {/* Innovation-Driven */}
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-6 text-gray-900" />
                <p className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-xl font-medium leading-[28px] tracking-[-0.5px] text-transparent">
                  Innovation-Driven
                </p>
              </div>
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Continuous improvement in automation and design.
              </p>
            </div>

            {/* Global Standards */}
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2">
                <Globe className="size-6 text-gray-900" />
                <p className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-xl font-medium leading-[28px] tracking-[-0.5px] text-transparent">
                  Global Standards
                </p>
              </div>
              <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
                Built to perform across markets and climates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom 4 Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {/* Industry-tested components */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-gray-50 p-6">
            <Building2 className="size-6 text-gray-900" />
            <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
              Industry-tested components
            </p>
          </div>

          {/* Scalable production solutions */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-gray-50 p-6">
            <TrendingUp className="size-6 text-gray-900" />
            <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
              Scalable production solutions
            </p>
          </div>

          {/* Dedicated after-sales support */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-gray-50 p-6">
            <Phone className="size-6 text-gray-900" />
            <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
              Dedicated after-sales support
            </p>
          </div>

          {/* Proven results worldwide */}
          <div className="flex flex-col justify-end gap-10 rounded-2xl bg-gray-50 p-6">
            <Award className="size-6 text-gray-900" />
            <p className="text-xl font-medium leading-[28px] tracking-[-0.5px] text-gray-900">
              Proven results worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Section Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-medium leading-10 tracking-[-0.75px] text-gray-900">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-green/10 px-4 py-2 shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.4)]"
          >
            <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-sm font-medium leading-5 text-transparent">
              Explore Products
            </span>
            <svg
              className="size-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66675 15.3333L15.3334 4.66663M15.3334 4.66663H4.66675M15.3334 4.66663V15.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-2xl bg-gray-50 p-4"
            >
              {/* Product Image */}
              <div className="relative aspect-[282/168] w-full overflow-hidden rounded-2xl bg-gray-200">
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
                <p className="text-sm font-medium leading-5 text-gray-900">
                  {product.name}
                </p>
                <p className="line-clamp-2 text-sm leading-5 text-gray-500">
                  {product.description}
                </p>
              </div>

              {/* CTA Button */}
              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-green shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)]">
                <span className="text-sm font-medium leading-5 text-white">
                  View Details
                </span>
                <svg
                  className="size-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33325 8H12.6666M12.6666 8L8.66659 4M12.6666 8L8.66659 12"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
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
