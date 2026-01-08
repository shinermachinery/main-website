"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { FALLBACK_BLOG_IMAGES } from "@/components/blog/fallback-data";
import { urlFor } from "@/sanity/lib/image";

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

interface BlogsGridProps {
  posts: BlogPost[];
}

export function BlogsGrid({ posts }: BlogsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p
          className="text-lg text-muted-foreground"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          No blog posts found. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => {
        // Get image URL from Sanity or use fallback
        const imageUrl = post.mainImage
          ? urlFor(post.mainImage).width(600).height(400).url()
          : FALLBACK_BLOG_IMAGES[index % FALLBACK_BLOG_IMAGES.length];

        // Format date
        const formattedDate = new Date(post.publishedAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        );

        return (
          <BlogCard
            key={post._id}
            title={post.title}
            description={post.description}
            category={post.category}
            imageUrl={imageUrl}
            imageAlt={post.mainImage?.alt || post.title}
            readTime={post.readTime}
            publishedDate={formattedDate}
            slug={post.slug}
          />
        );
      })}
    </div>
  );
}
