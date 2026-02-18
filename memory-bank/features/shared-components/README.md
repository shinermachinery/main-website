# Shared Components

## Overview

Reusable search, filter, layout, and empty-state components shared across the application. Includes search/filter components shared between `/blog` and `/products` pages, and a global `EmptyState` component used in 15 files across the codebase.

**Status**: ✅ Completed
**Created**: 2026-02-15
**Last Modified**: 2026-02-19

## Key Files

### EmptyState Component
- `src/components/ui/empty-state.tsx` - Global empty/error state component with variant support

### Shared Components
- `src/components/shared/search-input.tsx` - URL-param driven search input with form submission
- `src/components/shared/category-filter.tsx` - Dynamic category dropdown using shadcn Select
- `src/components/shared/active-filters.tsx` - Removable filter chips
- `src/components/shared/search-filter-bar.tsx` - Composition wrapper combining all three

### Products Page (refactored)
- `src/app/(landing)/products/page.tsx` - Now accepts `searchParams`, uses `SearchFilterBar`
- `src/components/products/products-data.tsx` - Server data component for filtered product fetching
- `src/components/products/products-grid.tsx` - Client grid component (extracted from products-grid-section.tsx)
- `src/components/products/products-grid-skeleton.tsx` - Grid-only skeleton (no search/filter skeleton)

### Blog Page (refactored)
- `src/app/(landing)/blog/page.tsx` - Uses shared `SearchFilterBar`, fetches dynamic categories from Sanity

### ProductCard (cleaned up)
- `src/components/sections/products/product-card.tsx` - Added `href` prop for SEO-friendly Link wrapper, replaced hardcoded hex colors with semantic tokens

## Architecture

### URL-Param Driven Pattern
Both `/blog` and `/products` follow the same pattern:
1. Page (server component) awaits `searchParams` and fetches categories/collections
2. `SearchFilterBar` (client) renders search input + category dropdown + active filter chips
3. Data component (server) fetches filtered results based on URL params
4. Grid component (client) renders the cards

### Key Decisions
- **Kept BlogCard and ProductCard separate** - They are visually distinct (different layouts, badges, CTAs). Merging would create unnecessary complexity.
- **Products filter by collections, not categories** - Products have a `collection` reference in Sanity, so filtering uses `getAllProductCollections()` instead of blog categories.
- **ProductCard uses Link when `href` is provided** - Better for SEO than `router.push` via `onViewDetails` callback.

## EmptyState Component

### Props
```typescript
interface EmptyStateProps {
  variant?: "empty" | "filtered" | "error";  // Controls default icon & tone
  icon?: LucideIcon | null;                   // null = no icon, undefined = variant default
  title?: string;                             // Optional heading
  message: string;                            // Required description
  action?: React.ReactNode;                   // Optional button/link below message
  size?: "sm" | "md" | "lg";                 // Vertical padding (py-8 / py-16 / py-24)
  className?: string;                         // Additional classes
}
```

### Variant Defaults
| Variant | Default Icon | Default Title | Use Case |
|---------|-------------|---------------|----------|
| `empty` | `Inbox` | "Nothing here yet" | CMS returned no items |
| `filtered` | `Search` | "No results found" | Search/filter returned nothing |
| `error` | `AlertCircle` | "Something went wrong" | Data fetch failed |

### Key Design Decisions
- **No `'use client'`** — works as a server component; interactive actions passed via `action` prop
- **No section wrapper** — renders a `<div>`, composable with existing `<section>` wrappers
- Uses `cn()`, semantic Tailwind colors, lucide-react icons
- Ultra-thin icon styling (`strokeWidth={1}`, `size-10`)

### Files Using EmptyState (15 total)

**Content-level** (simple replacement of inline message):
1. `src/components/products/products-grid.tsx` — variant="filtered"
2. `src/components/blog/blogs-grid.tsx` — variant="filtered"
3. `src/app/(landing)/services/page.tsx` — size="sm"

**Section-level** (hoisted section wrapper, ternary for content vs EmptyState):
4. `src/components/sections/products/products-section.tsx`
5. `src/components/team/team-grid.tsx`
6. `src/components/sections/stats/stats-section.tsx`
7. `src/components/sections/how-it-works/how-it-works-section.tsx`
8. `src/components/events/certifications-section.tsx`
9. `src/components/projects/other-clients-section.tsx`
10. `src/components/projects/installations-section.tsx`
11. `src/components/projects/clients-list-section.tsx`
12. `src/components/events/events-section.tsx`
13. `src/components/events/achievements-section.tsx`
14. `src/components/projects/flowchart-section.tsx`

**NOT migrated** (intentionally):
- `related-products.tsx` — returns `null` (section shouldn't appear at all)
- `active-filters.tsx` — returns `null` (correct behavior)
- `product-image-gallery.tsx` — specialized image placeholder, not a text empty state

## Dependencies
- shadcn/ui Select component
- next/navigation (useRouter, useSearchParams)
- Sanity CMS (for dynamic categories/collections)
- lucide-react (Inbox, Search, AlertCircle icons for EmptyState)

## Phases
- ✅ Phase 1: Created shared search/filter components
- ✅ Phase 2: Refactored products page with URL params + shared components
- ✅ Phase 3: Consolidated ProductCard usage (href prop, semantic tokens)
- ✅ Phase 4: Refactored blog page to use shared components
- ✅ Phase 5: Memory bank update, lint/format/build verification
- ✅ Phase 6: Created global EmptyState component and migrated 14 files (2026-02-16)
