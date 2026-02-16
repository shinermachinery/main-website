# Features Index

Master index of all features in this project. Each feature has detailed documentation in its respective folder.

**Last Updated**: 2026-02-16

## Active Features

Features currently implemented and in use.

### 1. Theme System

**Status**: ✅ Completed
**Location**: `memory-bank/features/theme-system/`
**Description**: Dark/light theme switching with system preference detection
**Key Tech**: next-themes, Tailwind CSS
**Created**: 2025-12-23

**Quick Links:**
- [Full Documentation](./features/theme-system/README.md)
- [Changelog](./features/theme-system/CHANGELOG.md)

**Key Files:**
- `src/lib/theme-provider.tsx` - Theme provider
- `src/components/global/mode-toggle.tsx` - Toggle UI
- `src/app/layout.tsx` - Provider integration

**Dependencies:**
- next-themes@0.4.6
- UI Components (for ModeToggle)

---

### 2. Sanity CMS Integration

**Status**: ✅ Completed (Schema refactoring + query reorganization complete)
**Location**: `memory-bank/features/sanity-integration/`
**Description**: Headless CMS with embedded Studio for content management
**Key Tech**: Sanity v4, next-sanity, GROQ
**Created**: 2025-12-23
**Last Updated**: 2026-02-14

**Quick Links:**
- [Full Documentation](./features/sanity-integration/README.md)
- [Changelog](./features/sanity-integration/CHANGELOG.md)

**Key Files:**
- `sanity.config.ts` - Sanity configuration
- `src/sanity/lib/client.ts` - API client
- `src/sanity/schemaTypes/**/*.ts` - Content schemas (19 total, 7 domains)
- `src/sanity/lib/queries/pages/*.ts` - Page-specific GROQ queries
- `src/sanity/lib/queries/shared/*.ts` - Shared projections and utilities
- `src/sanity/structure.ts` - Studio structure
- `src/app/studio/[[...tool]]/page.tsx` - Studio route

**Content Schemas (19 total):**

*Singletons (Pages):*
- Home - Homepage content (homeType)
- About Page - Merged mission/vision/features (aboutPageType)
- Site Settings - Company info, SEO defaults (siteSettingsType)
- Navigation - CMS-managed menu (navigationType)
- Footer - CMS-managed footer (footerType)

*Collections:*
- Post - Blog posts
- Author - Author profiles
- Category - Post categories
- Block Content - Rich text
- Product - Product catalog items
- Product Collection - Product groupings
- Project - Projects with gallery
- Service - Service offerings
- Team Member - Team profiles (with isDirector flag for director)
- Testimonial - Customer testimonials (with rating, company)
- Contact Submission - Contact form data
- Event - Events (title, images, location)
- Certification - Company certifications
- Achievement - Company achievements
- Installation - Installation projects (simplified)
- Client - Client logos (with featured flag)
- Flowchart - Process flowcharts

**Dependencies:**
- sanity@4
- next-sanity@12.0.5
- @sanity/client@7.13.2
- @sanity/image-url@2.0.2
- @portabletext/react@6.0.0

