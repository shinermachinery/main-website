/**
 * Company Actions
 * Server actions for fetching director, mission/vision, why choose us, and team
 */

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

// ============================================================================
// Types
// ============================================================================

export interface Director {
  pageTitle: string;
  pageSubtitle?: string;
  name: string;
  title: string;
  image: string;
  bio: any;
  achievements?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
}

export interface MissionVision {
  pageTitle: string;
  pageSubtitle?: string;
  missionTitle: string;
  missionStatement: string;
  missionImage: string;
  visionTitle: string;
  visionStatement: string;
  visionImage: string;
}

export interface Reason {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface WhyChooseUs {
  title: string;
  subtitle?: string;
  heroImage?: string;
  reasons: Reason[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

// ============================================================================
// Director Actions
// ============================================================================

/**
 * Get director page data
 */
export async function getDirector(): Promise<Director | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "director"][0] {
        pageTitle,
        pageSubtitle,
        name,
        title,
        image,
        bio,
        achievements,
        email,
        phone,
        linkedin
      }`,
    });

    if (!data) {
      return null;
    }

    return {
      pageTitle: data.pageTitle || "Our Director",
      pageSubtitle: data.pageSubtitle,
      name: data.name,
      title: data.title,
      image: data.image
        ? urlFor(data.image).url()
        : "/placeholder-director.jpg",
      bio: data.bio,
      achievements: data.achievements,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
    };
  } catch (error) {
    console.error("Error fetching director data:", error);
    return null;
  }
}

// ============================================================================
// Mission Vision Actions
// ============================================================================

/**
 * Get mission and vision page data
 */
export async function getMissionVision(): Promise<MissionVision | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "missionVision"][0] {
        pageTitle,
        pageSubtitle,
        missionTitle,
        missionStatement,
        missionImage,
        visionTitle,
        visionStatement,
        visionImage
      }`,
    });

    if (!data) {
      return null;
    }

    return {
      pageTitle: data.pageTitle || "Our Mission & Vision",
      pageSubtitle: data.pageSubtitle,
      missionTitle: data.missionTitle || "Our Mission",
      missionStatement: data.missionStatement || "",
      missionImage: data.missionImage
        ? urlFor(data.missionImage).url()
        : "/placeholder-mission.jpg",
      visionTitle: data.visionTitle || "Our Vision",
      visionStatement: data.visionStatement || "",
      visionImage: data.visionImage
        ? urlFor(data.visionImage).url()
        : "/placeholder-vision.jpg",
    };
  } catch (error) {
    console.error("Error fetching mission/vision data:", error);
    return null;
  }
}

// ============================================================================
// Why Choose Us Actions
// ============================================================================

/**
 * Get why choose us page data
 */
export async function getWhyChooseUs(): Promise<WhyChooseUs | null> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "whyChooseUs"][0] {
        title,
        subtitle,
        heroImage,
        reasons[] {
          title,
          description,
          icon,
          order
        }
      }`,
    });

    if (!data) {
      return null;
    }

    return {
      title: data.title || "Why Choose Us",
      subtitle: data.subtitle,
      heroImage: data.heroImage ? urlFor(data.heroImage).url() : undefined,
      reasons:
        data.reasons && data.reasons.length > 0
          ? data.reasons
              .map(
                (reason: {
                  title: string;
                  description: string;
                  icon?: any;
                  order?: number;
                }) => ({
                  title: reason.title,
                  description: reason.description,
                  icon: reason.icon ? urlFor(reason.icon).url() : undefined,
                  order: reason.order || 999,
                }),
              )
              .sort(
                (a: Reason, b: Reason) => (a.order || 999) - (b.order || 999),
              )
          : [],
    };
  } catch (error) {
    console.error("Error fetching why choose us data:", error);
    return null;
  }
}

// ============================================================================
// Team Member Actions
// ============================================================================

/**
 * Get all team members
 * @param limit - Optional limit for results
 */
export async function getTeamMembers(limit?: number): Promise<TeamMember[]> {
  try {
    const paginationSlice = limit ? `[0...${limit}]` : "";

    const { data: members } = await sanityFetch({
      query: `*[_type == "teamMember"] | order(order asc, _createdAt desc) {
        _id,
        name,
        role,
        bio,
        image,
        email,
        phone,
        linkedin
      }${paginationSlice}`,
    });

    if (!members || members.length === 0) {
      return [];
    }

    return members.map(
      (member: {
        _id: string;
        name: string;
        role: string;
        bio?: string;
        image?: any;
        email?: string;
        phone?: string;
        linkedin?: string;
      }) => ({
        id: member._id,
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image ? urlFor(member.image).url() : undefined,
        email: member.email,
        phone: member.phone,
        linkedin: member.linkedin,
      }),
    );
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}
