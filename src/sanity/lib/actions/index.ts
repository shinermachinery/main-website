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
  // Posts
  getPosts,
  getFeaturedPosts,
  getRecentPosts,
  getPostBySlug,
  searchPosts,
  // Authors
  getAuthors,
  getAuthorBySlug,
  // Categories
  getCategories,
  getCategoryBySlug,
  // Types
  type Author,
  type Category,
  type Post,
  type PostSummary,
} from "./blog";

// ============================================================================
// Product Actions
// ============================================================================

export {
  // Products
  getProducts,
  getFeaturedProducts,
  getProductsByCollection,
  getProductBySlug,
  searchProducts,
  // Collections
  getCollections,
  getCollectionBySlug,
  // Types
  type Product,
  type ProductSummary,
  type Collection,
} from "./products";

// ============================================================================
// Marketing Actions (Achievements, Certifications, Events)
// ============================================================================

export {
  // Achievements
  getAchievements,
  // Certifications
  getCertifications,
  // Events
  getEvents,
  // Types
  type Achievement,
  type Certification,
  type Event,
} from "./marketing";

// ============================================================================
// Projects Actions (Installations, Clients, Projects, Services)
// ============================================================================

export {
  // Installations
  getInstallations,
  // Clients
  getClients,
  getClientsInColumns,
  getOtherClients,
  // Projects
  getProjects,
  getProjectBySlug,
  // Services
  getServices,
  getServiceBySlug,
  // Flowcharts
  getFlowchart,
  getFlowcharts,
  // Types
  type Installation,
  type Client,
  type OtherClient,
  type Project,
  type Service,
  type Flowchart,
} from "./projects";

// ============================================================================
// Company Actions (Director, Mission/Vision, Why Choose Us, Team)
// ============================================================================

export {
  // Director
  getDirector,
  // Mission Vision
  getMissionVision,
  // Why Choose Us
  getWhyChooseUs,
  // Team Members
  getTeamMembers,
  // Types
  type Director,
  type MissionVision,
  type Reason,
  type WhyChooseUs,
  type TeamMember,
} from "./company";
