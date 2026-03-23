"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { EmptyState } from "@/components/ui/empty-state";
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
      <EmptyState
        variant="filtered"
        message="No blog posts found. Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => {
        // Get image URL from Sanity or use placeholder
        const imageUrl = post.mainImage
          ? urlFor(post.mainImage).width(600).height(400).url()
          : "/placeholder-blog.jpg";

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
