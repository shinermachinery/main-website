# Projects & Products System

**Status**: ✅ Completed
**Created**: 2025-12-30
**Last Modified**: 2025-12-30
**Owner**: Development Team

## Overview

Complete product catalog and detail page system with Sanity CMS integration, featuring image galleries, specifications, and related product recommendations.

### Use Cases

- Display product catalog with grid layout
- Show detailed product information with image galleries
- Manage product content through Sanity CMS
- Provide search and filtering capabilities
- Display related products

## Technical Implementation

### Architecture Pattern

**Server Component Data Flow:**
```
Page Route (Server) → Sanity Query → Server Component → Client Component (if needed)
                  ↓
            Suspense Boundary
                  ↓
         Skeleton Component
```

### Key Technologies

- **Next.js 16** - App Router with Server Components
- **React 19** - Server/Client component pattern
- **Sanity CMS** - Content management with GROQ queries
- **TypeScript** - Type-safe data handling
- **Tailwind CSS v4** - Styling with design tokens
- **next/image** - Optimized image delivery

## File Structure

```
src/
├── app/(landing)/
│   └── projects/
│       ├── page.tsx                    # Product grid listing page
│       └── [slug]/
│           └── page.tsx                # Dynamic product detail page
├── components/projects/
│   ├── project-card.tsx                # Product card component
│   ├── projects-grid-section.tsx      # Grid layout with search/filter
│   ├── projects-grid-section-skeleton.tsx  # Loading skeleton
│   ├── product-image-gallery.tsx      # Interactive image gallery
│   ├── product-features-list.tsx      # Key features display
│   ├── product-specifications-section.tsx  # Specs section
│   ├── product-detail-skeleton.tsx    # Detail page skeleton
│   └── other-products-section.tsx     # Related products
└── sanity/schemaTypes/
    └── projectType.ts                  # Product schema definition
```

## Core Features

### 1. Product Grid Page (`/projects`)

**Purpose**: Display all products in a searchable, filterable grid

**Components:**
- `ProjectsGridSection` - Main grid layout
- `ProjectCard` - Individual product cards
- `ProjectsGridSectionSkeleton` - Loading state

**Features:**
- 4-column responsive grid (1 → 2 → 3 → 4)
- Search bar (566px wide)
- Category filter with active chips
- Categories dropdown
- 24px gaps between cards

**Data Flow:**
```typescript
getProjects() → Sanity Query → Map to UI format → ProjectsGridSection
```

**Sanity Query:**
```groq
*[_type == "project"] | order(order asc, _createdAt desc) {
  _id,
  title,
  description,
  "image": images[0],
  "slug": slug.current
}
```

### 2. Product Detail Page (`/projects/[slug]`)

**Purpose**: Display comprehensive product information

**Sections:**
1. **Hero Section**
   - Left: Image gallery with thumbnails
   - Right: Title, description, features, download brochure

2. **Specifications Section**
   - 2-column grid (567px per column)
   - Star icons with spec text

3. **Other Products Section**
   - 4 related products in grid
   - "Explore Products" link with gradient text

**Components:**
- `ProductImageGallery` - Main image + 5 thumbnails
- `ProductFeaturesList` - Key features with star icons
- `ProductSpecificationsSection` - Technical specs
- `OtherProductsSection` - Related products
- `ProductDetailSkeleton` - Loading state

**Data Flow:**
```typescript
getProject(slug) → Single product by slug
getOtherProjects(slug) → 4 other products (excludes current)
```

**Sanity Queries:**
```groq
# Single Product
*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  description,
  features,
  specifications,
  images,
  slug
}

# Other Products
*[_type == "project" && slug.current != $slug]
| order(order asc, _createdAt desc)[0...4] {
  _id,
  title,
  description,
  "image": images[0],
  "slug": slug.current
}
```

## Sanity Schema

### Project Type

**File**: `src/sanity/schemaTypes/projectType.ts`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Product name |
| `slug` | slug | ✅ | URL-friendly identifier |
| `description` | text | ✅ | Product description |
| `images` | array[image] | | Multiple product images (max 10) |
| `features` | array[string] | | Key features (hero section) |
| `specifications` | array[string] | | Technical specs |
| `order` | number | | Display order (lower = first) |

**Preview:**
```typescript
preview: {
  select: {
    title: "title",
    media: "images.0",  // First image
    order: "order",
  }
}
```

## Component Details

### ProjectCard

