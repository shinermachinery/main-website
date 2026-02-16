"use client";

import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { ContentSlider } from "@/components/ui/content-slider";
import type { Testimonial } from "@/lib/sanity-types";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

// Fallback testimonials data when Sanity returns empty
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "fallback-1",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
    customerName: "Sarah Mitchell",
    role: "Production Director, AutoTech Industries",
    content:
      "Shiner Machinery transformed our production line with their precision CNC equipment. The build quality is exceptional, and their technical support team has been outstanding. We've seen a 40% increase in efficiency since implementation.",
    rating: 5,
    featured: true,
  },
  {
    _id: "fallback-2",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
    customerName: "James Rodriguez",
    role: "Manufacturing Engineer, Precision Parts Co.",
    content:
      "Working with Shiner has been a game-changer for our fabrication processes. Their machinery delivers consistent precision, and the training they provided ensured our team was productive from day one. Highly recommended for serious manufacturing operations.",
    rating: 5,
    featured: true,
  },
  {
    _id: "fallback-3",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
    customerName: "Emily Chen",
    role: "Operations Manager, Industrial Solutions Ltd.",
    content:
      "The quality and reliability of Shiner's equipment is unmatched. We've been running their machines 24/7 for over two years with minimal downtime. Their preventive maintenance program keeps everything running smoothly.",
    rating: 5,
    featured: true,
  },
  {
    _id: "fallback-4",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
    customerName: "Michael Thompson",
    role: "Quality Control Lead, Advanced Manufacturing",
    content:
      "Shiner Machinery's attention to detail and precision engineering standards align perfectly with our quality requirements. Their equipment consistently delivers parts within tight tolerances, which is critical for our aerospace applications.",
    rating: 5,
    featured: true,
  },
  {
    _id: "fallback-5",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
    customerName: "Priya Sharma",
    role: "Plant Manager, Metro Fabrication",
    content:
      "From initial consultation to installation and ongoing support, Shiner has exceeded our expectations. Their team understood our unique requirements and delivered a custom solution that perfectly fits our workflow. Outstanding partnership.",
    rating: 5,
    featured: true,
  },
  {
    _id: "fallback-6",
    _type: "testimonial",
    _createdAt: "2024-01-01T00:00:00Z",
    _updatedAt: "2024-01-01T00:00:00Z",
    customerName: "David Anderson",
    role: "CEO, Precision Machining Group",
    content:
      "We've invested in multiple Shiner machines across our facilities. The ROI has been excellent, and the consistency across all units makes training and maintenance much easier. Their commitment to innovation keeps us competitive.",
    rating: 5,
    featured: true,
  },
];

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  // Use fallback data if no testimonials from Sanity
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : FALLBACK_TESTIMONIALS;

  return (
    <section className="py-40" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {/* Header - Two Column Layout */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <h2
              id="testimonials-heading"
              className="flex-1 font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.047rem] text-primary"
            >
              Testimonials
            </h2>
            <p className="flex-1 font-medium text-[1.25rem] leading-[1.75rem] tracking-[-0.031rem] text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur. Turpis bibendum eget
              adipiscing scelerisque proin. Neque tincidunt et pellentesque
              proin
            </p>
          </div>

          {/* Testimonials Carousel */}
          <ContentSlider
            items={displayTestimonials}
            renderItem={(testimonial) => (
              <TestimonialCard testimonial={testimonial} />
            )}
            itemsPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
            }}
            slidesToScroll={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
            }}
            gap={24}
            showNavigation={displayTestimonials.length > 3}
            showDots={false}
            className="relative"
          />
        </div>
      </div>
    </section>
  );
}
