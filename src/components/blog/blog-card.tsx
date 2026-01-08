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
      className="group bg-background rounded-2xl p-5 flex flex-col gap-5 hover:shadow-lg transition-shadow"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-282/168 rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Category Badge */}
      <div className="flex items-center w-full">
        <div
          className="inline-flex items-start px-2.5 py-1 rounded-full"
          style={{
            backgroundImage:
              "linear-gradient(91.22deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%)",
          }}
        >
          <span
            className="bg-clip-text font-medium text-sm leading-4"
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
          className="font-medium text-lg leading-6 tracking-[-0.5px] text-primary group-hover:text-brand-blue transition-colors"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          {title}
        </h3>
        <p
          className="font-normal text-sm leading-5 text-muted-foreground line-clamp-3 overflow-hidden"
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
        <span className="font-medium text-sm leading-4 text-primary">
          {readTime}
        </span>
        <span className="font-medium text-sm leading-4 text-primary">
          •
        </span>
        <span className="font-medium text-sm leading-4 text-primary">
          {publishedDate}
        </span>
      </div>
    </Link> 
  );
}
