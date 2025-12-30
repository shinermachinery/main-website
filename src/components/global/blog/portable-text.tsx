/**
 * Portable Text Component
 * Renders Sanity's portable text (block content) with custom styling
 * Used for blog posts, author bios, and rich text content
 */

"use client";

import { PortableText as PortableTextReact } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@/lib/sanity-types";
import { imageBuilder } from "@/sanity/lib/image";

export interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

/**
 * Custom components for rendering different block types
 */
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      const imageUrl = imageBuilder.image(value).width(1200).url();

      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog post image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-4 mt-8 scroll-m-20">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold mb-3 mt-6 scroll-m-20">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mb-2 mt-4 scroll-m-20">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }: any) => <p className="mb-4 leading-7">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-green pl-6 py-2 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-7">{children}</li>,
    number: ({ children }: any) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <Link
          href={href}
          className="text-brand-blue hover:text-brand-green underline underline-offset-4 transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value, className = "" }: PortableTextProps) {
  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <PortableTextReact value={value} components={portableTextComponents} />
    </div>
  );
}
