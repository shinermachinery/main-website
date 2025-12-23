import { GradientButton } from '@/components/ui/gradient-button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center bg-secondary overflow-hidden"
      aria-label="Hero section"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-10 via-transparent to-brand-green-10 opacity-50" aria-hidden="true" />
      <div className="absolute top-24 left-24 w-96 h-96 bg-brand-blue-10 rounded-full blur-3xl opacity-30" aria-hidden="true" />
      <div className="absolute bottom-24 right-24 w-96 h-96 bg-brand-green-10 rounded-full blur-3xl opacity-30" aria-hidden="true" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
              Precision Engineering
            </span>
            <br />
            <span className="text-foreground">Delivered With Confidence</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Shiner brings you laboratory-grade precision instruments engineered
            for accuracy, built to perform, and designed to last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <GradientButton size="lg" className="min-w-[200px]">
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </GradientButton>
            <GradientButton variant="secondary" size="lg" className="min-w-[200px]">
              Contact Us
            </GradientButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down indicator"
        role="img"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground rounded-full" />
        </div>
      </div>
    </section>
  )
}
