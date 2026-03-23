# SEO Configuration Changelog

All notable changes to the SEO configuration feature.

## [1.1.0] - 2026-02-14 - Error & Not Found Pages

### Added
- **Error Page** (`src/app/error.tsx`) - Global error boundary with retry functionality
- **Not Found Page** (`src/app/not-found.tsx`) - Custom 404 page

### Notes
- These pages improve user experience when navigation fails or pages don't exist
- Both follow the light-mode-only design system

---

## [1.0.0] - 2026-01-29 - Initial Implementation

### Added
- **Site Configuration** (`src/lib/site-config.ts`)
  - Centralized configuration for site name, description, URLs
  - Social media handles
  - SEO keywords
  - Theme colors

- **Robots.txt** (`src/app/robots.ts`)
  - Allow crawling of public routes
  - Block studio, API, and internal routes
  - Block aggressive crawler bots
  - Sitemap reference

- **Sitemap** (`src/app/sitemap.ts`)
  - Static pages with priorities and change frequencies
  - Dynamic products from Sanity CMS
  - Dynamic blog posts from Sanity CMS
  - Dynamic projects from Sanity CMS
  - Error handling with fallback to static pages

- **Manifest** (`src/app/manifest.ts`)
  - PWA manifest configuration
  - App name and description
  - Icon references for all sizes
  - Theme and background colors

- **Root Metadata** (updated `src/app/layout.tsx`)
  - Title template with site name
  - Full favicon configuration (all sizes)
  - Open Graph metadata
  - Twitter Card metadata
  - Viewport configuration
  - Robots directives for search engines

- **Favicon Support**
  - favicon.ico (multi-size)
  - favicon-16x16.png
  - favicon-32x32.png
  - favicon-48x48.png
  - apple-touch-icon.png (180x180)
  - apple-touch-icon-180x180.png
  - android-chrome-192x192.png
  - android-chrome-512x512.png

### Files Created
- `src/lib/site-config.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/manifest.ts`

### Files Modified
- `src/app/layout.tsx` - Added comprehensive metadata

### Files Removed
- `src/app/favicon.ico` - Moved to public/favicons/
- `public/favicons/manifest.webmanifest` - Replaced by manifest.ts

### Generated Routes
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
