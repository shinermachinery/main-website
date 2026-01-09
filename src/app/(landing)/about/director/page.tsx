import { Linkedin, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortableText } from "@/components/global/blog/portable-text";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { directorData } from "@/data/fallback/about-pages";

export const metadata: Metadata = {
  title: "About Our Director | SHINER",
  description:
    "Meet the leadership behind SHINER. Learn about our director's vision, expertise, and commitment to excellence.",
};

// Dummy data as fallback
const dummyData = directorData;

async function getDirectorData() {
  try {
    const data = await client.fetch(
      `*[_type == "director"][0] {
        pageTitle,
        pageSubtitle,
        name,
        title,
        image,
        bio,
        achievements,
        email,
        phone,
        linkedin
      }`,
    );

    if (!data) {
      return dummyData;
    }

    return {
      pageTitle: data.pageTitle || dummyData.pageTitle,
      pageSubtitle: data.pageSubtitle || dummyData.pageSubtitle,
      name: data.name || dummyData.name,
      title: data.title || dummyData.title,
      image: data.image ? urlFor(data.image).url() : dummyData.image,
      bio: data.bio || dummyData.bio,
      achievements:
        data.achievements && data.achievements.length > 0
          ? data.achievements
          : dummyData.achievements,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
    };
  } catch (error) {
    console.error("Error fetching Director data:", error);
    return dummyData;
  }
}

async function DirectorContent() {
  const data = await getDirectorData();

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

      {/* Director Profile */}
      <section className="flex flex-col lg:flex-row gap-[3.75rem]">
        {/* Left: Photo & Contact */}
        <div className="lg:w-[25rem] flex flex-col gap-8">
          {/* Photo */}
          <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
            />
          </div>

          {/* Name & Title */}
          <div className="flex flex-col gap-2">
            <h2
              className="font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.0469rem] text-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {data.name}
            </h2>
            <p
              className="font-medium text-base leading-6 text-muted-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {data.title}
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-4">
            {data.email && (
              <Link
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <Mail className="size-5" />
                <span
                  className="font-normal text-sm leading-5"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {data.email}
                </span>
              </Link>
            )}
            {data.phone && (
              <Link
                href={`tel:${data.phone}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <Phone className="size-5" />
                <span
                  className="font-normal text-sm leading-5"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {data.phone}
                </span>
              </Link>
            )}
            {data.linkedin && (
              <Link
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors"
              >
                <Linkedin className="size-5" />
                <span
                  className="font-normal text-sm leading-5"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  LinkedIn Profile
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Right: Biography & Achievements */}
        <div className="flex-1 flex flex-col gap-10">
          {/* Biography */}
          <div className="flex flex-col gap-4">
            <h3
              className="font-medium text-[1.5rem] leading-8 tracking-[-0.0375rem] text-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Biography
            </h3>
            <div
              className="prose prose-lg max-w-none"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              <PortableText value={data.bio} />
            </div>
          </div>

          {/* Key Achievements */}
          {data.achievements && data.achievements.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3
                className="font-medium text-[1.5rem] leading-8 tracking-[-0.0375rem] text-foreground"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Key Achievements
              </h3>
              <ul className="flex flex-col gap-3">
                {data.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="w-[0.375rem] h-[0.375rem] rounded-full bg-brand-blue mt-[0.438rem] shrink-0" />
                    <p
                      className="font-normal text-base leading-6 text-muted-foreground"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {achievement}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DirectorSkeleton() {
  return (
    <div className="flex flex-col gap-20 animate-pulse">
      <section className="flex flex-col gap-4">
        <div className="h-12 bg-muted rounded-md w-80" />
        <div className="h-7 bg-muted rounded-md w-96" />
      </section>
      <section className="flex flex-col lg:flex-row gap-[3.75rem]">
        <div className="lg:w-[25rem] flex flex-col gap-8">
          <div className="aspect-square rounded-[1.5rem] bg-muted" />
          <div className="flex flex-col gap-2">
            <div className="h-10 bg-secondary rounded-md w-48" />
            <div className="h-6 bg-secondary rounded-md w-64" />
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-5 bg-secondary rounded-md w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-secondary rounded-md w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 bg-secondary rounded-md w-full" />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-8 bg-secondary rounded-md w-48" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 bg-secondary rounded-md w-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DirectorPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <Suspense fallback={<DirectorSkeleton />}>
          <DirectorContent />
        </Suspense>
      </div>
    </div>
  );
}
