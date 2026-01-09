import { defaultFacts, type Fact } from "@/data/stats";

interface StatsSectionProps {
  title?: string;
  facts?: Fact[];
}

export function StatsSection({ title, facts = [] }: StatsSectionProps) {
  // Fallback stats if no facts provided
  const displayFacts = facts.length > 0 ? facts : defaultFacts;

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-base font-normal text-muted-foreground">
              {title || "A few more facts about us"}
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {displayFacts.map((fact) => (
              <div key={fact._key} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-normal text-foreground">
                  {fact.number}+
                </div>
                <div className="text-sm font-normal text-muted-foreground">
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
