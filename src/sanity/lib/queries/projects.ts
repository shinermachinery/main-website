/**
 * Projects GROQ Queries
 * Queries for installations, clients, projects, and services
 */

import {
  BASE_DOCUMENT_FIELDS,
  IMAGE_PROJECTION,
  SLUG_PROJECTION,
  buildFilterString,
  buildOrderString,
  buildPaginationString,
} from "./common";
import type { QueryResult } from "./products";

// ============================================================================
// Projections
// ============================================================================

/**
 * Installation Projection
 */
export const INSTALLATION_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  type,
  location,
  description,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Client Projection
 */
export const CLIENT_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  name,
  logo {
    ${IMAGE_PROJECTION}
  },
  website,
  order
}`;

/**
 * Project Summary Projection
 */
export const PROJECT_SUMMARY_PROJECTION = `{
  _id,
  title,
  slug ${SLUG_PROJECTION},
  client,
  location,
  "primaryImage": images[0] {
    ${IMAGE_PROJECTION}
  }
}`;

/**
 * Project Full Projection
 */
export const PROJECT_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  slug ${SLUG_PROJECTION},
  client,
  location,
  description,
  images[] {
    ${IMAGE_PROJECTION}
  },
  completionDate,
  category,
  order
}`;

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

// ============================================================================
// Installation Queries
// ============================================================================

/**
 * Get All Installations Query
 * @param limit - Optional limit for results
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
 * @param limit - Optional limit for results
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

/**
 * Get All Projects Query
 * @param options - Filtering and pagination options
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
 * @param slug - Project slug
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
 */
export function getProjectCountQuery(): QueryResult {
  const filterString = buildFilterString("project");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}

// ============================================================================
// Service Queries
// ============================================================================

/**
 * Get All Services Query
 * @param limit - Optional limit for results
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
 * @param slug - Service slug
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
 */
export function getServiceCountQuery(): QueryResult {
  const filterString = buildFilterString("service");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
