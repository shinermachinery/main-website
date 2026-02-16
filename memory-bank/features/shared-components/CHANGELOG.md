# Shared Components - Changelog

## [1.1.0] - 2026-02-16

### Added
- `EmptyState` component (`src/components/ui/empty-state.tsx`) - Global reusable empty/error state with variant support (`empty`, `filtered`, `error`), size options (`sm`, `md`, `lg`), optional icon override, title, action slot

### Changed
- Migrated 14 files from inline empty state patterns to use `EmptyState` component
- Content-level migrations: `products-grid.tsx`, `blogs-grid.tsx`, `services/page.tsx`
- Section-level migrations: Hoisted section wrappers outside conditionals in 11 section components (`products-section`, `team-grid`, `stats-section`, `how-it-works-section`, `certifications-section`, `other-clients-section`, `installations-section`, `clients-list-section`, `events-section`, `achievements-section`, `flowchart-section`)

### Removed
- 15+ inline empty state patterns (duplicated `<p>` + `<div>` wrappers)
- Duplicated section wrappers in empty branches

---

## [1.0.0] - 2026-02-15

### Added
- `SearchInput` component - URL-param driven search with form submission
- `CategoryFilter` component - Dynamic category dropdown with shadcn Select
- `ActiveFilters` component - Removable filter chips
- `SearchFilterBar` composition component wrapping all three
- `ProductsData` server component for filtered product fetching
- `ProductsGrid` client component extracted from products-grid-section
- `ProductsGridSkeleton` grid-only loading skeleton
- `getAllProductCollections()` action for products page filtering
- `href` prop on ProductCard for SEO-friendly Link wrapping

### Changed
- Products page now accepts `searchParams` and has working search/filter via URL params
- Blog page uses shared `SearchFilterBar` instead of inline markup
- Blog page fetches dynamic categories from Sanity instead of hardcoded list
- ProductCard uses semantic tokens (`text-foreground`, `text-muted-foreground`) instead of hardcoded hex colors
- ProductCard shadow values converted from px to rem
- Products section on homepage uses Link instead of router.push

### Removed
- Inline search/filter UI from blog page (~40 lines)
- Hardcoded "Machinery" filter chip from products page
- `console.log("PRODUCT", product)` from products-grid-section
- Hardcoded hex colors (`#18181b`, `#71717a`, `#fafafa`) from ProductCard

### Codebase-wide
- Converted all px values to rem across 30+ files (shadows, text sizes, widths, heights, border radius, blur values, tracking, image sizes)
