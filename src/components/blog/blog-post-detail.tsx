"use client";

import { PortableText } from "@portabletext/react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GradientBadge } from "@/components/ui/gradient-badge";

interface BlogPostDetailProps {
  post: {
    title: string;
    category: string;
    publishedAt: string;
    mainImage?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
    imageUrl?: string;
    body?: any; // Portable text content
    content?: string; // Fallback HTML content
  };
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-24 py-20">
      <div className="flex flex-col gap-10">
        {/* Back Button */}
        <Link
          href="/blog"
          className="flex gap-2 items-center group transition-colors hover:opacity-70"
        >
          <ChevronLeft className="size-4 text-muted-foreground" />
          <span className="font-normal text-sm text-muted-foreground">
            Back
          </span>
        </Link>

        {/* Category Badge */}
        {post.category && (
          <GradientBadge className="self-start">{post.category}</GradientBadge>
        )}

        {/* Date and Title */}
        <div className="flex flex-col gap-4">
          <p className="font-normal text-sm text-muted-foreground">
            {formattedDate}
          </p>
          <h1 className="font-medium text-3xl text-foreground">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-muted">
            <Image
              src={post.imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 48rem) 100vw, (max-width: 75rem) 80vw, 75rem"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-10">
          {post.body ? (
            <PortableText
              value={post.body}
              components={{
                block: {
                  h2: ({ children }) => (
                    <h2 className="font-medium text-2xl text-foreground">
                      {children}
                    </h2>
                  ),
                  normal: ({ children }) => (
                    <p className="font-medium text-base text-muted-foreground">
                      {children}
                    </p>
                  ),
                },
              }}
            />
          ) : (
            // Fallback HTML content
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Fallback content is safe
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
