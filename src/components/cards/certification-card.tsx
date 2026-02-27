"use client";

import Image from "next/image";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import WheatIcon from "@/icons/wheat-icon";

interface CertificationCardProps {
  title: string;
  description: string;
  image?: string;
}

export function CertificationCard({
  title,
  description,
  image,
}: CertificationCardProps) {
  return (
    <div className="bg-background rounded-2xl p-4 flex flex-col gap-4 w-72 shrink-0">
      {/* Certificate Image */}
      {image ? (
        <ImageLightbox
          src={image}
          alt={title}
          className="relative w-full aspect-square rounded-2xl overflow-hidden"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </ImageLightbox>
      ) : (
        <div className="w-full aspect-square rounded-2xl bg-muted flex items-center justify-center">
          <WheatIcon />
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium text-foreground line-clamp-2">
          {title}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
