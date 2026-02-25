import { CertificationCard } from "@/components/cards/certification-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { getCertifications } from "@/sanity/lib/actions";

export async function CertificationsSection() {
  const certifications = await getCertifications(10);

  if (certifications.length === 0) return null;

  return (
    <section className="flex flex-col gap-10 w-full">
      <SectionHeading title="Our Certifications" />

      <Marquee reverse pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
        {certifications.map((cert) => (
          <CertificationCard
            key={cert.id}
            title={cert.title}
            description={cert.description}
            image={cert.image}
          />
        ))}
      </Marquee>
    </section>
  );
}
