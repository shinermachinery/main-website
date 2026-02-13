/**
 * About Page GROQ Queries
 * Queries for about page and team members
 */

import {
  ABOUT_PAGE_PROJECTION,
  TEAM_MEMBER_FULL_PROJECTION,
  TEAM_MEMBER_PROJECTION,
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
 * Team Member List Parameters
 */
export interface TeamMemberListParams {
  /** Maximum number of results */
  limit?: number;
  /** Starting index for pagination */
  offset?: number;
}

// ============================================================================
// About Page Queries
// ============================================================================

/**
 * Get About Page Query
 * Fetches the singleton about page content
 */
export function getAboutPageQuery(): QueryResult {
  return {
    query: `*[_type == "aboutPage"][0] ${ABOUT_PAGE_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Director Query (Team member with isDirector flag)
 * Fetches the director from team members
 */
export function getDirectorQuery(): QueryResult {
  return {
    query: `*[_type == "teamMember" && isDirector == true][0] ${TEAM_MEMBER_FULL_PROJECTION}`,
    params: {},
  };
}

// ============================================================================
// Team Member Queries
// ============================================================================

/**
 * Get All Team Members Query
 * Fetches all team members ordered by display order
 *
 * Performance: Returns all fields including bio
 * Use Cases: Team page, about page
 *
 * @param limit - Optional result limit
 * @returns Query object
 */
export function getAllTeamMembersQuery(limit?: number): QueryResult {
  const filterString = buildFilterString("teamMember");
  const orderString = buildOrderString(["order asc", "name asc"]);
  const paginationString = buildPaginationString(limit);

  return {
    query: `*[${filterString}] ${orderString} ${paginationString} ${TEAM_MEMBER_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Company Team Members Query
 * Fetches team members with extended contact info
 *
 * @param options - Pagination options
 * @returns Query object
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
 * Get Team Member By ID Query
 * Fetches a single team member by document ID
 *
 * Use Cases: Team member detail pages (if needed)
 *
 * @param id - Document ID
 * @returns Query object
 */
export function getTeamMemberByIdQuery(
  id: string,
): QueryResult<{ id: string }> {
  return {
    query: `*[_type == "teamMember" && _id == $id][0] ${TEAM_MEMBER_PROJECTION}`,
    params: { id },
  };
}

/**
 * Get Team Count Query
 * Returns total number of team members
 *
 * Performance: Lightweight count query
 * Use Cases: Analytics, pagination
 *
 * @returns Query object
 */
export function getTeamCountQuery(): QueryResult {
  return {
    query: `count(*[${buildFilterString("teamMember")}])`,
    params: {},
  };
}

/**
 * Get Company Team Count Query
 * Alias for getTeamCountQuery for backward compatibility
 */
export function getCompanyTeamCountQuery(): QueryResult {
  return getTeamCountQuery();
}
