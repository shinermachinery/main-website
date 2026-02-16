import { CertificationCard } from "@/components/cards/certification-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getCertifications } from "@/sanity/lib/actions";

export async function CertificationsSection() {
  const certifications = await getCertifications(3);

  return (
    <section className="flex gap-10 items-start w-full">
      {/* Left: Heading */}
      <div className="w-[36.75rem] shrink-0 flex items-center">
        <h2 className="text-[1.875rem] font-medium leading-10 text-foreground tracking-[-0.0469rem] w-[24rem]">
          Trusted by Founders, Marketers, and Individuals
        </h2>
      </div>

      {/* Right: Certifications List */}
      {certifications.length === 0 ? (
        <div className="flex-1">
          <EmptyState
            size="sm"
            message="No certifications to display at this time."
          />
        </div>
      ) : (
        <div className="flex flex-col gap-10 flex-1">
          {certifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              title={cert.title}
              description={cert.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
