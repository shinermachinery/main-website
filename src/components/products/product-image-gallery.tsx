"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import type { SanityImage } from "@/lib/sanity-types";
import { safeImageUrl } from "@/sanity/lib/image";
import { Button } from "../ui/button";

interface ProductImageGalleryProps {
  images: SanityImage[];
  title: string;
}

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle Escape key to close fullscreen
  useEffect(() => {
    if (!isFullscreen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  // Filter to only images with valid Sanity asset refs
  const validImages = images.filter(
    (img) => safeImageUrl(img, 100, 100) !== undefined,
  );

  if (validImages.length === 0) {
    return (
      <div className="flex-1 w-full">
        <div
          className="aspect-4/3 rounded-2xl flex items-center justify-center border border-muted bg-muted"
        >
          <span className="text-muted-foreground text-sm font-light">
            No images available
          </span>
        </div>
      </div>
    );
  }

  const currentImage = validImages[selectedIndex] ?? validImages[0];

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? validImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === validImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-4">
        {/* Main Image with Ultra-thin Navigation */}
        <div className="relative group">
          <div className="rounded-2xl overflow-hidden bg-muted border border-muted/50 shadow-sm max-h-96 flex items-center justify-center">
            <Image
              src={safeImageUrl(currentImage, 600)!}
              alt={currentImage.alt || title}
              width={600}
              height={450}
              className="w-full h-auto max-h-96 object-contain"
              priority={selectedIndex === 0}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>

          {/* Ultra-thin Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <Button
                onClick={handlePrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-md border border-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft
                  className="w-4 h-4 text-muted-foreground"
                  strokeWidth={1}
                />
              </Button>
              <Button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-md border border-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground"
                  strokeWidth={1}
                />
              </Button>
            </>
          )}

          {/* Fullscreen Button */}
          <Button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary/80 backdrop-blur-md border border-muted/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-secondary hover:scale-110"
            aria-label="View fullscreen"
          >
            <Expand className="w-4 h-4 text-muted-foreground" strokeWidth={1} />
          </Button>

          {/* Ultra-thin Image Counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/10 backdrop-blur-md">
              <span className="text-xs font-light text-white">
                {selectedIndex + 1} of {validImages.length}
              </span>
            </div>
          )}
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p className="text-sm font-light text-muted-foreground px-1">
            {currentImage.caption}
          </p>
        )}

        {/* Ultra-thin Thumbnail Navigation */}
        {validImages.length > 1 && (
          <div className="flex gap-2 flex-wrap py-1">
            {validImages.map((image, index) => (
              <Button
                key={image?.asset?._ref}
                onClick={() => setSelectedIndex(index)}
                className={`relative shrink-0 group transition-all duration-300 ${
                  selectedIndex === index
                    ? "scale-105"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <div
                  className={`aspect-4/3 w-20 rounded-xl overflow-hidden border transition-all duration-300 ${
                    selectedIndex === index
                      ? "border-brand-blue shadow-md"
                      : "border-muted hover:border-muted-foreground"
                  }`}
                >
                  <Image
                    src={safeImageUrl(image, 160, 120)!}
                    alt={`${title} thumbnail ${index + 1}`}
                    width={160}
                    height={120}
                    className="w-full h-full object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                {selectedIndex === index && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-blue" />
                )}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
        >
          <button
            type="button"
            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen view"
          />
          <Button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-secondary/20 transition-colors z-10"
            aria-label="Close fullscreen"
          >
            <span className="text-white text-lg font-light">×</span>
          </Button>

          <div className="relative max-w-7xl max-h-[90vh] w-full mx-4 z-10">
            <Image
              src={safeImageUrl(currentImage, 1920)!}
              alt={currentImage.alt || title}
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>

          {/* Fullscreen Navigation */}
          {validImages.length > 1 && (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-secondary/20 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" strokeWidth={1} />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-secondary/20 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" strokeWidth={1} />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
}
