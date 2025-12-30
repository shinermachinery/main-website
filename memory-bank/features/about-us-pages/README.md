# About Us Pages

**Status**: ✅ Completed
**Created**: 2025-12-30
**Last Modified**: 2025-12-30
**Owner**: Development Team

## Overview

Complete About Us section with three dedicated pages, each integrated with Sanity CMS for easy content management. Features rich text support, responsive layouts, and comprehensive company information display.

### Use Cases

- Display company information and values
- Showcase reasons to choose the company
- Present mission and vision statements
- Highlight director/leadership information
- Manage all content through Sanity CMS
- Provide consistent navigation through dropdown

## Technical Implementation

### Architecture Pattern

**Singleton Documents + Server Components:**
```
Navbar Dropdown → Page Routes → Sanity Singleton Queries → Server Components → Display
                                                        ↓
                                                  Suspense Boundary
                                                        ↓
                                                Skeleton Components
```

### Key Technologies

- **Next.js 16** - App Router with Server Components
- **React 19** - Server/Client component pattern
- **Sanity CMS** - Singleton document pattern
- **Portable Text** - Rich text content rendering
- **TypeScript** - Type-safe data handling
- **Tailwind CSS v4** - Responsive design
- **Plus Jakarta Sans** - Typography system

## File Structure

```
src/
├── app/(landing)/about/
│   ├── page.tsx                    # Main About Us page (already existing)
│   ├── why-choose-us/
│   │   └── page.tsx                # Why Choose Us page
│   ├── mission-vision/
│   │   └── page.tsx                # Mission & Vision page
│   └── director/
│       └── page.tsx                # About Director page
├── components/global/
│   ├── navbar.tsx                  # Updated with About Us dropdown
│   └── blog/
│       └── portable-text.tsx       # Used for director bio
└── sanity/schemaTypes/
    ├── whyChooseUsType.ts          # Why Choose Us schema
    ├── missionVisionType.ts        # Mission & Vision schema
    └── directorType.ts             # Director schema
```

## Core Features

### 1. Navigation - About Us Dropdown

**Location**: Navbar between Blog and More

**Structure:**
```
About Us ▼
├── About Us
├── Why Choose Us
├── Mission & Vision
└── About Director
```

**Icons:**
- About Us: Info
- Why Choose Us: Award
- Mission & Vision: Eye
- About Director: User

**Implementation:**
```typescript
const aboutLinks = [
  { name: "About Us", href: "/about", icon: Info },
  { name: "Why Choose Us", href: "/about/why-choose-us", icon: Award },
  { name: "Mission & Vision", href: "/about/mission-vision", icon: Eye },
  { name: "About Director", href: "/about/director", icon: User },
];
```

**Features:**
- Hover to open (desktop)
- Auto-close on link click
- Chevron rotation animation
- Gradient icon backgrounds
- Mobile: Expanded section with all links

### 2. Why Choose Us Page (`/about/why-choose-us`)

**Purpose**: Display reasons why customers should choose the company

**Layout:**
- Page header (title + subtitle)
- Hero image (aspect-[16/6])
- 3-column grid of reason cards

