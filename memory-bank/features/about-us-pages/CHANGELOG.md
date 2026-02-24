# Changelog - About Us Pages

All notable changes to the About Us pages system will be documented in this file.

## [1.3.0] - 2026-02-25 - Director Schema Consolidation + Team Contact Info + Navbar Cleanup

### Changed
- **Director page** now fetches from `teamMember` with `isDirector == true` flag instead of standalone `director` schema
- **Director page** import changed from `@/sanity/lib/actions` to `@/actions/about`
- **Director page** removed `console.log` debug statement
- **Director page** uses static "Meet Our Director" heading instead of CMS `pageTitle`/`pageSubtitle`
- **Team page** bio now properly renders as plain text (converted from Portable Text blocks)
- **Team page** now shows phone, email, and LinkedIn for all members
- **Navbar** removed icon boxes from all popover dropdowns (About, Products, More)
- **Navbar** popover width reduced from w-64 to w-48
- **Navigation data** simplified - removed `NavLinkWithIcon` type and lucide-react icon imports

### Removed
- Standalone `director` Sanity schema type (`directorType.ts`)
- Director singleton from Sanity Studio structure
- `getDirector()` from `src/sanity/lib/actions/company.ts`
- `Director` type export from `src/sanity/lib/actions/index.ts`
- Icon imports (Award, Building2, Calendar, Mail, User, Users) from navigation data

### Added
- `phone` and `linkedin` fields to `teamMemberType` schema (available for all team members)
- `DirectorData` interface in `src/actions/about.ts`
- `portableTextToPlain()` helper in `src/sanity/lib/actions/company.ts`
- Phone and LinkedIn display in team member cards

---

## [1.0.0] - 2025-12-30

### Added

#### Navbar Integration
- Added "About Us" dropdown to navbar between Blog and More
- Created `aboutLinks` array with 4 options:
  - About Us (Info icon) → `/about`
  - Why Choose Us (Award icon) → `/about/why-choose-us`
  - Mission & Vision (Eye icon) → `/about/mission-vision`
  - About Director (User icon) → `/about/director`
- Implemented hover-to-open functionality (desktop)
- Added popover state management (`aboutPopoverOpen`)
- Styled with gradient icon backgrounds matching brand
- Mobile: Expanded "About Us" section showing all links
- Desktop: Popover with auto-close on click

#### Why Choose Us Page (`/about/why-choose-us`)
- Created page route with full Sanity integration
- Implemented page header (title + subtitle)
- Added hero image section (aspect-[16/6])
- Created 3-column responsive grid (1 → 2 → 3)
- Designed reason cards:
  - Background: #f9f9fb
  - Optional icon/image (64×64px)
  - Title (20px, font-medium)
  - Description (14px, normal)
  - Padding: 24px, Gap: 16px/8px
- Created `WhyChooseUsSkeleton` component
- Added 6 comprehensive dummy reasons as fallback

#### Mission & Vision Page (`/about/mission-vision`)
- Created page route with singleton Sanity query
- Implemented page header (title + subtitle)
- Created Mission section:
  - Image left (aspect-[4/3])
  - Text right (title + statement)
- Created Vision section:
  - Image right (flex-row-reverse)
  - Text left (title + statement)
- Two-column layout (flex-1 each, 40px gap)
- Created `MissionVisionSkeleton` component
- Added comprehensive dummy data with mission/vision statements

#### About Director Page (`/about/director`)
- Created page route with singleton Sanity query
- Implemented two-column profile layout:
  - Left column (400px):
    - Square director photo (aspect-1/1)
    - Name and title
    - Contact information with icons
  - Right column (flex-1):
    - Biography (Portable Text rendering)
    - Key achievements with bullet points
- Integrated `PortableText` component for rich bio content
- Added contact links:
  - Email (Mail icon, mailto: link)
  - Phone (Phone icon, tel: link)
  - LinkedIn (Linkedin icon, external link)
- Styled achievements with brand-blue bullet dots (6×6px)
- Created `DirectorSkeleton` component
- Added comprehensive dummy director data

#### Sanity Schemas

**whyChooseUsType:**
- Created schema with fields:
  - `title` (string, required)
  - `subtitle` (text)
  - `heroImage` (image with hotspot)
  - `reasons` (array of objects):
    - `title` (string, required)
    - `description` (text, required)
    - `icon` (image with hotspot)
    - `order` (number for sorting)
- Configured with CheckmarkCircleIcon
- Added to schema exports

**missionVisionType:**
- Created singleton schema with fields:
  - `pageTitle` (string)
  - `pageSubtitle` (text)
  - `missionTitle` (string)
  - `missionStatement` (text, required)
  - `missionImage` (image with hotspot)
  - `visionTitle` (string)
  - `visionStatement` (text, required)
  - `visionImage` (image with hotspot)
