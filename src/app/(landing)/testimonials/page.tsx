import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/site-config";
import { getAllTestimonials } from "@/sanity/lib/actions";

export const metadata = pageMetadata.testimonials;

const FALLBACK_TESTIMONIALS = [
  {
    _id: "fallback-1",
    _type: "testimonial" as const,
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
    _type: "testimonial" as const,
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
    _type: "testimonial" as const,
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
    _type: "testimonial" as const,
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
    _type: "testimonial" as const,
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
    _type: "testimonial" as const,
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

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-12 flex flex-col gap-12">
      <SectionHeading
        title="Testimonials"
        description="Hear from the manufacturers who trust Shiner Machinery to power their production lines with precision and reliability."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