**Props:**
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}
```

**Design Specs:**
- Width: 271px (responsive)
- Background: #f9f9fb
- Padding: 16px
- Border radius: 16px
- Image aspect ratio: 282/168
- Gap: 16px between elements

**Elements:**
1. Image (aspect-[282/168], rounded-[16px])
2. Title (text-[14px], font-medium)
3. Description (text-[14px], line-clamp-2)
4. Gradient CTA button ("View Details" + arrow)

### ProductImageGallery

**Props:**
```typescript
interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}
```

**Features:**
- Main image display (aspect-[282/168])
- Up to 5 clickable thumbnails (aspect-[38/38])
- Selected thumbnail highlighted with ring-2 ring-brand-blue
- Empty slots filled with bg-[#f9f9fb]
- Client component ("use client") for interactivity

**State:**
```typescript
const [selectedImage, setSelectedImage] = useState(0);
```

### ProductFeaturesList

**Props:**
```typescript
interface ProductFeaturesListProps {
  features: string[];
}
```

**Design:**
- Star icon (24px, brand-blue fill)
- 12px gap between icon and text
- 20px gap between features
- Text: 14px, medium weight

### ProductSpecificationsSection

**Props:**
```typescript
interface ProductSpecificationsSectionProps {
  specifications: string[];
}
```

**Layout:**
- Section header with title and subtitle
- 2-column flex-wrap grid
- Each item: 567px width
- Star icons + text (same as features)

## Navigation Integration

### Navbar

**Structure:**
```
Products | Projects | Services | Blog | About Us ▼ | More ▼
```

**Important Note:**
- "Products" link → `/projects` (product catalog)
- "Projects" link → `/products` (installations/clients page)
- Naming is intentionally swapped based on business requirements

**Code:**
```typescript
const navLinks = [
  { name: "Products", href: "/projects" },
  { name: "Projects", href: "/products" },
  // ...
];
```

## Dummy Data Strategy

### Product Grid Fallback

**Count**: 16 products
**Pattern**: `project-${i + 1}`
**Images**: Unsplash with unique signatures

```typescript
const dummyProjects = Array.from({ length: 16 }, (_, i) => ({
  id: `project-${i + 1}`,
  title: `Vernier Calipar Mitutoyo ${i + 1}`,
  description: "Lorem ipsum dolor sit amet consectetur...",
  image: `https://images.unsplash.com/photo-...?sig=${i}`,
  slug: `project-${i + 1}`,
}));
```

### Product Detail Fallback

**Default Features** (5 items):
- Heating/power supply system
- Japan SMC air filters
- Independent SMC Ejector
- Service life 14 billion times
- DC drive vibrator safety

**Default Specifications** (7 items):
- Comprehensive technical details
- Same content as features for demo purposes

## Loading States

### Grid Skeleton

**Elements:**
- Header (title + subtitle)
- Search bar (566px)
- Filter controls
- 16 product card skeletons in 4-column grid

**Animation**: `animate-pulse`

### Detail Skeleton

**Sections:**
1. **Hero**: Image gallery + details skeleton
2. **Specifications**: Header + 7 spec skeletons
3. **Other Products**: Header + 4 product card skeletons

**Gap Consistency**: Matches actual page (120px between sections)

## Design Specifications

### Typography

All text uses Plus Jakarta Sans via CSS variable:
```css
font-family: var(--font-plus-jakarta-sans)
```

**Hierarchy:**
- H1: 36px / 48px line / -0.9px tracking
- H2: 30px / 40px line / -0.75px tracking
- H3: 24px / 32px line / -0.6px tracking
- Body: 14px / 20px line / 0 tracking
- Subtitle: 20px / 28px line / -0.5px tracking

### Colors

**Text:**
- Primary: #18181b
- Muted: #71717a

**Backgrounds:**
- Card: #f9f9fb
- Skeleton: zinc-200

**Gradient:**
```css
linear-gradient(89.24deg, rgba(42, 94, 152, 1) 27.51%, rgba(24, 183, 90, 1) 115.04%)
```

### Spacing

**Section Gaps:**
- Major: 120px
- Medium: 80px
- Small: 40px
- Card internal: 24px, 16px

**Grid Gaps:**
- Product grid: 24px
- Spec grid: 20px

### Aspect Ratios

- Hero image: 282/168
- Thumbnails: 38/38 (square)
- Director photo: 1/1 (square)
- Why Choose Us hero: 16/6
- Mission/Vision images: 4/3

## Metadata & SEO

### Grid Page

```typescript
export const metadata: Metadata = {
  title: "Our Projects | SHINER",
  description: "Explore our comprehensive range of products...",
};
```

### Detail Page

**Dynamic metadata:**
```typescript
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  return {
    title: `${project.title} | SHINER`,
    description: project.description,
  };
}
```

## Error Handling

**Strategy**: Graceful degradation with console logging

```typescript
try {
  const data = await client.fetch(query);
  return data || fallbackData;
} catch (error) {
  console.error("Error fetching projects:", error);
  return fallbackData;
}
```

**User Experience:**
- No error UI displayed
- Dummy data shown automatically
- Errors logged for debugging

## Type Safety

**TypeScript Interfaces:**
```typescript
interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface Reason {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}
```

**Sanity Type Handling:**
```typescript
(project: {
  _id: string;
  title: string;
  description: string;
  image?: { asset: { _ref: string } };
  slug: string;
})
```

## Performance Optimizations

### Image Optimization

- Next.js Image component
- Proper `sizes` attribute
- Priority loading for hero images
- Lazy loading for thumbnails

### Data Fetching

- Server Components for initial load
- Suspense for progressive rendering
- Efficient GROQ queries with field selection

### Responsive Design

**Breakpoints:**
```css
/* Mobile: 1 column */
grid-cols-1

