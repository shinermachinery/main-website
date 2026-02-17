/**
 * Sanity GROQ Queries - Central Export
 *
 * This module provides a centralized, type-safe, and optimized query library
 * for fetching data from Sanity CMS. All queries use consistent patterns,
 * reusable fragments, and are performance-optimized.
 *
 * Structure:
 * - shared/   - Reusable projections and utilities
 * - pages/    - Page-specific queries organized by route
 *
 * @module sanity/lib/queries
 */

// ============================================================================
// Shared - Projections & Utilities
// ============================================================================

export {
  // About Page Projections
  ABOUT_PAGE_PROJECTION,
  // Marketing Projections
  ACHIEVEMENT_PROJECTION,
  AUTHOR_FULL_PROJECTION,
  // Author Projections
  AUTHOR_SUMMARY_PROJECTION,
  BASE_DOCUMENT_FIELDS,
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  // Category Projections
  CATEGORY_SUMMARY_PROJECTION,
  CERTIFICATION_PROJECTION,
  CLIENT_LIST_PROJECTION,
  COLLECTION_FULL_PROJECTION,
  // Collection Projections
  COLLECTION_SUMMARY_PROJECTION,
  EVENT_PROJECTION,
  FOOTER_PROJECTION,
  // Base Projections
  IMAGE_PROJECTION,
  // Project Projections
  INSTALLATION_PROJECTION,
  OTHER_CLIENT_PROJECTION,
  NAVIGATION_PROJECTION,
  POST_FULL_PROJECTION,
  // Post Projections
  POST_SUMMARY_PROJECTION,
  PRODUCT_FULL_PROJECTION,
  // Product Projections
  PRODUCT_SUMMARY_PROJECTION,
  // Utilities
  type QueryResult,
  SERVICE_FULL_PROJECTION,
  // Service Projections
  SERVICE_SUMMARY_PROJECTION,
  // Site Settings & Global Projections
  SITE_SETTINGS_PROJECTION,
  SLUG_PROJECTION,
  TEAM_MEMBER_FULL_PROJECTION,
  // Team Member Projections
  TEAM_MEMBER_PROJECTION,
  // Testimonial Projections
  TESTIMONIAL_PROJECTION,
} from "./shared";

// ============================================================================
// Home Page Queries
// ============================================================================

export {
  getCompleteHomePageQuery,
  getHomeFeaturedProductsQuery,
  getHomePageQuery,
  getHomeTeamMembersQuery,
  getHomeTestimonialsQuery,
} from "./pages/home";

// ============================================================================
// Products Page Queries
// ============================================================================

export {
  getAllCollectionsQuery,
  getAllProductsQuery,
  getCollectionBySlugQuery,
  getCollectionCountQuery,
  getFeaturedCollectionsQuery,
  getFeaturedProductsQuery,
  getPopularCollectionsQuery,
  getProductBySlugQuery,
  getProductCountQuery,
  getProductsByCollectionQuery,
  type ProductListParams,
  searchProductsQuery,
} from "./pages/products";

// ============================================================================
// Blog Page Queries
// ============================================================================

export {
  getAllAuthorsQuery,
  getAllCategoriesQuery,
  getAllPostsQuery,
  getAuthorBySlugQuery,
  getAuthorWithPostsQuery,
  getCategoryBySlugQuery,
  getCategoryWithPostsQuery,
  getFeaturedPostsQuery,
  getPopularCategoriesQuery,
  getPostBySlugQuery,
  getPostCountQuery,
  getRecentPostsQuery,
  type PostListParams,
  searchPostsQuery,
} from "./pages/blog";

// ============================================================================
// About Page Queries
// ============================================================================

export {
  getAboutPageQuery,
  getAllTeamMembersQuery,
  getCompanyTeamCountQuery,
  getCompanyTeamMembersQuery,
  getDirectorQuery,
  getTeamCountQuery,
  getTeamMemberByIdQuery,
  type TeamMemberListParams,
} from "./pages/about";

// ============================================================================
// Settings Queries
// ============================================================================

export {
  getFooterQuery,
  getGlobalLayoutDataQuery,
  getNavigationQuery,
  getSiteSettingsQuery,
} from "./pages/settings";

// ============================================================================
// Services Page Queries
// ============================================================================

export {
  getAllServicesQuery,
  getServiceBySlugQuery,
  getServiceCountQuery,
} from "./pages/services";

// ============================================================================
// Events Page Queries
// ============================================================================

export {
  type EventListParams,
  getAchievementCountQuery,
  getAllAchievementsQuery,
  getAllCertificationsQuery,
  getAllEventsQuery,
  getCertificationCountQuery,
  getEventCountQuery,
  getUpcomingEventsQuery,
} from "./pages/events";

// ============================================================================
// Projects Page Queries
// ============================================================================

export {
  getAllClientListQuery,
  getAllInstallationsQuery,
  getAllOtherClientsQuery,
  getClientListCountQuery,
  getInstallationCountQuery,
  getOtherClientCountQuery,
} from "./pages/projects";

// ============================================================================
// Testimonials Queries
// ============================================================================

export {
  getAllTestimonialsQuery,
  getAverageRatingQuery,
  getFeaturedTestimonialsQuery,
  getTestimonialCountQuery,
  getTopRatedTestimonialsQuery,
  type TestimonialListParams,
} from "./pages/testimonials";
