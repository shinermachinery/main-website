import { client } from "@/sanity/lib/client";
import { CertificationItem } from "./certification-item";

interface Certification {
  id: string | number;
  title: string;
  description: string;
}

const dummyCertifications: Certification[] = [
  {
    id: 1,
    title: "Certification Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus eget erat id amet.",
  },
  {
    id: 2,
    title: "Certification Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus eget erat id amet.",
  },
  {
    id: 3,
    title: "Certification Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus eget erat id amet.",
  },
];

async function getCertifications() {
  try {
    const certifications = await client.fetch(
      `*[_type == "certification"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description
      }[0...3]`,
    );

    if (!certifications || certifications.length === 0) {
      return dummyCertifications;
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
    return dummyCertifications;
  }
}

export async function CertificationsSection() {
  const certifications = await getCertifications();
  return (
    <section className="flex gap-10 items-start w-full">
      {/* Left: Heading */}
      <div className="w-[588px] shrink-0 flex items-center">
        <h2 className="text-[30px] font-medium leading-10 text-zinc-900 tracking-[-0.75px] w-[384px]">
          Trusted by Founders, Marketers, and Individuals
        </h2>
      </div>

      {/* Right: Certifications List */}
      <div className="flex flex-col gap-10 flex-1">
        {certifications.map((cert: Certification) => (
          <CertificationItem
            key={cert.id}
            title={cert.title}
            description={cert.description}
          />
        ))}
      </div>
    </section>
  );
}
