import { client } from "@/sanity/lib/client";
import { ClientCard } from "@/components/cards/client-card";

interface ClientData {
  companyName: string;
  projects: string[];
}

async function getClients(): Promise<ClientData[][] | null> {
  try {
    const clients = await client.fetch(
      `*[_type == "client" && !highlight] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        projects
      }`,
    );

    if (!clients || clients.length === 0) {
      return null;
    }

    // Distribute clients across 3 columns
    const columns: ClientData[][] = [[], [], []];
    clients.forEach((clientItem: any, index: number) => {
      columns[index % 3].push({
        companyName: clientItem.companyName,
        projects: clientItem.projects || [],
      });
    });

    return columns;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return null;
  }
}

export async function ClientsListSection() {
  const clientsData = await getClients();

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
            {column.map((clientItem, clientIndex) => (
              <ClientCard
                key={clientIndex}
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