**Access:**
- Studio: `/studio`
- Dashboard: [sanity.io/manage](https://www.sanity.io/manage)

---

### 3. UI Component Library (shadcn/ui)

**Status**: 🚧 In Development (Migrating to shadcn/ui)
**Location**: `memory-bank/features/ui-components/`
**Description**: Modern, accessible UI components using shadcn/ui - copy-paste components built on Radix UI
**Key Tech**: shadcn/ui, Radix UI, Tailwind CSS, CVA
**Created**: 2025-12-23
**Last Updated**: 2026-01-05

**Quick Links:**
- [Full Documentation](./features/ui-components/README.md)
- [Changelog](./features/ui-components/CHANGELOG.md)

**Key Files:**
- `src/components/ui/*.tsx` - shadcn/ui components
- `src/components/global/*.tsx` - App-specific components
- `src/lib/utils.ts` - Utility functions (cn helper)

**Component System:**
- **Primary Source**: shadcn/ui (installed via CLI)
- **Design**: Ultra-thin, light mode only
- **Installation**: `bunx shadcn@latest add [component]`

**Available Components:**
- Button (with ultra-thin variants)
- Accordion (collapsible content)
- DropdownMenu (context menus)
- Card, Dialog, Form, Input, Select, Tabs (available to install)

**Dependencies:**
- shadcn/ui CLI tool
- @radix-ui/* (via shadcn/ui)
- class-variance-authority@0.7.1
- tailwind-merge@3.4.0
- lucide-react@0.562.0

---

### 4. MCP Server Integration

**Status**: ✅ Completed
**Location**: `.mcp.json`, `.claude/settings.local.json`
**Description**: Model Context Protocol server configuration for external tool integration
**Key Tech**: MCP Protocol
**Created**: 2025-12-23

**Quick Links:**
- [Setup Guide](../MCP-SETUP.md)
- [Configuration](../.mcp.json)

**Key Files:**
- `.mcp.json` - MCP server definitions
- `.mcp.json.example` - Example configuration
- `.claude/settings.local.json` - Auto-enable settings
- `MCP-SETUP.md` - Complete setup guide

**Current MCP Servers:**
- Figma MCP (`http://127.0.0.1:3845/mcp`) - Design file access

**Features:**
- Auto-enable all project MCP servers
- Easy URL configuration
- Support for multiple MCP servers
- Team-friendly setup

---

### 5. Landing Page

**Status**: ✅ Completed
**Location**: `memory-bank/features/landing-page/`
**Description**: Professional landing page with static sections and CMS-managed content
**Key Tech**: Next.js 16, Sanity CMS, Plus Jakarta Sans, OKLCH colors
**Created**: 2025-12-23

**Quick Links:**
- [Full Documentation](./features/landing-page/README.md)
- [Changelog](./features/landing-page/CHANGELOG.md)

**Key Files:**
- `src/app/(landing)/layout.tsx` - Landing layout (Navbar + Footer)
- `src/app/(landing)/page.tsx` - Home page route
- `src/app/(landing)/about/page.tsx` - About Us page
- `src/app/(landing)/contact/page.tsx` - Contact page
- `src/app/layout.tsx` - Root layout (fonts, theme)
- `src/app/globals.css` - Brand colors
- `src/components/landing/*` - All landing sections

**Pages:**
- **Home** (`/`) - Full landing page with all sections
- **About** (`/about`) - Company overview and values
- **Contact** (`/contact`) - Contact form and office locations
- **Blog** (`/blog`) - Blog posts listing with search and filters
- **Services** (`/services`) - Service offerings overview (5 services)

**Home Page Sections:**
- Hero section (static)
- About Us (static)
- Features Grid (static)
- Featured Products (CMS)
- Statistics (static)
- How It Works (static)
- Team (CMS)
- Testimonials (CMS)
- Contact Form (Server Action → CMS)

**Shared Layout:**
- Navbar (top navigation)
- Footer (site footer)

**Dependencies:**
- Sanity CMS Integration
- UI Components (Button, Gradient Button)
- Theme System (for color variables)

**Phases:**
- ✅ Phase 1: Foundation Setup (Completed 2025-12-23)
- ✅ Phase 2: Static Sections (Completed 2025-12-23)
- ✅ Phase 3: Sanity CMS Integration (Completed 2025-12-23)
- ✅ Phase 4: Contact Form + Footer (Completed 2025-12-23)
- ✅ Phase 5: Polish, Accessibility, SEO (Completed 2025-12-23)
- ✅ Phase 6: Route Group Restructure (Completed 2025-12-25)
- ✅ Phase 7: About Us Page (Completed 2025-12-25)
- ✅ Phase 8: Contact Us Page (Completed 2025-12-25)
- ✅ Phase 9: Light Mode Refinements (Completed 2025-12-29)
- ✅ Phase 10: Blog Posts Page (Completed 2025-12-29)
- ✅ Phase 11: Individual Blog Post Page (Completed 2025-12-29)
- ✅ Phase 12: Services Page (Completed 2025-12-29)

---

### 6. Projects & Products System

**Status**: ✅ Completed
**Location**: `memory-bank/features/projects-products/`
**Description**: Complete product catalog and detail pages with image galleries, specifications, and CMS integration
**Key Tech**: Next.js 16 App Router, Sanity CMS, Server Components, Dynamic Routes
**Created**: 2025-12-30

**Quick Links:**
- [Full Documentation](./features/projects-products/README.md)
- [Changelog](./features/projects-products/CHANGELOG.md)

**Key Files:**
- `src/app/(landing)/projects/page.tsx` - Product grid listing
- `src/app/(landing)/projects/[slug]/page.tsx` - Product detail page
- `src/components/projects/*` - All product components
- `src/sanity/schemaTypes/projectType.ts` - Product schema

**Features:**
- Product catalog with 4-column grid
- Search bar and category filtering
- Dynamic product detail pages
- Interactive image gallery (5 thumbnails)
- Features and specifications sections
- Related products recommendations
- Comprehensive skeleton loading states
- Full Sanity CMS integration with fallback data

**Components:**
- ProjectCard - Product card in grid
- ProjectsGridSection - Main catalog layout
- ProductImageGallery - Interactive gallery
- ProductFeaturesList - Star-icon features
- ProductSpecificationsSection - Tech specs
- OtherProductsSection - Related products

**Dependencies:**
- Sanity CMS Integration
- UI Components (Button, GradientButton)
- lucide-react (icons)

**Pages:**
- `/projects` - Product catalog (grid view)
- `/projects/[slug]` - Individual product detail

---

### 7. About Us Pages

**Status**: ✅ Completed
**Location**: `memory-bank/features/about-us-pages/`
**Description**: Complete About Us section with three dedicated pages, navbar dropdown, and rich content management
**Key Tech**: Next.js 16, Sanity Singleton Documents, Portable Text, Server Components
**Created**: 2025-12-30
**Last Updated**: 2026-01-12

**Quick Links:**
- [Full Documentation](./features/about-us-pages/README.md)
- [Changelog](./features/about-us-pages/CHANGELOG.md)

**Key Files:**
- `src/app/(landing)/about/why-choose-us/page.tsx` - Why Choose Us
- `src/app/(landing)/about/mission-vision/page.tsx` - Mission & Vision
- `src/app/(landing)/about/director/page.tsx` - Director profile
- `src/components/global/navbar.tsx` - About Us dropdown
- `src/sanity/schemaTypes/whyChooseUsType.ts` - Why Choose schema
- `src/sanity/schemaTypes/missionVisionType.ts` - Mission schema
- `src/sanity/schemaTypes/directorType.ts` - Director schema

**Features:**
- Navbar dropdown with 4 About options
- Why Choose Us page (3-column grid, hero image)
- Mission & Vision page (alternating image/text layout)
- Director profile (photo, bio, achievements, contact)
- Portable Text for rich director biography
- Singleton Sanity documents for easy management
- Comprehensive dummy data fallbacks
- Responsive layouts with custom skeletons

**Pages:**
- `/about/why-choose-us` - Reasons to choose company
- `/about/mission-vision` - Mission and vision statements
- `/about/director` - Director/leadership profile

**Sanity Schemas:**
- whyChooseUsType - Hero image, reasons array with icons
- missionVisionType - Mission/vision text and images
- directorType - Full profile with Portable Text bio

**Dependencies:**
- Sanity CMS Integration
- Portable Text component
- lucide-react (icons)

**Recent Updates:**
- **v1.1.0 (2026-01-09)**: Codebase-wide design system refactoring
  - Converted all px units to rem (36 files total)
  - Replaced hardcoded colors with semantic tokens
  - Improved accessibility and maintainability
  - Full build verification completed

---

### 8. SEO Configuration

**Status**: ✅ Completed
**Location**: `memory-bank/features/seo-configuration/`
**Description**: Comprehensive SEO setup with sitemap, robots.txt, favicons, and Open Graph metadata
**Key Tech**: Next.js Metadata API, Sanity CMS
**Created**: 2026-01-29

**Quick Links:**
- [Full Documentation](./features/seo-configuration/README.md)
- [Changelog](./features/seo-configuration/CHANGELOG.md)

**Key Files:**
- `src/lib/site-config.ts` - Centralized site configuration
- `src/app/robots.ts` - Robots.txt generation
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/manifest.ts` - PWA manifest
- `src/app/layout.tsx` - Root metadata with icons
- `src/app/error.tsx` - Global error boundary
- `src/app/not-found.tsx` - Custom 404 page
- `public/favicons/*` - All favicon assets

**Features:**
- Dynamic sitemap with Sanity CMS content
- Robots.txt with crawling rules
- Full favicon support (iOS, Android, desktop)
- Open Graph and Twitter Card metadata
- PWA manifest configuration
- Centralized site configuration

**Generated Routes:**
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`

**Dependencies:**
- Sanity CMS Integration (for dynamic URLs)

---

### 9. Shared Search/Filter Components

**Status**: ✅ Completed
**Location**: `memory-bank/features/shared-components/`
**Description**: Reusable search, filter, empty-state, and active filter components shared across the application. Includes global EmptyState component and px→rem codebase-wide conversion.
**Key Tech**: Next.js URL params, shadcn Select, React Server Components, lucide-react
**Created**: 2026-02-15
**Last Updated**: 2026-02-16

**Quick Links:**
- [Full Documentation](./features/shared-components/README.md)
- [Changelog](./features/shared-components/CHANGELOG.md)

**Key Files:**
- `src/components/ui/empty-state.tsx` - Global EmptyState component (3 variants, 3 sizes)
- `src/components/shared/search-input.tsx` - URL-param search input
- `src/components/shared/category-filter.tsx` - Dynamic category dropdown
- `src/components/shared/active-filters.tsx` - Removable filter chips
- `src/components/shared/search-filter-bar.tsx` - Composition wrapper
- `src/components/products/products-data.tsx` - Server data component
- `src/components/products/products-grid.tsx` - Client grid component

**Features:**
- Global `EmptyState` component with variant support (empty/filtered/error), used in 14 files
- URL-param driven search/filter for both `/blog` and `/products`
- Dynamic categories from Sanity CMS
- Products filtering by product collections
- ProductCard with SEO-friendly Link wrapper
- Codebase-wide px→rem conversion (30+ files)

**Dependencies:**
- Sanity CMS Integration
- UI Components (shadcn Select, Button)

---

## Feature Status Legend

- ✅ **Completed** - Fully implemented and stable
- 🚧 **In Development** - Actively being worked on
- 📋 **Planned** - Scheduled for implementation
- 🔄 **Refactoring** - Being improved or rewritten
- ⚠️ **Deprecated** - No longer recommended, see migration guide
- 🗃️ **Archived** - Removed, see archived docs

## Feature Dependencies

Visual representation of how features depend on each other:

```
UI Components
    ↓
Theme System
    ↓
(Both independent)
    ↓
Sanity Integration (independent)
```

**Dependency Graph:**
- **Theme System** depends on: UI Components (ModeToggle)
- **UI Components** depends on: None (foundational)
- **Sanity Integration** depends on: None (independent)

## Features by Category

### Content Management
- [Sanity CMS Integration](#2-sanity-cms-integration)

### UI/UX
- [Theme System](#1-theme-system)
- [UI Component Library](#3-ui-component-library)

### Infrastructure
- (None yet)

### Integrations
- [Sanity CMS Integration](#2-sanity-cms-integration)

## Planned Features

Features scheduled for future implementation:

### 📋 Blog Frontend

**Priority**: High
**Description**: Public-facing blog pages displaying Sanity content
**Estimated Start**: TBD
**Dependencies**: Sanity Integration

**Planned Components:**
- Blog listing page
- Individual post pages
- Author pages
- Category pages

---

### 📋 Image Optimization

**Priority**: Medium
**Description**: Enhanced image handling and optimization
**Estimated Start**: TBD
**Dependencies**: Sanity Integration

**Planned Features:**
- Next.js Image component integration
- Responsive images
- Lazy loading
- Blur placeholders

---

## How to Use This Index

### Finding a Feature

1. **Browse by status**: Use the Active Features section
2. **Search by category**: Check "Features by Category"
3. **View roadmap**: See "Planned Features"

### When Starting Work on a Feature

1. Update status in this index
2. Create feature folder in `memory-bank/features/[feature-name]/`
3. Copy template from `memory-bank/templates/feature-template.md`
4. Fill in documentation as you build
5. Update this index when complete

### When Updating a Feature

1. Update feature's README.md
2. Add entry to feature's CHANGELOG.md
3. Update "Last Modified" date in feature's README
4. Update this index if status changes

### When Deprecating a Feature

1. Change status to ⚠️ Deprecated
2. Add migration guide to feature docs
3. Set timeline for removal
4. Create replacement feature (if applicable)

### When Archiving a Feature

1. Move to `memory-bank/archived/[feature-name]/`
2. Remove from Active Features
3. Add to archived section (if needed)
4. Update status to 🗃️ Archived

## Quick Reference

| Feature | Status | Files | Docs |
|---------|--------|-------|------|
| Theme System | ✅ | `src/lib/theme-provider.tsx`<br>`src/components/global/mode-toggle.tsx` | [View](./features/theme-system/README.md) |
| Sanity Integration | ✅ | `sanity.config.ts`<br>`src/sanity/**/*` (19 schemas, queries in pages/shared/) | [View](./features/sanity-integration/README.md) |
| UI Components (shadcn/ui) | 🚧 | `src/components/ui/**/*`<br>`src/lib/utils.ts` | [View](./features/ui-components/README.md) |
| MCP Integration | ✅ | `.mcp.json`<br>`.claude/settings.local.json` | [View](../MCP-SETUP.md) |
| Landing Pages | ✅ | `src/app/(landing)/**/*`<br>6 pages: Home, About, Contact, Blog, Blog Detail, Services | [View](./features/landing-page/README.md) |
| Projects & Products | ✅ | `src/app/(landing)/projects/**/*`<br>`src/components/projects/*` | [View](./features/projects-products/README.md) |
| About Us Pages | ✅ | `src/app/(landing)/about/*`<br>3 pages: Why Choose, Mission/Vision, Director | [View](./features/about-us-pages/README.md) |
| SEO Configuration | ✅ | `src/app/robots.ts`<br>`src/app/sitemap.ts`<br>`src/lib/site-config.ts`<br>`src/app/error.tsx`<br>`src/app/not-found.tsx` | [View](./features/seo-configuration/README.md) |
| Shared Components | ✅ | `src/components/shared/*`<br>`src/components/ui/empty-state.tsx`<br>`src/components/products/products-data.tsx`<br>`src/components/products/products-grid.tsx` | [View](./features/shared-components/README.md) |

## Feature Statistics

**Total Features**: 9
- ✅ Completed: 9
- 🚧 In Development: 0
- 📋 Planned: 2

**Last Feature Completed**: Global EmptyState Component (2026-02-16)
**Recently Updated**:
- **EmptyState Component (2026-02-16)** - Created global `EmptyState` component with 3 variants (empty/filtered/error), 3 sizes, and optional icon/action. Migrated 14 files from inline empty-state patterns, eliminating duplicated section wrappers.
- **Shared Components + px→rem (2026-02-15)** - Extracted shared search/filter/active-filters components for blog and products pages. Made products search/filter functional via URL params. Converted all px to rem across 30+ files. ProductCard cleanup.
- **Query Reorganization (2026-02-14)** - Reorganized GROQ queries into pages/ and shared/ modules. Added error boundary and 404 pages. Updated all components and actions (123 files, 4472+/2412-).
- **Sanity Schema Refactoring (2026-02-08)** - Consolidated 27 schemas to 19. Added siteSettings, navigation, footer, aboutPage singletons. Simplified installation, client, event schemas.
- **SEO Configuration (2026-01-29)** - Sitemap, robots.txt, favicons, Open Graph metadata, PWA manifest
- **Sanity Data Flow Pattern (2026-01-15)** - Documented 3-layer architecture (Queries → Actions → Components) in patterns.md
- **Hero Section Redesign (2026-01-10)** - Complete redesign to match Figma reference
- **Design System Refactoring (2026-01-09)** - Codebase-wide conversion of px to rem units (36 files), hardcoded colors to semantic tokens
**Next Planned**: Events Page, Contact Form Enhancement, Service Detail Pages

## Related Documentation

- [Architecture Overview](./architecture/system-overview.md)
- [Tech Stack](./architecture/tech-stack.md)
- [Development Patterns](./architecture/patterns.md)
- [Memory Bank README](./README.md)
- [Feature Template](./templates/feature-template.md)

---

**Maintenance Schedule**: Review and update this index when features change
**Owner**: Team
**Last Review**: 2026-02-16
