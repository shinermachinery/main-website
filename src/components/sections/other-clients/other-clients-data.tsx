import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image-blur";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTrustedPartners } from "@/sanity/lib/actions";

function ClientLogo({
  logo,
  companyName,
}: {
  logo?: string | null;
  companyName: string;
}) {
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

export async function OtherClientsData() {
  const trustedPartners = await getTrustedPartners(50);

  const allPartners = trustedPartners.map((p) => ({
    id: p.id,
    companyName: p.companyName,
    logo: p.logo ?? null,
  }));

  if (allPartners.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      <SectionHeading
        title="Our Trusted Partners"
        description="Leading brands we proudly work with"
      />

      <div className="overflow-hidden">
        <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
          {allPartners.map((partner) => (
            <ClientLogo
              key={partner.id}
              logo={partner.logo}
              companyName={partner.companyName}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
