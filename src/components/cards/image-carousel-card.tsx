"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const hasMultiple = images.length > 1;
  const cardRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [hasMultiple, nextImage]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`h-96 rounded-3xl overflow-hidden relative group transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Images */}
      {images.map((image, i) => (
        <Image
          key={image}
          src={image}
          alt={`${title} - ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={i === 0}
        />
      ))}

      {/* Title Overlay */}
      {showTitle && (
        <div className="absolute inset-x-5 bottom-2">
          <div className="bg-muted rounded-2xl p-3">
            <p className="text-lg font-medium text-foreground">{title}</p>
          </div>
        </div>
      )}

      {/* Dots indicator */}
      {hasMultiple && (
        <div className="absolute top-3 right-3 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={`dot-${title}-${i}`}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? "w-4 bg-white"
                  : "w-1.5 bg-white/50"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
