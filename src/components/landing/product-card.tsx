"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  onViewDetails?: () => void;
}

export function ProductCard({
  title,
  description,
  imageUrl,
  imageAlt,
  onViewDetails,
}: ProductCardProps) {
  return (
    <div className="bg-[#f9f9fb] flex flex-col gap-4 items-center justify-center px-4 py-3 rounded-2xl">
      {/* Product Image */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "282/168" }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 items-start w-full">
        <p className="text-sm font-medium leading-5 text-[#18181b] w-full">
          {title}
        </p>
        {description && (
          <p className="text-sm font-medium leading-5 text-[#71717a] w-full line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={onViewDetails}
        className="flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-full w-full relative overflow-hidden"
        style={{
          background:
            "linear-gradient(88.66deg, var(--brand-blue) 27.51%, var(--brand-green) 115.04%)",
        }}
      >
        <span className="text-sm font-medium leading-5 text-[#fafafa] relative z-10">
          View Details
        </span>
        <ArrowRight className="h-4 w-4 text-[#fafafa] relative z-10" />

        {/* Inner shadow overlay */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)]" />
      </button>
    </div>
  );
}
