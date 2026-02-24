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
  if (facts.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-foreground text-center">
        {title || "A few more facts about us"}
      </h2>

      {/* Fact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {facts.slice(0, 4).map((fact) => (
          <div
            key={fact._key}
            className="flex flex-col gap-3 rounded-xl bg-secondary p-6"
          >
            <span className="text-sm font-semibold text-primary text-center">
              {fact.number}+
            </span>
            <p className="text-lg font-semibold text-foreground text-center">
              {fact.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
