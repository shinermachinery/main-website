/**
 * Shared GROQ Projections
 * Reusable projection fragments for consistent data fetching
 */

// ============================================================================
// Base Projections
// ============================================================================

/**
 * Image Projection
 * Returns standardized image object with asset reference, alt text, and hotspot
 */
export const IMAGE_PROJECTION = `
  asset,
  "url": asset->url,
  alt,
  caption,
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

// ============================================================================
// Author Projections
// ============================================================================

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

// ============================================================================
// Category Projections
// ============================================================================

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

// ============================================================================
// Product Projections
// ============================================================================

/**
 * Product Summary Projection
 * Minimal product info for lists and references
 * Optimized: Only essential fields for previews
 */
export const PRODUCT_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  displayType,
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
  displayType,
  description,
  descriptionBulletPoints,
  images[] {
    ${IMAGE_PROJECTION}
  },
  body,
  brochure {
    asset
  },
  specifications,
  price,
  features,
  featured,
  order
}`;

// ============================================================================
// Collection Projections
// ============================================================================

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
 * Collection Full Projection
 * Complete collection data with all fields
 */
export const COLLECTION_FULL_PROJECTION = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug {
    current,
    _type
  },
  description,
  image {
    ${IMAGE_PROJECTION}
  },
  featured,
  order
}`;

// ============================================================================
// Post Projections
// ============================================================================

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

// ============================================================================
// Team Member Projections
// ============================================================================

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
  isDirector,
  contactEmail,
  phone,
  linkedin,
  order
}`;

/**
 * Team Member Full Projection
 * Extended team member fields with director info
 */
export const TEAM_MEMBER_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  name,
  role,
  bio,
  image {
    ${IMAGE_PROJECTION}
  },
  isDirector,
  achievements,
  contactEmail,
  phone,
  linkedin,
  order
}`;

// ============================================================================
// Testimonial Projections
// ============================================================================

/**
 * Testimonial Projection
 * Standard testimonial fields
 */
export const TESTIMONIAL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  customerName,
  role,
  company,
  content,
  rating,
  image {
    ${IMAGE_PROJECTION}
  },
  featured,
  order
}`;

// ============================================================================
// Site Settings & Global Projections
// ============================================================================

/**
 * Site Settings Projection
 */
export const SITE_SETTINGS_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  companyName,
  logo {
    ${IMAGE_PROJECTION}
  },
  tagline,
  contactEmail,
  contactPhone,
  address,
  socialLinks[] {
    platform,
    url
  },
  seoDefaults {
    title,
    description,
    image {
      ${IMAGE_PROJECTION}
    }
  }
}`;

/**
 * Navigation Projection
 */
export const NAVIGATION_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  menuItems[] {
    _key,
    label,
    link,
    hasDropdown,
    dropdownItems[] {
      _key,
      label,
      link,
      description
    }
  },
  ctaButton {
    label,
    link
  }
}`;

/**
 * Footer Projection
 */
export const FOOTER_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  sections[] {
    _key,
    title,
    links[] {
      _key,
      label,
      url
    }
  },
  contactInfo {
    email,
    phone,
    address
  },
  socialLinks[] {
    platform,
    url
  },
  copyrightText
}`;

// ============================================================================
// About Page Projections
// ============================================================================

/**
 * About Page Projection
 */
export const ABOUT_PAGE_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  heroTitle,
  heroDescription[],
  mainImage {
    ${IMAGE_PROJECTION}
  },
  mission {
    title,
    description[]
  },
  vision {
    title,
    description[]
  },
  features[] {
    _key,
    icon,
    title,
    description
  },
  bottomFeatures[] {
    _key,
    icon,
    title,
    description
  },
  seo {
    title,
    description
  }
}`;

// ============================================================================
// Marketing Projections
// ============================================================================

/**
 * Achievement Projection
 */
export const ACHIEVEMENT_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  description,
  year,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Certification Projection
 */
export const CERTIFICATION_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  issuingBody,
  year,
  description,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Event Projection
 */
export const EVENT_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  images[] {
    ${IMAGE_PROJECTION}
  },
  location
}`;

// ============================================================================
// Project Projections
// ============================================================================

/**
 * Installation Projection (image carousel cards)
 */
export const INSTALLATION_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  description,
  images[] {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Client List Projection
 */
export const CLIENT_LIST_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  companyName,
  projects,
  order
}`;

/**
 * Other Client Projection (logo marquee)
 */
export const OTHER_CLIENT_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  companyName,
  logo {
    ${IMAGE_PROJECTION}
  },
  order
}`;

// ============================================================================
// Service Projections
// ============================================================================

/**
 * Service Summary Projection
 */
export const SERVICE_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  description,
  image {
    ${IMAGE_PROJECTION}
  }
}`;

/**
 * Service Full Projection
 */
export const SERVICE_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  slug ${SLUG_PROJECTION},
  description,
  image {
    ${IMAGE_PROJECTION}
  },
  content,
  order
}`;
