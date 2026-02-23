"use client";

import Image from "next/image";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { BLUR_DATA_URL } from "@/lib/image-blur";

interface AchievementCardProps {
  image: string;
  awardGiver: string;
  awardName: string;
}

export function AchievementCard({
  image,
  awardGiver,
  awardName,
}: AchievementCardProps) {
  return (
    <div className="bg-background rounded-2xl p-4 flex flex-col gap-4">
      {/* Award Image */}
      <ImageLightbox
        src={image}
        alt={awardName}
        className="relative w-full aspect-square rounded-2xl overflow-hidden"
      >
        <Image
          src={image}
          alt={awardName}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </ImageLightbox>

      {/* Award Info */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground line-clamp-1">
          {awardGiver}
        </p>
        <p className="text-lg font-medium text-foreground">{awardName}</p>
      </div>
    </div>
  );
}
