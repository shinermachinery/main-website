/**
 * Projects Page GROQ Queries
 * Queries for installations, clients, and projects
 */

import {
  CLIENT_PROJECTION,
  INSTALLATION_PROJECTION,
  PROJECT_FULL_PROJECTION,
} from "../shared/projections";
import type { QueryResult } from "../shared/utils";
import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
} from "../shared/utils";

// ============================================================================
// Types
// ============================================================================

/**
 * Project List Parameters
 */
export interface ProjectListParams {
  /** Filter by category */
  category?: string;
  /** Maximum number of results */
  limit?: number;
  /** Starting index for pagination */
  offset?: number;
}

// ============================================================================
// Installation Queries
// ============================================================================

/**
 * Get All Installations Query
 * Fetches all installations ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllInstallationsQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("installation");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${INSTALLATION_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Installation Count Query
 * Returns total number of installations
 *
 * @returns Query object
 */
export function getInstallationCountQuery(): QueryResult {
  const filterString = buildFilterString("installation");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}

// ============================================================================
// Client Queries
// ============================================================================

/**
 * Get All Clients Query
 * Fetches all clients ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllClientsQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("client");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${CLIENT_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Client Count Query
 * Returns total number of clients
 *
 * @returns Query object
 */
export function getClientCountQuery(): QueryResult {
  const filterString = buildFilterString("client");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}

// ============================================================================
// Project Queries
// ============================================================================

/**
 * Get All Projects Query
 * Fetches all projects with optional filtering
 *
 * @param options - Filtering and pagination options
 * @returns Query object
 */
export function getAllProjectsQuery(
  options: ProjectListParams = {},
): QueryResult<{ category?: string }> {
  const { category, limit, offset = 0 } = options;

  const conditions: string[] = [];
  if (category) {
    conditions.push("category == $category");
  }

  const filterString = buildFilterString("project", conditions);
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit, offset);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${PROJECT_FULL_PROJECTION}`,
    params: category ? { category } : {},
  };
}

/**
 * Get Project By Slug Query
 * Fetches a single project by slug
 *
 * @param slug - Project slug
 * @returns Query object
 */
export function getProjectBySlugQuery(
  slug: string,
): QueryResult<{ slug: string }> {
  return {
    query: `*[_type == "project" && slug.current == $slug][0] ${PROJECT_FULL_PROJECTION}`,
    params: { slug },
  };
}

/**
 * Get Project Count Query
 * Returns total number of projects
 *
 * @returns Query object
 */
export function getProjectCountQuery(): QueryResult {
  const filterString = buildFilterString("project");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
