/**
 * Testimonial GROQ Queries
 * Optimized queries for fetching customer testimonials
 */

import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  TESTIMONIAL_PROJECTION,
} from "./common";
import type { QueryResult } from "./products";

/**
 * Query Parameters for Testimonial Listing
 */
export interface TestimonialListParams {
  /** Filter by featured status */
  featured?: boolean;
  /** Minimum rating (1-5) */
  minRating?: number;
  /** Maximum number of results */
  limit?: number;
}

/**
 * Get All Testimonials Query
 * Fetches testimonials with optional filtering
 *
 * Performance: Ordered by display order and rating
 * Use Cases: Testimonials page, reviews section
 *
 * @param options - Filtering and pagination options
 * @returns Query object
 */
export function getAllTestimonialsQuery(
  options: TestimonialListParams = {},
): QueryResult {
  const { featured, minRating, limit } = options;

  const conditions: string[] = [];
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }
  if (minRating !== undefined) {
    conditions.push(`rating >= ${minRating}`);
  }

  const filterString = buildFilterString("testimonial", conditions);
  const orderString = buildOrderString([
    "order asc",
    "rating desc",
    "_createdAt desc",
  ]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${TESTIMONIAL_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Featured Testimonials Query
 * Fetches only featured testimonials
 *
 * Performance: Optimized for homepage/landing featured testimonials
 * Use Cases: Homepage testimonials section
 *
 * @param limit - Maximum number of testimonials (default: 3)
 * @returns Query object
 */
export function getFeaturedTestimonialsQuery(limit: number = 3): QueryResult {
  return getAllTestimonialsQuery({ featured: true, limit });
}

/**
 * Get Top Rated Testimonials Query
 * Fetches testimonials with highest ratings
 *
 * Performance: Sorted by rating descending
 * Use Cases: Quality showcase, social proof
 *
 * @param limit - Maximum number of testimonials (default: 5)
 * @returns Query object
 */
export function getTopRatedTestimonialsQuery(limit: number = 5): QueryResult {
  return getAllTestimonialsQuery({ minRating: 5, limit });
}

/**
 * Get Testimonial Count Query
 * Returns total number of testimonials
 *
 * @param featured - Optional filter by featured status
 * @returns Query object
 */
export function getTestimonialCountQuery(featured?: boolean): QueryResult {
  const conditions: string[] = [];
  if (featured !== undefined) {
    conditions.push(`featured == ${featured}`);
  }

  return {
    query: `count(*[${buildFilterString("testimonial", conditions)}])`,
    params: {},
  };
}

/**
 * Get Average Rating Query
 * Calculates average rating across all testimonials
 *
 * Performance: Aggregation query
 * Use Cases: Overall rating display, statistics
 *
 * @returns Query object for average rating
 */
export function getAverageRatingQuery(): QueryResult {
  return {
    query: `math::avg(*[_type == "testimonial"].rating)`,
    params: {},
  };
}
