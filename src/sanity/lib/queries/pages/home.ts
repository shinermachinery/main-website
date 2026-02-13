/**
 * Home Page GROQ Queries
 * Queries for fetching homepage content from Sanity
 */

import {
  PRODUCT_SUMMARY_PROJECTION,
  TEAM_MEMBER_PROJECTION,
  TESTIMONIAL_PROJECTION,
} from "../shared/projections";
import type { QueryResult } from "../shared/utils";

/**
 * Get Home Page Content Query
 * Fetches the singleton home document with all sections
 */
export function getHomePageQuery(): QueryResult {
  return {
    query: `*[_type == "home"][0] {
      _id,
      _type,
      // Hero Section
      heroHeadline,
      heroDescription,
      heroPrimaryCta {
        text,
        link
      },
      heroSecondaryCta {
        text,
        link
      },
      "heroBackgroundImage": heroBackgroundImage.asset->url,
      // About Section
      wordAboutUsTitle,
      wordAboutUsDescription,
      gridSectionTitle,
      gridSectionDescription,
      // Stats Section
      fewMoreFactsTitle,
      facts[] {
        _key,
        number,
        text
      },
      // Steps Section
      stepTitle,
      steps[] {
        _key,
        number,
        text
      },
      // Certificates Section
      trustedByFounderTitle,
      certificates[] {
        _key,
        name,
        subDescription
      },
      // Brand Story Section
      brandStoryTitle,
      brandStoryDescription,
      brandStoryVideos[] {
        _key,
        title,
        subText
      }
    }`,
    params: {},
  };
}

/**
 * Get Featured Products for Home Page
 * Fetches featured products to display on homepage
 */
export function getHomeFeaturedProductsQuery(limit: number = 4): QueryResult {
  return {
    query: `*[_type == "product" && featured == true] | order(order asc, _createdAt desc) [0...${limit}] ${PRODUCT_SUMMARY_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Featured Team Members for Home Page
 * Fetches team members to display on homepage
 */
export function getHomeTeamMembersQuery(limit: number = 4): QueryResult {
  return {
    query: `*[_type == "teamMember"] | order(order asc, _createdAt desc) [0...${limit}] ${TEAM_MEMBER_PROJECTION}`,
    params: {},
  };
}

/**
 * Get Featured Testimonials for Home Page
 * Fetches testimonials to display on homepage
 */
export function getHomeTestimonialsQuery(limit: number = 6): QueryResult {
  return {
    query: `*[_type == "testimonial" && featured == true] | order(order asc, _createdAt desc) [0...${limit}] ${TESTIMONIAL_PROJECTION}`,
    params: {},
  };
}

/**
 * Get All Home Page Data
 * Combines all home page queries into a single request
 */
export function getCompleteHomePageQuery(): QueryResult {
  // Remove outer braces from projections since we're inside a projection block
  const productFields = PRODUCT_SUMMARY_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();
  const teamFields = TEAM_MEMBER_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();
  const testimonialFields = TESTIMONIAL_PROJECTION.trim()
    .replace(/^\{/, "")
    .replace(/\}$/, "")
    .trim();

  return {
    query: `{
      "home": *[_type == "home"][0] {
        _id,
        _type,
        // Hero Section
        heroHeadline,
        heroDescription,
        heroPrimaryCta {
          text,
          link
        },
        heroSecondaryCta {
          text,
          link
        },
        "heroBackgroundImage": heroBackgroundImage.asset->url,
        // About Section
        wordAboutUsTitle,
        wordAboutUsDescription,
        gridSectionTitle,
        gridSectionDescription,
        // Stats Section
        fewMoreFactsTitle,
        facts[] {
          _key,
          number,
          text
        },
        // Steps Section
        stepTitle,
        steps[] {
          _key,
          number,
          text
        },
        // Certificates Section
        trustedByFounderTitle,
        certificates[] {
          _key,
          name,
          subDescription
        },
        // Brand Story Section
        brandStoryTitle,
        brandStoryDescription,
        brandStoryVideos[] {
          _key,
          title,
          subText
        }
      },
      "featuredProducts": *[_type == "product" && featured == true] | order(order asc, _createdAt desc) [0...4] {
        ${productFields}
      },
      "teamMembers": *[_type == "teamMember"] | order(order asc, _createdAt desc) [0...4] {
        ${teamFields}
      },
      "testimonials": *[_type == "testimonial" && featured == true] | order(order asc, _createdAt desc) [0...6] {
        ${testimonialFields}
      }
    }`,
    params: {},
  };
}
