"use client";

import Image from "next/image";

interface EventCardProps {
  image: string;
  title: string;
}

export function EventCard({ image, title }: EventCardProps) {
  return (
    <div className="h-[400px] rounded-[24px] overflow-hidden relative">
      {/* Event Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Title Overlay */}
      <div className="absolute left-5 bottom-[72px] w-[calc(100%-40px)]">
        <div className="bg-[#f9f9fb] rounded-2xl p-3">
          <p className="text-xl font-medium leading-7 text-zinc-900 tracking-[-0.5px]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
