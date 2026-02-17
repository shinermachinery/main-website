import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductBySlug } from "@/actions/products";
import { ProductBrochureDownload } from "@/components/products/product-brochure-download";
import { ProductDetailSkeleton } from "@/components/products/product-detail-skeleton";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductSpecificationsSection } from "@/components/products/product-specifications-section";
import { RelatedProducts } from "@/components/products/related-products";
import { siteConfig } from "@/lib/site-config";
import { urlFor } from "@/sanity/lib/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const title = product?.title ?? "Product";
  const description = product?.description;
  const image = product?.images?.[0]
    ? urlFor(product.images[0]).url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/products/${slug}`,
      ...(image && { images: [image] }),
    },
    twitter: {
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  console.log("Produt page product", product);

  if (!product) {
    return notFound();
  }

  // Get related products (same collection or random)
  const relatedProducts =
    product.relatedProducts && product.relatedProducts.length > 0
      ? product.relatedProducts
      : [];
  return (
    <div className="min-h-screen bg-secondary">
      {/* Ultra-thin Header */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-light text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1} />
          Back to Products
        </Link>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pb-12">
        <Suspense fallback={<ProductDetailSkeleton />}>
          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left: Image Gallery */}
            <ProductImageGallery
              images={product.images || []}
              title={product.title}
            />

            {/* Right: Product Info & Download */}
            <div className="flex flex-col gap-8">
              <ProductInfo product={product} />
              <ProductBrochureDownload
                brochure={product.brochure}
                title={product.title}
              />
            </div>
          </div>

          {/* Specifications Section */}
          {product.specifications?.description &&
            product.specifications.description.length > 0 && (
              <div className="mb-16">
                <ProductSpecificationsSection product={product} />
              </div>
            )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts
              products={relatedProducts}
              currentProductId={product._id}
            />
          )}
        </Suspense>
      </div>

      {/* Ultra-thin CTA Section */}
      <div className="border-t border-zinc-100 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-light text-zinc-900">
              Need More Information?
            </h3>
            <p className="text-sm font-light text-zinc-600 max-w-2xl mx-auto">
              Our team is here to help you choose the right solution for your
              needs
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue text-white text-sm font-light transition-all duration-300 hover:bg-brand-blue/90 hover:shadow-lg hover:shadow-brand-blue/20"
              >
                Contact Us
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-zinc-200 text-zinc-700 text-sm font-light transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
