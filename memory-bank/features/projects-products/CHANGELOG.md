# Changelog - Projects & Products System

All notable changes to the Projects & Products system will be documented in this file.

## [1.0.0] - 2025-12-30

### Added

#### Product Grid Page
- Created `/projects` route with full product catalog
- Implemented 4-column responsive grid (1 → 2 → 3 → 4)
- Added search bar (566px wide, rounded-full)
- Added category filter with "Machinery" chip
- Added Categories dropdown placeholder
- Created `ProjectCard` component with gradient CTA button
- Created `ProjectsGridSection` with header and grid layout
- Created `ProjectsGridSectionSkeleton` for loading state
- Added 16 dummy products as fallback data

#### Product Detail Page
- Created `/projects/[slug]` dynamic route
- Implemented two-column hero section:
  - Left: Interactive image gallery with thumbnails
  - Right: Product details with features
- Created `ProductImageGallery` component:
  - Main image display (aspect-[282/168])
  - 5 clickable thumbnails (aspect-[38/38])
  - Selected state with ring indicator
- Created `ProductFeaturesList` component:
  - Star icons from lucide-react
  - Brand-blue color matching
  - 12px gap between icon and text
- Created `ProductSpecificationsSection`:
  - Section header with title/subtitle
  - 2-column grid (567px per column)
  - Star icons with spec text
- Created `OtherProductsSection`:
  - Displays 4 related products
  - "Explore Products" button with gradient text
  - Reuses `ProjectCard` component
- Created `ProductDetailSkeleton` for loading state
- Added Download Brochure button with gradient styling

#### Sanity Schema
- Created `projectType` schema with fields:
  - `title` (string, required)
  - `slug` (slug, required, source from title)
  - `description` (text, required)
  - `images` (array of images, max 10)
  - `features` (array of strings)
  - `specifications` (array of strings)
  - `order` (number for sorting)
- Added to schema exports in `index.ts`
- Configured preview to show first image

#### Queries
- Created `getProjects()` query for grid page
- Created `getProject(slug)` query for detail page
- Created `getOtherProjects(slug)` query for recommendations
- Implemented proper image URL generation with `urlFor`
- Added error handling with dummy data fallback

#### Navigation
- Added "Projects" link to navbar pointing to `/projects`
- Note: "Products" link points to `/products` (intentional swap)

#### Design Implementation
- Applied Plus Jakarta Sans typography throughout
- Implemented exact spacing: 120px, 80px, 40px, 24px, 16px
- Used design system colors: #18181b, #71717a, #f9f9fb
- Applied gradient: `linear-gradient(89.24deg, rgba(42, 94, 152, 1) 27.51%, rgba(24, 183, 90, 1) 115.04%)`
- Matched Figma design pixel-perfect

#### TypeScript
- Added proper type definitions for all components
- Fixed TypeScript errors with explicit types
- Ensured type safety in Sanity queries

### Fixed
- Resolved navbar link direction (Products vs Projects)
- Fixed TypeScript compilation errors
- Corrected Sanity query to use `images[0]` instead of `image`
- Updated projectType schema preview to use `images.0`

### Technical Details

#### File Changes
```
Created:
- src/app/(landing)/projects/page.tsx
- src/app/(landing)/projects/[slug]/page.tsx
- src/components/projects/project-card.tsx
- src/components/projects/projects-grid-section.tsx
- src/components/projects/projects-grid-section-skeleton.tsx
- src/components/projects/product-image-gallery.tsx
- src/components/projects/product-features-list.tsx
- src/components/projects/product-specifications-section.tsx
- src/components/projects/other-products-section.tsx
- src/components/projects/product-detail-skeleton.tsx
- src/sanity/schemaTypes/projectType.ts

Modified:
- src/sanity/schemaTypes/index.ts (added projectType)
- src/components/global/navbar.tsx (added Projects link)
```

#### Dependencies
- lucide-react (Download, ArrowRight, ArrowUpRight, Star icons)
- next/image (Image optimization)
- @sanity/image-url (Image URL generation)

---

## Version History

- **1.0.0** (2025-12-30) - Initial release with full product catalog and detail pages
