"use client";

import Image from "next/image";

interface BrandStoryCardProps {
  name: string;
  role: string;
  imageUrl: string;
  imageAlt: string;
}

export function BrandStoryCard({
  name,
  role,
  imageUrl,
  imageAlt,
}: BrandStoryCardProps) {
  return (
    <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[30.11rem] relative rounded-[1.5rem] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[1.5rem]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-[1.5rem]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Overlay with backdrop blur */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: "rgba(24, 24, 27, 0.1)",
          backdropFilter: "blur(44.8px)",
          WebkitBackdropFilter: "blur(44.8px)",
        }}
      />

      {/* Text Content at Bottom - Positioned at 397px from top */}
      <div className="absolute left-6 top-[24.81rem] flex flex-col gap-1">
        <p
          className="font-medium text-[1.25rem] leading-7 tracking-[-0.0313rem] text-white"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {name}
        </p>
        <p
          className="font-normal text-sm leading-5 text-white"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}
