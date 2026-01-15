import { notFound } from "next/navigation";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface BlogPostDataProps {
  slug: string;
}

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  slug: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  publishedAt: string;
  body?: any; // Portable text content
}

export async function BlogPostData({ slug }: BlogPostDataProps) {
  try {
    // Fetch blog post from Sanity
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "category": category->title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      body
    }`;

    const post: BlogPost | null = await client.fetch(query, { slug });

    if (!post) {
      notFound();
    }

    // Build image URL from Sanity
    const imageUrl = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(675).url()
      : undefined;

    return (
      <BlogPostDetail
        post={{
          title: post.title,
          category: post.category,
          publishedAt: post.publishedAt,
          mainImage: post.mainImage,
          imageUrl,
          body: post.body,
        }}
      />
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
