import { BlogsGrid } from "@/components/blog/blogs-grid";
import { FALLBACK_BLOG_POSTS } from "@/components/blog/fallback-data";
import { client } from "@/sanity/lib/client";

interface BlogsDataProps {
  searchQuery?: string;
  category?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  publishedAt: string;
  readTime: string;
}

export async function BlogsData({ searchQuery, category }: BlogsDataProps) {
  try {
    // Build GROQ query with filters
    let query = `*[_type == "post"`;

    // Add search filter
    if (searchQuery) {
      query += ` && (title match "${searchQuery}*" || description match "${searchQuery}*")`;
    }

    // Add category filter
    if (category) {
      query += ` && category == "${category}"`;
    }

    query += `] | order(publishedAt desc) {
      _id,
      title,
      "description": excerpt,
      "category": category->title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "readTime": readTime
    }`;

    const posts: BlogPost[] = await client.fetch(query);

    // Use fallback data if no posts from Sanity
    const displayPosts =
      posts && posts.length > 0 ? posts : FALLBACK_BLOG_POSTS;

    // Apply client-side filtering to fallback data if needed
    let filteredPosts = displayPosts;

    if (posts.length === 0) {
      // If using fallback data, apply filters manually
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.description.toLowerCase().includes(lowerQuery),
        );
      }

      if (category) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category.toLowerCase() === category.toLowerCase(),
        );
      }
    }

    return <BlogsGrid posts={filteredPosts} />;
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    // Return fallback data on error
    return <BlogsGrid posts={FALLBACK_BLOG_POSTS} />;
  }
}
