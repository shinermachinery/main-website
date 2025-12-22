# Sanity CMS Integration

> **Status**: Completed
> **Created**: 2025-12-23
> **Last Modified**: 2025-12-23
> **Owner/Lead**: Team

## Overview

Full Sanity CMS integration providing a headless content management system with an embedded Studio for managing blog content including posts, authors, categories, and rich text. The Studio is accessible at `/studio` and content is queried via the Sanity client.

## User Story / Use Case

**As a** content editor
**I want** to manage blog content through an intuitive CMS
**So that** I can create and publish content without touching code

### Example Scenarios
- Editor creates a new blog post with rich text content at `/studio`
- Content is saved to Sanity Cloud and immediately available
- Frontend queries content via Sanity client and displays it
- Images are automatically optimized via Sanity CDN

## Technical Implementation

### Architecture

```
Public Pages                    Studio Interface
    ↓                               ↓
Sanity Client                  Sanity Studio
    ↓                               ↓
    └──────── Sanity Cloud ─────────┘
                  ↓
        [ Content Database ]
        [ Image CDN ]
        [ APIs ]
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Sanity Config | `sanity.config.ts` | Studio configuration |
| Environment | `src/sanity/env.ts` | Environment variables validation |
| Client | `src/sanity/lib/client.ts` | API client for queries |
| Image Builder | `src/sanity/lib/image.ts` | Image URL generation |
| Live Preview | `src/sanity/lib/live.ts` | Real-time preview setup |
| Schema Index | `src/sanity/schemaTypes/index.ts` | All content schemas |
| Studio Page | `src/app/studio/[[...tool]]/page.tsx` | Embedded Studio route |

### Tech Stack

- **Framework/Library**: Sanity CMS v4
- **Dependencies**:
  - `sanity@4` - Core CMS
  - `next-sanity@12.0.5` - Next.js integration
  - `@sanity/client@7.13.2` - API client
  - `@sanity/vision@4` - GROQ query tool in Studio
  - `@sanity/image-url@2.0.2` - Image URL builder
  - `@sanity/icons@3.7.4` - Icons for Studio
  - `@portabletext/react@6.0.0` - Rich text renderer
  - `styled-components@6` - Studio styling
- **APIs/Services**: Sanity Cloud

### Data Flow

1. **Content Creation**: Editor accesses `/studio` and creates/edits content
2. **Save**: Content saved to Sanity Cloud via Sanity APIs
3. **Query**: Frontend queries content using GROQ via Sanity client
4. **Render**: Content rendered in React components
5. **Images**: Image URLs generated with transformations via image builder

### Code Examples

**Querying Content:**
```typescript
import { client } from '@/sanity/lib/client'

// Query all posts
const posts = await client.fetch(`
  *[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    author->,
    categories[]->
  }
`)
```

**Image Optimization:**
```typescript
import { urlFor } from '@/sanity/lib/image'

// Generate optimized image URL
const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .fit('crop')
  .url()
```

**Rendering Block Content:**
```typescript
import { PortableText } from '@portabletext/react'

<PortableText
  value={post.body}
  components={customComponents}
/>
```

## Configuration

### Environment Variables

```bash
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Optional
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-22  # Defaults to this if not set
```

**Where to find these values:**
- Project ID: Sanity dashboard → Project settings
- Dataset: Usually "production" or "development"

### Sanity Config (`sanity.config.ts`)

```typescript
export default defineConfig({
  basePath: '/studio',        // Studio accessible at /studio
  projectId,                  // From environment
  dataset,                    // From environment
  schema,                     // Content schemas
  plugins: [
    structureTool({ structure }),  // Content structure
    visionTool({ defaultApiVersion: apiVersion })  // GROQ query tool
  ],
})
```

### Client Config (`src/sanity/lib/client.ts`)

```typescript
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,  // Use CDN for faster reads
})
```

## Content Schemas

### Post Type (`postType.ts`)

Blog posts with:
- Title (string)
- Slug (slug)
- Author (reference to author)
- Main Image (image)
- Categories (array of references)
- Published Date (datetime)
- Body (block content - rich text)
- Excerpt (text)

### Author Type (`authorType.ts`)

Author profiles with:
- Name (string)
- Slug (slug)
- Image (image)
- Bio (array of block content)

### Category Type (`categoryType.ts`)

Post categories with:
- Title (string)
- Slug (slug)
- Description (text)

### Block Content Type (`blockContentType.ts`)

Rich text content supporting:
- Headings (h1-h6)
- Paragraphs
- Lists (bullet, numbered)
- Bold, italic, underline
- Links
- Images
- Block quotes
- Code blocks

## Dependencies

### Internal Dependencies

None - This is a foundational feature

### External Dependencies

- **Package**: `sanity`
  - **Version**: ^4
  - **Purpose**: Core CMS functionality
  - **Alternatives Considered**: Contentful (more expensive), Strapi (self-hosted)

- **Package**: `next-sanity`
  - **Version**: ^12.0.5
  - **Purpose**: Next.js-specific integration
  - **Alternatives Considered**: Direct API calls (more complex)

## API Reference

### Client Methods

#### `client.fetch(query, params?)`

**Description**: Execute GROQ query

**Parameters**:
- `query` (string): GROQ query string
- `params` (object, optional): Query parameters

**Returns**: Promise with query results

**Example**:
```typescript
const post = await client.fetch(
  `*[_type == "post" && slug.current == $slug][0]`,
  { slug: 'my-post' }
)
```

### Image URL Builder

#### `urlFor(source)`

**Description**: Create image URL builder

**Parameters**:
- `source` (SanityImageSource): Image reference from Sanity

**Returns**: ImageUrlBuilder instance

**Methods**:
- `.width(px)` - Set width
- `.height(px)` - Set height
- `.fit(mode)` - Set fit mode (crop, fill, etc.)
- `.auto(mode)` - Auto format
- `.url()` - Generate final URL

**Example**:
```typescript
const url = urlFor(image)
  .width(1200)
  .height(630)
  .fit('crop')
  .auto('format')
  .url()
