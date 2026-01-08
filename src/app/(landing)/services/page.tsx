import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

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

// Dummy services data as fallback
const dummyServices: Service[] = [
  {
    id: 1,
    title: "Training",
    description:
      "We organize online training to train customers on a particular technology or sector and develop your team's competence. Even our engineers visit the site for the installation of the machines or equipment's and teach the working and principle of the product.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    slug: "training",
  },
  {
    id: 2,
    title: "Spare Parts and Materials",
    description:
      "Shiner helps keep your equipment in perfect condition with certified genuine components and spares. Spares are tested, verified, and come with applicable warranty. We maintain a stock of all critical spare parts to guarantee a quick response time. Maintenance contracts are provided as per the customer's requirements.",
    image:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=400&fit=crop&q=80",
    slug: "spare-parts",
  },
  {
    id: 3,
    title: "After-Sale Service",
    description:
      "Our expert service engineers for different regions across India and abroad attend to calls promptly and efficiently. For in-time spares availability, we have distributors across the country & overseas. Our engineers are ready to visit the customer's facility to perform pre-emptive maintenance on the equipment. This minimizes unforeseen operational down time and ensures operator safety.",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&h=400&fit=crop&q=80",
    slug: "after-sale-service",
  },
  {
    id: 4,
    title: "Equipment Modernization",
    description:
      "We can help you extend life of your equipment, meet new regulatory standards, improve performance and enhance functionalities. All the new updates and new technology in the product would done as per customer need.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80",
    slug: "equipment-modernization",
  },
  {
    id: 5,
    title: "Consultancy Services",
    description:
      "Trust Shiner expertise to help you maximize performance of your machine, implement good industrial practices and generate additional value for your operations and to increase your revenue.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    slug: "consultancy-services",
  },
];

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
          <div className="flex flex-col gap-[16px] mb-[40px]">
            <h1
              className="font-medium text-4xl text-primary"
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
          <div className="flex flex-col gap-[40px]">
            {services.map((service: Service) => (
              <div
                key={service.id}
                className="flex flex-col md:flex-row gap-[24px] items-start"
              >
                {/* Image */}
                <div className="bg-background rounded-2xl shrink-0 w-full md:w-[330px]">
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
                <div className="flex-1 flex flex-col gap-[16px]">
                  <h2
                    className="font-medium text-lg text-primary"
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
                    className="inline-flex items-center justify-center gap-[8px] h-[40px] px-[16px] py-[8px] rounded-full self-start"
                    style={{
                      backgroundImage:
                        "linear-gradient(89.24deg, rgba(42, 94, 152, 1) 27.51%, rgba(24, 183, 90, 1) 115.04%)",
                      boxShadow:
                        "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.2)",
                    }}
                  >
                    <Phone className="h-5 w-5 text-white" />
                    <span
                      className="font-medium text-[14px] leading-[20px] text-white"
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
