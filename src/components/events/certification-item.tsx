import { Check } from "lucide-react";

interface CertificationItemProps {
  title: string;
  description: string;
}

export function CertificationItem({
  title,
  description,
}: CertificationItemProps) {
  return (
    <div className="flex gap-6 items-center">
      {/* Check Icon - Mirrored Double Check */}
      <div className="flex items-center shrink-0">
        <div className="transform scale-x-[-1]">
          <Check className="w-[30px] h-12 text-brand-green" strokeWidth={2} />
        </div>
        <Check className="w-[30px] h-12 text-brand-green" strokeWidth={2} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-xl font-medium leading-7 text-zinc-900 tracking-[-0.5px]">
          {title}
        </p>
        <p className="text-sm font-normal leading-5 text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}
