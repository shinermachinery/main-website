/**
 * Post Card Data Component (Server Component)
 * Fetches a single blog post by slug and renders PostCard
 * Follows component-based server data pattern
 */

import { notFound } from "next/navigation";
import type { PostWithRelations } from "@/lib/sanity-types";
import { client } from "@/sanity/lib/client";
import { PostCard } from "./post-card";

export interface PostCardDataProps {
  slug: string;
  variant?: "default" | "featured" | "compact";
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showCategories?: boolean;
}

export async function PostCardData({
  slug,
  variant = "default",
  showExcerpt = true,
  showAuthor = true,
  showCategories = true,
}: PostCardDataProps) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      mainImage {
        asset,
        alt,
        hotspot
      },
      publishedAt,
      body,
      author-> {
        _id,
        name,
        slug,
        image {
          asset,
          alt
        },
        bio
      },
      categories[]-> {
        _id,
        title,
        slug,
        description
      }
    }
  `;

  const post = await client.fetch<PostWithRelations | null>(query, { slug });

  if (!post) {
    notFound();
  }

  return (
    <PostCard
      post={post}
      variant={variant}
      showExcerpt={showExcerpt}
      showAuthor={showAuthor}
      showCategories={showCategories}
    />
  );
}
