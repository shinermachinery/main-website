const stats = [
  {
    value: '500+',
    label: 'Products',
  },
  {
    value: '100+',
    label: 'Global Partners',
  },
  {
    value: '50K+',
    label: 'Happy Customers',
  },
  {
    value: '99%',
    label: 'Satisfaction Rate',
  },
]

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center space-y-2 relative"
            >
              {index !== stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-16 w-px bg-border" />
              )}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
