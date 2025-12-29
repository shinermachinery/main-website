import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt?: string;
  readTime: string;
  publishedDate: string;
  slug: string;
}

export function BlogCard({
  title,
  description,
  category,
  imageUrl,
  imageAlt,
  readTime,
  publishedDate,
  slug,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-[#f9f9fb] rounded-[16px] p-[16px] flex flex-col gap-[16px] hover:shadow-lg transition-shadow"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[282/168] rounded-[16px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Category Badge */}
      <div className="flex items-center w-full">
        <div
          className="inline-flex items-start px-[10px] py-[4px] rounded-full"
          style={{
            backgroundImage:
              "linear-gradient(91.22deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%)",
          }}
        >
          <span
            className="bg-clip-text font-medium text-[12px] leading-[16px]"
            style={{
              fontFamily: "var(--font-plus-jakarta-sans)",
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(91.47deg, rgba(42, 94, 152, 1) 15.88%, rgba(24, 183, 90, 1) 115.02%)",
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <div className="flex flex-col gap-[8px] w-full">
        <h3
          className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#18181b] group-hover:text-brand-blue transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {title}
        </h3>
        <p
          className="font-normal text-[14px] leading-[20px] text-[#71717a] line-clamp-3 overflow-hidden"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {description}
        </p>
      </div>

      {/* Meta Info - opacity on parent */}
      <div
        className="flex gap-[4px] items-center opacity-20 w-full"
        style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
      >
        <span className="font-medium text-[12px] leading-[16px] text-[#09090b]">
          {readTime}
        </span>
        <span className="font-medium text-[12px] leading-[16px] text-[#09090b]">
          •
        </span>
        <span className="font-medium text-[12px] leading-[16px] text-[#09090b]">
          {publishedDate}
        </span>
      </div>
    </Link>
  );
}
