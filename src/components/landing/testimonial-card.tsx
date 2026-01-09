"use client";

import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  content: string;
  customerName: string;
  role: string;
  rating: number;
  imageUrl?: string;
}

export function TestimonialCard({
  content,
  customerName,
  role,
  rating,
  imageUrl,
}: TestimonialCardProps) {
  return (
    <div className="bg-background flex flex-col items-start min-w-[240px] p-6 rounded-xl h-full gap-6">
      {/* Testimonial Content */}
      <div className="flex items-start w-full flex-1">
        <p className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-primary">
          {content}
        </p>
      </div>

      {/* Bottom Row - Avatar Block + Rating */}
      <div className="flex gap-6 items-center w-full">
        {/* Avatar Block */}
        <div className="flex flex-1 gap-3 items-start">
          {/* Avatar */}
          <div className="overflow-hidden relative rounded-full shrink-0 size-10 bg-muted">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={customerName}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <div className="flex items-center justify-center size-full text-muted-foreground text-sm font-medium">
                {customerName.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col gap-0.5 items-start text-sm text-muted-foreground">
            {/* Name/Title */}
            <div className="flex flex-col justify-center w-full">
              <p className="font-medium leading-5">
                {customerName}
              </p>
            </div>
            {/* Role/Description */}
            <div className="flex flex-col justify-center w-full">
              <p className="font-normal leading-5">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-start shrink-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="size-6 shrink-0"
              fill={index < rating ? "#18B75A" : "none"}
              stroke={index < rating ? "#18B75A" : "#e5e5e5"}
              strokeWidth={2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
