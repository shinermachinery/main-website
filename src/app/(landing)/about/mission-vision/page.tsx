import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Our Mission & Vision | SHINER",
  description:
    "Learn about SHINER's mission to deliver excellence and our vision for the future of food processing technology.",
};

interface MissionVisionData {
  pageTitle: string;
  pageSubtitle?: string;
  missionTitle: string;
  missionStatement: string;
  missionImage: string;
  visionTitle: string;
  visionStatement: string;
  visionImage: string;
}

async function getMissionVisionData(): Promise<MissionVisionData | null> {
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
      return null;
    }

    return {
      pageTitle: data.pageTitle || "Our Mission & Vision",
      pageSubtitle: data.pageSubtitle,
      missionTitle: data.missionTitle || "Our Mission",
      missionStatement: data.missionStatement || "",
      missionImage: data.missionImage
        ? urlFor(data.missionImage).url()
        : "/placeholder-mission.jpg",
      visionTitle: data.visionTitle || "Our Vision",
      visionStatement: data.visionStatement || "",
      visionImage: data.visionImage
        ? urlFor(data.visionImage).url()
        : "/placeholder-vision.jpg",
    };
  } catch (error) {
    console.error("Error fetching Mission & Vision data:", error);
    return null;
  }
}

async function MissionVisionContent() {
  const data = await getMissionVisionData();

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      {/* Page Header */}
      <section className="flex flex-col gap-4">
        <h1
          className="font-medium text-[2.25rem] leading-[3rem] tracking-[-0.0563rem] text-foreground"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {data.pageTitle}
        </h1>
        {data.pageSubtitle && (
          <p
            className="font-medium text-[1.25rem] leading-[1.75rem] tracking-[-0.0313rem] text-muted-foreground"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.pageSubtitle}
          </p>
        )}
      </section>

      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Mission Image */}
        <div className="flex-1 relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden">
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
        <div className="flex-1 flex flex-col gap-4">
          <h2
            className="font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.0469rem] text-foreground"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.missionTitle}
          </h2>
          <p
            className="font-normal text-base leading-6 text-muted-foreground"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.missionStatement}
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex flex-col lg:flex-row-reverse gap-10 items-center">
        {/* Vision Image */}
        <div className="flex-1 relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden">
          <Image
            src={data.visionImage}
            alt={data.visionTitle}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Vision Content */}
        <div className="flex-1 flex flex-col gap-4">
          <h2
            className="font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.0469rem] text-foreground"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {data.visionTitle}
          </h2>
          <p
            className="font-normal text-base leading-6 text-muted-foreground"
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
    <div className="flex flex-col gap-20 animate-pulse">
      <section className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-80" />
        <div className="h-7 bg-muted rounded-md w-96" />
      </section>
      {Array.from({ length: 2 }).map((_, i) => (
        <section key={i} className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 aspect-[4/3] rounded-[1.5rem] bg-muted" />
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-10 bg-secondary rounded-md w-48" />
            <div className="h-6 bg-secondary rounded-md w-full" />
            <div className="h-6 bg-secondary rounded-md w-full" />
            <div className="h-6 bg-secondary rounded-md w-5/6" />
          </div>
        </section>
      ))}
    </div>
  );
}

export default function MissionVisionPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <Suspense fallback={<MissionVisionSkeleton />}>
          <MissionVisionContent />
        </Suspense>
      </div>
    </div>
  );
}
