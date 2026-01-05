import { Linkedin, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { PortableText } from "@/components/global/blog/portable-text";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "About Our Director | SHINER",
  description:
    "Meet the leadership behind SHINER. Learn about our director's vision, expertise, and commitment to excellence.",
};

// Dummy data as fallback
const dummyData = {
  pageTitle: "About Our Director",
  pageSubtitle:
    "Meet the visionary leader driving SHINER's commitment to excellence and innovation",
  name: "John Doe",
  title: "Managing Director & CEO",
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop&q=80",
  bio: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "With over 25 years of experience in the food processing industry, John Doe has been instrumental in shaping SHINER into a global leader in manufacturing excellence. His vision and strategic leadership have driven the company's expansion across international markets while maintaining an unwavering commitment to quality and innovation.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Under his guidance, SHINER has achieved numerous milestones, including the development of cutting-edge optical sorting technology and the establishment of strategic partnerships with leading food processing companies worldwide. His dedication to customer success and operational excellence has earned SHINER recognition as a trusted partner in the industry.",
        },
      ],
    },
  ],
  achievements: [
    "Led company growth from regional to global presence",
    "Pioneered innovative optical sorting technology",
    "Established partnerships with Fortune 500 companies",
    "Implemented sustainable manufacturing practices",
    "Recipient of Industry Innovation Award 2023",
  ],
  email: "director@shiner.com",
  phone: "+1 234 567 8900",
  linkedin: "https://linkedin.com/in/johndoe",
};

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

      {/* Director Profile */}
      <section className="flex flex-col lg:flex-row gap-[60px]">
        {/* Left: Photo & Contact */}
        <div className="lg:w-[400px] flex flex-col gap-[32px]">
          {/* Photo */}
          <div className="relative w-full aspect-square rounded-[24px] overflow-hidden">
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
          <div className="flex flex-col gap-[8px]">
            <h2
              className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#18181b]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {data.name}
            </h2>
            <p
              className="font-medium text-[16px] leading-[24px] text-[#71717a]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {data.title}
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-[16px]">
            {data.email && (
              <Link
                href={`mailto:${data.email}`}
                className="flex items-center gap-[12px] text-[#71717a] hover:text-brand-blue transition-colors"
              >
                <Mail className="size-[20px]" />
                <span
                  className="font-normal text-[14px] leading-[20px]"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  {data.email}
                </span>
              </Link>
            )}
            {data.phone && (
              <Link
                href={`tel:${data.phone}`}
                className="flex items-center gap-[12px] text-[#71717a] hover:text-brand-blue transition-colors"
              >
                <Phone className="size-[20px]" />
                <span
                  className="font-normal text-[14px] leading-[20px]"
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
                className="flex items-center gap-[12px] text-[#71717a] hover:text-brand-blue transition-colors"
              >
                <Linkedin className="size-[20px]" />
                <span
                  className="font-normal text-[14px] leading-[20px]"
                  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  LinkedIn Profile
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Right: Biography & Achievements */}
        <div className="flex-1 flex flex-col gap-[40px]">
          {/* Biography */}
          <div className="flex flex-col gap-[16px]">
            <h3
              className="font-medium text-[24px] leading-[32px] tracking-[-0.6px] text-[#18181b]"
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
            <div className="flex flex-col gap-[16px]">
              <h3
                className="font-medium text-[24px] leading-[32px] tracking-[-0.6px] text-[#18181b]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Key Achievements
              </h3>
              <ul className="flex flex-col gap-[12px]">
                {data.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex gap-[12px] items-start">
                    <div className="w-[6px] h-[6px] rounded-full bg-brand-blue mt-[7px] shrink-0" />
                    <p
                      className="font-normal text-[16px] leading-[24px] text-[#71717a]"
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
    <div className="flex flex-col gap-[80px] animate-pulse">
      <section className="flex flex-col gap-[16px]">
        <div className="h-[48px] bg-zinc-200 rounded-md w-80" />
        <div className="h-[28px] bg-zinc-200 rounded-md w-96" />
      </section>
      <section className="flex flex-col lg:flex-row gap-[60px]">
        <div className="lg:w-[400px] flex flex-col gap-[32px]">
          <div className="aspect-square rounded-[24px] bg-zinc-200" />
          <div className="flex flex-col gap-[8px]">
            <div className="h-[40px] bg-zinc-200 rounded-md w-48" />
            <div className="h-[24px] bg-zinc-200 rounded-md w-64" />
          </div>
          <div className="flex flex-col gap-[16px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[20px] bg-zinc-200 rounded-md w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[16px]">
            <div className="h-[32px] bg-zinc-200 rounded-md w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[24px] bg-zinc-200 rounded-md w-full" />
            ))}
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="h-[32px] bg-zinc-200 rounded-md w-48" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-[24px] bg-zinc-200 rounded-md w-full" />
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
      <div className="container mx-auto px-6 py-24">
        <Suspense fallback={<DirectorSkeleton />}>
          <DirectorContent />
        </Suspense>
      </div>
    </div>
  );
}
