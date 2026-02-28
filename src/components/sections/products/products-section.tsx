"use client";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/sanity-types";
import { toPlainText } from "@/lib/utils";
import { safeImageUrl } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <section
      id="products"
      className="w-full flex flex-col gap-10"
      aria-labelledby="products-heading"
    >
      {/* Header with Title and Button */}
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <h2
            id="products-heading"
            className="text-2xl font-medium text-foreground"
          >
            Featured Products
          </h2>
        </div>
        <Button
          variant={"shiner"}
          asChild
          className="flex items-center gap-2 px-4 py-2 rounded-full h-10 font-medium text-sm w-fit"
        >
          <Link href="/products">
            Explore Products
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => {
            const imageUrl = safeImageUrl(product?.images?.[0], 600, 400);

            return (
              <CarouselItem
                key={product._id}
                className="basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <ProductCard
                  title={product.title}
                  description={toPlainText(product.description)}
                  category={product.collections?.map((c) => c.title).join(", ")}
                  imageUrl={imageUrl}
                  imageAlt={product.images?.[0]?.alt || product.title}
                  href={`/products/${product.slug.current}`}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-6" />
        <CarouselNext className="-right-4 md:-right-6" />
      </Carousel>
    </section>
  );
}
