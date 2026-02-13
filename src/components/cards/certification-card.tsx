import WheatIcon from "@/icons/wheat-icon";

interface CertificationCardProps {
  title: string;
  description: string;
}

export function CertificationCard({
  title,
  description,
}: CertificationCardProps) {
  return (
    <div className="flex gap-6 items-center">
      {/* Check Icon - Mirrored Double Check */}
      <div className="flex items-center shrink-0">
        <WheatIcon />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-xl font-medium leading-7 text-foreground tracking-[-0.0313rem]">
          {title}
        </p>
        <p className="text-sm font-normal leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
