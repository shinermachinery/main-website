import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export function ProjectCard({
  title,
  description,
  image,
  slug,
}: ProjectCardProps) {
  return (
    <div className="bg-[#f9f9fb] flex flex-col gap-[16px] px-[16px] py-[12px] rounded-[16px] w-full">
      {/* Image */}
      <div className="relative aspect-[282/168] rounded-[16px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-[16px] object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 271px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[8px]">
        <p
          className="text-[14px] font-medium text-zinc-900"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {title}
        </p>
        <p
          className="text-[14px] text-zinc-500 line-clamp-2"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {description}
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href={`/projects/${slug}`}
        className="h-[40px] rounded-full flex items-center justify-center gap-[8px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(89.24deg, rgba(42, 94, 152, 1) 27.51%, rgba(24, 183, 90, 1) 115.04%)",
          boxShadow: "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.2)",
        }}
      >
        <span
          className="text-[14px] font-medium text-white"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          View Details
        </span>
        <ArrowRight className="h-4 w-4 text-white" />
      </Link>
    </div>
  );
}
