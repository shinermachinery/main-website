/**
 * Team Member GROQ Queries
 * Optimized queries for fetching team member data
 */

import {
  buildFilterString,
  buildOrderString,
  buildPaginationString,
  TEAM_MEMBER_PROJECTION,
} from "./common";
import type { QueryResult } from "./products";

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
 * Get Team Member By ID Query
 * Fetches a single team member by document ID
 *
 * Use Cases: Team member detail pages (if needed)
 *
 * @param id - Document ID
 * @returns Query object
 */
export function getTeamMemberByIdQuery(id: string): QueryResult<{ id: string }> {
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
