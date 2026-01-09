# Codebase Restructuring Plan

**Created**: 2026-01-09
**Status**: 🚧 In Progress
**Goal**: Eliminate redundancy, centralize data, create reusable component library

## Overview

This refactoring addresses critical redundancy issues identified in the codebase analysis:
- 8+ duplicate components (cards, skeletons)
- 10+ files with scattered static data
- 50+ instances of repeated patterns
- ~2,000+ lines of redundant code

**Expected Impact**:
- 30-40% code reduction
- 10x easier styling updates
- Improved consistency
- Faster feature development

## Phase 1: Data Extraction ⏳

**Goal**: Extract all static data to centralized `src/data/` directory

### 1.1 Create Data Directory Structure
```
src/data/
├── navigation.ts           # Navbar + footer links
├── features.ts             # Landing features
├── stats.ts                # Stats section data
├── fallback/
│   ├── index.ts            # Re-export all
│   ├── services.ts
│   ├── events.ts
│   ├── clients.ts
│   ├── installations.ts
│   ├── achievements.ts
│   ├── certifications.ts
│   ├── about-pages.ts
│   └── blog-posts.ts
```

### 1.2 Files to Refactor
- [ ] `src/components/global/navbar.tsx` → Extract navLinks, aboutLinks, moreLinks
- [ ] `src/components/landing/footer.tsx` → Extract footer links
- [ ] `src/components/landing/features-section.tsx` → Extract features array
- [ ] `src/components/landing/stats-section.tsx` → Extract stats
- [ ] `src/app/(landing)/services/page.tsx` → Extract dummy services
- [ ] `src/components/events/events-section.tsx` → Extract dummy events
- [ ] `src/components/projects/clients-list-section.tsx` → Extract clients
- [ ] `src/components/projects/installations-section.tsx` → Extract installations
- [ ] `src/components/events/achievements-section.tsx` → Extract achievements
- [ ] `src/components/events/certifications-section.tsx` → Extract certifications
- [ ] `src/app/(landing)/about/why-choose-us/page.tsx` → Extract dummy data
- [ ] `src/app/(landing)/about/mission-vision/page.tsx` → Extract dummy data
- [ ] `src/app/(landing)/about/director/page.tsx` → Extract dummy data
- [ ] `src/components/blog/fallback-data.ts` → Move to data/fallback/

**Success Criteria**:
- ✅ All static data in `src/data/`
- ✅ All components import from data files
- ✅ Build compiles successfully
- ✅ No functionality broken

---

## Phase 2: Reusable UI Components ⏳

**Goal**: Create reusable primitives for common patterns

### 2.1 Components to Create

#### GradientBadge
**File**: `src/components/ui/gradient-badge.tsx`
**Usage**: Category badges, tags (used 5+ times)
```tsx
<GradientBadge variant="default | subtle">
  {text}
</GradientBadge>
```

#### Container & Section
**File**: `src/components/ui/container.tsx`
**Usage**: Max-width wrapper (used 32+ times)
```tsx
<Container maxWidth="7xl | 6xl | 5xl" padding="default | none">
```

**File**: `src/components/ui/section.tsx`
**Usage**: Section wrapper with padding/bg (used 15+ times)
```tsx
<Section spacing="large | medium | small" background="secondary | muted">
```

#### SectionHeader
**File**: `src/components/ui/section-header.tsx`
**Usage**: Title + description pattern (used 10+ times)
```tsx
<SectionHeader
  title="..."
  description="..."
  align="left | center"
/>
```

#### ResponsiveGrid
**File**: `src/components/ui/responsive-grid.tsx`
**Usage**: Flexible grid layout (eliminates manual slicing)
```tsx
<ResponsiveGrid
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap="10"
  items={items}
  renderItem={(item) => <Card {...item} />}
/>
```

#### ImageContainer
**File**: `src/components/ui/image-container.tsx`
**Usage**: Aspect ratio wrapper
```tsx
<ImageContainer
  aspect="square | video | 282/168 | custom"
  rounded="2xl | xl"
>
```

#### IconTextBlock
**File**: `src/components/ui/icon-text-block.tsx`
**Usage**: Icon + title + description pattern
```tsx
<IconTextBlock
  icon={Icon}
  title="..."
  description="..."
/>
```

