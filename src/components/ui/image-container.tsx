import { cn } from "@/lib/utils";

interface ImageContainerProps {
  children: React.ReactNode;
  aspect?: "square" | "video" | "wide" | "portrait" | "custom";
  customAspect?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  className?: string;
}

/**
 * A container component that provides consistent aspect ratios and styling for images.
 * Ensures proper positioning and sizing for responsive image layouts.
 *
 * @param children - Image element or other content to display (typically Next.js Image component)
 * @param aspect - Preset aspect ratio: "square" (1:1), "video" (16:9), "wide" (21:9), "portrait" (3:4), or "custom"
 * @param customAspect - Custom aspect ratio when aspect="custom" (e.g., "282/168")
 * @param rounded - Border radius size: "none", "sm", "md", "lg", "xl", "2xl", "3xl", or "full"
 * @param className - Additional CSS classes to merge with the component
 *
 * @example
 * ```tsx
 * // Standard video aspect ratio with rounded corners
 * <ImageContainer aspect="video" rounded="2xl">
 *   <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />
 * </ImageContainer>
 *
 * // Square image with full rounding
 * <ImageContainer aspect="square" rounded="full">
 *   <Image src="/avatar.jpg" alt="Avatar" fill className="object-cover" />
 * </ImageContainer>
 *
 * // Custom aspect ratio
 * <ImageContainer aspect="custom" customAspect="282/168" rounded="xl">
 *   <Image src="/custom.jpg" alt="Custom" fill className="object-cover" />
 * </ImageContainer>
 * ```
 */
export function ImageContainer({
  children,
  aspect = "video",
  customAspect,
  rounded = "2xl",
  className,
}: ImageContainerProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        // Aspect ratio variants
        aspect === "square" && "aspect-square",
        aspect === "video" && "aspect-video",
        aspect === "wide" && "aspect-[21/9]",
        aspect === "portrait" && "aspect-[3/4]",
        // Rounded variants
        rounded === "sm" && "rounded-sm",
        rounded === "md" && "rounded-md",
        rounded === "lg" && "rounded-lg",
        rounded === "xl" && "rounded-xl",
        rounded === "2xl" && "rounded-2xl",
        rounded === "3xl" && "rounded-3xl",
        rounded === "full" && "rounded-full",
        className,
      )}
      style={
        aspect === "custom" && customAspect
          ? { aspectRatio: customAspect }
          : undefined
      }
    >
      {children}
    </div>
  );
}
