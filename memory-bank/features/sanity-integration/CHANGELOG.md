# Changelog - Sanity CMS Integration

All notable changes to the Sanity integration will be documented in this file.

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