- Configured with EyeOpenIcon
- Added preview showing "Singleton Document"
- Added to schema exports

**directorType:**
- Created singleton schema with fields:
  - `pageTitle`, `pageSubtitle` (strings)
  - `name` (string, required)
  - `title` (string, required, position)
  - `image` (image, required)
  - `bio` (array[block], Portable Text, required)
    - Supports: Normal, H3, H4, Bullet, Number
  - `achievements` (array[string])
  - `email`, `phone`, `linkedin` (contact fields)
- Configured with UserIcon
- Added to schema exports

#### Queries
- Created `getWhyChooseUsData()` query:
  - Fetches singleton document
  - Sorts reasons by order field
  - Maps icon images to URLs
  - Falls back to 6 dummy reasons
- Created `getMissionVisionData()` query:
  - Fetches singleton document
  - Maps images to URLs
  - Falls back to comprehensive dummy data
- Created `getDirectorData()` query:
  - Fetches singleton document
  - Preserves Portable Text structure for bio
  - Maps image to URL
  - Falls back to complete dummy director profile

#### Design Implementation
- Applied consistent Plus Jakarta Sans typography
- Implemented spacing system: 80px, 60px, 40px, 24px, 16px
- Used design colors: #18181b, #71717a, #f9f9fb
- Implemented responsive layouts:
  - Why Choose Us: 1 → 2 → 3 columns
  - Mission/Vision: Stack on mobile, side-by-side desktop
  - Director: Stack on mobile, two-column desktop
- Created smooth skeleton loading states

#### TypeScript
- Added explicit types to prevent `any` errors:
  - `Reason` interface for Why Choose Us
  - Type annotations in map functions
  - Proper Portable Text type handling
- Fixed Sanity icon import (CheckmarkCircleIcon)
- Ensured all components compile without errors

### Fixed
- Corrected Sanity icon import from `CheckCircleIcon` to `CheckmarkCircleIcon`
- Added explicit type annotations to map functions
- Fixed TypeScript compilation errors
- Removed unused `BookOpen` icon import from navbar

### Technical Details

#### File Changes
```
Created:
- src/app/(landing)/about/why-choose-us/page.tsx
- src/app/(landing)/about/mission-vision/page.tsx
- src/app/(landing)/about/director/page.tsx
- src/sanity/schemaTypes/whyChooseUsType.ts
- src/sanity/schemaTypes/missionVisionType.ts
- src/sanity/schemaTypes/directorType.ts

Modified:
- src/components/global/navbar.tsx (added About Us dropdown)
- src/sanity/schemaTypes/index.ts (added 3 new schemas)
```

#### Dependencies
- lucide-react (Award, Eye, User, Mail, Phone, Linkedin icons)
- @portabletext/react (PortableText component for bio)
- next/image (Image optimization)
- @sanity/image-url (Image URL generation)
- @sanity/icons (CheckmarkCircleIcon, EyeOpenIcon, UserIcon)

#### Metadata
```typescript
// Why Choose Us
title: "Why Choose Us | SHINER"
description: "Discover why leading companies choose SHINER..."

// Mission & Vision
title: "Our Mission & Vision | SHINER"
description: "Learn about SHINER's mission to deliver excellence..."

// Director
title: "About Our Director | SHINER"
description: "Meet the leadership behind SHINER..."
```

---

## [1.2.0] - 2026-02-19

### Changed

#### About Page Schema Refactor
- **Removed `whoWeAre` section** entirely from schema (`aboutPageType.ts`), projection, types (`AboutPage` interface), and page rendering
- **Added `mainImage` field** to about page schema (image with hotspot and alt text) — displayed in hero section
- **Converted `heroDescription` to rich text** (Portable Text / block content array) — rendered with `<PortableText>` instead of plain `<p>` tag
- **Converted `mission.description` to rich text** (block content array with Normal, H3, Blockquote styles and bullet lists)
- **Converted `vision.description` to rich text** (same configuration as mission)
- Updated GROQ projection: `heroDescription[]`, `mission { title, description[] }`, `vision { title, description[] }`
- Updated `AboutPage` TypeScript interface: `heroDescription` changed from `string` to `any[]`, mission/vision descriptions changed to `any[]`

#### Featured Products Section
- **Replaced inline product card markup** with `<ProductCard>` component in the featured products grid
- Passes `product.collection?.title` as `category` prop to ProductCard

#### Codebase-wide Tailwind Cleanup (42 files)
- **Replaced ALL arbitrary rem values** with standard Tailwind classes across the entire codebase:
  - `gap-[3.75rem]` → `gap-16`, `lg:w-[25rem]` → `lg:w-96`, `rounded-[1.5rem]` → `rounded-3xl`
  - `text-[2.25rem]` → `text-4xl`, `text-[6rem]` → `text-8xl`
  - `h-[1.2rem] w-[1.2rem]` → `size-5`, `h-[30.11rem]` → `h-96`
  - `after:inset-[0.125rem]` → `after:inset-0.5`, etc.
