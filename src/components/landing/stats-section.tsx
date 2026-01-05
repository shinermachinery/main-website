const stats = [
  {
    value: "500+",
    label: "Companies served",
  },
  {
    value: "500+",
    label: "Companies served",
  },
  {
    value: "500+",
    label: "Companies served",
  },
  {
    value: "500+",
    label: "Companies served",
  },
];

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-base font-normal text-gray-600">
              A few more facts about us
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="text-center space-y-2"
              >
                <div className="text-4xl md:text-5xl font-normal text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm font-normal text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
