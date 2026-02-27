import Image from "next/image";
import Link from "next/link";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { BLUR_DATA_URL } from "@/lib/image-blur";

interface BlogCardProps {
  title: string;
  description: string;
  category?: string;
  imageUrl: string;
  imageAlt?: string;
  readTime?: string;
  publishedDate?: string;
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
      className="group bg-background rounded-2xl p-4 flex flex-col gap-6 hover:shadow-lg transition-shadow"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-282/168 rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt || title}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>

      {/* Category Badge */}
      {category && (
        <div className="flex items-center w-full">
          <GradientBadge>{category}</GradientBadge>
        </div>
      )}

      {/* Title and Description */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-medium text-base text-foreground transition-colors">
          {title}
        </h3>
        <p className="font-normal text-sm text-muted-foreground line-clamp-3 overflow-hidden">
          {description}
        </p>
        {/* Meta Info */}
        {(readTime || publishedDate) && (
          <div className="flex gap-1 items-center opacity-40 w-full">
            {readTime && (
              <span className="font-medium text-sm text-foreground">
                {readTime}
              </span>
            )}
            {readTime && publishedDate && (
              <span className="font-medium text-sm text-foreground">•</span>
            )}
            {publishedDate && (
              <span className="font-medium text-sm text-foreground">
                {publishedDate}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
