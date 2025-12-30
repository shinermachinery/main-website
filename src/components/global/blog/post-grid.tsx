/**
 * Post Grid Component
 * Displays a grid of blog post cards
 * Client component for blog post browsing
 */

"use client";

import type { PostWithRelations } from "@/lib/sanity-types";
import { PostCard } from "./post-card";

export interface PostGridProps {
  posts: PostWithRelations[];
  variant?: "default" | "featured" | "compact";
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3;
    desktop?: 2 | 3 | 4;
  };
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showCategories?: boolean;
  emptyMessage?: string;
}

export function PostGrid({
  posts,
  variant = "default",
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  showExcerpt = true,
  showAuthor = true,
  showCategories = true,
  emptyMessage = "No posts available at the moment.",
}: PostGridProps) {
  // Handle empty state
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  // Build grid classes based on column configuration
  const gridClasses = `grid gap-6 md:gap-8 
    grid-cols-${columns.mobile} 
    md:grid-cols-${columns.tablet} 
    lg:grid-cols-${columns.desktop}`;

  return (
    <div className={gridClasses} role="list" aria-label="Blog posts">
      {posts.map((post, index) => (
        <div key={post._id} role="listitem">
          <PostCard
            post={post}
            variant={
              index === 0 && variant === "featured" ? "featured" : variant
            }
            showExcerpt={showExcerpt}
            showAuthor={showAuthor}
            showCategories={showCategories}
          />
        </div>
      ))}
    </div>
  );
}
