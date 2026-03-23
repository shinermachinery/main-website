import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extract plain text from Portable Text blocks
 * Useful for card previews, metadata descriptions, and search
 */
export function toPlainText(blocks?: any[]): string {
  if (!blocks) return "";
  return blocks
    .filter((block: any) => block._type === "block")
    .map((block: any) =>
      (block.children ?? [])
        .map((child: any) => child.text ?? "")
        .join(""),
    )
    .join(" ");
}
