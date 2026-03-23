import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  spacing?: "large" | "medium" | "small" | "none";
  background?: "default" | "secondary" | "muted" | "none";
  className?: string;
}

/**
 * A semantic section wrapper with consistent spacing and background options.
 * Provides standardized vertical rhythm and background styling for page sections.
 *
 * @param children - Content to be wrapped in the section
 * @param spacing - Vertical padding size: "large" (py-24 md:py-32), "medium" (py-16 md:py-24), "small" (py-12 md:py-16), or "none"
 * @param background - Background color variant: "default", "secondary", "muted", or "none"
 * @param className - Additional CSS classes to merge with the component
 *
 * @example
 * ```tsx
 * // Large section with secondary background
 * <Section spacing="large" background="secondary">
 *   <YourContent />
 * </Section>
 *
 * // Medium section with default background
 * <Section spacing="medium">
 *   <YourContent />
 * </Section>
 *
 * // Custom section with no preset spacing
 * <Section spacing="none" className="py-8">
 *   <YourContent />
 * </Section>
 * ```
 */
export function Section({
  children,
  spacing = "large",
  background = "default",
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        // Spacing variants
        spacing === "large" && "py-24 md:py-32",
        spacing === "medium" && "py-16 md:py-24",
        spacing === "small" && "py-12 md:py-16",
        // Background variants
        background === "default" && "bg-background",
        background === "secondary" && "bg-secondary",
        background === "muted" && "bg-muted",
        className,
      )}
    >
      {children}
    </section>
  );
}
