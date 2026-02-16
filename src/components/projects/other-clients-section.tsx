import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { getOtherClients } from "@/sanity/lib/actions";

export async function OtherClientsSection() {
  const clients = await getOtherClients(27);
  const totalLogos = Math.max(clients.length, 27);
  const logosPerRow = 9;

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 font-medium">
        <h2 className="text-4xl font-medium text-foreground">Other Clients</h2>
        <p className="text-lg text-muted-foreground">
          Trusted partners and clients we work with
        </p>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          size="sm"
          message="No clients to display at this time."
        />
      ) : (
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

                  const clientItem = clients[logoNumber];

                  return (
                    <div
                      key={logoIndex}
                      className="w-[7.5rem] h-[7.5rem] rounded-2xl bg-primary/10 relative overflow-hidden flex items-center justify-center"
                      title={clientItem?.companyName}
                    >
                      {clientItem?.logo ? (
                        <Image
                          src={clientItem.logo}
                          alt={clientItem.companyName || "Client logo"}
                          fill
                          className="object-contain p-4"
                          sizes="7.5rem"
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}
