import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getWhyChooseUs } from "@/sanity/lib/actions";

export const metadata: Metadata = {
  title: "Why Choose Us | SHINER",
  description:
    "Discover why leading companies choose SHINER for their food processing equipment needs. Quality, reliability, and exceptional service.",
};

async function WhyChooseUsContent() {
  const data = await getWhyChooseUs();

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1
            className="font-medium text-[2.25rem] leading-[3rem] tracking-[-0.0563rem] text-foreground"
          >
            {data.title}
          </h1>
          {data.subtitle && (
            <p
              className="font-medium text-[1.25rem] leading-[1.75rem] tracking-[-0.0313rem] text-muted-foreground"
            >
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Hero Image */}
        {data.heroImage && (
          <div className="relative w-full aspect-[16/6] rounded-[1.5rem] overflow-hidden">
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-width: 75rem) 100vw, 75rem"
              priority
            />
          </div>
        )}
      </section>

      {/* Reasons Grid */}
      {data.reasons.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.reasons.map((reason, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 rounded-2xl bg-muted"
            >
              {reason.icon && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                  <Image
                    src={reason.icon}
                    alt={reason.title}
                    fill
                    className="object-cover"
                    sizes="4rem"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium text-[1.25rem] leading-[1.75rem] tracking-[-0.0313rem] text-foreground"
                >
                  {reason.title}
                </h3>
                <p
                  className="font-normal text-sm leading-5 text-muted-foreground"
                >
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <p className="text-lg text-muted-foreground text-center py-8">
          No reasons to display at this time.
        </p>
      )}
    </div>
  );
}

function WhyChooseUsSkeleton() {
  return (
    <div className="flex flex-col gap-20 animate-pulse">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="h-12 bg-muted rounded-md w-64" />
          <div className="h-7 bg-muted rounded-md w-96" />
        </div>
        <div className="w-full aspect-[16/6] rounded-[1.5rem] bg-muted" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl bg-muted">
            <div className="w-16 h-16 rounded-xl bg-secondary" />
            <div className="flex flex-col gap-2">
              <div className="h-7 bg-secondary rounded-md w-3/4" />
              <div className="h-5 bg-secondary rounded-md w-full" />
              <div className="h-5 bg-secondary rounded-md w-5/6" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default function WhyChooseUsPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <Suspense fallback={<WhyChooseUsSkeleton />}>
          <WhyChooseUsContent />
        </Suspense>
      </div>
    </div>
  );
}
