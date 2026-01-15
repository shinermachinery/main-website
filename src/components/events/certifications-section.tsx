import { client } from "@/sanity/lib/client";
import { CertificationCard } from "@/components/cards/certification-card";

interface Certification {
  id: string;
  title: string;
  description: string;
}

async function getCertifications(): Promise<Certification[]> {
  try {
    const certifications = await client.fetch(
      `*[_type == "certification"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description
      }[0...3]`,
    );

    if (!certifications || certifications.length === 0) {
      return [];
    }

    return certifications.map(
      (cert: { _id: string; title: string; description: string }) => ({
        id: cert._id,
        title: cert.title,
        description: cert.description,
      }),
    );
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

export async function CertificationsSection() {
  const certifications = await getCertifications();

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
