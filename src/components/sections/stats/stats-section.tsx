import { EmptyState } from "@/components/ui/empty-state";

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
  return (
    <section className="py-40">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[1.25rem] leading-[1.75rem] font-medium text-muted-foreground tracking-[-0.031rem]">
              {title || "A few more facts about us"}
            </h2>
          </div>

          {facts.length === 0 ? (
            <EmptyState
              size="sm"
              message="No stats to display at this time."
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {facts.slice(0, 4).map((fact) => (
                <div key={fact._key} className="text-center flex flex-col gap-1">
                  <div className="text-[1.875rem] leading-[2.5rem] font-medium text-primary tracking-[-0.047rem]">
                    {fact.number}+
                  </div>
                  <div className="text-sm font-medium leading-5 text-muted-foreground">
                    {fact.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
