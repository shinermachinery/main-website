import WheatIcon from "@/icons/wheat-icon";
import Image from "next/image";

export function HowItWorksSection() {
  const certifications = [
    {
      id: 1,
      title: "ISO 9001:2015 Certified",
      description:
        "Quality management systems certification ensuring consistent delivery of products that meet customer and regulatory requirements.",
    },
    {
      id: 2,
      title: "CE Marking Compliance",
      description:
        "European conformity marking indicating compliance with health, safety, and environmental protection standards for products sold within the European Economic Area.",
    },
    {
      id: 3,
      title: "Industry Trusted Partner",
      description:
        "Recognized by leading manufacturers worldwide for precision engineering excellence and reliable performance in critical applications.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 items-start">
            {/* Left Column - Heading */}
            <div className="flex items-center lg:w-[588px] shrink-0">
              <h2
                className="font-medium text-[30px] leading-[40px] tracking-[-0.75px] text-[#18181b] w-full lg:w-[384px]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              >
                Trusted by Founders, Marketers, and Individuals
              </h2>
            </div>

            {/* Right Column - Certifications */}
            <div className="flex flex-col gap-10 flex-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex gap-6 items-center w-full">
                  {/* Icon - Laurel Wreath */}
                  <div className="flex items-center shrink-0">
                  <WheatIcon/>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <p
                      className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#18181b]"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {cert.title}
                    </p>
                    <p
                      className="font-medium text-[14px] leading-[20px] text-[#71717a]"
                      style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                    >
                      {cert.description}
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

