import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOtherClients } from "@/sanity/lib/actions";

function ClientLogo({
  logo,
  companyName,
}: { logo?: string | null; companyName: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="size-28 shrink-0 rounded-2xl bg-background relative overflow-hidden flex items-center justify-center">
          {logo && (
            <Image
              src={logo}
              alt={companyName || "Client logo"}
              fill
              className="object-contain p-4"
              sizes="7rem"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          )}
        </div>
      </TooltipTrigger>
      {companyName && <TooltipContent>{companyName}</TooltipContent>}
    </Tooltip>
  );
}

export async function OtherClientsSection() {
  const clients = await getOtherClients(50);

  const third = Math.ceil(clients.length / 3);
  const firstRow = clients.slice(0, third);
  const secondRow = clients.slice(third, third * 2);
  const thirdRow = clients.slice(third * 2);

  return (
    <section className="flex flex-col gap-10 w-full">
      {/* Header */}
      <SectionHeading
        title="Other Clients"
        description="Trusted partners and clients we work with"
      />

      {clients.length === 0 ? (
        <p className="text-sm text-muted-foreground">No clients to display at this time.</p>
      ) : (
        <div className="flex flex-col gap-6 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
            {firstRow.map((client) => (
              <ClientLogo
                key={client.id}
                logo={client.logo}
                companyName={client.companyName}
              />
            ))}
          </Marquee>

          {secondRow.length > 0 && (
            <Marquee
              pauseOnHover
              reverse
              className="[--duration:60s] [--gap:1.5rem]"
            >
              {secondRow.map((client) => (
                <ClientLogo
                  key={client.id}
                  logo={client.logo}
                  companyName={client.companyName}
                />
              ))}
            </Marquee>
          )}

          {thirdRow.length > 0 && (
            <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
              {thirdRow.map((client) => (
                <ClientLogo
                  key={client.id}
                  logo={client.logo}
                  companyName={client.companyName}
                />
          ))}
            </Marquee>
          )}
        </div>
      )}
    </section>
  );
}
