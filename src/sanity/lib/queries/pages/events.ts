/**
 * Events Page GROQ Queries
 * Queries for events, certifications, and achievements
 */

import {
  ACHIEVEMENT_PROJECTION,
  CERTIFICATION_PROJECTION,
  EVENT_PROJECTION,
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
 * Event List Parameters
 */
export interface EventListParams {
  /** Filter for upcoming events only */
  upcoming?: boolean;
  /** Maximum number of results */
  limit?: number;
  /** Starting index for pagination */
  offset?: number;
}

// ============================================================================
// Achievement Queries
// ============================================================================

/**
 * Get All Achievements Query
 * Fetches all achievements ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllAchievementsQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("achievement");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${ACHIEVEMENT_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Achievement Count Query
 * Returns total number of achievements
 *
 * @returns Query object
 */
export function getAchievementCountQuery(): QueryResult {
  const filterString = buildFilterString("achievement");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}

// ============================================================================
// Certification Queries
// ============================================================================

/**
 * Get All Certifications Query
 * Fetches all certifications ordered by display order
 *
 * @param limit - Optional limit for results
 * @returns Query object
 */
export function getAllCertificationsQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("certification");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${CERTIFICATION_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Certification Count Query
 * Returns total number of certifications
 *
 * @returns Query object
 */
export function getCertificationCountQuery(): QueryResult {
  const filterString = buildFilterString("certification");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}

// ============================================================================
// Event Queries
// ============================================================================

/**
 * Get All Events Query
 * Fetches all events with optional filtering
 *
 * @param options - Filtering and pagination options
 * @returns Query object
 */
export function getAllEventsQuery(options: EventListParams = {}): QueryResult {
  const { limit, offset = 0 } = options;

  const filterString = buildFilterString("event");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit, offset);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${EVENT_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Upcoming Events Query
 * Fetches events that haven't happened yet
 *
 * @param limit - Maximum number of events
 * @returns Query object
 */
export function getUpcomingEventsQuery(limit: number = 5): QueryResult {
  return getAllEventsQuery({ upcoming: true, limit });
}

/**
 * Get Event Count Query
 * Returns total number of events
 *
 * @returns Query object
 */
export function getEventCountQuery(): QueryResult {
  const filterString = buildFilterString("event");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
