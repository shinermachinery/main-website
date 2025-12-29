"use client";

import { PortableText } from "@portabletext/react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="container mx-auto px-4 md:px-8 lg:px-[236px] py-[80px]">
      <div className="flex flex-col gap-[40px]">
        {/* Back Button */}
        <Link
          href="/blog"
          className="flex gap-2 items-center group transition-colors hover:opacity-70"
        >
          <ChevronLeft className="h-4 w-4 text-[#71717a]" />
          <span
            className="font-normal text-[14px] leading-[20px] text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Back
          </span>
        </Link>

        {/* Category Badge */}
        <div
          className="inline-flex items-start px-[10px] py-[4px] rounded-full self-start"
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
                "linear-gradient(90.65deg, rgba(42, 94, 152, 1) 15.88%, rgba(24, 183, 90, 1) 115.02%)",
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Date and Title */}
        <div className="flex flex-col gap-[16px]">
          <p
            className="font-normal text-[14px] leading-[20px] text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {formattedDate}
          </p>
          <h1
            className="font-medium text-[36px] leading-[48px] tracking-[-0.9px] text-[#18181b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="relative w-full h-[339px] rounded-[16px] overflow-hidden bg-[rgba(113,113,122,0.3)]">
            <Image
              src={post.imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-[40px]">
          {post.body ? (
            <PortableText
              value={post.body}
              components={{
                block: {
                  h2: ({ children }) => (
                    <h2
                      className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#18181b]"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {children}
                    </h2>
                  ),
                  normal: ({ children }) => (
                    <p
                      className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#71717a]"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {children}
                    </p>
                  ),
                },
              }}
            />
          ) : (
            // Fallback HTML content
            <div
              className="prose prose-lg max-w-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Fallback content is safe
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
