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
    const conditions: string[] = ['_type == "post"'];
    const params: Record<string, string> = {};

    if (searchQuery) {
      conditions.push("(title match $searchTerm || excerpt match $searchTerm)");
      params.searchTerm = `${searchQuery}*`;
    }

    if (category) {
      conditions.push("category->slug.current == $categorySlug");
      params.categorySlug = category;
    }

    const filter = conditions.join(" && ");
    const query = `*[${filter}] | order(publishedAt desc) {
      _id,
      title,
      "description": excerpt,
      "category": category->title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      "readTime": readTime
    }`;

    const posts: BlogPost[] = await client.fetch(query, params);

    return <BlogsGrid posts={posts ?? []} />;
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    return <BlogsGrid posts={[]} />;
  }
}
