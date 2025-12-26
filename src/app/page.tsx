import { Suspense } from 'react'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { StatsSection } from '@/components/landing/stats-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { ProductsData } from '@/components/landing/products-data'
import { ProductsSkeleton } from '@/components/landing/products-skeleton'
import { TeamData } from '@/components/landing/team-data'
import { TeamSkeleton } from '@/components/landing/team-skeleton'
import { TestimonialsData } from '@/components/landing/testimonials-data'
import { TestimonialsSkeleton } from '@/components/landing/testimonials-skeleton'
import { ContactForm } from '@/components/landing/contact-form'
import { Footer } from '@/components/landing/footer'
import { client } from '@/sanity/lib/client'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { productQuery } from '@/sanity/query/product'

export const metadata: Metadata = {
  title: 'Shiner - Precision Engineering Delivered With Confidence',
  description: 'Precision-engineered components and solutions built to perform and built to last. Discover our featured products, meet our expert team, and experience 24/7 support with global reach.',
  keywords: ['precision engineering', 'industrial components', 'manufacturing', 'engineering solutions', 'high precision', 'quality components'],
  authors: [{ name: 'Shiner Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shiner.example.com',
    title: 'Shiner - Precision Engineering Delivered With Confidence',
    description: 'Precision-engineered components and solutions built to perform and built to last.',
    siteName: 'Shiner',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shiner - Precision Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiner - Precision Engineering Delivered With Confidence',
    description: 'Precision-engineered components and solutions built to perform and built to last.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function HomePage() {
  const product = await sanityFetch({query:productQuery})
  console.log(product)
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsData />
      </Suspense>

      <StatsSection />
      <HowItWorksSection />

      <Suspense fallback={<TeamSkeleton />}>
        <TeamData />
      </Suspense>

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsData />
      </Suspense>

      <ContactForm />
      <Footer />
      <SanityLive/>
    </div>
  )
}
