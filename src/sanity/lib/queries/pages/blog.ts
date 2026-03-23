/**
 * Blog Page GROQ Queries
 * Queries for blog posts, authors, and categories
 */

import {
  AUTHOR_FULL_PROJECTION,
  CATEGORY_SUMMARY_PROJECTION,
  POST_FULL_PROJECTION,
  POST_SUMMARY_PROJECTION,
} from "../shared/projections";
import type { QueryResult } from "../shared/utils";
import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
} from "../shared/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Query Parameters for Post Listing
 */
export interface PostListParams {
  /** Filter by category slug */
  categorySlug?: string;
  /** Filter by author slug */
  authorSlug?: string;
  /** Maximum number of results */
  limit?: number;
  /** Starting index for pagination */
  offset?: number;
  /** Include draft posts (default: false) */
  includeDrafts?: boolean;
}

// ============================================================================
// Post Queries
// ============================================================================

/**
 * Get All Posts Query
 * Fetches posts with optional filtering, sorting, and pagination
 *
 * Performance: Uses POST_FULL_PROJECTION with populated relations
 * Use Cases: Blog listing pages, filtered views
 *
 * @param options - Filtering and pagination options
 * @returns Query object
 */
export function getAllPostsQuery(
  options: PostListParams = {},
): QueryResult<{ categorySlug?: string; authorSlug?: string }> {
  const {
    categorySlug,
    authorSlug,
    limit,
    offset = 0,
    includeDrafts = false,
  } = options;

  const conditions: string[] = [];
  const params: Record<string, string> = {};

  // Filter by category
  if (categorySlug) {
    conditions.push("$categorySlug in categories[]->slug.current");
    params.categorySlug = categorySlug;
  }

  // Filter by author
  if (authorSlug) {
    conditions.push("author->slug.current == $authorSlug");
    params.authorSlug = authorSlug;
  }

  // Exclude drafts by default (posts without publishedAt)
  if (!includeDrafts) {
    conditions.push("defined(publishedAt)");
  }

  const filterString = buildFilterString("post", conditions);
  const orderString = buildOrderString(["publishedAt desc"]);
  const paginationString = buildPaginationString(limit, offset);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${POST_FULL_PROJECTION}`,
    params,
  };
}

/**
 * Get Post By Slug Query
 * Fetches a single post with full details including related posts
 *
 * Performance: Includes intelligent related posts based on shared categories
 * Use Cases: Blog post detail pages
 *
 * @param slug - Post slug
 * @returns Query object
 */
export function getPostBySlugQuery(
  slug: string,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "post" && slug.current == $slug && defined(publishedAt)][0] {
      ${POST_FULL_PROJECTION.replace("{", "").replace("}", "").trim()},
      "relatedPosts": *[
        _type == "post" &&
        slug.current != $slug &&
        defined(publishedAt) &&
        count((categories[]._ref)[@ in ^.^.categories[]._ref]) > 0
      ] | order(publishedAt desc) [0...3] ${POST_SUMMARY_PROJECTION}
    }`,
    params: { slug },
  };
}

/**
 * Get Recent Posts Query
 * Fetches most recently published posts
 *
 * Performance: Optimized for homepage/sidebar recent posts
 * Use Cases: Homepage, sidebar widgets
 *
 * @param limit - Number of posts (default: 5)
 * @returns Query object
 */
export function getRecentPostsQuery(limit: number = 5): QueryResult {
  return getAllPostsQuery({ limit });
}

/**
 * Get Featured Posts Query
 * Returns posts marked as featured (if using featured field)
 *
 * Note: Requires adding 'featured' boolean field to post schema
 * Alternative: Use first N posts as featured
 *
 * @param limit - Number of posts (default: 3)
 * @returns Query object
 */
export function getFeaturedPostsQuery(limit: number = 3): QueryResult {
  return getAllPostsQuery({ limit });
}

/**
 * Search Posts Query
 * Full-text search across post title and body content
 *
 * Performance: Uses GROQ match operator with score-based ordering
 * Use Cases: Blog search functionality
 *
 * @param searchTerm - Search keyword
 * @param limit - Maximum results (default: 20)
 * @returns Query object
 */
