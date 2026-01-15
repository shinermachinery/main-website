/**
 * Marketing GROQ Queries
 * Queries for achievements, certifications, and events
 */

import {
  BASE_DOCUMENT_FIELDS,
  IMAGE_PROJECTION,
  buildFilterString,
  buildOrderString,
  buildPaginationString,
} from "./common";
import type { QueryResult } from "./products";

// ============================================================================
// Projections
// ============================================================================

/**
 * Achievement Projection
 */
export const ACHIEVEMENT_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  description,
  year,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Certification Projection
 */
export const CERTIFICATION_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  issuingBody,
  year,
  description,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

/**
 * Event Projection
 */
export const EVENT_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  description,
  date,
  location,
  image {
    ${IMAGE_PROJECTION}
  },
  order
}`;

// ============================================================================
// Achievement Queries
// ============================================================================

/**
 * Get All Achievements Query
 * @param limit - Optional limit for results
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
 * @param limit - Optional limit for results
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

/**
 * Get All Events Query
 * @param options - Filtering and pagination options
 */
export function getAllEventsQuery(options: EventListParams = {}): QueryResult {
  const { upcoming, limit, offset = 0 } = options;

  const conditions: string[] = [];
  if (upcoming) {
    conditions.push("date >= now()");
  }

  const filterString = buildFilterString("event", conditions);
  const orderString = buildOrderString(["date asc", "order asc"]);
  const paginationString = buildPaginationString(limit, offset);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${EVENT_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Upcoming Events Query
 * @param limit - Maximum number of events
 */
export function getUpcomingEventsQuery(limit: number = 5): QueryResult {
  return getAllEventsQuery({ upcoming: true, limit });
}

/**
 * Get Event Count Query
 */
export function getEventCountQuery(): QueryResult {
  const filterString = buildFilterString("event");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
