# SEO Configuration

> **Status**: ✅ Completed
> **Created**: 2026-01-29
> **Last Modified**: 2026-01-29
> **Owner/Lead**: Team

## Overview

Comprehensive SEO setup for the Shiner website including sitemap generation, robots.txt configuration, favicon support for all devices, and Open Graph/Twitter Card metadata.

## User Story / Use Case

**As a** website owner
**I want** proper SEO configuration
**So that** search engines can properly index my site and users see correct favicons and social sharing previews

### Example Scenarios
- Search engine crawlers can discover all pages via sitemap.xml
- Robots.txt prevents indexing of admin/studio pages
- Favicons display correctly on all devices (iOS, Android, desktop)
- Social media shares show proper preview images and descriptions

## Technical Implementation

### Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root metadata with icons & Open Graph
│   ├── robots.ts           # Robots.txt generation
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── manifest.ts         # PWA manifest generation
├── lib/
│   └── site-config.ts      # Centralized site configuration
└── public/
    └── favicons/           # All favicon assets
        ├── favicon.ico
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        ├── favicon-48x48.png
        ├── apple-touch-icon.png
        ├── apple-touch-icon-180x180.png
        ├── android-chrome-192x192.png
        └── android-chrome-512x512.png
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Site Config | `src/lib/site-config.ts` | Centralized configuration for all SEO values |
| Root Metadata | `src/app/layout.tsx` | Icons, Open Graph, Twitter Cards, viewport |
| Robots | `src/app/robots.ts` | Search engine crawling rules |
| Sitemap | `src/app/sitemap.ts` | Dynamic sitemap with static and CMS pages |
| Manifest | `src/app/manifest.ts` | PWA manifest for mobile home screen |

### Tech Stack

- **Framework**: Next.js 16 Metadata API
- **CMS**: Sanity for dynamic content URLs
- **Dependencies**: None (uses Next.js built-in features)

### Data Flow

1. `site-config.ts` provides centralized configuration
2. `layout.tsx` exports metadata using site config
3. Next.js generates `robots.txt`, `sitemap.xml`, `manifest.webmanifest` at build time
4. Sitemap fetches dynamic URLs from Sanity CMS

### Code Examples

**Site Configuration (`src/lib/site-config.ts`):**
```typescript
export const siteConfig = {
  name: "Shiner",
  description: "Premium quality products and services...",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiner.com",
  ogImage: "/shinner-logo.png",
  keywords: ["shiner", "quality products", ...],
  themeColor: "#ffffff",
  // ... more config
} as const;
```

**Using in Metadata:**
```typescript
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // ...
};
```

## Configuration

### Environment Variables

```bash
# Optional - defaults to https://shiner.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Site Config Options

Edit `src/lib/site-config.ts` to customize:

- `name` - Site name used in titles and branding
- `shortName` - Short name for PWA
- `description` - Default meta description
- `url` - Canonical URL (reads from env)
- `ogImage` - Default Open Graph image path
- `keywords` - SEO keywords array
- `themeColor` - Browser theme color
- `social` - Social media handles

## Files Created

### 1. `src/lib/site-config.ts`
Centralized configuration for all site metadata.

### 2. `src/app/robots.ts`
Generates `/robots.txt` with:
- Allow all crawlers on public routes
- Disallow `/studio/`, `/api/`, `/_next/`, `/private/`
- Block aggressive bots (AhrefsBot, SemrushBot, MJ12bot)
- Links to sitemap

### 3. `src/app/sitemap.ts`
Generates `/sitemap.xml` with:
- Static pages (home, about, services, etc.)
- Dynamic products from Sanity
- Dynamic blog posts from Sanity
- Dynamic projects from Sanity
- Proper lastModified dates and priorities

### 4. `src/app/manifest.ts`
Generates `/manifest.webmanifest` with:
- App name and description
- Icon references for all sizes
- Theme and background colors
- PWA display settings

### 5. Updated `src/app/layout.tsx`
Root metadata including:
- Title template (`%s | Shiner`)
- Full favicon configuration for all devices
- Open Graph metadata
- Twitter Card metadata
- Viewport settings
- Robots directives

## Favicon Configuration

| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | Multi-size | Browser tab icon (IE/older browsers) |
| `favicon-16x16.png` | 16x16 | Small browser tab |
| `favicon-32x32.png` | 32x32 | Standard browser tab |
| `favicon-48x48.png` | 48x48 | Large browser tab |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `android-chrome-192x192.png` | 192x192 | Android home screen |
| `android-chrome-512x512.png` | 512x512 | Android splash screen |

## Generated URLs

After build, the following URLs are available:
- `/robots.txt` - Crawling rules
- `/sitemap.xml` - All indexable URLs
- `/manifest.webmanifest` - PWA manifest

## Testing

### Verify Robots.txt
```bash
curl http://localhost:3000/robots.txt
```

### Verify Sitemap
```bash
curl http://localhost:3000/sitemap.xml
```

### Verify Manifest
```bash
curl http://localhost:3000/manifest.webmanifest
```

### Validate with Tools
- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Favicon Checker](https://realfavicongenerator.net/favicon_checker)

## Decision Log

### Decision 1: Use Next.js Metadata API

**Date**: 2026-01-29
**Context**: Needed dynamic sitemap generation with CMS content
**Decision**: Use Next.js 14+ Metadata API (robots.ts, sitemap.ts, manifest.ts)
**Rationale**:
- Type-safe configuration
- Dynamic generation at build time
- Integrates with Sanity CMS
- No external dependencies needed
**Alternatives**: Static files, third-party sitemap libraries
**Consequences**: Requires rebuild for sitemap updates (can use ISR for dynamic)

### Decision 2: Centralized Site Configuration

**Date**: 2026-01-29
**Context**: SEO values needed in multiple places
**Decision**: Create `site-config.ts` as single source of truth
**Rationale**:
- Prevents duplication
- Easy to update site-wide values
- Type safety with `as const`
**Alternatives**: Hardcode values, use env vars only
**Consequences**: Must spread readonly arrays when using in metadata

## Future Enhancements

- [ ] Add JSON-LD structured data for products
- [ ] Add JSON-LD structured data for blog posts
- [ ] Implement ISR for dynamic sitemap updates
- [ ] Add hreflang tags for internationalization
- [ ] Add BreadcrumbList schema markup
- [ ] Add Organization schema markup

## Related Documentation

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Google Search Central](https://developers.google.com/search/docs)
- [Open Graph Protocol](https://ogp.me/)

---

**Last Reviewed**: 2026-01-29
**Review Schedule**: As needed
