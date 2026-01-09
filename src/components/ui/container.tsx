import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: "7xl" | "6xl" | "5xl" | "4xl" | "full";
  padding?: "default" | "none";
  className?: string;
}

/**
 * A responsive container component that centers content with consistent max-width and padding.
 * Provides a standardized wrapper for page content with configurable constraints.
 *
 * @param children - Content to be wrapped in the container
 * @param maxWidth - Maximum width constraint (default: "7xl")
 * @param padding - Horizontal padding: "default" (px-4 sm:px-6) or "none"
 * @param className - Additional CSS classes to merge with the component
 *
 * @example
 * ```tsx
 * // Standard container with 7xl max-width
 * <Container>
 *   <YourContent />
 * </Container>
 *
 * // Narrower container with custom class
 * <Container maxWidth="5xl" className="py-12">
 *   <YourContent />
 * </Container>
 *
 * // Full-width container without padding
 * <Container maxWidth="full" padding="none">
 *   <YourContent />
 * </Container>
 * ```
 */
export function Container({
  children,
  maxWidth = "7xl",
  padding = "default",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto",
        padding === "default" && "px-4 sm:px-6",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto",
          maxWidth === "7xl" && "max-w-7xl",
          maxWidth === "6xl" && "max-w-6xl",
          maxWidth === "5xl" && "max-w-5xl",
          maxWidth === "4xl" && "max-w-4xl",
          maxWidth === "full" && "max-w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
}
