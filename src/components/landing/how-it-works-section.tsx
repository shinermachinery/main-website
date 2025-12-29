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
    <section className="py-24 md:py-32 bg-white">
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
                    <LaurelWreathIcon />
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

// Laurel Wreath Icon Component (60px x 48px)
function LaurelWreathIcon() {
  return (
    <svg
      width="60"
      height="48"
      viewBox="0 0 60 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Left side of wreath (mirrored) */}
      <g transform="scale(-1, 1) translate(-30, 0)">
        <path
          d="M4 24C4 24 6 20 8 18C10 16 12 15 14 16C16 17 16 19 15 21C14 23 12 24 10 25C8 26 6 26 5 25C4 24 4 23 4 22"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M6 12C6 12 8 9 10 8C12 7 14 7 15 8C16 9 16 11 15 13C14 15 12 16 10 16C8 16 7 15 6 14"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 36C8 36 10 33 12 32C14 31 16 31 17 32C18 33 18 35 17 37C16 39 14 40 12 40C10 40 9 39 8 38"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 6C10 6 12 4 14 3C16 2 18 3 19 4C20 5 19 7 18 9C17 11 15 11 13 11C11 11 10 10 10 9"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 42C12 42 14 40 16 39C18 38 20 39 21 40C22 41 21 43 20 45C19 47 17 47 15 47C13 47 12 46 12 45"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Right side of wreath */}
      <g transform="translate(30, 0)">
        <path
          d="M4 24C4 24 6 20 8 18C10 16 12 15 14 16C16 17 16 19 15 21C14 23 12 24 10 25C8 26 6 26 5 25C4 24 4 23 4 22"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M6 12C6 12 8 9 10 8C12 7 14 7 15 8C16 9 16 11 15 13C14 15 12 16 10 16C8 16 7 15 6 14"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 36C8 36 10 33 12 32C14 31 16 31 17 32C18 33 18 35 17 37C16 39 14 40 12 40C10 40 9 39 8 38"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 6C10 6 12 4 14 3C16 2 18 3 19 4C20 5 19 7 18 9C17 11 15 11 13 11C11 11 10 10 10 9"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 42C12 42 14 40 16 39C18 38 20 39 21 40C22 41 21 43 20 45C19 47 17 47 15 47C13 47 12 46 12 45"
          stroke="#18B75A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
