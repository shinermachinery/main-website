import { features } from "@/data/features";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 md:py-32 bg-secondary"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Heading Column */}
          <div>
            <h2
              id="features-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary"
            >
              Built to Perform
              <br />
              Built to Last
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-background rounded-2xl p-6 space-y-4 hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue-10 to-brand-green-10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
