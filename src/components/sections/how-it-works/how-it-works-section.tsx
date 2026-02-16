import { EmptyState } from "@/components/ui/empty-state";
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
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 items-start">
            {/* Left Column - Heading */}
            <div className="flex items-center lg:w-[36.75rem] shrink-0">
              <h2
                className="font-medium text-[1.875rem] leading-[2.5rem] tracking-[-0.0469rem] text-foreground w-full lg:w-[24rem]"
              >
                {title || "Trusted by Founders, Marketers, and Individuals"}
              </h2>
            </div>

            {/* Right Column - Certifications */}
            {certificates.length === 0 ? (
              <div className="flex-1">
                <EmptyState
                  size="sm"
                  message="No certificates to display at this time."
                />
              </div>
            ) : (
              <div className="flex flex-col gap-10 flex-1">
                {certificates.map((cert) => (
                  <div key={cert._key} className="flex gap-6 items-center w-full">
                    {/* Icon - Laurel Wreath */}
                    <div className="flex items-center shrink-0">
                      <WheatIcon />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-1 flex-1">
                      <p
                        className="font-medium text-[1.25rem] leading-7 tracking-[-0.0313rem] text-foreground"
                      >
                        {cert.name}
                      </p>
                      <p
                        className="font-medium text-sm leading-5 text-muted-foreground"
                      >
                        {cert.subDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