- **Removed ALL `leading-*` properties** from non-shadcn files (`leading-none`, `leading-5`, `leading-7`, `leading-relaxed`, `leading-[3rem]`)
- **Removed ALL `tracking-*` properties** from non-shadcn files (`tracking-[-0.0563rem]`, etc.)
- Left shadcn/ui component files untouched (button, select, dropdown-menu, accordion, dialog, label)

#### ProductCard Enhancement
- Added `category` prop to `ProductCard` component
- Renders `<GradientBadge>` when category is provided
- Updated all 3 usage sites to pass `category={product.collection?.title}`

#### Footer Contact Info
- Updated `site-config.ts` with real contact details:
  - Phone: `+91-90443 20555`
  - Email: `contact@shinermacahinery.com`
  - Added `salesEmail`: `sales@shinermacahinery.com`
- Footer displays phone number and both emails with icons

### Files Modified (42 total)
- `src/sanity/schemaTypes/company/aboutPageType.ts` — schema refactor
- `src/sanity/lib/queries/shared/projections.ts` — projection update
- `src/actions/about.ts` — type interface update
- `src/app/(landing)/about/page.tsx` — page rendering update
- `src/components/sections/products/product-card.tsx` — category/GradientBadge
- `src/components/layout/footer.tsx` — contact info display
- `src/lib/site-config.ts` — contact details
- 35+ component files for arbitrary rem → standard Tailwind, leading/tracking removal

---

## [1.1.0] - 2026-01-09

### Changed

#### Design System Refactoring (Codebase-Wide)

**Note**: This refactoring started with About Us pages but was expanded to the entire codebase (36 files total). See FEATURES-INDEX.md for full scope.

- **Converted all px units to rem** across the entire codebase for better accessibility and scalability
  - **36 files refactored** including About Us pages, blog components, product pages, landing sections, events components, and more
  - Typography: All text-[Xpx], leading-[Xpx], tracking-[Xpx] converted to rem
  - Spacing: All gap-[Xpx], p-[Xpx], m-[Xpx] converted to rem
  - Dimensions: All w-[Xpx], h-[Xpx], size-[Xpx] converted to rem (except intentional container max-widths)
  - Border radius: All rounded-[Xpx] converted to rem equivalents
- **Replaced hardcoded colors with semantic tokens** throughout the codebase:
  - `#18181b` → `text-foreground`
  - `#71717a` → `text-muted-foreground`
  - `#f9f9fb` → `bg-muted`
  - `gray-900` → `text-foreground`
  - `gray-500` → `text-muted-foreground`
  - `text-primary` → `text-foreground` (where applicable)
  - `zinc-200` → `bg-muted` (skeleton backgrounds)

#### Typography Refactoring (All Pages)
- Page titles (H1): `text-[36px]` → `text-[2.25rem]` (36px = 2.25rem)
- Page subtitles: `text-[20px]` → `text-[1.25rem]` (20px = 1.25rem)
- Section titles (H2): `text-[30px]` → `text-[1.875rem]` (30px = 1.875rem)
- Subsection titles (H3): `text-[24px]` → `text-[1.5rem]` (24px = 1.5rem)
- Card titles: `text-[20px]` → `text-[1.25rem]` (20px = 1.25rem)
- Body text: `text-[16px]` → `text-base` (16px = 1rem)
- Small text: `text-[14px]` → `text-sm` (14px = 0.875rem)

#### Spacing Refactoring
- Major sections: `gap-[80px]` → `gap-20` (80px = 5rem)
- Section internal: `gap-[60px]` → `gap-[3.75rem]` (60px = 3.75rem)
- Content gaps: `gap-[40px]` → `gap-10` (40px = 2.5rem)
- Medium gaps: `gap-[32px]` → `gap-8` (32px = 2rem)
- Card gaps: `gap-[24px]` → `gap-6` (24px = 1.5rem)
- Internal gaps: `gap-[16px]` → `gap-4` (16px = 1rem)
- Contact gaps: `gap-[12px]` → `gap-3` (12px = 0.75rem)
- Small gaps: `gap-[8px]` → `gap-2` (8px = 0.5rem)

#### Border Radius Refactoring
- Hero images: `rounded-[24px]` → `rounded-[1.5rem]` (24px = 1.5rem)
- Cards: `rounded-[16px]` → `rounded-2xl` (16px = 1rem)
- Icon images: `rounded-[12px]` → `rounded-xl` (12px = 0.75rem)
- Bullet dots: `w-[6px] h-[6px]` → `w-[0.375rem] h-[0.375rem]` (6px = 0.375rem)

