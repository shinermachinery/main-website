import { Suspense } from "react";
import { BlogPostData } from "@/components/blog/blog-post-data";
import { BlogPostSkeleton } from "@/components/blog/blog-post-skeleton";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#f9f9fb]">
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostData slug={slug} />
      </Suspense>
    </div>
  );
}
