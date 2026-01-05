import { client } from "@/sanity/lib/client";
import { ClientCard } from "./client-card";

const dummyClientsData = [
  // Column 1
  [
    {
      companyName: "SUNSTAR OVERSEAS LIMITED, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT) – FULLY AUTOMATIC",
      ],
    },
    {
      companyName: "JASMER FOODS, LADWA",
      projects: ["8 METRIC TONNE PADDY TO RICE PLANT - Fully Automatic"],
    },
    {
      companyName: "DUNAR FOOD, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT - Fully Automatic",
      ],
    },
  ],
  // Column 2
  [
    {
      companyName: "DUNAR FOOD, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT - Fully Automatic",
      ],
    },
    {
      companyName: "SUNSTAR OVERSEAS LIMITED, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT) – FULLY AUTOMATIC",
      ],
    },
    {
      companyName: "JASMER FOODS, LADWA",
      projects: ["8 METRIC TONNE PADDY TO RICE PLANT - Fully Automatic"],
    },
  ],
  // Column 3
  [
    {
      companyName: "JASMER FOODS, LADWA",
      projects: ["8 METRIC TONNE PADDY TO RICE PLANT - Fully Automatic"],
    },
    {
      companyName: "SUNSTAR OVERSEAS LIMITED, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT) – FULLY AUTOMATIC",
      ],
    },
  ],
];

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
        <h2 className="text-4xl font-medium leading-[48px] text-zinc-900 tracking-[-0.9px]">
          Plant Engineering Clients List
        </h2>
        <p className="text-xl leading-7 text-zinc-500 tracking-[-0.5px]">
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
