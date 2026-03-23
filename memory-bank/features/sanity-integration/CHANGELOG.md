# Changelog - Sanity CMS Integration

All notable changes to the Sanity integration will be documented in this file.

## [2.4.0] - 2026-02-27 - Homepage Schema Updates + Marketing Actions

### Summary
Updated homepage schema with new fields and updated marketing actions. Updated shiner logo. Added process section component.

### Schema Changes
- **Updated** `homeType` - Added new fields for homepage content
- **Updated** marketing actions in `src/sanity/lib/actions/marketing.ts`
- **Updated** home page queries in `src/sanity/lib/queries/pages/home.ts`

### Files Changed
- `src/sanity/schemaTypes/homepage/homeType.ts`
- `src/sanity/lib/actions/marketing.ts`
- `src/sanity/lib/queries/pages/home.ts`
- `src/sanity/lib/actions/index.ts`

---

## [2.3.0] - 2026-02-25 - Remove Navigation & Footer Schemas

### Summary
Removed `navigationType` and `footerType` Sanity schemas. Navigation and footer are now fully static/data-driven from `src/data/navigation.ts`. Simplified settings queries significantly.

### Schema Changes
- **Removed** `src/sanity/schemaTypes/common/navigationType.ts` - CMS-managed navigation menu
- **Removed** `src/sanity/schemaTypes/common/footerType.ts` - CMS-managed footer content
- **Removed** Navigation and Footer singletons from Sanity Studio structure
- **Removed** Navigation and Footer projections from `src/sanity/lib/queries/shared/projections.ts`

### Query Changes
- **Simplified** `src/sanity/lib/queries/pages/settings.ts` - Removed navigation and footer queries
- **Simplified** `src/actions/settings.ts` - Removed `getNavigation()` and `getFooter()` functions
- **Updated** query index exports

### Component Changes
- **Updated** `src/components/layout/footer.tsx` - Now uses static data from `src/data/navigation.ts`
- **Updated** `src/components/layout/navbar.tsx` - Uses data-driven config
- **Added** `src/components/sections/process/process-section.tsx` - New process section component

### Files Changed
- 20 files modified, 587 lines removed

---

## [2.2.0] - 2026-02-25 - Director Schema Consolidation

### Summary
Removed standalone `director` schema type. Director data is now fetched from `teamMember` with `isDirector == true` flag. Added `phone` and `linkedin` fields to all team members.

### Schema Changes
- **Removed** `src/sanity/schemaTypes/company/directorType.ts` - Standalone director document type
- **Removed** Director singleton from Sanity Studio structure
- **Updated** `teamMemberType` - Added `phone` and `linkedin` fields (available for all team members, not just director)
- **Updated** `teamMemberType` - Removed `hidden` restriction from `contactEmail`, `phone`, `linkedin` fields

### Action Changes
- **Removed** `getDirector()` from `src/sanity/lib/actions/company.ts`
- **Removed** `Director` type export from `src/sanity/lib/actions/index.ts`
- **Updated** `getDirector()` in `src/actions/about.ts` - Now returns `DirectorData` type with resolved image URL
- **Updated** `getTeamMembers()` in company.ts - Fixed bio Portable Text to plain text conversion, uses `contactEmail` field name

### Projection Changes
- **Updated** `TEAM_MEMBER_PROJECTION` - Added `contactEmail`, `phone`, `linkedin`
- **Updated** `TEAM_MEMBER_FULL_PROJECTION` - Added `phone`, `linkedin`

### Files Changed
- 10+ files modified
- 1 file deleted (directorType.ts)

---

## [2.1.0] - 2026-02-14 - Query Reorganization & Infrastructure

### Summary
Reorganized GROQ queries into page-based and shared modules. Added error handling pages and updated all components and actions to use the new query structure.

### Query Architecture
- **Reorganized** flat query files into `pages/` and `shared/` subdirectories
- **Deleted** old flat query files: `blog.ts`, `collections.ts`, `common.ts`, `company.ts`, `home.ts`, `marketing.ts`, `products.ts`, `projects.ts`, `team.ts`, `testimonials.ts`
- **Created** `src/sanity/lib/queries/pages/` - Page-specific queries (about, blog, events, home, products, projects, services, settings, testimonials)
- **Created** `src/sanity/lib/queries/shared/` - Shared projections and utilities (projections.ts, utils.ts)
- **Updated** barrel export in `src/sanity/lib/queries/index.ts`

### Infrastructure
- **Added** `src/app/error.tsx` - Global error boundary page
- **Added** `src/app/not-found.tsx` - Custom 404 page

### Component & Action Updates
- Updated all server actions to use new query paths
- Updated all components to work with refactored data structures
- Updated navigation data and layout components

### Files Changed
- 123 files (4,472 additions, 2,412 deletions)
- 10 query files deleted, 13 query files created
- All page components and server actions updated

---

## [2.0.0] - 2026-02-08 - Major Schema Refactoring

### Status
✅ **Completed** - Full schema redesign implemented

### Summary
Complete redesign of Sanity schemas to match Figma designs, consolidating 27 schemas into 19 cleaner schemas with better structure.

### Schema Changes

