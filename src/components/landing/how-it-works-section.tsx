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
  // Fallback certifications if none provided
  const displayCertificates =
    certificates.length > 0
      ? certificates
      : [
          {
            _key: "1",
            name: "ISO 9001:2015 Certified",
            subDescription:
              "Quality management systems certification ensuring consistent delivery of products that meet customer and regulatory requirements.",
          },
          {
            _key: "2",
            name: "CE Marking Compliance",
            subDescription:
              "European conformity marking indicating compliance with health, safety, and environmental protection standards for products sold within the European Economic Area.",
          },
          {
            _key: "3",
            name: "Industry Trusted Partner",
            subDescription:
              "Recognized by leading manufacturers worldwide for precision engineering excellence and reliable performance in critical applications.",
          },
        ];

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 items-start">
            {/* Left Column - Heading */}
            <div className="flex items-center lg:w-[36.75rem] shrink-0">
              <h2
                className="font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.0469rem] text-foreground w-full lg:w-[24rem]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                {title || "Trusted by Founders, Marketers, and Individuals"}
              </h2>
            </div>

            {/* Right Column - Certifications */}
            <div className="flex flex-col gap-10 flex-1">
              {displayCertificates.map((cert) => (
                <div key={cert._key} className="flex gap-6 items-center w-full">
                  {/* Icon - Laurel Wreath */}
                  <div className="flex items-center shrink-0">
                    <WheatIcon />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <p
                      className="font-medium text-[1.25rem] leading-7 tracking-[-0.0313rem] text-foreground"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {cert.name}
                    </p>
                    <p
                      className="font-medium text-sm leading-5 text-muted-foreground"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {cert.subDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
