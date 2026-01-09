/**
 * Fallback data barrel exports
 *
 * Centralized exports for all fallback data used when Sanity CMS is unavailable
 */

// About pages
export {
  whyChooseUsData,
  missionVisionData,
  directorData,
  type WhyChooseUsData,
  type MissionVisionData,
  type DirectorData,
  type Reason,
} from "./about-pages";

// Achievements
export { dummyAchievements, type Achievement } from "./achievements";

// Blog posts
export {
  FALLBACK_BLOG_POSTS,
  FALLBACK_BLOG_IMAGES,
  FALLBACK_BLOG_POST_CONTENT,
  type BlogPost,
} from "./blog-posts";

// Certifications
export { dummyCertifications, type Certification } from "./certifications";

// Clients
export { dummyClients, type Client } from "./clients";

// Events
export { dummyEvents, type Event } from "./events";

// Installations
export { dummyInstallations, type Installation } from "./installations";

// Services
export { dummyServices, type Service } from "./services";
