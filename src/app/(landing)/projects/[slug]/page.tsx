import { Download } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OtherProductsSection } from "@/components/projects/other-products-section";
import { ProductDetailSkeleton } from "@/components/projects/product-detail-skeleton";
import { ProductFeaturesList } from "@/components/projects/product-features-list";
import { ProductImageGallery } from "@/components/projects/product-image-gallery";
import { ProductSpecificationsSection } from "@/components/projects/product-specifications-section";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  features?: string[];
  specifications?: string[];
  images?: { asset: { _ref: string } }[];
  slug: { current: string };
}

async function getProject(slug: string) {
  try {
    const project = await client.fetch<Project>(
      `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        description,
        features,
        specifications,
        images,
        slug
      }`,
      { slug },
    );

    if (!project) {
      return null;
    }

    return {
      id: project._id,
      title: project.title,
      description: project.description,
      features: project.features || [],
      specifications: project.specifications || [],
      images: project.images
        ? project.images.map((img) => urlFor(img).url())
        : [
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&q=80",
          ],
      slug: project.slug.current,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

async function getOtherProjects(currentSlug: string) {
  try {
    const projects = await client.fetch(
      `*[_type == "project" && slug.current != $slug] | order(order asc, _createdAt desc)[0...4] {
        _id,
        title,
        description,
        "image": images[0],
        "slug": slug.current
      }`,
      { slug: currentSlug },
    );

    return projects.map(
      (project: {
        _id: string;
        title: string;
        description: string;
        image?: { asset: { _ref: string } };
        slug: string;
      }) => ({
        id: project._id,
        title: project.title,
        description: project.description,
        image: project.image
          ? urlFor(project.image).url()
          : "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80",
        slug: project.slug,
      }),
    );
  } catch (error) {
    console.error("Error fetching other projects:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Product Not Found | SHINER",
    };
  }

  return {
    title: `${project.title} | SHINER`,
    description: project.description,
  };
}

async function ProductDetailContent({ slug }: { slug: string }) {
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const otherProjects = await getOtherProjects(slug);

  // Default features if none exist
  const features =
    project.features.length > 0
      ? project.features
      : [
          "Separate heating and power supply system, could be switched on or not depend on different situation, which save power consumption for customer.",
          "Using imported Japan SMC air intake filters, no worry about the filtering effect with high impurities, can protect the machine and extend its working life.",
          "Using independent SMC Ejector made in Japan.",
          "Service life of ejectors in more than 14 billion times.",
          "Unique DC drive vibrator, much more safety and eco-friendly compared with AC driver.",
        ];

  // Default specifications if none exist
  const specifications =
    project.specifications.length > 0
      ? project.specifications
      : [
          "Separate heating and power supply system, could be switched on or not depend on different situation, which save power consumption for customer.",
          "Using imported Japan SMC air intake filters, no worry about the filtering effect with high impurities, can protect the machine and extend its working life.",
          "Using independent SMC Ejector made in Japan.",
          "Service life of ejectors in more than 14 billion times.",
          "Unique DC drive vibrator, much more safety and eco-friendly compared with AC driver.",
          "Unique DC drive vibrator, much more safety and eco-friendly compared with AC driver.",
          "Unique DC drive vibrator, much more safety and eco-friendly compared with AC driver.",
        ];

  return (
    <div className="flex flex-col gap-[120px]">
      {/* Hero Section */}
      <section className="flex gap-[24px] items-start flex-col lg:flex-row">
        {/* Left: Image Gallery */}
        <div className="flex-1 w-full">
          <ProductImageGallery images={project.images} alt={project.title} />
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 flex flex-col gap-[20px] w-full">
          <h1
            className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#18181b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {project.title}
          </h1>

          <p
            className="font-medium text-[14px] leading-[20px] text-[#71717a]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {project.description}
          </p>

          {/* Features List */}
          <ProductFeaturesList features={features} />

          {/* Download Brochure Button */}
          <button
            type="button"
            className="flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[8px] rounded-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(86.83deg, rgba(42, 94, 152, 1) 27.509%, rgba(24, 183, 90, 1) 115.04%)",
              boxShadow: "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.2)",
            }}
          >
            <span
              className="font-medium text-[14px] leading-[20px] text-white"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Download Brochure
            </span>
            <Download className="size-[16px] text-white" />
          </button>
        </div>
      </section>

      {/* Specifications Section */}
      <ProductSpecificationsSection specifications={specifications} />

      {/* Other Products Section */}
      {otherProjects.length > 0 && (
        <OtherProductsSection products={otherProjects} />
      )}
    </div>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-24">
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetailContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}
