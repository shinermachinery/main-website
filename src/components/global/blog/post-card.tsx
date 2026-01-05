/**
 * Post Card Component
 * Displays blog post preview with image, title, excerpt, author, and metadata
 * Reusable for blog lists, grids, and related posts
 */

"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PostWithRelations } from "@/lib/sanity-types";
import {  urlFor } from "@/sanity/lib/image";
import { CategoryBadge } from "./category-badge";

export interface PostCardProps {
  post: PostWithRelations;
  variant?: "default" | "featured" | "compact";
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showCategories?: boolean;
}

export function PostCard({
  post,
  variant = "default",
  showExcerpt = true,
  showAuthor = true,
  showCategories = true,
}: PostCardProps) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).height(500).url()
    : "/placeholder-blog.jpg";

  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  // Format date
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // Extract excerpt from body (first 150 characters)
  const excerpt = post.body
    ? post.body
        .filter((block) => block._type === "block")
        .map((block) => block.children.map((child) => child.text).join(""))
        .join(" ")
        .slice(0, 150) + "..."
    : null;

  return (
    <article
      className={`group rounded-2xl border bg-card overflow-hidden transition-shadow hover:shadow-xl ${
        isFeatured
          ? "md:grid md:grid-cols-2 md:gap-8"
          : isCompact
            ? "flex gap-4"
            : ""
      }`}
    >
      {/* Featured Image */}
      <Link
        href={`/blog/${post.slug.current}`}
        className={`block relative bg-muted overflow-hidden ${
          isFeatured
            ? "aspect-video md:aspect-auto md:h-full"
            : isCompact
              ? "w-32 h-32 flex-shrink-0 rounded-lg"
              : "aspect-video"
        }`}
      >
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 50vw"
              : isCompact
                ? "128px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          priority={isFeatured}
        />
      </Link>

      {/* Content */}
      <div className={`p-6 space-y-4 ${isCompact ? "p-0 space-y-2" : ""}`}>
        {/* Categories */}
        {showCategories &&
          post.categories &&
          post.categories.length > 0 &&
          !isCompact && (
            <div className="flex flex-wrap gap-2">
              {post.categories.slice(0, 3).map((category) => (
                <CategoryBadge
                  key={category._id}
                  category={category}
                  size="sm"
                  variant="subtle"
                  clickable
                />
              ))}
            </div>
          )}

        {/* Title */}
        <Link href={`/blog/${post.slug.current}`}>
          <h3
            className={`font-bold hover:text-brand-blue transition-colors line-clamp-2 ${
              isFeatured
                ? "text-3xl md:text-4xl"
                : isCompact
                  ? "text-base"
                  : "text-2xl"
            }`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {showExcerpt && excerpt && !isCompact && (
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {/* Publish Date */}
          {publishDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{publishDate}</time>
            </div>
          )}

          {/* Author */}
          {showAuthor && post.author && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <span>By {post.author.name}</span>
            </>
          )}
        </div>

        {/* Read More (only on non-compact) */}
        {!isCompact && (
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-green font-medium transition-colors group/link"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
}
