/**
 * Company GROQ Queries
 * Queries for director, mission/vision, why choose us, and team members
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
 * Director Projection
 */
export const DIRECTOR_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  pageTitle,
  pageSubtitle,
  name,
  title,
  image {
    ${IMAGE_PROJECTION}
  },
  bio,
  achievements,
  email,
  phone,
  linkedin
}`;

/**
 * Mission Vision Projection
 */
export const MISSION_VISION_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  pageTitle,
  pageSubtitle,
  missionTitle,
  missionStatement,
  missionImage {
    ${IMAGE_PROJECTION}
  },
  visionTitle,
  visionStatement,
  visionImage {
    ${IMAGE_PROJECTION}
  }
}`;

/**
 * Why Choose Us Projection
 */
export const WHY_CHOOSE_US_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  title,
  subtitle,
  heroImage {
    ${IMAGE_PROJECTION}
  },
  reasons[] {
    title,
    description,
    icon {
      ${IMAGE_PROJECTION}
    },
    order
  }
}`;

/**
 * Team Member Projection (re-exported from common for consistency)
 */
export const TEAM_MEMBER_FULL_PROJECTION = `{
  ${BASE_DOCUMENT_FIELDS},
  name,
  role,
  bio,
  image {
    ${IMAGE_PROJECTION}
  },
  email,
  phone,
  linkedin,
  order
}`;

// ============================================================================
// Director Queries
// ============================================================================

/**
 * Get Director Query
 * Fetches the director/leadership page content
 */
export function getDirectorQuery(): QueryResult {
  return {
    query: `*[_type == "director"][0] ${DIRECTOR_PROJECTION}`,
    params: {},
  };
}

// ============================================================================
// Mission Vision Queries
// ============================================================================

/**
 * Get Mission Vision Query
 * Fetches the mission and vision page content
 */
export function getMissionVisionQuery(): QueryResult {
  return {
    query: `*[_type == "missionVision"][0] ${MISSION_VISION_PROJECTION}`,
    params: {},
  };
}

// ============================================================================
// Why Choose Us Queries
// ============================================================================

/**
 * Get Why Choose Us Query
 * Fetches the why choose us page content
 */
export function getWhyChooseUsQuery(): QueryResult {
  return {
    query: `*[_type == "whyChooseUs"][0] ${WHY_CHOOSE_US_PROJECTION}`,
    params: {},
  };
}

// ============================================================================
// Team Member Queries
// ============================================================================

/**
 * Team Member List Parameters
 */
export interface TeamMemberListParams {
  /** Maximum number of results */
  limit?: number;
  /** Starting index for pagination */
  offset?: number;
}

/**
 * Get All Team Members Query
 * @param options - Pagination options
 */
export function getCompanyTeamMembersQuery(
  options: TeamMemberListParams = {},
): QueryResult {
  const { limit, offset = 0 } = options;

  const filterString = buildFilterString("teamMember");
  const orderString = buildOrderString(["order asc", "_createdAt desc"]);
  const paginationString = buildPaginationString(limit, offset);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${TEAM_MEMBER_FULL_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Team Member Count Query
 */
export function getCompanyTeamCountQuery(): QueryResult {
  const filterString = buildFilterString("teamMember");

  return {
    query: `count(*[${filterString}])`,
    params: {},
  };
}