#### Created (4 new schemas):
- `siteSettingsType.ts` - Global site configuration (singleton)
- `navigationType.ts` - CMS-managed navigation menu (singleton)
- `footerType.ts` - CMS-managed footer content (singleton)
- `aboutPageType.ts` - Merged about page content (singleton)

#### Deleted (7 obsolete schemas):
- `homepageAbout.ts` - Unused reusable object
- `homepageFeatures.ts` - Unused reusable object
- `homepageHero.ts` - Unused reusable object
- `companyStats.ts` - Inlined into homepage
- `missionVisionType.ts` - Merged into aboutPageType
- `whyChooseUsType.ts` - Merged into aboutPageType
- `directorType.ts` - Merged into teamMemberType (isDirector flag)

#### Modified (6 schemas):
- `teamMemberType.ts` - Added isDirector, achievements, contactEmail fields
- `installationType.ts` - Simplified: title, images[], client reference, machineryType, location
- `clientType.ts` - Simplified: companyName, logo, featured flag
- `eventType.ts` - Simplified: title, images[], location
- `productType.ts` - Updated specifications to array of {label, value}
- `testimonialType.ts` - Added separate company field

### Query Updates
- Added projections: SITE_SETTINGS_PROJECTION, NAVIGATION_PROJECTION, FOOTER_PROJECTION, ABOUT_PAGE_PROJECTION
- Removed projections: DIRECTOR_PROJECTION, MISSION_VISION_PROJECTION, WHY_CHOOSE_US_PROJECTION
- Updated: TEAM_MEMBER_PROJECTION, INSTALLATION_PROJECTION, CLIENT_PROJECTION, EVENT_PROJECTION, TESTIMONIAL_PROJECTION
- Created: `src/sanity/lib/queries/pages/settings.ts`
- Updated: `src/sanity/lib/queries/pages/about.ts`

### Server Actions
- Created: `src/actions/settings.ts` - getSiteSettings, getNavigation, getFooter, getGlobalLayoutData
- Created: `src/actions/about.ts` - getAboutPage, getDirector, getAllTeamMembers

### Studio Structure Updates
- Homepage now singleton document (not list)
- About page now singleton document
- Added Settings section with Site Settings, Navigation, Footer singletons

### Files Modified (Summary)
- Schema files: 10 (4 created, 6 modified)
- Index files: 6 updated
- Query files: 5 (1 created, 4 modified)
- Action files: 2 created
- Structure file: 1 modified

---

## [1.1.0] - 2025-12-25

### Enhanced
- **Product Schema** - Comprehensive product management schema
  - Multiple images support with alt text (array of images)
  - Brochure file upload (PDF/DOC support)
  - Description bullet points for key benefits
  - Specifications object with description and spec points (label/value pairs)
  - Related products references
  - Product collection reference
  - Kept existing fields: price, features, featured, order

### Added
- **Product Collection Schema** - Group products into collections
  - Title and slug
  - Description and hero image
  - Featured collection flag
  - Display order

### Files Modified
- `src/sanity/schemaTypes/productType.ts` - Enhanced with new fields
- `src/sanity/schemaTypes/index.ts` - Added product collection export

### Files Created
- `src/sanity/schemaTypes/productCollectionType.ts` - New collection schema

## [1.0.0] - 2025-12-23

### Added
- Full Sanity CMS integration with embedded Studio
- Studio accessible at `/studio` route via catch-all dynamic route
- Sanity client configuration with CDN enabled
- Image URL builder for optimized image delivery
- Four content schemas: Post, Author, Category, Block Content
- Environment variable validation
- Vision tool plugin for GROQ query testing
- Structure tool plugin for content organization

### Configuration
- Project ID and dataset from environment variables
- API version defaulting to 2025-12-22
- CDN enabled for better performance
- Studio mounted at `/studio` base path

### Files Created
- `sanity.config.ts` - Main Sanity configuration
- `src/sanity/env.ts` - Environment validation
- `src/sanity/lib/client.ts` - API client
- `src/sanity/lib/image.ts` - Image URL builder
- `src/sanity/lib/live.ts` - Live preview setup
- `src/sanity/structure.ts` - Studio structure
- `src/sanity/schemaTypes/index.ts` - Schema exports
- `src/sanity/schemaTypes/postType.ts` - Blog post schema
- `src/sanity/schemaTypes/authorType.ts` - Author schema
- `src/sanity/schemaTypes/categoryType.ts` - Category schema
- `src/sanity/schemaTypes/blockContentType.ts` - Rich text schema
- `src/app/studio/[[...tool]]/page.tsx` - Studio page component

### Dependencies Added
- sanity@4
- next-sanity@12.0.5
- @sanity/client@7.13.2
- @sanity/vision@4
- @sanity/image-url@2.0.2
- @sanity/icons@3.7.4
- @portabletext/react@6.0.0
- styled-components@6

### Schema Details

**Post Schema:**
- Title, slug, author reference, categories array
- Main image with alt text
- Published date
- Body (block content)
- Excerpt

**Author Schema:**
- Name, slug
- Profile image
- Bio (block content array)

**Category Schema:**
- Title, slug
- Description

**Block Content Schema:**
- Supports headings, paragraphs, lists
- Bold, italic, links
- Images and code blocks
