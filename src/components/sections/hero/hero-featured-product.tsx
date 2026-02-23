"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BLUR_DATA_URL } from "@/lib/image-blur";

interface FeaturedProduct {
  _id: string;
  title: string;
  slug: string | { current: string; _type?: string };
  primaryImage?: {
    url: string;
    alt?: string;
  };
}

interface HeroFeaturedProductProps {
  products: FeaturedProduct[];
}

export function HeroFeaturedProduct({ products }: HeroFeaturedProductProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products.length]);

  const activeProduct = products[activeIndex];

  if (!activeProduct) return null;

  return (
    <Link
      href={`/products/${typeof activeProduct.slug === "string" ? activeProduct.slug : activeProduct.slug?.current}`}
      className="bg-background rounded-2xl p-3 flex flex-col gap-4 block transition-shadow hover:shadow-lg"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-primary flex-1 truncate">
          {activeProduct.title}
        </p>
        <div className="opacity-50 pt-0.5">
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Product Image with Pagination Dots */}
      <div className="relative">
        {activeProduct.primaryImage?.url ? (
          <Image
            src={activeProduct.primaryImage.url}
            alt={activeProduct.primaryImage.alt || activeProduct.title}
            width={256}
            height={160}
            className="w-full h-40 object-cover rounded-2xl"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        ) : (
          <div className="w-full h-40 bg-muted-foreground/30 rounded-2xl" />
        )}

        {/* Pagination Dots */}
        {products.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {products.map((_, index) => (
              <button
                key={products[index]._id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Show product ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
