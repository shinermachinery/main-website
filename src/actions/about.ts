"use server";

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getAboutPageQuery,
  getAllTeamMembersQuery,
  getCompanyTeamMembersQuery,
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
  heroDescription?: any[];
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
    hotspot?: { x: number; y: number };
  };
  mission?: {
    title?: string;
    description?: any[];
  };
  vision?: {
    title?: string;
    description?: any[];
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
  bio?: any;
  image?: {
    asset: { _ref: string };
    alt?: string;
    hotspot?: { x: number; y: number };
  };
  isDirector?: boolean;
  achievements?: string[];
  contactEmail?: string;
  phone?: string;
  linkedin?: string;
  order?: number;
}

export interface DirectorData {
  name: string;
  title: string;
  image: string;
  bio?: any;
  achievements?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
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
 * Returns resolved data with image URL ready for rendering
 */
export async function getDirector(): Promise<DirectorData | null> {
  try {
    const { query, params } = getDirectorQuery();
    const result = await sanityFetch({ query, params });
    const data = result.data as TeamMember | null;

    if (!data) {
      return null;
    }

    return {
      name: data.name,
      title: data.role,
      image: data.image
        ? urlFor(data.image).url()
        : "/placeholder-director.jpg",
      bio: data.bio,
      achievements: data.achievements,
      email: data.contactEmail,
      phone: data.phone,
      linkedin: data.linkedin,
    };
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
 * Uses full projection (includes achievements) for detailed team profiles
 */
export async function getTeamMembersExcludingDirector(): Promise<TeamMember[]> {
  try {
    const { query, params } = getCompanyTeamMembersQuery();
    const result = await sanityFetch({ query, params });
    const teamMembers: TeamMember[] = result.data || [];
    return teamMembers.filter((member) => !member.isDirector);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}
