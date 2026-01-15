import { BlogsGrid } from "@/components/blog/blogs-grid";
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

    return <BlogsGrid posts={posts ?? []} />;
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    return <BlogsGrid posts={[]} />;
  }
}
