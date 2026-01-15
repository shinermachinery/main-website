import { getClientsInColumns } from "@/sanity/lib/actions";
import { ClientCard } from "@/components/cards/client-card";

export async function ClientsListSection() {
  const clientsData = await getClientsInColumns(3);

  if (!clientsData) {
    return (
      <section className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 font-medium">
          <h2 className="text-4xl font-medium text-primary">
            Plant Engineering Clients List
          </h2>
          <p className="text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
            ullamcorper purus
          </p>
        </div>
        <p className="text-lg text-muted-foreground text-center py-8">
          No clients to display at this time.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium text-primary">
          Plant Engineering Clients List
        </h2>
        <p className="text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* 3-Column Grid */}
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
