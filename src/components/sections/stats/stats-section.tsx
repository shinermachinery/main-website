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
  if (facts.length === 0) {
    return (
      <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="text-center">
              <h2 className="text-[20px] leading-[28px] font-medium text-muted-foreground tracking-[-0.5px]">
                {title || "A few more facts about us"}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground text-center py-8">
              No stats to display at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-40">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[20px] leading-[28px] font-medium text-muted-foreground tracking-[-0.5px]">
              {title || "A few more facts about us"}
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {facts.slice(0, 4).map((fact) => (
              <div key={fact._key} className="text-center flex flex-col gap-1">
                <div className="text-[30px] leading-[40px] font-medium text-primary tracking-[-0.75px]">
                  {fact.number}+
                </div>
                <div className="text-sm font-medium leading-5 text-muted-foreground">
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
