import { notFound } from "next/navigation";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";
import {
  FALLBACK_BLOG_IMAGES,
  FALLBACK_BLOG_POST_CONTENT,
  FALLBACK_BLOG_POSTS,
} from "@/components/blog/fallback-data";
import { client } from "@/sanity/lib/client";
import { imageBuilder } from "@/sanity/lib/image";

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

    // If no post from Sanity, try fallback data
    if (!post) {
      const fallbackPost = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);

      if (!fallbackPost) {
        notFound();
      }

      // Find index for consistent image selection
      const postIndex = FALLBACK_BLOG_POSTS.findIndex((p) => p.slug === slug);
      const imageUrl =
        FALLBACK_BLOG_IMAGES[postIndex % FALLBACK_BLOG_IMAGES.length];

      return (
        <BlogPostDetail
          post={{
            title: fallbackPost.title,
            category: fallbackPost.category,
            publishedAt: fallbackPost.publishedAt,
            imageUrl,
            content: FALLBACK_BLOG_POST_CONTENT,
          }}
        />
      );
    }

    // Build image URL from Sanity
    const imageUrl = post.mainImage
      ? imageBuilder.image(post.mainImage).width(1200).height(675).url()
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

    // Try fallback data on error
    const fallbackPost = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);

    if (!fallbackPost) {
      notFound();
    }

    const postIndex = FALLBACK_BLOG_POSTS.findIndex((p) => p.slug === slug);
    const imageUrl =
      FALLBACK_BLOG_IMAGES[postIndex % FALLBACK_BLOG_IMAGES.length];

    return (
      <BlogPostDetail
        post={{
          title: fallbackPost.title,
          category: fallbackPost.category,
          publishedAt: fallbackPost.publishedAt,
          imageUrl,
          content: FALLBACK_BLOG_POST_CONTENT,
        }}
      />
    );
  }
}
