import type { Metadata } from "next";
import { Suspense } from "react";
import { AboutSection } from "@/components/sections/about/about-section";
import { BrandStoryData } from "@/components/sections/brand-story/brand-story-data";
import { BrandStorySkeleton } from "@/components/sections/brand-story/brand-story-skeleton";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works/how-it-works-section";
import { ProductsData } from "@/components/sections/products/products-data";
import { ProductsSkeleton } from "@/components/sections/products/products-skeleton";
import { StatsSection } from "@/components/sections/stats/stats-section";
import { TestimonialsData } from "@/components/testimonials/testimonials-data";
import { TestimonialsSkeleton } from "@/components/testimonials/testimonials-skeleton";
import { getAllHomeData } from "@/actions/home";

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

export default async function HomePage() {
  const homeData = await getAllHomeData();

  // Default values for hero section (convert null to undefined to use component defaults)
  const heroProps = {
    headline: homeData.home?.heroHeadline || undefined,
    description: homeData.home?.heroDescription || undefined,
    primaryCta: homeData.home?.heroPrimaryCta || undefined,
    secondaryCta: homeData.home?.heroSecondaryCta || undefined,
    backgroundImage: homeData.home?.heroBackgroundImage || undefined,
  };

  return (
    <div className="bg-secondary">
      <HeroSection {...heroProps} />
      <AboutSection
        title={homeData.home?.wordAboutUsTitle}
        description={homeData.home?.wordAboutUsDescription}
      />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsData />
      </Suspense>

      <StatsSection
        title={homeData.home?.fewMoreFactsTitle}
        facts={homeData.home?.facts || []}
      />
      <HowItWorksSection
        title={homeData.home?.trustedByFounderTitle}
        certificates={homeData.home?.certificates || []}
      />

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsData testimonials={homeData.testimonials} />
      </Suspense>

      <Suspense fallback={<BrandStorySkeleton />}>
        <BrandStoryData
          title={homeData.home?.brandStoryTitle}
          description={homeData.home?.brandStoryDescription}
          videos={homeData.home?.brandStoryVideos || []}
          teamMembers={homeData.teamMembers}
        />
      </Suspense>

      <ContactForm />
    </div>
  );
}
