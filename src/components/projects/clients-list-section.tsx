import { ClientCard } from "@/components/cards/client-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getClientList } from "@/sanity/lib/actions";

export async function ClientsListSection() {
  const clients = await getClientList();

  if (clients.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <SectionHeading
        title="Plant Engineering Clients List"
        description="Trusted partners who rely on our precision-engineered machinery for their food processing operations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((clientItem) => (
          <ClientCard
            key={clientItem.id}
            companyName={clientItem.companyName}
            projects={clientItem.projects}
          />
        ))}
        {/* Highlight card */}
        <ClientCard
          companyName="50+ PLANTS RUNNING SMOOTHLY"
          projects={[]}
          isHighlight
        />
      </div>
    </section>
  );
}
