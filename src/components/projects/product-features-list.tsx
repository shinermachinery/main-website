import { Star } from "lucide-react";

interface ProductFeaturesListProps {
  features: string[];
}

export function ProductFeaturesList({ features }: ProductFeaturesListProps) {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-[12px] items-center">
          <Star className="size-[24px] text-brand-blue fill-brand-blue shrink-0" />
          <p
            className="flex-1 font-medium text-[14px] leading-[20px] text-[#18181b]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            {feature}
          </p>
        </div>
      ))}
    </div>
  );
}
