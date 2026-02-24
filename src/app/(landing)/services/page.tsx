import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/site-config";
import { getServices } from "@/sanity/lib/actions";

export const metadata = pageMetadata.services;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-secondary max-w-7xl mx-auto px-4 py-16 md:py-12">
      {/* Page Header */}
      <SectionHeading
        as="h1"
        title="Our Services"
        description="From installation and training to spare parts and ongoing support, we ensure your machinery performs at its best throughout its lifecycle."
        className="mb-10"
      />

      {/* Services List */}
      {services.length === 0 ? (
        <EmptyState size="sm" message="No services to display at this time." />
      ) : (
        <div className="flex flex-col gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Image */}
              <div className="bg-background rounded-2xl shrink-0 w-full md:w-sm">
                <div className="relative w-full aspect-282/168 rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 48rem) 100vw, 20.625rem"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="font-medium text-base text-foreground">
                  {service.title}
                </h2>
                <p className="font-normal text-sm text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-full self-start"
                  style={{
                    backgroundImage:
                      "linear-gradient(89.24deg, rgba(42, 94, 152, 1) 27.51%, rgba(24, 183, 90, 1) 115.04%)",
                    boxShadow:
                      "inset 0rem 0.25rem 1.806rem 0rem rgba(244, 244, 245, 0.2)",
                  }}
                >
                  <Phone className="h-5 w-5 text-white" />
                  <span className="font-medium text-sm text-white">
                    View Details
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
