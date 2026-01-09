import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { dummyServices } from "@/data/fallback/services";

export const metadata: Metadata = {
  title: "Our Services | Shiner",
  description:
    "Explore our comprehensive services including training, spare parts, after-sale service, equipment modernization, and consultancy services.",
};

interface Service {
  id: string | number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

async function getServices() {
  try {
    const services = await client.fetch(
      `*[_type == "service"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description,
        image,
        "slug": slug.current
      }`,
    );

    if (!services || services.length === 0) {
      return dummyServices;
    }

    return services.map(
      (service: {
        _id: string;
        title: string;
        description: string;
        image?: any;
        slug: string;
      }) => ({
        id: service._id,
        title: service.title,
        description: service.description,
        image: service.image
          ? urlFor(service.image).url()
          : dummyServices[0].image,
        slug: service.slug,
      }),
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return dummyServices;
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-[1156px] mx-auto">
          {/* Page Header */}
          <div className="flex flex-col gap-4 mb-10">
            <h1
              className="font-medium text-4xl text-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Our Services
            </h1>
            <p
              className="font-medium text-lg text-muted-foreground"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Lorem ipsum dolor sit amet consectetur. Luctus arcu congue
              dictumst ullamcorper purus
            </p>
          </div>

          {/* Services List */}
          <div className="flex flex-col gap-10">
            {services.map((service: Service) => (
              <div
                key={service.id}
                className="flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Image */}
                <div className="bg-background rounded-2xl shrink-0 w-full md:w-[20.625rem]">
                  <div className="relative w-full aspect-282/168 rounded-2xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 330px"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-4">
                  <h2
                    className="font-medium text-lg text-foreground"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {service.title}
                  </h2>
                  <p
                    className="font-normal text-sm text-muted-foreground"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-full self-start"
                    style={{
                      backgroundImage:
                        "linear-gradient(89.24deg, rgba(42, 94, 152, 1) 27.51%, rgba(24, 183, 90, 1) 115.04%)",
                      boxShadow:
                        "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.2)",
                    }}
                  >
                    <Phone className="h-5 w-5 text-white" />
                    <span
                      className="font-medium text-sm leading-5 text-white"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      View Details
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
