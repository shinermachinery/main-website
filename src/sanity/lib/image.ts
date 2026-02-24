import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: any) => {
  return builder.image(source);
};

// Export builder for direct use in components
export const imageBuilder = builder;

/**
 * Check if a Sanity image has a valid asset reference.
 * Valid refs look like "image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg"
 */
export function hasValidImageRef(
  image: { asset?: { _ref?: string } } | null | undefined,
): boolean {
  const ref = image?.asset?._ref;
  if (!ref) return false;
  return /^image-[a-zA-Z0-9]+-\d+x\d+-\w+$/.test(ref);
}

/**
 * Safely get an image URL from a Sanity image.
 * Returns undefined if the image has no valid asset reference.
 */
export function safeImageUrl(
  image: any,
  width: number,
  height: number,
): string | undefined {
  if (!hasValidImageRef(image)) return undefined;
  try {
    return builder.image(image).width(width).height(height).url();
  } catch {
    return undefined;
  }
}
