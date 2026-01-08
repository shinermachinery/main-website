import { TestimonialsCarousel } from "./testimonials-carousel";

interface Testimonial {
  _id: string;
  customerName: string;
  role?: string;
  content: string;
  rating: number;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

interface TestimonialsDataProps {
  testimonials?: Testimonial[];
}

export function TestimonialsData({ testimonials = [] }: TestimonialsDataProps) {
  // Ensure all testimonials have a rating (default to 5 if missing)
  const testimonialsWithRating = testimonials.map((testimonial) => ({
    ...testimonial,
    rating: testimonial.rating ?? 5,
  }));
  
  return <TestimonialsCarousel testimonials={testimonialsWithRating} />;
}
