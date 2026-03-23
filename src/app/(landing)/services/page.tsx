import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { PortableText } from "@/components/blog/portable-text";
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
        description="End-to-end support engineered around your rice processing plant — from hands-on operator training and genuine spare parts to 24/7 technical service, equipment modernization, and expert mill consultancy."
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
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="font-bold text-xl text-foreground">
                  {service.title}
                </h2>
                <p className="font-semibold text-base text-muted-foreground">
                  {service.description}
                </p>
                {service.content && (
                  <PortableText
                    value={service.content}
                    className="text-muted-foreground"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