```

## Studio Access

### Accessing the Studio

1. Navigate to `http://localhost:3000/studio` (dev) or `https://yourdomain.com/studio` (prod)
2. Sign in with Sanity account
3. Create/edit content
4. Changes save automatically to Sanity Cloud

### Studio Features

- **Content Management**: Create, edit, delete content
- **Vision Tool**: Test GROQ queries directly in Studio
- **Real-time Collaboration**: Multiple editors can work simultaneously
- **Revision History**: View and restore previous versions
- **Asset Management**: Upload and manage images/files

## Testing

### Manual Test Scenarios

- [ ] Access `/studio` and verify Studio loads
- [ ] Create a new blog post with all fields
- [ ] Upload an image and verify it displays
- [ ] Query content from frontend and verify it renders
- [ ] Test image URL builder with different sizes
- [ ] Render block content with various formatting

### GROQ Query Testing

Use Vision tool in Studio at `/studio/vision`:
1. Write GROQ query
2. See results in real-time
3. Test before implementing in code

## Known Issues / Limitations

- **Studio Performance**: Large datasets may slow down Studio
  - **Mitigation**: Use pagination in queries
- **CDN Caching**: Content changes may take time to propagate
  - **Mitigation**: Set `useCdn: false` for real-time needs
- **Image Processing**: Large images processed on-demand
  - **Mitigation**: Specify dimensions in queries

## Future Enhancements

- [ ] **Live Preview**: Real-time preview of changes in Studio
- [ ] **Webhooks**: Trigger builds on content changes
- [ ] **Custom Input Components**: Enhanced editing experience
- [ ] **Localization**: Multi-language content support
- [ ] **Workflow**: Approval process for content
- [ ] **Scheduled Publishing**: Publish content at specific times

## Decision Log

### Decision 1: Embed Studio in Next.js App

**Date**: 2025-12-23
**Context**: Decide where to host Sanity Studio
**Decision**: Embed Studio at `/studio` route in Next.js app
**Rationale**:
- Single deployment for app and CMS
- Simplified hosting and domain management
- Unified authentication
**Alternatives**:
- Separate Studio deployment (more complexity)
- Use Sanity's hosted Studio (less control)
**Consequences**:
- Studio is part of Next.js bundle
- Need catch-all route for Studio
- Simplified deployment

### Decision 2: Use CDN for Client

**Date**: 2025-12-23
**Context**: Optimize content delivery performance
**Decision**: Enable CDN (`useCdn: true`) in client
**Rationale**:
- Faster content delivery globally
- Reduced API calls to Sanity
- Better performance for readers
**Alternatives**:
- Direct API calls (slower, more expensive)
**Consequences**:
- Slight delay in content updates (acceptable)
- Better performance for most users

### Decision 3: Blog-Style Schema

**Date**: 2025-12-23
**Context**: Define initial content model
**Decision**: Implement posts, authors, categories
**Rationale**:
- Common pattern for content sites
- Flexible and extensible
- Matches typical use cases
**Alternatives**:
- Custom schemas (can add later)
- Pre-built templates (less flexible)
**Consequences**:
- Standard blog structure
- Easy to understand and extend

## Performance Considerations

- **Query Optimization**: Use projections to fetch only needed fields
- **CDN Caching**: Enabled for faster reads
- **Image Optimization**: Automatic via Sanity CDN
- **Pagination**: Implement for large datasets
- **Indexing**: Sanity handles automatically

**Example Optimized Query:**
```typescript
// Only fetch needed fields
const posts = await client.fetch(`
  *[_type == "post"] {
    _id,
    title,
    slug,
    "authorName": author->name
  }
`)
```

## Security Considerations

- **Authentication**: Handled by Sanity
- **API Tokens**: Use read-only tokens for frontend
- **CORS**: Configured automatically by next-sanity
- **Content Validation**: Schemas enforce data structure
- **Public Content**: All queried content is public

**Environment Variable Security:**
- `NEXT_PUBLIC_*` vars are exposed to browser (safe - read-only)
- Write tokens should never be in frontend code

## Troubleshooting

### Common Problems

**Problem 1: "Missing environment variable" error**
- **Cause**: `.env.local` not configured
- **Solution**: Copy `.env.example` to `.env.local` and fill in values

**Problem 2: Studio shows 404**
- **Cause**: Studio route not working
- **Solution**: Verify `src/app/studio/[[...tool]]/page.tsx` exists

**Problem 3: Content not updating**
- **Cause**: CDN caching
- **Solution**: Wait ~30 seconds or set `useCdn: false` for testing

**Problem 4: Images not loading**
- **Cause**: Image URL builder misconfigured
- **Solution**: Verify `projectId` and `dataset` in image builder

## Resources

### Documentation
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [next-sanity Guide](https://github.com/sanity-io/next-sanity)
- [Portable Text](https://portabletext.org/)

### Related Files
- `sanity.config.ts`
- `src/sanity/**/*`
- `src/app/studio/[[...tool]]/page.tsx`

### Sanity Dashboard
Access at [sanity.io/manage](https://www.sanity.io/manage) to:
- View project settings
- Manage API tokens
- Monitor usage
- Configure webhooks

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed history.

### Recent Changes

- **2025-12-23**: Initial Sanity integration
  - Configured Studio at `/studio`
  - Created content schemas (post, author, category, block content)
  - Set up Sanity client
  - Configured image URL builder

---

**Last Reviewed**: 2025-12-23
**Review Schedule**: As needed
