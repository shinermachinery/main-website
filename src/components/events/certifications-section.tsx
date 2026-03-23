import { CertificationCard } from "@/components/cards/certification-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCertifications } from "@/sanity/lib/actions";

export async function CertificationsSection() {
  const certifications = await getCertifications(10);

  if (certifications.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      <SectionHeading title="Our Certifications" />

      <div className="flex flex-wrap justify-center gap-6">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            title={cert.title}
            description={cert.description}
            image={cert.image}
          />
        ))}
      </div>
    </section>
  );
}