### 2.2 Files to Refactor with New Components
- [ ] All files using gradient badge pattern
- [ ] All files with container/max-width patterns
- [ ] All files with section wrappers
- [ ] All files with section headers
- [ ] All files with grid layouts
- [ ] All files with aspect ratio containers

**Success Criteria**:
- ✅ 6 new reusable UI components created
- ✅ All documented with examples
- ✅ 30+ files refactored to use new components
- ✅ Consistent styling across codebase

---

## Phase 3: Card Consolidation ⏳

**Goal**: Consolidate all card components to `src/components/global/cards/`

### 3.1 Directory Structure
```
src/components/global/cards/
├── index.ts                   # Export all cards
├── product-card.tsx           # ✅ Already exists (keep)
├── post-card.tsx              # ✅ Already exists (keep)
├── testimonial-card.tsx       # ✅ Already exists (keep)
├── team-member-card.tsx       # Move from global/team/
├── event-card.tsx             # Move from events/
├── achievement-card.tsx       # Move from events/
├── certification-card.tsx     # Move from events/
├── client-card.tsx            # Move from projects/
├── installation-card.tsx      # Move from projects/
└── brand-story-card.tsx       # Move from landing/
```

### 3.2 Tasks
- [ ] Move existing cards to global/cards/
- [ ] Create index.ts with all exports
- [ ] Standardize prop names across all cards
- [ ] Add consistent variants where applicable
- [ ] Update all imports throughout codebase

**Success Criteria**:
- ✅ All card components in one directory
- ✅ Consistent prop naming
- ✅ Clean index exports
- ✅ All imports updated

---

## Phase 4: Eliminate Duplicates ⏳

**Goal**: Remove duplicate components and consolidate to single source of truth

### 4.1 Critical Duplicates to Eliminate

#### ProductCard Duplication
- [ ] DELETE `src/components/landing/product-card.tsx`
- [ ] UPDATE imports in `src/components/landing/products-grid.tsx`
- [ ] USE `src/components/global/products/product-card.tsx` everywhere

#### BlogCard Duplication
- [ ] DELETE `src/components/blog/blog-card.tsx`
- [ ] UPDATE imports in `src/components/blog/blogs-grid.tsx`
- [ ] USE `src/components/global/blog/post-card.tsx` everywhere

#### TestimonialCard Duplication
- [ ] DELETE `src/components/landing/testimonial-card.tsx`
- [ ] UPDATE imports in `src/components/landing/testimonials-carousel.tsx`
- [ ] USE `src/components/global/testimonials/testimonial-card.tsx` everywhere

#### Skeleton Duplicates
- [ ] DELETE `src/components/landing/products-skeleton.tsx`
- [ ] DELETE `src/components/blog/blogs-skeleton.tsx`
- [ ] UPDATE all imports to use global versions

**Success Criteria**:
- ✅ All duplicate files deleted
- ✅ All imports updated
- ✅ Single source of truth for each component
- ✅ Build compiles successfully

---

## Phase 5: Skeleton System ⏳

**Goal**: Create generic skeleton component system

### 5.1 New Skeleton Components

#### Generic Skeletons
**File**: `src/components/global/skeletons/card-skeleton.tsx`
```tsx
<CardSkeleton
  hasImage={true}
  imageAspect="square | video | custom"
  hasTitle={true}
  hasDescription={true}
  hasMetadata={true}
/>
```

**File**: `src/components/global/skeletons/grid-skeleton.tsx`
```tsx
<GridSkeleton
  count={6}
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  renderItem={() => <CardSkeleton />}
/>
```

### 5.2 Skeletons to Refactor/Replace
- [ ] `src/components/landing/team-skeleton.tsx`
- [ ] `src/components/landing/brand-story-skeleton.tsx`
- [ ] `src/components/landing/testimonials-skeleton.tsx`
- [ ] `src/components/projects/clients-list-section-skeleton.tsx`
- [ ] `src/components/projects/other-clients-section-skeleton.tsx`
- [ ] `src/components/projects/installations-section-skeleton.tsx`
- [ ] `src/components/products/products-grid-section-skeleton.tsx`
- [ ] `src/components/products/product-detail-skeleton.tsx`
- [ ] `src/components/blog/blog-post-skeleton.tsx`

