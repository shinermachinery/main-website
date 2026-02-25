interface Fact {
  _key: string;
  number: number;
  text: string;
}

interface StatsSectionProps {
  title?: string;
  facts?: Fact[];
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    const k = num / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export function StatsSection({ title, facts = [] }: StatsSectionProps) {
  if (facts.length === 0) return null;

  return (
    <section className="w-full rounded-3xl bg-linear-to-r from-brand-blue to-brand-green p-10 md:p-14">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-white text-center mb-10">
        {title || "A few more facts about us"}
      </h2>

      {/* Fact Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {facts.slice(0, 4).map((fact) => (
          <div
            key={fact._key}
            className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
          >
            <span className="text-3xl md:text-4xl font-bold text-white">
              {formatNumber(fact.number)}+
            </span>
            <p className="text-sm md:text-base font-medium text-white/80 text-center">
              {fact.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
