import { client } from "@/sanity/lib/client";
import { ClientCard } from "@/components/global/cards";
import { dummyClients } from "@/data/fallback/clients";

const dummyClientsData = dummyClients;

async function getClients() {
  try {
    const clients = await client.fetch(
      `*[_type == "client" && !highlight] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        projects
      }`,
    );

    if (!clients || clients.length === 0) {
      return dummyClientsData;
    }

    // Distribute clients across 3 columns
    const columns: any[][] = [[], [], []];
    clients.forEach((client: any, index: number) => {
      columns[index % 3].push({
        companyName: client.companyName,
        projects: client.projects || [],
      });
    });

    return columns;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return dummyClientsData;
  }
}

export async function ClientsListSection() {
  const clientsData = await getClients();
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
            {column.map((client, clientIndex) => (
              <ClientCard
                key={clientIndex}
                companyName={client.companyName}
                projects={client.projects}
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
