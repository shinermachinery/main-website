/**
 * Settings GROQ Queries
 * Queries for site settings
 */

import { SITE_SETTINGS_PROJECTION } from "../shared/projections";
import type { QueryResult } from "../shared/utils";

// ============================================================================
// Site Settings Queries
// ============================================================================

/**
 * Get Site Settings Query
 * Fetches the singleton site settings document
 */
export function getSiteSettingsQuery(): QueryResult {
  return {
    query: `*[_type == "siteSettings"][0] ${SITE_SETTINGS_PROJECTION}`,
    params: {},
  };
}
