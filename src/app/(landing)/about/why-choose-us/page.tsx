import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Why Choose Us | SHINER",
  description:
    "Discover why leading companies choose SHINER for their food processing equipment needs. Quality, reliability, and exceptional service.",
};

interface Reason {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

// Dummy data as fallback
const dummyData = {
  title: "Why Choose Us",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus",
  heroImage:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&q=80",
  reasons: [
    {
      title: "Quality Assurance",
      description:
        "Our products meet the highest quality standards with rigorous testing and certification processes to ensure reliability and performance.",
      order: 1,
    },
    {
      title: "Expert Team",
      description:
        "Our experienced engineers and technicians provide comprehensive support from installation to maintenance, ensuring your operations run smoothly.",
      order: 2,
    },
    {
      title: "Innovation & Technology",
      description:
        "We leverage cutting-edge technology and continuous innovation to deliver state-of-the-art solutions that meet evolving industry demands.",
      order: 3,
    },
    {
      title: "Customer-Centric Approach",
      description:
        "Your success is our priority. We provide personalized solutions and dedicated support to help you achieve your business goals.",
      order: 4,
    },
    {
      title: "Competitive Pricing",
      description:
        "We offer premium quality equipment at competitive prices, ensuring excellent value for your investment without compromising on quality.",
      order: 5,
    },
    {
      title: "Global Reach",
      description:
        "With distributors worldwide and proven track record across diverse markets, we bring global expertise to your local operations.",
      order: 6,
    },
  ],
};

async function getWhyChooseUsData() {
  try {
    const data = await client.fetch(
      `*[_type == "whyChooseUs"][0] {
        title,
        subtitle,
        heroImage,
        reasons[] {
          title,
          description,
          icon,
          order
        }
      }`,
    );

    if (!data) {
      return dummyData;
    }

    return {
      title: data.title || dummyData.title,
      subtitle: data.subtitle || dummyData.subtitle,
      heroImage: data.heroImage
        ? urlFor(data.heroImage).url()
        : dummyData.heroImage,
      reasons:
        data.reasons && data.reasons.length > 0
          ? data.reasons
              .map(
                (reason: Reason & { icon?: { asset: { _ref: string } } }) => ({
                  title: reason.title,
                  description: reason.description,
                  icon: reason.icon ? urlFor(reason.icon).url() : undefined,
                  order: reason.order || 999,
                }),
              )
              .sort(
                (a: Reason, b: Reason) => (a.order || 999) - (b.order || 999),
              )
          : dummyData.reasons,
    };
  } catch (error) {
    console.error("Error fetching Why Choose Us data:", error);
    return dummyData;
  }
}

async function WhyChooseUsContent() {
  const data = await getWhyChooseUsData();

  return (
    <div className="flex flex-col gap-[80px]">
      {/* Hero Section */}
      <section className="flex flex-col gap-[24px]">
        {/* Header */}
        <div className="flex flex-col gap-[16px]">
          <h1
            className="font-medium text-[36px] leading-[48px] tracking-[-0.9px] text-[#18181b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.title}
          </h1>
          {data.subtitle && (
            <p
              className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#71717a]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Hero Image */}
        {data.heroImage && (
          <div className="relative w-full aspect-[16/6] rounded-[24px] overflow-hidden">
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        )}
      </section>

      {/* Reasons Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
        {data.reasons.map((reason: Reason, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-[16px] p-[24px] rounded-[16px] bg-[#f9f9fb]"
          >
            {reason.icon && (
              <div className="relative w-[64px] h-[64px] rounded-[12px] overflow-hidden">
                <Image
                  src={reason.icon}
                  alt={reason.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}
            <div className="flex flex-col gap-[8px]">
              <h3
                className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#18181b]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {reason.title}
              </h3>
              <p
                className="font-normal text-[14px] leading-[20px] text-[#71717a]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function WhyChooseUsSkeleton() {
  return (
    <div className="flex flex-col gap-[80px] animate-pulse">
      <section className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[16px]">
          <div className="h-[48px] bg-zinc-200 rounded-md w-64" />
          <div className="h-[28px] bg-zinc-200 rounded-md w-96" />
        </div>
        <div className="w-full aspect-[16/6] rounded-[24px] bg-zinc-200" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-[16px] p-[24px] rounded-[16px] bg-[#f9f9fb]"
          >
            <div className="w-[64px] h-[64px] rounded-[12px] bg-zinc-200" />
            <div className="flex flex-col gap-[8px]">
              <div className="h-[28px] bg-zinc-200 rounded-md w-3/4" />
              <div className="h-[20px] bg-zinc-200 rounded-md w-full" />
              <div className="h-[20px] bg-zinc-200 rounded-md w-5/6" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function WhyChooseUsPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        <Suspense fallback={<WhyChooseUsSkeleton />}>
          <WhyChooseUsContent />
        </Suspense>
      </div>
    </div>
  );
}
