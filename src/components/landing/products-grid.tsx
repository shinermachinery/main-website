'use client'

import Image from 'next/image'
import { GradientButton } from '@/components/ui/gradient-button'
import { imageBuilder } from '@/sanity/lib/image'
import { ArrowRight } from 'lucide-react'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  price?: number
  features?: string[]
}

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              No products available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="py-24 md:py-32 bg-secondary/30" aria-labelledby="products-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 id="products-heading" className="text-4xl md:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our precision-engineered solutions built to perform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* {products.map((product) => {
              const imageUrl = product.image
                ? imageBuilder.image(product.image).width(600).height(600).url()
                : '/placeholder-product.jpg'

              return (
                <div
                  key={product._id}
                  className="group rounded-2xl border bg-card overflow-hidden transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={product.image?.alt || product.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-semibold">{product.title}</h3>

                    {product.description && (
                      <p className="text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {product.price !== undefined && (
                      <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
                        ${product.price.toFixed(2)}
                      </p>
                    )}

                    {product.features && product.features.length > 0 && (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-green mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <GradientButton className="w-full">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </GradientButton>
                  </div>
                </div>
              )
            })} */}
          </div>
        </div>
      </div>
    </section>
  )
}
