import { Hammer, Settings, TrendingUp, Globe } from 'lucide-react'

const features = [
  {
    icon: Hammer,
    title: 'Highest Precision Components',
    description: 'Engineered for accurate, consistent performance.',
  },
  {
    icon: Settings,
    title: '24/7 Support & Service',
    description: 'Dedicated support team available around the clock.',
  },
  {
    icon: TrendingUp,
    title: 'Productivity Focused',
    description: 'Tools designed to maximize efficiency and output.',
  },
  {
    icon: Globe,
    title: 'Global Reach, Local Support',
    description: 'Worldwide distribution with personalized service.',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Heading Column */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Built to Perform
              <br />
              Built to Last
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-background rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue-10 to-brand-green-10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
