import { Suspense } from "react";
import { getAllHomeData } from "@/actions/home";
import { AboutSection } from "@/components/sections/about/about-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { HighlightsSection } from "@/components/sections/highlights/highlights-section";
import { HowItWorksSection } from "@/components/sections/how-it-works/how-it-works-section";
import { ProductsData } from "@/components/sections/products/products-data";
import { ProductsSkeleton } from "@/components/sections/products/products-skeleton";
import { StatsSection } from "@/components/sections/stats/stats-section";
import { TestimonialsData } from "@/components/testimonials/testimonials-data";
import { TestimonialsSkeleton } from "@/components/testimonials/testimonials-skeleton";
import { pageMetadata } from "@/lib/site-config";

export const metadata = pageMetadata.home;

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
      <HeroSection {...heroProps} featuredProducts={homeData.featuredProducts} />
      <AboutSection
        title={homeData.home?.wordAboutUsTitle}
        description={homeData.home?.wordAboutUsDescription}
      />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsData />
      </Suspense>

      <HighlightsSection />

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
      {/* 
      <Suspense fallback={<BrandStorySkeleton />}>
        <BrandStoryData
          title={homeData.home?.brandStoryTitle}
          description={homeData.home?.brandStoryDescription}
          videos={homeData.home?.brandStoryVideos || []}
          teamMembers={homeData.teamMembers}
        />
      </Suspense> */}

      <FaqSection />
      <ContactSection />
    </div>
  );
}
