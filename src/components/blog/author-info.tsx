/**
 * Author Info Component
 * Displays author byline with photo, name, and optional bio
 * Used in blog post headers and author pages
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import type { Author } from "@/lib/sanity-types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "./portable-text";

export interface AuthorInfoProps {
  author: Author;
  variant?: "inline" | "card" | "detailed";
  showBio?: boolean;
  clickable?: boolean;
}

export function AuthorInfo({
  author,
  variant = "inline",
  showBio = false,
  clickable = true,
}: AuthorInfoProps) {
  const imageUrl = author.image
    ? urlFor(author.image).width(200).height(200).url()
    : "/placeholder-avatar.jpg";

  const isInline = variant === "inline";
  const isCard = variant === "card";
  const isDetailed = variant === "detailed";

  const content = (
    <div
      className={`flex gap-4 ${
        isCard ? "rounded-2xl border bg-card p-6" : ""
      } ${isDetailed ? "items-start" : "items-center"}`}
    >
      {/* Author Photo */}
      <div
        className={`relative rounded-full overflow-hidden bg-muted flex-shrink-0 ${
          isDetailed ? "h-24 w-24" : isCard ? "h-16 w-16" : "h-10 w-10"
        }`}
      >
        <Image
          src={imageUrl}
          alt={author.image?.alt || author.name}
          fill
          className="object-cover"
          sizes={isDetailed ? "96px" : isCard ? "64px" : "40px"}
        />
      </div>

      {/* Author Details */}
      <div className="flex-1 space-y-1">
        <p
          className={`font-semibold ${
            isDetailed ? "text-2xl" : isCard ? "text-lg" : "text-sm"
          } ${clickable ? "hover:text-brand-blue transition-colors" : ""}`}
        >
          {author.name}
        </p>

        {/* Bio */}
        {showBio && author.bio && (
          <div
            className={`text-muted-foreground ${
              isInline ? "text-xs line-clamp-2" : ""
            }`}
          >
            {isDetailed ? (
              <PortableText value={author.bio} />
            ) : (
              <p className={isCard ? "line-clamp-3" : ""}>
                {author.bio
                  .filter((block) => block._type === "block")
                  .map((block) =>
                    block.children.map((child) => child.text).join(""),
                  )
                  .join(" ")}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link href={`/authors/${author.slug.current}`} className="block">
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}
