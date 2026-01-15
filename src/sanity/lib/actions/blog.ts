/**
 * Blog Actions
 * Server actions for fetching posts, authors, and categories
 */

import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

// ============================================================================
// Types
// ============================================================================

export interface Author {
  id: string;
  name: string;
  slug: string;
  image?: string;
  bio?: any;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  mainImage?: string;
  publishedAt?: string;
  body?: any;
  author?: Author;
  categories?: Category[];
}

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  mainImage?: string;
  publishedAt?: string;
  author?: {
    id: string;
    name: string;
    image?: string;
  };
}

// ============================================================================
// Post Actions
// ============================================================================

/**
 * Get all posts
 * @param options - Filtering options
 */
export async function getPosts(options?: {
  categorySlug?: string;
  authorSlug?: string;
  limit?: number;
}): Promise<PostSummary[]> {
  try {
    const limit = options?.limit || 20;
    const conditions: string[] = ['_type == "post"'];

    if (options?.categorySlug) {
      conditions.push(`"${options.categorySlug}" in categories[]->slug.current`);
    }
    if (options?.authorSlug) {
      conditions.push(`author->slug.current == "${options.authorSlug}"`);
    }

    const filterString = conditions.join(" && ");

    const { data: posts } = await sanityFetch({
      query: `*[${filterString}] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        author-> {
          _id,
          name,
          image
        }
      }[0...${limit}]`,
    });

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map((post: any) => transformPostSummary(post));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Get featured posts
 * @param limit - Maximum number of posts (default: 3)
 */
export async function getFeaturedPosts(limit: number = 3): Promise<PostSummary[]> {
  try {
    const { data: posts } = await sanityFetch({
      query: `*[_type == "post" && featured == true] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        author-> {
          _id,
          name,
          image
        }
      }[0...${limit}]`,
    });

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map((post: any) => transformPostSummary(post));
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

/**
 * Get recent posts
 * @param limit - Maximum number of posts (default: 5)
 */
export async function getRecentPosts(limit: number = 5): Promise<PostSummary[]> {
  return getPosts({ limit });
}

/**
 * Get post by slug
 * @param slug - Post slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data: post } = await sanityFetch({
      query: `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        body,
        author-> {
          _id,
          name,
          "slug": slug.current,
          image,
          bio
        },
        categories[]-> {
          _id,
          title,
          "slug": slug.current,
          description
        }
      }`,
      params: { slug },
    });

    if (!post) {
      return null;
    }

    return transformPost(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

/**
 * Search posts
 * @param searchTerm - Search keyword
 * @param limit - Maximum results (default: 20)
 */
export async function searchPosts(
  searchTerm: string,
  limit: number = 20,
): Promise<PostSummary[]> {
  try {
    const { data: posts } = await sanityFetch({
      query: `*[_type == "post" && [title, pt::text(body)] match $searchTerm] | order(_score desc, publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,
        author-> {
          _id,
          name,
          image
        }
      }[0...${limit}]`,
      params: { searchTerm },
    });

    if (!posts || posts.length === 0) {
      return [];
    }

    return posts.map((post: any) => transformPostSummary(post));
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
}

// ============================================================================
// Author Actions
// ============================================================================

/**
 * Get all authors
 */
export async function getAuthors(): Promise<Author[]> {
  try {
    const { data: authors } = await sanityFetch({
      query: `*[_type == "author"] | order(name asc) {
        _id,
        name,
        "slug": slug.current,
        image,
        bio
      }`,
    });

    if (!authors || authors.length === 0) {
      return [];
    }

    return authors.map((author: any) => transformAuthor(author));
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
}

/**
 * Get author by slug
 * @param slug - Author slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const { data: author } = await sanityFetch({
      query: `*[_type == "author" && slug.current == $slug][0] {
        _id,
        name,
        "slug": slug.current,
        image,
        bio
      }`,
      params: { slug },
    });

    if (!author) {
      return null;
    }

    return transformAuthor(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

// ============================================================================
// Category Actions
// ============================================================================

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const { data: categories } = await sanityFetch({
      query: `*[_type == "category"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        description
      }`,
    });

    if (!categories || categories.length === 0) {
      return [];
    }

    return categories.map((category: any) => ({
      id: category._id,
      title: category.title,
      slug: category.slug || "",
      description: category.description,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get category by slug
 * @param slug - Category slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data: category } = await sanityFetch({
      query: `*[_type == "category" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description
      }`,
      params: { slug },
    });

    if (!category) {
      return null;
    }

    return {
      id: category._id,
      title: category.title,
      slug: category.slug || "",
      description: category.description,
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function transformPostSummary(post: any): PostSummary {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug || "",
    mainImage: post.mainImage ? urlFor(post.mainImage).url() : undefined,
    publishedAt: post.publishedAt,
    author: post.author
      ? {
          id: post.author._id,
          name: post.author.name,
          image: post.author.image
            ? urlFor(post.author.image).url()
            : undefined,
        }
      : undefined,
  };
}

function transformPost(post: any): Post {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug || "",
    mainImage: post.mainImage ? urlFor(post.mainImage).url() : undefined,
    publishedAt: post.publishedAt,
    body: post.body,
    author: post.author ? transformAuthor(post.author) : undefined,
    categories: post.categories?.map((cat: any) => ({
      id: cat._id,
      title: cat.title,
      slug: cat.slug || "",
      description: cat.description,
    })),
  };
}

function transformAuthor(author: any): Author {
  return {
    id: author._id,
    name: author.name,
    slug: author.slug || "",
    image: author.image ? urlFor(author.image).url() : undefined,
    bio: author.bio,
  };
}
