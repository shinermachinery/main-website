'use client'

import { useState } from 'react'
import Image from 'next/image'
import { imageBuilder } from '@/sanity/lib/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  _id: string
  customerName: string
  role?: string
  content: string
  rating: number
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Testimonials coming soon!
            </p>
          </div>
        </div>
      </section>
    )
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Show 3 testimonials at a time on desktop, 1 on mobile
  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by industry leaders worldwide
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            {testimonials.length > 3 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-card border shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-card border shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleTestimonials.map((testimonial, idx) => {
                const imageUrl = testimonial.image
                  ? imageBuilder.image(testimonial.image).width(100).height(100).url()
                  : '/placeholder-avatar.jpg'

                return (
                  <div
                    key={`${testimonial._id}-${idx}`}
                    className="rounded-2xl border bg-card p-8 space-y-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Rating */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? 'fill-brand-green text-brand-green'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4 pt-4 border-t">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={imageUrl}
                          alt={testimonial.image?.alt || testimonial.customerName}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.customerName}</p>
                        {testimonial.role && (
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Indicators */}
            {testimonials.length > 3 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-8 bg-gradient-to-r from-brand-blue to-brand-green'
                        : 'w-2 bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
