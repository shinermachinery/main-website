import { CertificationCard } from "@/components/cards/certification-card";
import { getCertifications } from "@/sanity/lib/actions";

export async function CertificationsSection() {
  const certifications = await getCertifications(3);

  if (certifications.length === 0) {
    return (
      <section className="flex gap-10 items-start w-full">
        <div className="w-[588px] shrink-0 flex items-center">
          <h2 className="text-[1.875rem] font-medium leading-10 text-foreground tracking-[-0.0469rem] w-[384px]">
            Trusted by Founders, Marketers, and Individuals
          </h2>
        </div>
        <div className="flex-1">
          <p className="text-lg text-muted-foreground">
            No certifications to display at this time.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex gap-10 items-start w-full">
      {/* Left: Heading */}
      <div className="w-[588px] shrink-0 flex items-center">
        <h2 className="text-[1.875rem] font-medium leading-10 text-foreground tracking-[-0.0469rem] w-[384px]">
          Trusted by Founders, Marketers, and Individuals
        </h2>
      </div>

      {/* Right: Certifications List */}
      <div className="flex flex-col gap-10 flex-1">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            title={cert.title}
            description={cert.description}
          />
        ))}
      </div>
    </section>
  );
}
