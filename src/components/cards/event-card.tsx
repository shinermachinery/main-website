"use client";

import Image from "next/image";

interface EventCardProps {
  image: string;
  title: string;
}

export function EventCard({ image, title }: EventCardProps) {
  return (
    <div className="h-[25rem] rounded-[1.5rem] overflow-hidden relative">
      {/* Event Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Title Overlay */}
      <div className="absolute left-5 bottom-[4.5rem] w-[calc(100%-2.5rem)]">
        <div className="bg-muted rounded-2xl p-3">
          <p className="text-xl font-medium leading-7 text-foreground tracking-[-0.0313rem]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
