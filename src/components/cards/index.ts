/**
 * Centralized exports for all card components
 *
 * This barrel file provides easy access to all card components used throughout the application.
 * Some cards remain in their domain-specific folders but are re-exported here for convenience.
 */

export { BlogCard } from "../blog/blog-card";
// Re-export cards from their domain folders
export { ProductCard } from "../sections/products/product-card";
export { TeamMemberCard } from "../team/team-member-card";
export { TestimonialCard } from "../testimonials/testimonial-card";
export { AchievementCard } from "./achievement-card";
export { BrandStoryCard } from "./brand-story-card";
export { CertificationCard } from "./certification-card";
export { ClientCard } from "./client-card";
// Cards from global/cards (moved here)
export { EventCard } from "./event-card";
