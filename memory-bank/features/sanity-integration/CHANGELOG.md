# Changelog - Sanity CMS Integration

All notable changes to the Sanity integration will be documented in this file.

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
