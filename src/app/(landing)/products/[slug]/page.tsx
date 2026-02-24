import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductBySlug } from "@/actions/products";
import { PortableText } from "@/components/blog/portable-text";
import { Button } from "@/components/ui/button";
import { ProductBrochureDownload } from "@/components/products/product-brochure-download";
import { ProductDetailSkeleton } from "@/components/products/product-detail-skeleton";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductInfo } from "@/components/products/product-info";
import { ProductSingleImage } from "@/components/products/product-single-image";
import { ProductSpecificationsSection } from "@/components/products/product-specifications-section";
import { RelatedProducts } from "@/components/products/related-products";
import { siteConfig } from "@/lib/site-config";
import { safeImageUrl } from "@/sanity/lib/image";

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
  const image = safeImageUrl(product?.images?.[0], 1200, 630);

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

  if (!product) {
    return notFound();
  }

  const displayType = product.displayType || "gallery";

  // Get related products (same collection or random)
  const relatedProducts =
    product.relatedProducts && product.relatedProducts.length > 0
      ? product.relatedProducts
      : [];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-12 flex flex-col gap-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1} />
        Back to Products
      </Link>

      <Suspense fallback={<ProductDetailSkeleton />}>
        {/* Main Product Section - layout varies by displayType */}
        {displayType === "textOnly" ? (
          <div className="max-w-4xl mx-auto mb-16">
            <ProductInfo product={product} />
            {product.body && product.body.length > 0 && (
              <div className="mt-8">
                <PortableText value={product.body} />
              </div>
            )}
            <div className="mt-8">
              <ProductBrochureDownload
                brochure={product.brochure}
                title={product.title}
              />
            </div>
          </div>
        ) : displayType === "imageText" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <ProductSingleImage
              image={product.images?.[0]}
              title={product.title}
            />
            <div className="flex flex-col gap-8">
              <ProductInfo product={product} />
              {product.body && product.body.length > 0 && (
                <PortableText value={product.body} />
              )}
              <ProductBrochureDownload
                brochure={product.brochure}
                title={product.title}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <ProductImageGallery
              images={product.images || []}
              title={product.title}
            />
            <div className="flex flex-col gap-8">
              <ProductInfo product={product} />
              <ProductBrochureDownload
                brochure={product.brochure}
                title={product.title}
              />
            </div>
          </div>
        )}

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

      {/* Ultra-thin CTA Section */}
{/* 
      <div className="text-center space-y-4 mt-10 border-t border-border pt-10">
        <h3 className="text-xl font-light text-foreground">
          Need More Information?
        </h3>
        <p className="text-sm font-light text-muted-foreground max-w-2xl mx-auto">
          Our team is here to help you choose the right solution for your needs
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button variant="shiner" asChild className="rounded-full px-6">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="shiner" asChild className="rounded-full px-6">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div> */}
    </div>
  );
}