export function searchPostsQuery(
  searchTerm: string,
  limit: number = 20,
): QueryResult<{ searchTerm: string }> {
  const filterString = buildFilterString("post", [
    "[title, pt::text(body)] match $searchTerm",
    "defined(publishedAt)",
  ]);
  const orderString = buildOrderString(["_score desc", "publishedAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${POST_FULL_PROJECTION}`,
    params: { searchTerm },
  };
}

/**
 * Get Post Count Query
 * Returns total number of published posts
 *
 * @param categorySlug - Optional filter by category
 * @returns Query object
 */
export function getPostCountQuery(
  categorySlug?: string,
): QueryResult<{ categorySlug?: string }> {
  const conditions = ["defined(publishedAt)"];
  const params: Record<string, string> = {};

  if (categorySlug) {
    conditions.push("$categorySlug in categories[]->slug.current");
    params.categorySlug = categorySlug;
  }

  return {
    query: `count(*[${buildFilterString("post", conditions)}])`,
    params,
  };
}

// ============================================================================
// Author Queries
// ============================================================================

/**
 * Get All Authors Query
 * Fetches all authors with post count
 *
 * Performance: Includes computed post count
 * Use Cases: Author directory, author listing
 *
 * @returns Query object
 */
export function getAllAuthorsQuery(): QueryResult {
  return {
    query: `*[_type == "author"] | order(name asc) {
      ${AUTHOR_FULL_PROJECTION.replace("{", "").replace("}", "").trim()},
      "postCount": count(*[_type == "post" && references(^._id) && defined(publishedAt)])
    }`,
    params: {},
  };
}

/**
 * Get Author By Slug Query
 * Fetches single author with basic info
 *
 * @param slug - Author slug
 * @returns Query object
 */
export function getAuthorBySlugQuery(
  slug: string,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "author" && slug.current == $slug][0] ${AUTHOR_FULL_PROJECTION}`,
    params: { slug },
  };
}

/**
 * Get Author With Posts Query
 * Fetches author with their published posts
 *
 * Performance: Includes all author's posts ordered by date
 * Use Cases: Author profile pages
 *
 * @param slug - Author slug
 * @param postLimit - Maximum posts to include (default: 10)
 * @returns Query object
 */
export function getAuthorWithPostsQuery(
  slug: string,
  postLimit: number = 10,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "author" && slug.current == $slug][0] {
      ${AUTHOR_FULL_PROJECTION.replace("{", "").replace("}", "").trim()},
      "posts": *[_type == "post" && author._ref == ^._id && defined(publishedAt)]
        | order(publishedAt desc) [0...${postLimit}] ${POST_SUMMARY_PROJECTION}
    }`,
    params: { slug },
  };
}

// ============================================================================
// Category Queries
// ============================================================================

/**
 * Get All Categories Query
 * Fetches all categories with post counts
 *
 * Performance: Includes computed post count for each category
 * Use Cases: Category navigation, filter lists
 *
 * @returns Query object
 */
export function getAllCategoriesQuery(): QueryResult {
  return {
    query: `*[_type == "category"] | order(title asc) {
      ${CATEGORY_SUMMARY_PROJECTION.replace("{", "").replace("}", "").trim()},
      "postCount": count(*[_type == "post" && references(^._id) && defined(publishedAt)])
    }`,
    params: {},
  };
}

/**
 * Get Category By Slug Query
 * Fetches single category with basic info
 *
 * @param slug - Category slug
 * @returns Query object
 */
export function getCategoryBySlugQuery(
  slug: string,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "category" && slug.current == $slug][0] ${CATEGORY_SUMMARY_PROJECTION}`,
    params: { slug },
  };
}

/**
 * Get Category With Posts Query
 * Fetches category with its posts
 *
 * Performance: Filtered posts by category reference
 * Use Cases: Category archive pages
 *
 * @param slug - Category slug
 * @param postLimit - Maximum posts to include (default: 10)
 * @returns Query object
 */
export function getCategoryWithPostsQuery(
  slug: string,
  postLimit: number = 10,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "category" && slug.current == $slug][0] {
      ${CATEGORY_SUMMARY_PROJECTION.replace("{", "").replace("}", "").trim()},
      "posts": *[_type == "post" && ^._id in categories[]._ref && defined(publishedAt)]
        | order(publishedAt desc) [0...${postLimit}] ${POST_SUMMARY_PROJECTION}
    }`,
    params: { slug },
  };
}

/**
 * Get Popular Categories Query
 * Fetches categories with most posts
 *
 * Performance: Sorted by post count descending
 * Use Cases: Popular categories widget
 *
 * @param limit - Number of categories (default: 5)
 * @returns Query object
 */
export function getPopularCategoriesQuery(limit: number = 5): QueryResult {
  return {
    query: `*[_type == "category"] {
      ${CATEGORY_SUMMARY_PROJECTION.replace("{", "").replace("}", "").trim()},
      "postCount": count(*[_type == "post" && references(^._id) && defined(publishedAt)])
    } | order(postCount desc) [0...${limit}]`,
    params: {},
  };
}
