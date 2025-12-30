import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getOtherClients() {
  try {
    const clients = await client.fetch(
      `*[_type == "client"] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        logo
      }[0...27]`,
    );

    return clients || [];
  } catch (error) {
    console.error("Error fetching other clients:", error);
    return [];
  }
}

export async function OtherClientsSection() {
  const clients = await getOtherClients();
  const totalLogos = Math.max(clients.length, 27);
  const logosPerRow = 9;

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium leading-[48px] text-zinc-900 tracking-[-0.9px]">
          Other Clients
        </h2>
        <p className="text-xl leading-7 text-zinc-500 tracking-[-0.5px]">
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* Logo Grid */}
      <div className="flex flex-col gap-10">
        {Array.from({ length: Math.ceil(totalLogos / logosPerRow) }).map(
          (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-10 items-center justify-center flex-wrap"
            >
              {Array.from({ length: logosPerRow }).map((_, logoIndex) => {
                const logoNumber = rowIndex * logosPerRow + logoIndex;
                if (logoNumber >= totalLogos) return null;

                const client = clients[logoNumber];

                return (
                  <div
                    key={logoIndex}
                    className="w-[120px] h-[120px] rounded-2xl bg-zinc-900/10 relative overflow-hidden flex items-center justify-center"
                    title={client?.companyName}
                  >
                    {client?.logo ? (
                      <Image
                        src={urlFor(client.logo).url()}
                        alt={client.companyName || "Client logo"}
                        fill
                        className="object-contain p-4"
                        sizes="120px"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