**Sanity Schema** (`whyChooseUsType`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Main page title |
| `subtitle` | text | | Page subtitle/description |
| `heroImage` | image | | Hero image at top |
| `reasons` | array[object] | | Array of reasons to choose |
| `reasons[].title` | string | ✅ | Reason title |
| `reasons[].description` | text | ✅ | Reason description |
| `reasons[].icon` | image | | Optional icon/image |
| `reasons[].order` | number | | Display order |

**Query:**
```groq
*[_type == "whyChooseUs"][0] {
  title,
  subtitle,
  heroImage,
  reasons[] {
    title,
    description,
    icon,
    order
  }
}
```

**Dummy Data**: 6 reasons (Quality, Team, Innovation, Customer-Centric, Pricing, Global Reach)

**Card Design:**
- Background: #f9f9fb
- Padding: 24px
- Border radius: 16px
- Gap: 16px (icon to content), 8px (title to description)
- Icon size: 64×64px (rounded-[12px])

**Skeleton**: Matches exact layout with hero image + 6 cards

### 3. Mission & Vision Page (`/about/mission-vision`)

**Purpose**: Display company mission and vision statements

**Layout:**
- Page header (title + subtitle)
- Mission section (image left, text right)
- Vision section (image right, text left) - uses `flex-row-reverse`

**Sanity Schema** (`missionVisionType`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pageTitle` | string | ✅ | Page title |
| `pageSubtitle` | text | | Page subtitle |
| `missionTitle` | string | | Mission section title |
| `missionStatement` | text | ✅ | Mission statement |
| `missionImage` | image | | Mission image |
| `visionTitle` | string | | Vision section title |
| `visionStatement` | text | ✅ | Vision statement |
| `visionImage` | image | | Vision image |

**Query:**
```groq
*[_type == "missionVision"][0] {
  pageTitle,
  pageSubtitle,
  missionTitle,
  missionStatement,
  missionImage,
  visionTitle,
  visionStatement,
  visionImage
}
```

**Singleton Pattern**: Only one document exists (enforced by `[0]` in query)

**Section Design:**
- Two-column layout (flex-1 each)
- Images: aspect-[4/3], rounded-[24px]
- Gap: 40px between columns
- Gap: 16px internal (title to description)
- Text: 16px/24px line height

**Skeleton**: Matches exact layout with 2 sections (image + text)

### 4. About Director Page (`/about/director`)

**Purpose**: Showcase company director/leadership

**Layout:**
- Page header (title + subtitle)
- Two-column profile:
  - Left (400px): Photo, name, title, contact info
  - Right (flex-1): Biography (Portable Text), achievements

**Sanity Schema** (`directorType`):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pageTitle` | string | | Page title |
| `pageSubtitle` | text | | Page subtitle |
| `name` | string | ✅ | Director name |
| `title` | string | ✅ | Position/title |
| `image` | image | ✅ | Director photo |
| `bio` | array[block] | ✅ | Biography (Portable Text) |
| `achievements` | array[string] | | Key achievements |
| `email` | string | | Email address |
| `phone` | string | | Phone number |
| `linkedin` | url | | LinkedIn profile URL |

**Query:**
```groq
*[_type == "director"][0] {
  pageTitle,
  pageSubtitle,
  name,
  title,
  image,
  bio,
  achievements,
  email,
  phone,
  linkedin
}
```

**Portable Text Configuration:**
- Styles: Normal, H3, H4
- Lists: Bullet, Number
- Rendered using `PortableText` component from `@/components/global/blog/portable-text`

**Contact Icons:**
- Mail (lucide-react)
- Phone (lucide-react)
- Linkedin (lucide-react)
- Hover state: `hover:text-brand-blue`

**Achievements Display:**
- Bullet point style with brand-blue dots (6×6px, rounded-full)
- 12px gap between bullet and text
- 16px/24px text

**Photo:**
- Aspect ratio: 1:1 (square)
- Rounded: 24px
- Size: 400px width on desktop

**Skeleton**: Matches exact layout with photo + contact + bio + achievements

## Design Specifications

### Typography Hierarchy

All pages use consistent typography:

```css
/* Page Title (H1) */
font-size: 36px;
line-height: 48px;
letter-spacing: -0.9px;
color: #18181b;

/* Page Subtitle */
font-size: 20px;
line-height: 28px;
letter-spacing: -0.5px;
color: #71717a;

/* Section Title (H2) */
font-size: 30px;
line-height: 40px;
letter-spacing: -0.75px;
color: #18181b;

/* Subsection Title (H3) */
font-size: 24px;
line-height: 32px;
letter-spacing: -0.6px;
color: #18181b;

/* Body Text */
font-size: 16px;
line-height: 24px;
color: #71717a;

/* Card Text */
font-size: 14px;
line-height: 20px;
color: #71717a;
```

### Spacing System

**Section Gaps:**
- Between major sections: 80px
- Page header to content: 80px
- Internal section gaps: 40px
- Card internal gaps: 16px, 8px

**Grid Gaps:**
- Why Choose Us grid: 40px
- Mission/Vision sections: 40px
- Director layout: 60px

### Color Palette

**Text:**
- Primary: #18181b
- Muted: #71717a

**Backgrounds:**
- Card background: #f9f9fb
- Page background: white
- Skeleton: zinc-200

**Accents:**
- Brand blue: var(--brand-blue)
- Brand green: var(--brand-green)
- Bullet dots: bg-brand-blue

### Component Patterns

**Card Pattern** (Why Choose Us):
```tsx
<div className="flex flex-col gap-[16px] p-[24px] rounded-[16px] bg-[#f9f9fb]">
  {/* Icon */}
  {/* Title */}
  {/* Description */}
</div>
```

**Two-Column Pattern** (Mission/Vision, Director):
```tsx
<section className="flex flex-col lg:flex-row gap-[40px]">
  <div className="flex-1">{/* Image */}</div>
  <div className="flex-1">{/* Content */}</div>
</section>
```

## Data Management

### Singleton vs Collection

**Why Choose Us**: Singleton (one document)
- Only one "Why Choose Us" page exists
- Query: `*[_type == "whyChooseUs"][0]`

**Mission & Vision**: Singleton (one document)
- Only one Mission & Vision document exists
- Query: `*[_type == "missionVision"][0]`

**Director**: Singleton (one document)
- Only one director profile exists
- Query: `*[_type == "director"][0]`

**Benefits of Singleton Pattern:**
- Simpler content management (no list to navigate)
- Guaranteed single source of truth
- Cleaner Sanity Studio UX
- No need for ordering/filtering

### Fallback Strategy

All pages implement comprehensive dummy data:

**Why Choose Us**: 6 realistic reasons
**Mission & Vision**: Complete statements with images
**Director**: Full bio, achievements, contact info

**Fallback Trigger:**
1. Sanity query returns null/empty
2. Error during fetch
3. Missing required fields

**User Experience:**
- Pages always display content
- No broken states
- Smooth development workflow
- Errors logged to console

## Portable Text Integration

### Director Biography

**Schema Configuration:**
```typescript
defineField({
  name: "bio",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
    }),
  ],
})
```

**Rendering:**
```tsx
import { PortableText } from "@/components/global/blog/portable-text";

<div className="prose prose-lg max-w-none">
  <PortableText value={data.bio} />
</div>
```

**Supported Features:**
- Paragraphs (normal text)
- Headings (H3, H4)
- Bullet lists
- Numbered lists
- **Bold** and _italic_ text (via marks)

**Styling:**
- Uses Tailwind Typography (`prose`)
- Size: `prose-lg`
- Max width: none (full container width)
- Font family: Plus Jakarta Sans

## Loading States

### Skeleton Components

Each page has custom skeleton matching exact layout:

**WhyChooseUsSkeleton:**
- Page header (title + subtitle)
- Hero image placeholder (aspect-[16/6])
- 6 reason cards in 3-column grid

**MissionVisionSkeleton:**
- Page header
- 2 section skeletons (image + text columns)
- Alternating layout maintained

**DirectorSkeleton:**
- Page header
- Two-column layout:
  - Photo placeholder (square)
  - Name/title placeholders
  - 3 contact link placeholders
  - Biography section (4 lines)
  - Achievements section (5 items)

**Animation**: All use `animate-pulse`

**Color**: Consistent `bg-zinc-200` for placeholders

## Responsive Design

### Breakpoint Strategy

**Mobile (default):**
- Single column layouts
- Stack images above text
- Full-width cards

**Tablet (md:):**
- 2-column grid for Why Choose Us
- Side-by-side for Mission/Vision
- Director layout still stacked

**Desktop (lg:):**
- 3-column grid for Why Choose Us
- Full two-column layouts
- Director profile two-column

**Wide (xl:):**
- Maintained 3-column for consistency

### Image Responsiveness

**Sizes attribute:**
```tsx
// Why Choose Us hero
sizes="(max-width: 1200px) 100vw, 1200px"

// Mission/Vision images
sizes="(max-width: 1024px) 100vw, 50vw"

// Director photo
sizes="(max-width: 1024px) 100vw, 400px"

// Reason icons
sizes="64px"
```

## Metadata & SEO

### Page Metadata

**Why Choose Us:**
```typescript
export const metadata: Metadata = {
  title: "Why Choose Us | SHINER",
  description: "Discover why leading companies choose SHINER...",
};
```

**Mission & Vision:**
```typescript
export const metadata: Metadata = {
  title: "Our Mission & Vision | SHINER",
  description: "Learn about SHINER's mission to deliver excellence...",
};
```

**Director:**
```typescript
export const metadata: Metadata = {
  title: "About Our Director | SHINER",
  description: "Meet the leadership behind SHINER...",
};
```

## Error Handling

**Strategy**: Console logging + graceful fallback

```typescript
try {
  const data = await client.fetch(query);
  if (!data) return dummyData;
  return processedData;
} catch (error) {
  console.error("Error fetching data:", error);
  return dummyData;
}
```

**No User-Facing Errors**: Pages always render successfully

## Type Safety

### TypeScript Interfaces

**Why Choose Us:**
```typescript
interface Reason {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}
```

**Director:**
```typescript
interface Director {
  name: string;
  title: string;
  image: string;
  bio: Array<{ _type: "block"; children: Array<{ text: string }> }>;
  achievements: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
}
```

**Type Annotations:**
- All map functions have explicit types
- Prevents `any` type errors
- Ensures proper autocomplete

## Dependencies

### Required Features
- Sanity CMS Integration
- Portable Text component (for director bio)
- UI Components (icons, gradients)
- Theme System (color variables)

### npm Packages
- lucide-react (icons)
- next/image (optimization)
- @portabletext/react (rich text)
- @sanity/image-url (images)

## Testing Checklist

**Navigation:**
- [ ] About Us dropdown appears in navbar
- [ ] All 4 links present with correct icons
- [ ] Hover opens dropdown (desktop)
- [ ] Click navigates correctly
- [ ] Mobile menu shows expanded About Us section

**Why Choose Us:**
- [ ] Page loads with Sanity data
- [ ] Falls back to 6 dummy reasons if empty
- [ ] Hero image displays correctly
- [ ] 3-column grid responsive
- [ ] Reason cards show icons if present
- [ ] Skeleton matches layout

**Mission & Vision:**
- [ ] Singleton query returns data
- [ ] Mission section: image left, text right
- [ ] Vision section: image right, text left
- [ ] Images maintain 4:3 aspect ratio
- [ ] Responsive layout stacks on mobile
- [ ] Skeleton matches layout

**Director:**
- [ ] Director profile loads
- [ ] Photo displays as square
- [ ] Contact links work (mailto:, tel:, external)
- [ ] Biography renders as Portable Text
- [ ] Achievements display with bullets
- [ ] Two-column layout responsive
- [ ] Skeleton matches layout

**General:**
- [ ] All pages have proper metadata
- [ ] Typography consistent (Plus Jakarta Sans)
- [ ] Spacing matches design system
- [ ] Colors match brand palette
- [ ] TypeScript compiles without errors
- [ ] Images optimize correctly
- [ ] Suspense boundaries work
- [ ] Error handling graceful

## Known Issues

None currently identified.

## Future Enhancements

### Planned
- [ ] Multiple director profiles (team page)
- [ ] Achievement icons/images
- [ ] Timeline component for company history
- [ ] Awards and certifications section
- [ ] Office locations with maps
- [ ] Video integration (director message)

### Ideas
- [ ] Interactive mission/vision visualization
- [ ] Team member profiles
- [ ] Company culture section
- [ ] Press releases integration
- [ ] Investor relations content
- [ ] Careers/jobs integration

## Decision Log

### Decision 1: Singleton Pattern
**Date**: 2025-12-30
**Decision**: Use singleton documents for all three schemas
**Rationale**:
- Only one instance needed per page
- Simpler content management
- Cleaner Sanity Studio UX
- No confusion about which document to display
**Alternative Considered**: Collection with single item
**Why Not**: Unnecessary complexity, confusing for editors

### Decision 2: Portable Text for Biography
**Date**: 2025-12-30
**Decision**: Use Portable Text instead of plain text for director bio
**Rationale**:
- Supports rich formatting (bold, italic, lists)
- Professional presentation
- Flexibility for content editors
- Reuses existing PortableText component
**Alternative Considered**: Plain text field
**Why Not**: Too limiting for professional content

### Decision 3: Embedded Skeletons
**Date**: 2025-12-30
**Decision**: Define skeletons in same file as page component
**Rationale**:
- Tight coupling (skeleton specific to page)
- Easier maintenance
- No need for separate skeleton files
- Faster development
**Alternative Considered**: Separate skeleton components
**Why Not**: Overhead for simple skeletons

### Decision 4: Dropdown Navigation
**Date**: 2025-12-30
**Decision**: Group all About pages under "About Us" dropdown
**Rationale**:
- Reduces navbar clutter
- Logical grouping
- Consistent with "More" dropdown pattern
- Better UX for related content
**Alternative Considered**: Separate nav links
**Why Not**: Too many top-level links

## Related Documentation

- [Navbar Component](../../architecture/patterns.md)
- [Sanity Integration](../sanity-integration/README.md)
- [Landing Pages](../landing-page/README.md)
- [Projects & Products](../projects-products/README.md)

---

**Version**: 1.0.0
**Last Reviewed**: 2025-12-30
