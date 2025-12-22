# System Overview

**Last Updated**: 2025-12-23

## Application Architecture

This is a modern Next.js application with an embedded Sanity CMS for content management. The architecture follows Next.js App Router patterns with a clear separation between content management and public-facing pages.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App                          │
│                                                          │
│  ┌──────────────────┐      ┌─────────────────────┐     │
│  │   Public Routes  │      │   Studio Route      │     │
│  │   (/)           │      │   (/studio)         │     │
│  │                 │      │                     │     │
│  │  - Home Page    │      │  - Sanity Studio    │     │
│  │  - Blog Posts   │      │  - Content Editor   │     │
│  │  - etc.         │      │  - Schema Manager   │     │
│  └────────┬─────────┘      └──────────┬──────────┘     │
│           │                           │                │
│           └───────────┬───────────────┘                │
│                       │                                │
│              ┌────────▼────────┐                       │
│              │  Sanity Client  │                       │
│              └────────┬────────┘                       │
│                       │                                │
└───────────────────────┼────────────────────────────────┘
                        │
                        │ API Calls
                        │
                ┌───────▼────────┐
                │  Sanity CMS    │
                │  (Cloud)       │
                │                │
                │  - Content DB  │
                │  - Image CDN   │
                │  - APIs        │
                └────────────────┘
```

## Directory Architecture

### Application Structure (src/)

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (theme, fonts)
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   └── studio/[[...tool]]/      # Sanity Studio (catch-all)
│       └── page.tsx
│
├── components/                   # React Components
│   ├── global/                  # App-wide components
│   │   └── mode-toggle.tsx      # Dark/light mode toggle
│   └── ui/                      # Reusable UI primitives
│       ├── button.tsx
│       ├── accordion.tsx
│       └── dropdown-menu.tsx
│
├── lib/                         # Utilities & Providers
│   ├── theme-provider.tsx       # next-themes wrapper
│   └── utils.ts                 # Helper functions (cn)
│
└── sanity/                      # Sanity CMS Integration
    ├── env.ts                   # Environment config
    ├── structure.ts             # Studio structure
    ├── lib/                     # Sanity utilities
    │   ├── client.ts            # API client
    │   ├── image.ts             # Image URL builder
    │   └── live.ts              # Live preview
    └── schemaTypes/             # Content schemas
        ├── index.ts             # Schema exports
        ├── authorType.ts        # Author schema
        ├── postType.ts          # Blog post schema
        ├── categoryType.ts      # Category schema
        └── blockContentType.ts  # Rich text schema
```

## Key Subsystems

### 1. Content Management (Sanity)

**Purpose**: Manage all dynamic content (blog posts, authors, categories)

**Components**:
- **Studio**: Embedded CMS UI at `/studio`
- **Schemas**: Type definitions in `src/sanity/schemaTypes/`
- **Client**: API client in `src/sanity/lib/client.ts`
- **Images**: URL builder in `src/sanity/lib/image.ts`

**Flow**:
1. Content editors access `/studio`
2. Edit content using Sanity Studio UI
3. Content saved to Sanity Cloud
4. Public pages query content via Sanity client
5. Content rendered on pages

**Configuration**: `sanity.config.ts`

### 2. Theme System

**Purpose**: Provide dark/light mode switching with system preference detection

**Components**:
- **Provider**: `src/lib/theme-provider.tsx` wraps entire app
- **Toggle**: `src/components/global/mode-toggle.tsx` for user control
- **Storage**: Uses localStorage + system preferences

**Flow**:
1. ThemeProvider initializes on app load
2. Reads system preference or localStorage
3. Applies theme class to HTML element
4. User can toggle via mode-toggle component
5. Preference saved to localStorage

**Integration**: Root layout includes `suppressHydrationWarning` for theme

### 3. Styling System

**Purpose**: Utility-first styling with component variants

**Components**:
- **Tailwind**: Core styling framework (v4)
- **cn() utility**: Merges class names in `src/lib/utils.ts`
- **CVA**: Class variance authority for variants
- **Global styles**: `src/app/globals.css`

**Pattern**:
```typescript
import { cn } from '@/lib/utils'

<div className={cn('base-classes', conditional && 'conditional-class')} />
```

