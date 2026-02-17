import { CertificationCard } from "@/components/cards/certification-card";
import { getCertifications } from "@/sanity/lib/actions";

export async function CertificationsSection() {
  const certifications = await getCertifications(3);

  if (certifications.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full lg:flex-row lg:items-start">
      {/* Left: Heading */}
      <div className="shrink-0 lg:w-1/2">
        <h2 className="text-xl font-medium text-foreground md:text-2xl lg:max-w-sm">
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