/* Tablet: 2 columns */
md:grid-cols-2

/* Desktop: 3 columns */
lg:grid-cols-3

/* Wide: 4 columns */
xl:grid-cols-4
```

## Dependencies

### Required Features
- Sanity CMS Integration
- UI Components (Button, GradientButton)
- Theme System (color variables)

### npm Packages
- next/image
- lucide-react (icons)
- @sanity/image-url
- @sanity/client

## Testing Checklist

- [ ] Product grid loads with Sanity data
- [ ] Product grid shows dummy data when Sanity is empty
- [ ] Search bar renders correctly (566px width)
- [ ] Category filter displays active state
- [ ] Product cards link to detail pages
- [ ] Detail page loads single product
- [ ] Image gallery switches images on thumbnail click
- [ ] Features list displays with star icons
- [ ] Specifications section shows 2-column grid
- [ ] Other products section shows 4 products
- [ ] Skeletons match actual layouts
- [ ] Responsive design works across breakpoints
- [ ] Images load with proper optimization
- [ ] Metadata generates correctly
- [ ] TypeScript compiles without errors
- [ ] Navbar links point to correct routes

## Known Issues

None currently identified.

## Future Enhancements

### Planned
- [ ] Product search functionality (backend integration)
- [ ] Category filtering (active filters)
- [ ] Pagination for large product catalogs
- [ ] Product comparison feature
- [ ] Product reviews and ratings
- [ ] PDF brochure generation
- [ ] Product inquiry form

### Ideas
- [ ] AR/3D product visualization
- [ ] Video demonstrations
- [ ] Technical specification downloads
- [ ] Live chat integration
- [ ] Wishlist/favorites

## Decision Log

### Decision 1: Navbar Link Naming
**Date**: 2025-12-30
**Decision**: Swap "Products" and "Projects" links in navbar
**Rationale**:
- "Products" should link to catalog (`/projects`)
- "Projects" should link to installations (`/products`)
- Reflects business terminology preferences
**Alternative Considered**: Rename routes to match link text
**Why Not**: Existing routes already established, less disruptive to swap links

### Decision 2: Image Gallery Limit
**Date**: 2025-12-30
**Decision**: Display first 5 images as thumbnails
**Rationale**:
- Fits design layout (5 equal-width thumbnails)
- Schema allows up to 10 images for future expansion
- Prevents UI crowding
**Alternative Considered**: Scrollable thumbnail carousel
**Why Not**: Simpler implementation, better UX for 5 items

### Decision 3: Skeleton Granularity
**Date**: 2025-12-30
**Decision**: Separate skeleton for each page (grid vs detail)
**Rationale**:
- Layouts differ significantly
- Better perceived performance
- Easier maintenance
**Alternative Considered**: Generic loading spinner
**Why Not**: Skeleton shows structure, reduces layout shift

## Related Documentation

- [Architecture Patterns](../../architecture/patterns.md)
- [Sanity Integration](../sanity-integration/README.md)
- [Landing Pages](../landing-page/README.md)

---

**Version**: 1.0.0
**Last Reviewed**: 2025-12-30
