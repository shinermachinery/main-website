"use client";

import Image from "next/image";

interface InstallationCardProps {
  image: string;
  type: string;
  title: string;
  location: string;
}

export function InstallationCard({
  image,
  type,
  title,
  location,
}: InstallationCardProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Image */}
      <div className="relative h-[480px] w-full rounded-[24px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 bg-white rounded-2xl">
        {/* Badge */}
        <div className="flex items-center">
          <div
            className="flex items-start px-2.5 py-1 rounded-full"
            style={{
              backgroundImage:
                "linear-gradient(91.29deg, rgba(42, 94, 152, 0.1) 15.881%, rgba(24, 183, 90, 0.1) 115.02%)",
            }}
          >
            <span
              className="text-xs font-medium leading-4 bg-clip-text"
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(91.58deg, rgb(42, 94, 152) 15.881%, rgb(24, 183, 90) 115.02%)",
              }}
            >
              {type}
            </span>
          </div>
        </div>

        {/* Title and Location */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-medium leading-7 text-zinc-900 tracking-[-0.5px]">
            {title}
          </h3>
          <p className="text-sm font-normal leading-5 text-zinc-500 line-clamp-1">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
