/**
 * Shared Query Exports
 * Central export point for all shared projections and utilities
 */

// Projections
export {
  // About Page
  ABOUT_PAGE_PROJECTION,
  // Marketing
  ACHIEVEMENT_PROJECTION,
  AUTHOR_FULL_PROJECTION,
  // Author
  AUTHOR_SUMMARY_PROJECTION,
  BASE_DOCUMENT_FIELDS,
  // Category
  CATEGORY_SUMMARY_PROJECTION,
  CERTIFICATION_PROJECTION,
  CLIENT_LIST_PROJECTION,
  COLLECTION_FULL_PROJECTION,
  // Collection
  COLLECTION_SUMMARY_PROJECTION,
  EVENT_PROJECTION,
  FOOTER_PROJECTION,
  // Base
  IMAGE_PROJECTION,
  // Project
  INSTALLATION_PROJECTION,
  OTHER_CLIENT_PROJECTION,
  NAVIGATION_PROJECTION,
  POST_FULL_PROJECTION,
  // Post
  POST_SUMMARY_PROJECTION,
  PRODUCT_FULL_PROJECTION,
  // Product
  PRODUCT_SUMMARY_PROJECTION,
  SERVICE_FULL_PROJECTION,
  // Service
  SERVICE_SUMMARY_PROJECTION,
  // Site Settings & Global
  SITE_SETTINGS_PROJECTION,
  SLUG_PROJECTION,
  TEAM_MEMBER_FULL_PROJECTION,
  // Team Member
  TEAM_MEMBER_PROJECTION,
  // Testimonial
  TESTIMONIAL_PROJECTION,
} from "./projections";

// Utilities
export {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  type QueryResult,
} from "./utils";
