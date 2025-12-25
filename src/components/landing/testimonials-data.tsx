import { client } from "@/sanity/lib/client";
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

export async function TestimonialsData() {
  const query = `*[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    customerName,
    role,
    content,
    rating,
    image {
      asset,
      alt
    }
  }`;

  const testimonials = await client.fetch<Testimonial[]>(query);

  return <TestimonialsCarousel testimonials={testimonials} />;
}
