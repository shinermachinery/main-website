import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { StatsSection } from '@/components/landing/stats-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <StatsSection />
    </div>
  )
}
