/**
 * Post Grid Data Component (Server Component)
 * Fetches blog posts from Sanity and renders PostGrid
 * Follows component-based server data pattern
 */

import type { PostWithRelations } from "@/lib/sanity-types";
import { client } from "@/sanity/lib/client";
import { PostGrid } from "./post-grid";

export interface PostGridDataProps {
  categorySlug?: string;
  authorSlug?: string;
  limit?: number;
  variant?: "default" | "featured" | "compact";
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showCategories?: boolean;
}

export async function PostGridData({
  categorySlug,
  authorSlug,
  limit,
  variant = "default",
  showExcerpt = true,
  showAuthor = true,
  showCategories = true,
}: PostGridDataProps) {
  // Build GROQ query based on filters
  let query = '*[_type == "post"';

  const filters: string[] = [];
  if (categorySlug) {
    filters.push(`$categorySlug in categories[]->slug.current`);
  }
  if (authorSlug) {
    filters.push(`author->slug.current == $authorSlug`);
  }

  if (filters.length > 0) {
    query += ` && ${filters.join(" && ")}`;
  }

  query += "] | order(publishedAt desc)";

  if (limit) {
    query += `[0...${limit}]`;
  }

  query += ` {
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
      }
    },
    categories[]-> {
      _id,
      title,
      slug,
      description
    }
  }`;

  // Build params object
  const params: Record<string, string> = {};
  if (categorySlug) params.categorySlug = categorySlug;
  if (authorSlug) params.authorSlug = authorSlug;

  // Fetch posts
  const posts = await client.fetch<PostWithRelations[]>(
    query,
    Object.keys(params).length > 0 ? params : {},
  );

  return (
    <PostGrid
      posts={posts}
      variant={variant}
      showExcerpt={showExcerpt}
      showAuthor={showAuthor}
      showCategories={showCategories}
    />
  );
}
