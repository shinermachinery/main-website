"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const mainImage = images[selectedImage] || images[0];
  const thumbnails = images.slice(0, 5);

  return (
    <div className="flex flex-col gap-[24px] w-full">
      {/* Main Image */}
      <div className="relative aspect-[282/168] rounded-[16px] overflow-hidden w-full">
        <Image
          src={mainImage}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-[24px] w-full">
        {thumbnails.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`aspect-[38/38] flex-1 rounded-[8px] overflow-hidden transition-all ${
              selectedImage === index
                ? "ring-2 ring-brand-blue"
                : "bg-[#f9f9fb] hover:opacity-75"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${alt} - thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
          </button>
        ))}
        {/* Fill empty slots if less than 5 images */}
        {Array.from({ length: Math.max(0, 5 - thumbnails.length) }).map(
          (_, index) => (
            <div
              key={`empty-${index}`}
              className="aspect-[38/38] flex-1 bg-[#f9f9fb] rounded-[8px]"
            />
          ),
        )}
      </div>
    </div>
  );
}
