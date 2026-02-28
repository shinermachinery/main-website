"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { BLUR_DATA_URL } from "@/lib/image-blur";

interface ProductCardProps {
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  onViewDetails?: () => void;
}

export function ProductCard({
  title,
  description,
  category,
  imageUrl,
  imageAlt,
  href,
  onViewDetails,
}: ProductCardProps) {
  const cardContent = (
    <div className="bg-background flex flex-col px-4 py-3 rounded-2xl hover:shadow-lg transition-shadow h-full">
      {/* Product Image */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-muted flex items-center justify-center h-48">
        <Image
          src={imageUrl || "/shiner-logo.png"}
          alt={imageAlt || title}
          width={600}
          height={400}
          className={`w-full h-full ${imageUrl ? "object-contain" : "object-contain p-6 opacity-60"}`}
          sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      {/* Category Badge */}
      <div className="flex items-center w-full mt-4 min-h-6">
        {category && <GradientBadge>{category}</GradientBadge>}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 items-start w-full mt-2 flex-1">
        <p className="text-sm font-medium text-foreground w-full line-clamp-1">{title}</p>
        <p className="text-sm font-medium text-muted-foreground w-full line-clamp-2">
          {description || "\u00A0"}
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={href ? undefined : onViewDetails}
        className="flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-full w-full relative overflow-hidden cursor-pointer mt-4"
        style={{
          background:
            "linear-gradient(88.66deg, var(--brand-blue) 27.51%, var(--brand-green) 115.04%)",
        }}
      >
        <span className="text-sm font-medium text-white relative z-10">
          View Detail
        </span>
        <ArrowRight className="h-4 w-4 text-white relative z-10" />

        {/* Inner shadow overlay */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0rem_0.25rem_1.806rem_0rem_rgba(244,244,245,0.2)]" />
      </Button>
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
