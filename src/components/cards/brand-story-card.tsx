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
    <div className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] h-[30.11rem] relative rounded-[1.5rem] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[1.5rem]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-[1.5rem]"
          sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
        />
      </div>

      {/* Overlay with backdrop blur */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundColor: "rgba(24, 24, 27, 0.1)",
          backdropFilter: "blur(2.8rem)",
          WebkitBackdropFilter: "blur(2.8rem)",
        }}
      />

      {/* Text Content at Bottom - Positioned at 397px from top */}
      <div className="absolute left-6 top-[24.81rem] flex flex-col gap-1">
        <p className="font-medium text-lg text-white">
          {name}
        </p>
        <p className="font-normal text-sm leading-5 text-white">{role}</p>
      </div>
    </div>
  );
}
