import { Star } from "lucide-react";

interface ProductSpecificationsSectionProps {
  specifications: string[];
}

export function ProductSpecificationsSection({
  specifications,
}: ProductSpecificationsSectionProps) {
  return (
    <section className="flex flex-col gap-[40px] w-full">
      {/* Header */}
      <div className="flex flex-col gap-[8px]">
        <h2
          className="font-medium text-[24px] leading-[32px] tracking-[-0.6px] text-[#18181b]"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          Our Specifications
        </h2>
        <p
          className="font-medium text-[20px] leading-[28px] tracking-[-0.5px] text-[#71717a]"
          style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
        >
          Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst
          ullamcorper purus
        </p>
      </div>

      {/* Specifications Grid - 2 columns */}
      <div className="flex flex-wrap gap-[20px]">
        {specifications.map((spec, index) => (
          <div key={index} className="flex gap-[12px] items-center w-[567px]">
            <Star className="size-[24px] text-brand-blue fill-brand-blue shrink-0" />
            <p
              className="flex-1 font-medium text-[14px] leading-[20px] text-[#18181b]"
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              {spec}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
