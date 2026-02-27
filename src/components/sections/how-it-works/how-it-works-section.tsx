import WheatIcon from "@/icons/wheat-icon";

interface Certificate {
  _key: string;
  name: string;
  subDescription: string;
}

interface HowItWorksSectionProps {
  title?: string;
  certificates?: Certificate[];
}

export function HowItWorksSection({
  title,
  certificates = [],
}: HowItWorksSectionProps) {
  if (certificates.length === 0) return null;

  return (
    <section className="flex flex-col lg:flex-row gap-10 lg:gap-10 items-start w-full">
      {/* Left Column - Heading */}
      <div className="flex items-center lg:w-xl shrink-0">
        <h2 className="font-medium text-2xl text-foreground w-full lg:w-96">
          {title || "Trusted by Founders, Marketers, and Individuals"}
        </h2>
      </div>

      {/* Right Column - Certifications */}
      <div className="flex flex-col gap-10 flex-1">
        {certificates.map((cert) => (
          <div key={cert._key} className="flex gap-6 items-center w-full">
            {/* Icon - Laurel Wreath */}
            <div className="flex items-center shrink-0">
              <WheatIcon />
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1 flex-1">
              <p className="font-medium text-lg text-foreground">{cert.name}</p>
              <p className="font-medium text-sm text-muted-foreground">
                {cert.subDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
