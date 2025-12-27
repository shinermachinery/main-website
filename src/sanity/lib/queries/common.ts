/**
 * Common GROQ Query Fragments
 * Reusable projections and filters for consistent data fetching
 */

/**
 * Image Projection
 * Returns standardized image object with asset reference, alt text, and hotspot
 */
export const IMAGE_PROJECTION = `
  asset,
  alt,
  hotspot
`;

/**
 * Slug Projection
 * Returns slug object with current value
 */
export const SLUG_PROJECTION = `{
  current,
  _type
}`;

/**
 * Base Document Fields
 * Common fields present in all Sanity documents
 */
export const BASE_DOCUMENT_FIELDS = `
  _id,
  _type,
  _createdAt,
  _updatedAt
`;

/**
 * Author Summary Projection
 * Lightweight author info for lists and references
 * Optimized: Excludes bio for better performance
 */
export const AUTHOR_SUMMARY_PROJECTION = `{
  _id,
  name,
  slug ${SLUG_PROJECTION},
  image {
    ${IMAGE_PROJECTION}
  }
}`;

/**
 * Author Full Projection
 * Complete author info including bio
 * Use only when bio is needed
 */
export const AUTHOR_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  name,
  slug ${SLUG_PROJECTION},
  image {
    ${IMAGE_PROJECTION}
  },
  bio
}`;

/**
 * Category Summary Projection
 * Standard category info for references
 */
export const CATEGORY_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  description
}`;

/**
 * Product Summary Projection
 * Minimal product info for lists and references
 * Optimized: Only essential fields for previews
 */
export const PRODUCT_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  "primaryImage": images[0] {
    ${IMAGE_PROJECTION}
  },
  price,
  featured
}`;

/**
 * Product Full Projection
 * Complete product data including all details
 */
export const PRODUCT_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  slug ${SLUG_PROJECTION},
  description,
  descriptionBulletPoints,
  images[] {
    ${IMAGE_PROJECTION}
  },
  brochure {
    asset
  },
  specifications,
  price,
  features,
  featured,
  order
}`;

/**
 * Collection Summary Projection
 * Basic collection info for references
 */
export const COLLECTION_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  description
}`;

/**
 * Post Summary Projection
 * Minimal post info for lists
 * Optimized: Excludes body content for better performance
 */
export const POST_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  mainImage {
    ${IMAGE_PROJECTION}
  },
  publishedAt,
  author-> ${AUTHOR_SUMMARY_PROJECTION}
}`;

/**
 * Post Full Projection
 * Complete post data including body content
 */
export const POST_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  slug ${SLUG_PROJECTION},
  mainImage {
    ${IMAGE_PROJECTION}
  },
  publishedAt,
  body,
  author-> ${AUTHOR_FULL_PROJECTION},
  categories[]-> ${CATEGORY_SUMMARY_PROJECTION}
}`;

/**
 * Team Member Projection
 * Standard team member fields
 */
export const TEAM_MEMBER_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  name,
  role,
  bio,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Testimonial Projection
 * Standard testimonial fields
 */
export const TESTIMONIAL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  customerName,
  role,
  content,
  rating,
  image {
    ${IMAGE_PROJECTION}
  },
  featured,
  order
}`;

/**
 * Helper: Build filter string from conditions
 * @param baseType - The document type (e.g., "product")
 * @param conditions - Array of GROQ filter conditions
 * @returns Formatted filter string for GROQ query
 */
export function buildFilterString(
  baseType: string,
  conditions: string[] = [],
): string {
  const allConditions = [`_type == "${baseType}"`, ...conditions];
  return allConditions.join(" && ");
}

/**
 * Helper: Build pagination string
 * @param limit - Maximum number of results
 * @param offset - Starting index (for pagination)
 * @returns GROQ pagination string
 */
export function buildPaginationString(
  limit?: number,
  offset: number = 0,
): string {
  if (!limit) return "";
  return `[${offset}...${offset + limit}]`;
}

/**
 * Helper: Build order string
 * @param fields - Array of fields to order by (e.g., ["order asc", "publishedAt desc"])
 * @returns GROQ order string
 */
export function buildOrderString(fields: string[]): string {
  if (fields.length === 0) return "";
  return `| order(${fields.join(", ")})`;
}
