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
  // Projections
  IMAGE_PROJECTION,
  SLUG_PROJECTION,
  BASE_DOCUMENT_FIELDS,
  AUTHOR_SUMMARY_PROJECTION,
  AUTHOR_FULL_PROJECTION,
  CATEGORY_SUMMARY_PROJECTION,
  PRODUCT_SUMMARY_PROJECTION,
  PRODUCT_FULL_PROJECTION,
  COLLECTION_SUMMARY_PROJECTION,
  POST_SUMMARY_PROJECTION,
  POST_FULL_PROJECTION,
  TEAM_MEMBER_PROJECTION,
  TESTIMONIAL_PROJECTION,
  // Utilities
  buildFilterString,
  buildPaginationString,
  buildOrderString,
} from "./common";

// ============================================================================
// Product Queries
// ============================================================================

export {
  getAllProductsQuery,
  getProductBySlugQuery,
  getFeaturedProductsQuery,
  getProductsByCollectionQuery,
  searchProductsQuery,
  getProductCountQuery,
  type ProductListParams,
} from "./products";

// ============================================================================
// Blog Queries (Posts, Authors, Categories)
// ============================================================================

export {
  // Posts
  getAllPostsQuery,
  getPostBySlugQuery,
  getRecentPostsQuery,
  getFeaturedPostsQuery,
  searchPostsQuery,
  getPostCountQuery,
  // Authors
  getAllAuthorsQuery,
  getAuthorBySlugQuery,
  getAuthorWithPostsQuery,
  // Categories
  getAllCategoriesQuery,
  getCategoryBySlugQuery,
  getCategoryWithPostsQuery,
  getPopularCategoriesQuery,
  // Types
  type PostListParams,
} from "./blog";

// ============================================================================
// Team Queries
// ============================================================================

export {
  getAllTeamMembersQuery,
  getTeamMemberByIdQuery,
  getTeamCountQuery,
} from "./team";

// ============================================================================
// Testimonial Queries
// ============================================================================

export {
  getAllTestimonialsQuery,
  getFeaturedTestimonialsQuery,
  getTopRatedTestimonialsQuery,
  getTestimonialCountQuery,
  getAverageRatingQuery,
  type TestimonialListParams,
} from "./testimonials";

// ============================================================================
// Collection Queries
// ============================================================================

export {
  getAllCollectionsQuery,
  getCollectionBySlugQuery,
  getFeaturedCollectionsQuery,
  getCollectionCountQuery,
  getPopularCollectionsQuery,
} from "./collections";

// ============================================================================
// Query Result Type
// ============================================================================

export type { QueryResult } from "./products";
