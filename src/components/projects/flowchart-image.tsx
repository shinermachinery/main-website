"use client";

import Image from "next/image";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { BLUR_DATA_URL } from "@/lib/image-blur";

interface FlowchartImageProps {
  image: string;
  title: string;
}

export function FlowchartImage({ image, title }: FlowchartImageProps) {
  return (
    <ImageLightbox
      src={image}
      alt={title}
      variant="full"
      className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        width={1200}
        height={1080}
        className="object-contain h-auto"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </ImageLightbox>
  );
}
