/**
 * Company Actions
 * Server actions for fetching mission/vision, why choose us, and team
 */

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

// ============================================================================
// Types
// ============================================================================

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

/**
 * Extract plain text from Portable Text blocks
 */
function portableTextToPlain(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .filter((block: any) => block._type === "block")
    .map((block: any) =>
      (block.children || []).map((child: any) => child.text || "").join(""),
    )
    .join(" ");
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
        contactEmail,
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
        bio?: any;
        image?: any;
        contactEmail?: string;
        phone?: string;
        linkedin?: string;
      }) => ({
        id: member._id,
        name: member.name,
        role: member.role,
        bio: portableTextToPlain(member.bio),
        image: member.image ? urlFor(member.image).url() : undefined,
        email: member.contactEmail,
        phone: member.phone,
        linkedin: member.linkedin,
      }),
    );
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}
