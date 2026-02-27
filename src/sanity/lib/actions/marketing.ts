/**
 * Marketing Actions
 * Server actions for fetching achievements, certifications, and events
 */

import type { Testimonial } from "@/lib/sanity-types";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { getAllTestimonialsQuery } from "@/sanity/lib/queries/pages/testimonials";

// ============================================================================
// Types
// ============================================================================

export interface Achievement {
  id: string;
  awardName: string;
  awardGiver: string;
  image: string;
  awardDate?: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  images: string[];
  location?: string;
}

// ============================================================================
// Testimonial Actions
// ============================================================================

/**
 * Get all testimonials
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const { query } = getAllTestimonialsQuery();
    const { data: testimonials } = await sanityFetch({ query });

    if (!testimonials || testimonials.length === 0) {
      return [];
    }

    return testimonials as Testimonial[];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// ============================================================================
// Achievement Actions
// ============================================================================

/**
 * Get all achievements
 * @param limit - Optional limit for results (default: 3)
 */
export async function getAchievements(
  limit: number = 3,
): Promise<Achievement[]> {
  try {
    const { data: achievements } = await sanityFetch({
      query: `*[_type == "achievement"] | order(order asc, _createdAt desc) {
        _id,
        awardName,
        awardGiver,
        image,
        awardDate,
        description
      }[0...${limit}]`,
    });

    if (!achievements || achievements.length === 0) {
      return [];
    }

    return achievements.map(
      (achievement: {
        _id: string;
        awardName: string;
        awardGiver: string;
        image?: any;
        awardDate?: string;
        description?: string;
      }) => ({
        id: achievement._id,
        awardName: achievement.awardName,
        awardGiver: achievement.awardGiver,
        image: achievement.image
          ? urlFor(achievement.image).url()
          : "/placeholder-achievement.jpg",
        awardDate: achievement.awardDate,
        description: achievement.description,
      }),
    );
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
}

// ============================================================================
// Certification Actions
// ============================================================================

/**
 * Get all certifications
 * @param limit - Optional limit for results (default: 3)
 */
export async function getCertifications(
  limit: number = 3,
): Promise<Certification[]> {
  try {
    const { data: certifications } = await sanityFetch({
      query: `*[_type == "certification"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description,
        image
      }[0...${limit}]`,
    });

    if (!certifications || certifications.length === 0) {
      return [];
    }

    return certifications.map(
      (certification: {
        _id: string;
        title: string;
        description: string;
        image?: any;
      }) => ({
        id: certification._id,
        title: certification.title,
        description: certification.description,
        image: certification.image
          ? urlFor(certification.image).url()
          : undefined,
      }),
    );
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

// ============================================================================
// Event Actions
// ============================================================================

/**
 * Get all events
 * @param limit - Optional limit for results (default: 8)
 */
export async function getEvents(limit: number = 8): Promise<Event[]> {
  try {
    const { data: events } = await sanityFetch({
      query: `*[_type == "event"] | order(order asc, _createdAt desc) {
        _id,
        title,
        images[] {
          asset,
          alt
        },
        location
      }[0...${limit}]`,
    });

    if (!events || events.length === 0) {
      return [];
    }

    return events.map(
      (event: {
        _id: string;
        title: string;
        images?: any[];
        location?: string;
      }) => ({
        id: event._id,
        title: event.title,
        images:
          event.images && event.images.length > 0
            ? event.images.map((img: any) => urlFor(img).url())
            : ["/placeholder-event.jpg"],
        location: event.location,
      }),
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
