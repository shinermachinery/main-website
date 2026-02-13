"use server";

import { sanityFetch } from "@/sanity/lib/live";
import {
  getFooterQuery,
  getGlobalLayoutDataQuery,
  getNavigationQuery,
  getSiteSettingsQuery,
} from "@/sanity/lib/queries";

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

export interface NavigationItem {
  _key: string;
  label: string;
  link?: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{
    _key: string;
    label: string;
    link: string;
    description?: string;
  }>;
}

export interface Navigation {
  _id: string;
  _type: "navigation";
  menuItems?: NavigationItem[];
  ctaButton?: {
    label: string;
    link: string;
  };
}

export interface FooterSection {
  _key: string;
  title: string;
  links?: Array<{
    _key: string;
    label: string;
    url: string;
  }>;
}

export interface Footer {
  _id: string;
  _type: "footer";
  sections?: FooterSection[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  copyrightText?: string;
}

export interface GlobalLayoutData {
  siteSettings: SiteSettings | null;
  navigation: Navigation | null;
  footer: Footer | null;
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

/**
 * Get navigation
 */
export async function getNavigation(): Promise<Navigation | null> {
  try {
    const { query, params } = getNavigationQuery();
    const result = await sanityFetch({ query, params });
    return result.data || null;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return null;
  }
}

/**
 * Get footer
 */
export async function getFooter(): Promise<Footer | null> {
  try {
    const { query, params } = getFooterQuery();
    const result = await sanityFetch({ query, params });
    return result.data || null;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
}

/**
 * Get all global layout data (site settings, navigation, footer)
 */
export async function getGlobalLayoutData(): Promise<GlobalLayoutData> {
  try {
    const { query, params } = getGlobalLayoutDataQuery();
    const result = await sanityFetch({ query, params });
    return {
      siteSettings: result.data?.siteSettings || null,
      navigation: result.data?.navigation || null,
      footer: result.data?.footer || null,
    };
  } catch (error) {
    console.error("Error fetching global layout data:", error);
    return {
      siteSettings: null,
      navigation: null,
      footer: null,
    };
  }
}
