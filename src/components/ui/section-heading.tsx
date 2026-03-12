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
    <div className={cn("flex flex-col gap-2", className)}>
      <Tag
          className="text-2xl font-bold md:text-4xl"
          style={{
            backgroundImage:
              "linear-gradient(45deg, var(--brand-blue), var(--brand-green))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          
        >
          {title}
        </Tag>
      {description && (
        <p className="text-base text-muted-foreground md:text-lg font-semibold">
          {description}
        </p>
      )}
    </div>
  );
}
