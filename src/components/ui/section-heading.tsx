import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Tag className="text-xl font-medium text-foreground md:text-2xl">
        {title}
      </Tag>
      {description && (
        <p className="text-sm text-muted-foreground md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
