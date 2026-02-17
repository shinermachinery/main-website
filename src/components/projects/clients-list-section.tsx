import { ClientCard } from "@/components/cards/client-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getClientListInColumns } from "@/sanity/lib/actions";

export async function ClientsListSection() {
  const clientsData = await getClientListInColumns(3);

  if (!clientsData) return null;

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <SectionHeading
        title="Plant Engineering Clients List"
        description="Trusted partners who rely on our precision-engineered machinery for their food processing operations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientsData.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {column.map((clientItem) => (
              <ClientCard
                key={clientItem.id}
                companyName={clientItem.companyName}
                projects={clientItem.projects}
              />
            ))}
            {/* Add highlight card in last column */}
            {columnIndex === 2 && (
              <ClientCard
                companyName="50+ PLANTS RUNNING SMOOTHLY"
                projects={[]}
                isHighlight
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
