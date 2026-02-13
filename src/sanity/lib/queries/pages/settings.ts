/**
 * Settings GROQ Queries
 * Queries for site settings, navigation, and footer
 */

import {
  FOOTER_PROJECTION,
  NAVIGATION_PROJECTION,
  SITE_SETTINGS_PROJECTION,
} from "../shared/projections";
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

// ============================================================================
// Navigation Queries
// ============================================================================

/**
 * Get Navigation Query
 * Fetches the singleton navigation document
 */
export function getNavigationQuery(): QueryResult {
  return {
    query: `*[_type == "navigation"][0] ${NAVIGATION_PROJECTION}`,
    params: {},
  };
}

// ============================================================================
// Footer Queries
// ============================================================================

/**
 * Get Footer Query
 * Fetches the singleton footer document
 */
export function getFooterQuery(): QueryResult {
  return {
    query: `*[_type == "footer"][0] ${FOOTER_PROJECTION}`,
    params: {},
  };
}

// ============================================================================
// Combined Queries
// ============================================================================

/**
 * Get Global Layout Data Query
 * Fetches site settings, navigation, and footer in a single query
 */
export function getGlobalLayoutDataQuery(): QueryResult {
  // Remove outer braces from projections
  const siteSettingsFields = SITE_SETTINGS_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();
  const navigationFields = NAVIGATION_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();
  const footerFields = FOOTER_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();

  return {
    query: `{
      "siteSettings": *[_type == "siteSettings"][0] {
        ${siteSettingsFields}
      },
      "navigation": *[_type == "navigation"][0] {
        ${navigationFields}
      },
      "footer": *[_type == "footer"][0] {
        ${footerFields}
      }
    }`,
    params: {},
  };
}
