import { Suspense } from 'react'
import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { StatsSection } from '@/components/landing/stats-section'
import { ProductsData } from '@/components/landing/products-data'
import { ProductsSkeleton } from '@/components/landing/products-skeleton'
import { TeamData } from '@/components/landing/team-data'
import { TeamSkeleton } from '@/components/landing/team-skeleton'
import { TestimonialsData } from '@/components/landing/testimonials-data'
import { TestimonialsSkeleton } from '@/components/landing/testimonials-skeleton'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsData />
      </Suspense>

      <StatsSection />

      <Suspense fallback={<TeamSkeleton />}>
        <TeamData />
      </Suspense>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsData />
      </Suspense>
    </div>
  )
}
