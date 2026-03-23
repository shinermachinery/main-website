import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import type { SanityImage } from "@/lib/sanity-types";
import { safeImageUrl } from "@/sanity/lib/image";

interface ProductSingleImageProps {
  image?: SanityImage;
  title: string;
}

export function ProductSingleImage({ image, title }: ProductSingleImageProps) {
  const imageUrl = safeImageUrl(image, 1200);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="rounded-2xl overflow-hidden bg-muted border border-muted/50 shadow-sm max-h-96 flex items-center justify-center">
        <Image
          src={imageUrl || "/shiner-logo.png"}
          alt={image?.alt || title}
          width={600}
          height={450}
          className={`w-full h-auto max-h-96 ${imageUrl ? "object-contain" : "object-contain p-12 opacity-60"}`}
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      {image?.caption && (
        <p className="text-sm font-light text-muted-foreground px-1">
          {image.caption}
        </p>
      )}
    </div>
  );
}
