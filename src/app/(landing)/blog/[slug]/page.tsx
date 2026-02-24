import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPostData } from "@/components/blog/blog-post-data";
import { BlogPostSkeleton } from "@/components/blog/blog-post-skeleton";
import { siteConfig } from "@/lib/site-config";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<{
    title: string | null;
    mainImage: { asset: { _ref: string }; alt?: string } | null;
  } | null>(
    `*[_type == "post" && slug.current == $slug][0] { title, mainImage }`,
    { slug },
  );

  const title = post?.title ?? "Blog Post";
  const description = `Read "${title}" on the ${siteConfig.name} blog.`;
  const image = post?.mainImage
    ? urlFor(post.mainImage).width(1200).height(675).url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/${slug}`,
      ...(image && { images: [{ url: image, width: 1200, height: 675 }] }),
    },
    twitter: {
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-16 md:py-12">
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostData slug={slug} />
      </Suspense>
    </div>
  );
}
