"use server";

import { sanityFetch } from "@/sanity/lib/live";
import {
  getAboutPageQuery,
  getAllTeamMembersQuery,
  getDirectorQuery,
} from "@/sanity/lib/queries";

// ============================================================================
// Types
// ============================================================================

export interface AboutPageFeature {
  _key: string;
  icon?: string;
  title: string;
  description?: string;
}

export interface AboutPage {
  _id: string;
  _type: "aboutPage";
  heroTitle?: string;
  heroDescription?: string;
  whoWeAre?: {
    title?: string;
    description?: any[];
    image?: {
      asset: { _ref: string };
      alt?: string;
      hotspot?: { x: number; y: number };
    };
  };
  mission?: {
    title?: string;
    description?: string;
  };
  vision?: {
    title?: string;
    description?: string;
  };
  features?: AboutPageFeature[];
  bottomFeatures?: AboutPageFeature[];
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  bio?: string;
  image?: {
    asset: { _ref: string };
    alt?: string;
    hotspot?: { x: number; y: number };
  };
  isDirector?: boolean;
  achievements?: string[];
  contactEmail?: string;
  order?: number;
}

// ============================================================================
// Fetch Functions
// ============================================================================

/**
 * Get about page content
 */
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const { query, params } = getAboutPageQuery();
    const result = await sanityFetch({ query, params });
    return result.data || null;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

/**
 * Get director (team member with isDirector flag)
 */
export async function getDirector(): Promise<TeamMember | null> {
  try {
    const { query, params } = getDirectorQuery();
    const result = await sanityFetch({ query, params });
    return result.data || null;
  } catch (error) {
    console.error("Error fetching director:", error);
    return null;
  }
}

/**
 * Get all team members
 */
export async function getAllTeamMembers(limit?: number): Promise<TeamMember[]> {
  try {
    const { query, params } = getAllTeamMembersQuery(limit);
    const result = await sanityFetch({ query, params });
    return result.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

/**
 * Get team members excluding the director
 */
export async function getTeamMembersExcludingDirector(): Promise<TeamMember[]> {
  try {
    const teamMembers = await getAllTeamMembers();
    return teamMembers.filter((member) => !member.isDirector);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}