#### Dimension Refactoring
- Icon sizes: `size-[20px]` → `size-5` (20px = 1.25rem)
- Icon containers: `w-[64px] h-[64px]` → `w-16 h-16` (64px = 4rem)
- Director photo width: `lg:w-[400px]` → `lg:w-[25rem]` (400px = 25rem)
- Max width: `max-w-[1200px]` → `max-w-[75rem]` (1200px = 75rem)

#### Page-Specific Changes

**Why Choose Us:**
- Card backgrounds: `bg-[#f9f9fb]` → `bg-muted`
- Skeleton backgrounds: `bg-zinc-200` → `bg-muted` (outer), `bg-secondary` (inner)
- Responsive padding: `py-24` → `py-16 md:py-24`

**Mission & Vision:**
- Text colors: `text-[#18181b]` → `text-foreground`, `text-[#71717a]` → `text-muted-foreground`
- Skeleton backgrounds: `bg-zinc-200` → `bg-muted` (outer), `bg-secondary` (inner)
- Responsive padding: `py-24` → `py-16 md:py-24`

**Director:**
- Contact links: `text-[#71717a]` → `text-muted-foreground`
- Achievement bullets: Converted px to rem units
- Skeleton backgrounds: `bg-zinc-200` → `bg-muted` (outer), `bg-secondary` (inner)
- Responsive padding: `py-24` → `py-16 md:py-24`

**Main About Page:**
- Hero title: `text-4xl` → `text-[2.5rem]` (40px)
- Hero subtitle: `text-xl` → `text-[1.25rem]`
- Feature cards: All `text-primary` → `text-foreground`
- Card backgrounds maintained semantic tokens
- Product text: `text-gray-900` → `text-foreground`, `text-gray-500` → `text-muted-foreground`

#### Codebase-Wide Scope

**Files Refactored (36 total)**:
- About Us pages (4 files): why-choose-us, mission-vision, director, main about
- Blog components (5 files): blog-post-detail, blog-card, page, blog-post-skeleton, blogs-skeleton
- Product components (4 files): products-grid-section, product-image-gallery, related-products, products-grid-section-skeleton
- Landing components (10 files): hero-section, how-it-works-section, brand-story-grid, contact-form, testimonial-card, brand-story-card, about-section, team-grid, team-skeleton, team-member-card
- Events components (8 files): certifications-section, achievements-section, events-page sections, installation/client skeletons
- Services page (1 file)
- Contact page (1 file)
- Example components (3 files)

**Build Verification**:
- ✓ Build compiles successfully after all refactoring
- ✓ All routes generated correctly (14 total routes)
- ✓ No broken functionality from conversions
- ✓ Fixed minor TypeScript errors unrelated to refactoring (home-data-example imports)

#### Benefits of Codebase-Wide Refactoring
1. **Better Accessibility**: rem units scale with user's font size preferences across entire application
2. **Maintainability**: Semantic color tokens make theme changes easier throughout all components
3. **Consistency**: Using design system tokens ensures visual consistency across all pages
4. **Future-proof**: Easier to implement theme variations or dark mode (if needed) globally
5. **Developer Experience**: Semantic names are more readable than hex codes in all components
6. **Standardization**: Entire codebase now follows same design system principles

### Technical Details

#### Color Mapping Reference
```
Hardcoded → Semantic Token
#18181b  → foreground (primary text)
#71717a  → muted-foreground (secondary text)
#f9f9fb  → muted (card backgrounds)
zinc-200 → muted (skeleton backgrounds - outer)
zinc-200 → secondary (skeleton backgrounds - inner elements)
gray-900 → foreground (primary text)
gray-500 → muted-foreground (secondary text)
```

#### Rem Conversion Reference
```
px → rem (at 16px base)
6px   → 0.375rem
8px   → 0.5rem (gap-2)
12px  → 0.75rem (gap-3)
14px  → 0.875rem (text-sm)
16px  → 1rem (text-base, gap-4)
20px  → 1.25rem (text-[1.25rem], size-5)
24px  → 1.5rem (text-[1.5rem], gap-6, rounded-[1.5rem])
30px  → 1.875rem (text-[1.875rem])
32px  → 2rem (gap-8)
36px  → 2.25rem (text-[2.25rem])
40px  → 2.5rem (gap-10)
60px  → 3.75rem (gap-[3.75rem])
64px  → 4rem (w-16, h-16)
80px  → 5rem (gap-20)
400px → 25rem (lg:w-[25rem])
1200px → 75rem (max-w-[75rem])
```

---

## Version History

- **1.1.0** (2026-01-09) - Design system refactoring: px to rem, semantic color tokens
- **1.0.0** (2025-12-30) - Initial release with three About pages and complete Sanity integration
