"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { getSiteSettingsQuery } from "@/sanity/lib/queries";

// ============================================================================
// Types
// ============================================================================

export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  companyName?: string;
  logo?: {
    asset: { _ref: string };
    alt?: string;
    hotspot?: { x: number; y: number };
  };
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  seoDefaults?: {
    title?: string;
    description?: string;
    image?: {
      asset: { _ref: string };
    };
  };
}

// ============================================================================
// Fetch Functions
// ============================================================================

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { query, params } = getSiteSettingsQuery();
    const result = await sanityFetch({ query, params });
    return result.data || null;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}
