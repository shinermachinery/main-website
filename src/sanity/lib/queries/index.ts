/**
 * Sanity GROQ Queries - Central Export
 *
 * This module provides a centralized, type-safe, and optimized query library
 * for fetching data from Sanity CMS. All queries use consistent patterns,
 * reusable fragments, and are performance-optimized.
 *
 * @module sanity/lib/queries
 */

// ============================================================================
// Common Fragments & Utilities
// ============================================================================

export {
  AUTHOR_FULL_PROJECTION,
  AUTHOR_SUMMARY_PROJECTION,
  BASE_DOCUMENT_FIELDS,
  // Utilities
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  CATEGORY_SUMMARY_PROJECTION,
  COLLECTION_SUMMARY_PROJECTION,
  // Projections
  IMAGE_PROJECTION,
  POST_FULL_PROJECTION,
  POST_SUMMARY_PROJECTION,
  PRODUCT_FULL_PROJECTION,
  PRODUCT_SUMMARY_PROJECTION,
  SLUG_PROJECTION,
  TEAM_MEMBER_PROJECTION,
  TESTIMONIAL_PROJECTION,
} from "./common";

// ============================================================================
// Product Queries
// ============================================================================

export {
  getAllProductsQuery,
  getFeaturedProductsQuery,
  getProductBySlugQuery,
  getProductCountQuery,
  getProductsByCollectionQuery,
  type ProductListParams,
  searchProductsQuery,
} from "./products";

// ============================================================================
// Blog Queries (Posts, Authors, Categories)
// ============================================================================

export {
  // Authors
  getAllAuthorsQuery,
  // Categories
  getAllCategoriesQuery,
  // Posts
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
  // Types
  type PostListParams,
  searchPostsQuery,
} from "./blog";

// ============================================================================
// Team Queries
// ============================================================================

export {
  getAllTeamMembersQuery,
  getTeamCountQuery,
  getTeamMemberByIdQuery,
} from "./team";

// ============================================================================
// Testimonial Queries
// ============================================================================

export {
  getAllTestimonialsQuery,
  getAverageRatingQuery,
  getFeaturedTestimonialsQuery,
  getTestimonialCountQuery,
  getTopRatedTestimonialsQuery,
  type TestimonialListParams,
} from "./testimonials";

// ============================================================================
// Collection Queries
// ============================================================================

export {
  getAllCollectionsQuery,
  getCollectionBySlugQuery,
  getCollectionCountQuery,
  getFeaturedCollectionsQuery,
  getPopularCollectionsQuery,
} from "./collections";

// ============================================================================
// Query Result Type
// ============================================================================

export type { QueryResult } from "./products";
