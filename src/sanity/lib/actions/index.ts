/**
 * Sanity Actions - Central Export
 *
 * Server actions for fetching data from Sanity CMS.
 * All actions use the centralized query library for consistent,
 * type-safe, and optimized data fetching.
 *
 * @module sanity/lib/actions
 */

// ============================================================================
// Blog Actions
// ============================================================================

export {
  // Types
  type Author,
  type Category,
  getAuthorBySlug,
  // Authors
  getAuthors,
  // Categories
  getCategories,
  getCategoryBySlug,
  getFeaturedPosts,
  getPostBySlug,
  // Posts
  getPosts,
  getRecentPosts,
  type Post,
  type PostSummary,
  searchPosts,
} from "./blog";

// ============================================================================
// Product Actions
// ============================================================================

export {
  type Collection,
  getCollectionBySlug,
  // Collections
  getCollections,
  getFeaturedProducts,
  getProductBySlug,
  // Products
  getProducts,
  getProductsByCollection,
  // Types
  type Product,
  type ProductSummary,
  searchProducts,
} from "./products";

// ============================================================================
// Marketing Actions (Achievements, Certifications, Events)
// ============================================================================

export {
  // Types
  type Achievement,
  type Certification,
  type Event,
  // Achievements
  getAchievements,
  // Certifications
  getCertifications,
  // Events
  getEvents,
} from "./marketing";

// ============================================================================
// Projects Actions (Installations, Clients, Projects, Services)
// ============================================================================

export {
  type Client,
  type Flowchart,
  // Clients
  getClients,
  getClientsInColumns,
  // Flowcharts
  getFlowchart,
  getFlowcharts,
  // Installations
  getInstallations,
  getOtherClients,
  getProjectBySlug,
  // Projects
  getProjects,
  getServiceBySlug,
  // Services
  getServices,
  // Types
  type Installation,
  type OtherClient,
  type Project,
  type Service,
} from "./projects";

// ============================================================================
// Company Actions (Director, Mission/Vision, Why Choose Us, Team)
// ============================================================================

export {
  // Types
  type Director,
  // Director
  getDirector,
  // Mission Vision
  getMissionVision,
  // Team Members
  getTeamMembers,
  // Why Choose Us
  getWhyChooseUs,
  type MissionVision,
  type Reason,
  type TeamMember,
  type WhyChooseUs,
} from "./company";
