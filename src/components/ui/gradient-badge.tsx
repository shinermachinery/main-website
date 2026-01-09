import { cn } from "@/lib/utils";

interface GradientBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "subtle";
  className?: string;
}

/**
 * A badge component with gradient background and text styling.
 * Used for category badges, tags, and labels throughout the application.
 *
 * @param children - The text content to display inside the badge
 * @param variant - Visual style variant: "default" (full gradient background) or "subtle" (gradient text only)
 * @param className - Additional CSS classes to merge with the component
 *
 * @example
 * ```tsx
 * // Default variant with full gradient background
 * <GradientBadge>Featured</GradientBadge>
 *
 * // Subtle variant with gradient text only
 * <GradientBadge variant="subtle">New</GradientBadge>
 * ```
 */
export function GradientBadge({
  children,
  variant = "default",
  className,
}: GradientBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-start px-2.5 py-1 rounded-full",
        variant === "default" &&
          "bg-gradient-to-r from-[rgba(42,94,152,0.1)] to-[rgba(24,183,90,0.1)]",
        className,
      )}
    >
      <span
        className={cn(
          "bg-clip-text font-medium text-sm bg-gradient-to-r from-[rgba(42,94,152,1)] to-[rgba(24,183,90,1)]",
          variant === "default" && "text-transparent",
        )}
        style={
          variant === "default"
            ? { WebkitTextFillColor: "transparent" }
            : undefined
        }
      >
        {children}
      </span>
    </div>
  );
}
