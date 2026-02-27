"use client";

import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-blur";

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
    <div className="w-full sm:w-1/2 lg:w-1/4 h-96 relative rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 rounded-3xl">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-3xl"
          sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
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
      <div className="absolute left-6 bottom-6 flex flex-col gap-1">
        <p className="font-medium text-lg text-white">{name}</p>
        <p className="font-normal text-sm text-white">{role}</p>
      </div>
    </div>
  );
}
