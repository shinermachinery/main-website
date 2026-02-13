/**
 * Page Queries - Central Export
 * Re-exports all page-specific queries
 */

// About Page
export {
  getAboutPageQuery,
  getAllTeamMembersQuery,
  getCompanyTeamCountQuery,
  getCompanyTeamMembersQuery,
  getDirectorQuery,
  getTeamCountQuery,
  getTeamMemberByIdQuery,
  type TeamMemberListParams,
} from "./about";
// Blog Page
export {
  getAllAuthorsQuery,
  getAllCategoriesQuery,
  getAllPostsQuery,
  getAuthorBySlugQuery,
  getAuthorWithPostsQuery,
  getCategoryBySlugQuery,
  getCategoryWithPostsQuery,
  getFeaturedPostsQuery,
  getPopularCategoriesQuery,
  getPostBySlugQuery,
  getPostCountQuery,
  getRecentPostsQuery,
  type PostListParams,
  searchPostsQuery,
} from "./blog";
// Events Page
export {
  type EventListParams,
  getAchievementCountQuery,
  getAllAchievementsQuery,
  getAllCertificationsQuery,
  getAllEventsQuery,
  getCertificationCountQuery,
  getEventCountQuery,
  getUpcomingEventsQuery,
} from "./events";
// Home Page
export {
  getCompleteHomePageQuery,
  getHomeFeaturedProductsQuery,
  getHomePageQuery,
  getHomeTeamMembersQuery,
  getHomeTestimonialsQuery,
} from "./home";
// Products Page
export {
  getAllCollectionsQuery,
  getAllProductsQuery,
  getCollectionBySlugQuery,
  getCollectionCountQuery,
  getFeaturedCollectionsQuery,
  getFeaturedProductsQuery,
  getPopularCollectionsQuery,
  getProductBySlugQuery,
  getProductCountQuery,
  getProductsByCollectionQuery,
  type ProductListParams,
  searchProductsQuery,
} from "./products";
// Projects Page
export {
  getAllClientsQuery,
  getAllInstallationsQuery,
  getAllProjectsQuery,
  getClientCountQuery,
  getInstallationCountQuery,
  getProjectBySlugQuery,
  getProjectCountQuery,
  type ProjectListParams,
} from "./projects";
// Services Page
export {
  getAllServicesQuery,
  getServiceBySlugQuery,
  getServiceCountQuery,
} from "./services";
// Settings
export {
  getFooterQuery,
  getGlobalLayoutDataQuery,
  getNavigationQuery,
  getSiteSettingsQuery,
} from "./settings";

// Testimonials
export {
  getAllTestimonialsQuery,
  getAverageRatingQuery,
  getFeaturedTestimonialsQuery,
  getTestimonialCountQuery,
  getTopRatedTestimonialsQuery,
  type TestimonialListParams,
} from "./testimonials";
