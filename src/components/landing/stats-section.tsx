import { TrendingUp } from "lucide-react";
import { defaultFacts, type Fact } from "@/data/stats";

interface StatsSectionProps {
  title?: string;
  facts?: Fact[];
}

export function StatsSection({ title, facts = [] }: StatsSectionProps) {
  // Fallback stats if no facts provided
  const displayFacts = facts.length > 0 ? facts : defaultFacts;

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
            {displayFacts.slice(0, 4).map((fact) => (
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
