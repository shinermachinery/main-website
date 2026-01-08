interface Fact {
  _key: string;
  number: number;
  text: string;
}

interface StatsSectionProps {
  title?: string;
  facts?: Fact[];
}

export function StatsSection({ title, facts = [] }: StatsSectionProps) {
  // Fallback stats if no facts provided
  const displayFacts = facts.length > 0 ? facts : [
    { _key: "1", number: 500, text: "Companies served" },
    { _key: "2", number: 1000, text: "Projects completed" },
    { _key: "3", number: 50, text: "Countries reached" },
    { _key: "4", number: 24, text: "Hours support" },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-base font-normal text-gray-600">
              {title || "A few more facts about us"}
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {displayFacts.map((fact) => (
              <div
                key={fact._key}
                className="text-center space-y-2"
              >
                <div className="text-4xl md:text-5xl font-normal text-gray-900">
                  {fact.number}+
                </div>
                <div className="text-sm font-normal text-gray-600">
                  {fact.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
