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
      {/* Check Icon */}
      <div className="flex items-center shrink-0">
        <WheatIcon />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-lg font-medium text-foreground">
          {title}
        </p>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
