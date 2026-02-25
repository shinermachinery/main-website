"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { useEffect, useState } from "react";

interface ImageCarouselCardProps {
  images: string[];
  title: string;
  showTitle?: boolean;
}

export function ImageCarouselCard({
  images,
  title,
  showTitle = false,
}: ImageCarouselCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="flex flex-col">
      <div className="h-80 rounded-3xl overflow-hidden relative group">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={
            hasMultiple
              ? [Autoplay({ delay: 5000, stopOnInteraction: false })]
              : []
          }
          className="h-full"
        >
          <CarouselContent className="h-full ml-0">
            {images.map((image, i) => (
              <CarouselItem key={image} className="h-full pl-0">
                <div className="relative h-80">
                  <Image
                    src={image}
                    alt={`${title} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots indicator */}
        {hasMultiple && (
          <div className="absolute top-3 right-3 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={`dot-${title}-${i}`}
                type="button"
                onClick={() => api?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Title Below Image */}
      {showTitle && (
        <p className="text-lg font-medium text-foreground mt-3 px-1">{title}</p>
      )}
    </div>
  );
}
