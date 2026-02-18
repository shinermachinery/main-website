import Image from "next/image";
import type { SanityImage } from "@/lib/sanity-types";
import { urlFor } from "@/sanity/lib/image";

interface ProductSingleImageProps {
  image?: SanityImage;
  title: string;
}

export function ProductSingleImage({ image, title }: ProductSingleImageProps) {
  if (!image?.asset?._ref) {
    return (
      <div className="w-full">
        <div className="aspect-4/3 rounded-2xl bg-muted flex items-center justify-center border border-muted/50">
          <span className="text-muted-foreground text-sm font-light">
            No image available
          </span>
        </div>
      </div>
    );
  }

  const imageUrl = urlFor(image).width(1200).height(900).url();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="aspect-4/3 rounded-2xl overflow-hidden bg-muted border border-muted/50 shadow-sm">
        <Image
          src={imageUrl}
          alt={image.alt || title}
          width={1200}
          height={900}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {image.caption && (
        <p className="text-sm font-light text-muted-foreground px-1">
          {image.caption}
        </p>
      )}
    </div>
  );
}
