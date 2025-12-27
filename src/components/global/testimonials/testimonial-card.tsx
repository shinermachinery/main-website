/**
 * Testimonial Card Component
 * Displays customer testimonial with rating, photo, and quote
 * Reusable for carousel, grid, or single display
 */

"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/lib/sanity-types";
import { imageBuilder } from "@/sanity/lib/image";

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "card" | "quote" | "compact";
  showImage?: boolean;
}

export function TestimonialCard({
  testimonial,
  variant = "card",
  showImage = true,
}: TestimonialCardProps) {
  const imageUrl = testimonial.image
    ? imageBuilder.image(testimonial.image).width(100).height(100).url()
    : "/placeholder-avatar.jpg";

  const isCard = variant === "card";
  const isQuote = variant === "quote";
  const isCompact = variant === "compact";

  return (
    <article
      className={`space-y-6 ${
        isCard
          ? "rounded-2xl border bg-card p-8 shadow-lg hover:shadow-xl transition-shadow"
          : isQuote
            ? "border-l-4 border-brand-green pl-6 py-4"
            : "space-y-3"
      }`}
    >
      {/* Rating */}
      <div className="flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating
                ? "fill-brand-green text-brand-green"
                : "text-muted-foreground"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote
        className={`text-foreground leading-relaxed ${isCompact ? "text-sm" : ""}`}
      >
        {isQuote && <span className="text-6xl text-brand-green/20 leading-none">❝</span>}
        <p className={isQuote ? "mt-2" : ""}>"{testimonial.content}"</p>
      </blockquote>

      {/* Customer Info */}
      <footer
        className={`flex items-center gap-4 ${isCard ? "pt-4 border-t" : ""}`}
      >
        {showImage && (
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={imageUrl}
              alt={testimonial.image?.alt || testimonial.customerName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        )}
        <div>
          <cite className="font-semibold not-italic">
            {testimonial.customerName}
          </cite>
          {testimonial.role && (
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          )}
        </div>
      </footer>
    </article>
  );
}
