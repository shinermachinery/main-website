import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large" | "small";
  className?: string;
}

/**
 * A standardized section header component with title and optional description.
 * Provides consistent typography and spacing for section headings throughout the application.
 *
 * @param title - The main heading text (required)
 * @param description - Optional descriptive text displayed below the title
 * @param align - Text alignment: "left" or "center" (default: "left")
 * @param size - Heading size: "large" (text-5xl), "default" (text-4xl), or "small" (text-3xl)
 * @param className - Additional CSS classes to merge with the component
 *
 * @example
 * ```tsx
 * // Basic section header
 * <SectionHeader
 *   title="Our Services"
 *   description="Discover what we offer"
 * />
 *
 * // Large centered header
 * <SectionHeader
 *   title="Welcome"
 *   description="Get started with our platform"
 *   align="center"
 *   size="large"
 * />
 *
 * // Small header without description
 * <SectionHeader title="Quick Links" size="small" />
 * ```
 */
export function SectionHeader({
  title,
  description,
  align = "left",
  size = "default",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      <h2
        className={cn(
          "font-medium text-foreground",
          size === "large" && "text-5xl",
          size === "default" && "text-4xl",
          size === "small" && "text-3xl",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