### 4. UI Component Library

**Purpose**: Reusable, accessible components

**Strategy**:
- **Primitives**: Radix UI (unstyled, accessible)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Location**: `src/components/ui/`

**Pattern**: Radix + Tailwind styled components

### 5. Routing & Pages

**Purpose**: Server-rendered pages with App Router

**Pattern**:
- **Server Components**: Default for all pages
- **Client Components**: Marked with 'use client'
- **Layouts**: Nested layouts with root in `app/layout.tsx`
- **Dynamic Routes**: Catch-all for Studio: `[[...tool]]`

**Special Routes**:
- `/` - Homepage
- `/studio` - Sanity Studio (statically generated)

## Data Flow

### Content Rendering Flow

```
User Request
    ↓
Next.js Server
    ↓
Server Component
    ↓
Sanity Client Query (GROQ)
    ↓
Sanity Cloud API
    ↓
Content Data
    ↓
React Server Component
    ↓
HTML Response
    ↓
Browser
```

### Theme Switching Flow

```
User Clicks Toggle
    ↓
Client Component Handler
    ↓
next-themes setTheme()
    ↓
Update localStorage
    ↓
Update HTML class attribute
    ↓
CSS Variables Change
    ↓
UI Re-renders with New Theme
```

## Build & Deploy Process

### Development
```
npm run dev
    ↓
Next.js Dev Server
    ↓
Hot Module Replacement
    ↓
Browser Auto-Refresh
```

### Production Build
```
npm run build
    ↓
TypeScript Compilation
    ↓
React Compiler Optimization
    ↓
Tailwind CSS Processing
    ↓
Next.js Build (SSG + SSR)
    ↓
Optimize Images, Fonts
    ↓
Generate Static Pages
    ↓
Output to .next/
```

### Production Server
```
npm start
    ↓
Next.js Production Server
    ↓
Serve Static + SSR Pages
```

## Environment Separation

### Development
- Local Next.js server
- Connects to Sanity Cloud (dev dataset)
- Hot reloading enabled
- Source maps available

### Production
- Optimized build
- Connects to Sanity Cloud (production dataset)
- Static generation where possible
- Minified bundles

## Integration Points

### External Services
1. **Sanity Cloud**: CMS backend
2. **Sanity CDN**: Image delivery
3. **Vercel (likely)**: Deployment platform

### APIs
- **Sanity Content API**: GROQ queries
- **Sanity Image API**: Image transformations

## Performance Characteristics

### Optimization Strategies
- **React Compiler**: Automatic memoization
- **Server Components**: Reduced client JS
- **Image Optimization**: Next.js Image component
- **Font Optimization**: next/font automatic optimization
- **Static Generation**: Pre-render where possible

### Caching Strategy
- **Sanity CDN**: Enabled (`useCdn: true`)
- **Next.js Cache**: Automatic for static pages
- **Image Cache**: CDN + browser cache

## Security Considerations

### Public Routes
- No authentication required
- Public content access

### Studio Route (`/studio`)
- Sanity handles authentication
- Requires Sanity account
- Token-based auth

### Environment Variables
- Only `NEXT_PUBLIC_*` exposed to browser
- Server-side vars kept private
- Required vars validated at startup (`src/sanity/env.ts`)

## Extensibility Points

### Adding New Content Types
1. Create schema in `src/sanity/schemaTypes/`
2. Export from `schemaTypes/index.ts`
3. Schema auto-loads in Studio
4. Query from pages using Sanity client

### Adding New Pages
1. Create file in `src/app/[route]/page.tsx`
2. Use Server Components by default
3. Query content via Sanity client
4. Export metadata for SEO

### Adding New Components
1. Create in `src/components/ui/` or `src/components/global/`
2. Use Radix UI primitives where needed
3. Style with Tailwind CSS
4. Export for reuse

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Access app**: http://localhost:3000
3. **Access Studio**: http://localhost:3000/studio
4. **Edit content**: Use Studio UI
5. **Code changes**: Auto-reload
6. **Lint/Format**: `npm run lint` + `npm run format`
7. **Build**: `npm run build` before deploy
