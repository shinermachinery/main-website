import type { Metadata } from "next";
import { Suspense } from "react";
import { AboutSection } from "@/components/landing/about-section";
import { BrandStoryData } from "@/components/landing/brand-story-data";
import { BrandStorySkeleton } from "@/components/landing/brand-story-skeleton";
import { ContactForm } from "@/components/landing/contact-form";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProductsData } from "@/components/landing/products-data";
import { ProductsSkeleton } from "@/components/landing/products-skeleton";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsData } from "@/components/landing/testimonials-data";
import { TestimonialsSkeleton } from "@/components/landing/testimonials-skeleton";

export const metadata: Metadata = {
  title: "Shiner - Precision Engineering Delivered With Confidence",
  description:
    "Precision-engineered components and solutions built to perform and built to last. Discover our featured products, meet our expert team, and experience 24/7 support with global reach.",
  keywords: [
    "precision engineering",
    "industrial components",
    "manufacturing",
    "engineering solutions",
    "high precision",
    "quality components",
  ],
  authors: [{ name: "Shiner Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shiner.example.com",
    title: "Shiner - Precision Engineering Delivered With Confidence",
    description:
      "Precision-engineered components and solutions built to perform and built to last.",
    siteName: "Shiner",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shiner - Precision Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiner - Precision Engineering Delivered With Confidence",
    description:
      "Precision-engineered components and solutions built to perform and built to last.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsData />
      </Suspense>

      <StatsSection />
      <HowItWorksSection />

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsData />
      </Suspense>

      <Suspense fallback={<BrandStorySkeleton />}>
        <BrandStoryData />
      </Suspense>

      <ContactForm />
    </div>
  );
}
