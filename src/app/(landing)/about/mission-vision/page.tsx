import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Our Mission & Vision | SHINER",
  description:
    "Learn about SHINER's mission to deliver excellence and our vision for the future of food processing technology.",
};

// Dummy data as fallback
const dummyData = {
  pageTitle: "Our Mission & Vision",
  pageSubtitle:
    "Driving excellence in food processing technology and shaping the future of the industry",
  missionTitle: "Our Mission",
  missionStatement:
    "To provide innovative, reliable, and high-quality food processing equipment that empowers our clients to achieve operational excellence. We are committed to delivering solutions that enhance efficiency, ensure food safety, and drive sustainable growth for businesses worldwide.",
  missionImage:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
  visionTitle: "Our Vision",
  visionStatement:
    "To be the global leader in food processing technology, recognized for our unwavering commitment to innovation, quality, and customer success. We envision a future where our cutting-edge solutions set new industry standards and create lasting value for our partners, communities, and the environment.",
  visionImage:
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
};

async function getMissionVisionData() {
  try {
    const data = await client.fetch(
      `*[_type == "missionVision"][0] {
        pageTitle,
        pageSubtitle,
        missionTitle,
        missionStatement,
        missionImage,
        visionTitle,
        visionStatement,
        visionImage
      }`,
    );

    if (!data) {
      return dummyData;
    }

    return {
      pageTitle: data.pageTitle || dummyData.pageTitle,
      pageSubtitle: data.pageSubtitle || dummyData.pageSubtitle,
      missionTitle: data.missionTitle || dummyData.missionTitle,
      missionStatement: data.missionStatement || dummyData.missionStatement,
      missionImage: data.missionImage
        ? urlFor(data.missionImage).url()
        : dummyData.missionImage,
      visionTitle: data.visionTitle || dummyData.visionTitle,
      visionStatement: data.visionStatement || dummyData.visionStatement,
      visionImage: data.visionImage
        ? urlFor(data.visionImage).url()
        : dummyData.visionImage,
    };
  } catch (error) {
    console.error("Error fetching Mission & Vision data:", error);
    return dummyData;
  }
}

async function MissionVisionContent() {
  const data = await getMissionVisionData();

  return (
    <div className="flex flex-col gap-[80px]">
      {/* Page Header */}
      <section className="flex flex-col gap-[16px]">
        <h1
          className="font-medium text-[36px] leading-[48px] tracking-[-0.9px] text-[#18181b]"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {data.pageTitle}
        </h1>
        {data.pageSubtitle && (
          <p
            className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.pageSubtitle}
          </p>
        )}
      </section>

      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row gap-[40px] items-center">
        {/* Mission Image */}
        <div className="flex-1 relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
          <Image
            src={data.missionImage}
            alt={data.missionTitle}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Mission Content */}
        <div className="flex-1 flex flex-col gap-[16px]">
          <h2
            className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#18181b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.missionTitle}
          </h2>
          <p
            className="font-normal text-[16px] leading-[24px] text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.missionStatement}
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col lg:flex-row-reverse gap-[40px] items-center">
        {/* Vision Image */}
        <div className="flex-1 relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
          <Image
            src={data.visionImage}
            alt={data.visionTitle}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Vision Content */}
        <div className="flex-1 flex flex-col gap-[16px]">
          <h2
            className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#18181b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.visionTitle}
          </h2>
          <p
            className="font-normal text-[16px] leading-[24px] text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.visionStatement}
          </p>
        </div>
      </section>
    </div>
  );
}

function MissionVisionSkeleton() {
  return (
    <div className="flex flex-col gap-[80px] animate-pulse">
      <section className="flex flex-col gap-[16px]">
        <div className="h-[48px] bg-zinc-200 rounded-md w-80" />
        <div className="h-[28px] bg-zinc-200 rounded-md w-96" />
      </section>
      {Array.from({ length: 2 }).map((_, i) => (
        <section key={i} className="flex flex-col lg:flex-row gap-[40px]">
          <div className="flex-1 aspect-[4/3] rounded-[24px] bg-zinc-200" />
          <div className="flex-1 flex flex-col gap-[16px]">
            <div className="h-[40px] bg-zinc-200 rounded-md w-48" />
            <div className="h-[24px] bg-zinc-200 rounded-md w-full" />
            <div className="h-[24px] bg-zinc-200 rounded-md w-full" />
            <div className="h-[24px] bg-zinc-200 rounded-md w-5/6" />
          </div>
        </section>
      ))}
    </div>
  );
}

export default function MissionVisionPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        <Suspense fallback={<MissionVisionSkeleton />}>
          <MissionVisionContent />
        </Suspense>
      </div>
    </div>
  );
}