**Success Criteria**:
- ✅ Generic skeleton components created
- ✅ All specific skeletons refactored to use generics
- ✅ Consistent loading states across app

---

## Phase 6: Testing & Verification ⏳

**Goal**: Ensure all refactoring didn't break functionality

### 6.1 Testing Checklist
- [ ] Run `bun run build` - verify successful compilation
- [ ] Run `bun run lint` - verify no linting errors
- [ ] Test all pages in browser:
  - [ ] Home page
  - [ ] About pages (3 pages)
  - [ ] Services page
  - [ ] Products page + detail pages
  - [ ] Projects page
  - [ ] Blog page + post pages
  - [ ] Events page
  - [ ] Contact page
- [ ] Verify all data displays correctly
- [ ] Verify all links work
- [ ] Verify all images load
- [ ] Verify responsive layouts
- [ ] Test skeleton loading states

### 6.2 Performance Check
- [ ] Compare bundle size before/after
- [ ] Check for unused imports
- [ ] Verify tree-shaking works
- [ ] Check page load times

**Success Criteria**:
- ✅ All pages load without errors
- ✅ All functionality preserved
- ✅ No console errors
- ✅ Build successful

---

## Phase 7: Documentation ⏳

**Goal**: Update memory bank and documentation

### 7.1 Documentation Updates
- [ ] Create new feature: "Component Library" in memory bank
- [ ] Update FEATURES-INDEX.md
- [ ] Document new data structure
- [ ] Document new UI components
- [ ] Update CLAUDE.md with new patterns
- [ ] Create component usage guide

### 7.2 Code Documentation
- [ ] Add JSDoc comments to all new components
- [ ] Add usage examples in comments
- [ ] Document prop interfaces
- [ ] Create Storybook stories (optional)

**Success Criteria**:
- ✅ Complete memory bank documentation
- ✅ Updated FEATURES-INDEX
- ✅ All components documented
- ✅ Usage examples provided

---

## Expected Outcomes

### Before Refactoring:
- Duplicate components: 8+
- Scattered static data: 10+ files
- Repeated patterns: 50+ instances
- Lines of redundant code: ~2,000+
- Component directories: Scattered across 5+ locations

### After Refactoring:
- Reusable components: 20+ clean, documented
- Centralized data: Single `data/` directory
- Reduced code: ~30-40% reduction
- Maintainability: 10x easier updates
- Component library: Organized in global/ui/

### Metrics:
- Code reduction: 30-40%
- Update speed: 10x faster (single source of truth)
- Consistency: 100% (standardized components)
- Developer onboarding: 5x easier (clear structure)

---

## Risk Mitigation

### Potential Risks:
1. **Import paths breaking**: Mitigated by updating all imports in same commit
2. **Functionality regression**: Mitigated by comprehensive testing in Phase 6
3. **Styling inconsistencies**: Mitigated by careful prop design and variants
4. **Build failures**: Mitigated by testing after each phase

### Rollback Plan:
- Git commits after each phase
- Can revert specific phases if needed
- Test suite validates functionality

---

## Timeline Estimate

- Phase 1 (Data): 30-45 minutes
- Phase 2 (UI Components): 45-60 minutes
- Phase 3 (Card Consolidation): 30 minutes
- Phase 4 (Eliminate Duplicates): 20 minutes
- Phase 5 (Skeleton System): 30 minutes
- Phase 6 (Testing): 20 minutes
- Phase 7 (Documentation): 20 minutes

**Total**: ~3.5-4 hours

---

## Progress Tracking

- [ ] Phase 1: Data Extraction
- [ ] Phase 2: Reusable UI Components
- [ ] Phase 3: Card Consolidation
- [ ] Phase 4: Eliminate Duplicates
- [ ] Phase 5: Skeleton System
- [ ] Phase 6: Testing & Verification
- [ ] Phase 7: Documentation

**Current Phase**: Phase 1 - Starting data extraction
**Last Updated**: 2026-01-09
