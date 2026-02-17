"use client";

import { ImageCarouselCard } from "./image-carousel-card";

interface EventCardProps {
  images: string[];
  title: string;
}

export function EventCard({ images, title }: EventCardProps) {
  return <ImageCarouselCard images={images} title={title} showTitle />;
}
