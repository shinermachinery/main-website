/**
 * Projects Page GROQ Queries
 * Queries for installations, client list, and other clients
 */

import {
  CLIENT_LIST_PROJECTION,
  INSTALLATION_PROJECTION,
  OTHER_CLIENT_PROJECTION,
} from "../shared/projections";
import type { QueryResult } from "../shared/utils";
import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
} from "../shared/utils";

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
// Client List Queries
// ============================================================================

/**
 * Get All Client List Query
 * Fetches all client list items ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllClientListQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("clientList");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${CLIENT_LIST_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Client List Count Query
 * Returns total number of client list items
 *
 * @returns Query object
 */
export function getClientListCountQuery(): QueryResult {
  const filterString = buildFilterString("clientList");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}

// ============================================================================
// Other Client Queries
// ============================================================================

/**
 * Get All Other Clients Query
 * Fetches all other clients ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllOtherClientsQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("otherClient");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${OTHER_CLIENT_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Other Client Count Query
 * Returns total number of other clients
 *
 * @returns Query object
 */
export function getOtherClientCountQuery(): QueryResult {
  const filterString = buildFilterString("otherClient");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
