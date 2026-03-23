import type { Testimonial } from "@/lib/sanity-types";
import { TestimonialsCarousel } from "./testimonials-carousel";

interface TestimonialsDataProps {
  testimonials?: Testimonial[];
}

export function TestimonialsData({ testimonials = [] }: TestimonialsDataProps) {
  return <TestimonialsCarousel testimonials={testimonials} />;
}
