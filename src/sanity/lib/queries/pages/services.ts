/**
 * Services Page GROQ Queries
 * Queries for service listing and detail pages
 */

import { SERVICE_FULL_PROJECTION } from "../shared/projections";
import type { QueryResult } from "../shared/utils";
import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
} from "../shared/utils";

// ============================================================================
// Service Queries
// ============================================================================

/**
 * Get All Services Query
 * Fetches all services ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllServicesQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("service");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${SERVICE_FULL_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Service By Slug Query
 * Fetches a single service by slug
 *
 * @param slug - Service slug
 * @returns Query object
 */
export function getServiceBySlugQuery(
  slug: string,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "service" && slug.current == $slug][0] ${SERVICE_FULL_PROJECTION}`,
    params: { slug },
  };
}

/**
 * Get Service Count Query
 * Returns total number of services
 *
 * @returns Query object
 */
export function getServiceCountQuery(): QueryResult {
  const filterString = buildFilterString("service");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
