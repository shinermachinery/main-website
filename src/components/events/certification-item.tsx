import WheatIcon from "@/icons/wheat-icon";
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
        <WheatIcon/>
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
