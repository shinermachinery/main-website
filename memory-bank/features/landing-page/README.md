# Landing Page

> **Status**: In Development (Phase 4 Complete)
> **Created**: 2025-12-23
> **Last Modified**: 2025-12-23
> **Owner/Lead**: Team

## Overview

A professional, modern landing page featuring a hybrid architecture: static sections for performance combined with Sanity CMS-managed dynamic content. The landing page showcases products, team members, testimonials, and provides a contact form for user engagement.

## User Story / Use Case

**As a** website visitor
**I want** to quickly understand the company's offerings and value proposition
**So that** I can make an informed decision about engaging with the business

### Example Scenarios
- Visitor arrives on homepage and sees compelling hero section with clear value proposition
- Visitor scrolls through featured products to understand what's offered
- Visitor reads team bios to build trust in the company
- Visitor submits contact form to request more information

## Phase-Based Development

### Phase 1: Foundation Setup ✅ (Completed 2025-12-23)
- Added Plus Jakarta Sans font to Next.js font system
- Configured brand colors in OKLCH color space
- Created project structure (landing components directory)
- Initialized memory bank documentation

### Phase 2: Static Sections ✅ (Completed 2025-12-23)
- Gradient button component with 3 variants (primary, secondary, outline)
- Hero section with decorative background and gradient text
- About Us section with two-column layout
- Features Grid with 4 feature cards and icons
- Statistics section with 4 metrics display
- Updated homepage to use new sections

### Phase 3: Sanity CMS Integration ✅ (Completed 2025-12-23)
- Product schema and components (data, grid, skeleton)
- Team Member schema and components (data, grid, skeleton)
- Testimonial schema and components (data, carousel, skeleton)
- Server data components with Suspense boundaries
- Image builder export for component use

### Phase 4: Contact Form + Footer ✅ (Completed 2025-12-23)
- Contact submission schema with status tracking
- Contact form with Server Action and validation
- Footer component with social links and navigation
- Form state management with useTransition

### Phase 5: Polish, Accessibility, SEO (Pending)
- SEO metadata
- Image optimization
- Accessibility improvements
- Responsive testing

## Technical Implementation

### Architecture

```
Landing Page (Hybrid Approach)
│
├── Static Sections (Server Components)
│   ├── Hero Section
│   ├── About Section
│   ├── Features Grid
│   └── Stats Section
│
├── CMS Sections (Server Data Pattern)
│   ├── Products → products-data.tsx → ProductsGrid
│   ├── Team → team-data.tsx → TeamGrid
│   └── Testimonials → testimonials-data.tsx → TestimonialsCarousel
│
└── User Interaction
    ├── Contact Form (Client Component + Server Action)
    └── Footer (Server Component)
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| HeroSection | `src/components/landing/hero-section.tsx` | Hero section with CTA |
| AboutSection | `src/components/landing/about-section.tsx` | Company overview |
| FeaturesSection | `src/components/landing/features-section.tsx` | 4 key features grid |
| GradientButton | `src/components/ui/gradient-button.tsx` | Branded button with gradient |
| ProductsData | `src/components/landing/products-data.tsx` | Server data component for products |
| ProductsGrid | `src/components/landing/products-grid.tsx` | Client UI for product cards |
| ContactForm | `src/components/landing/contact-form.tsx` | Contact form with validation |
| Footer | `src/components/landing/footer.tsx` | Site footer |

### Tech Stack

- **Framework**: Next.js 16.1 with App Router
- **React**: 19.2.3
- **CMS**: Sanity v4
- **Styling**: Tailwind CSS v4 (OKLCH colors)
- **Typography**: Plus Jakarta Sans (400, 500, 600, 700, 800 weights)
- **Icons**: lucide-react
- **Components**: Radix UI primitives

### Data Flow

**Static Sections:**
1. Server component renders immediately (no data fetching)
2. HTML sent to client instantly
3. Zero JavaScript for static content

**CMS Sections:**
1. Suspense boundary shows skeleton
2. Server data component fetches from Sanity
3. Data passed as props to client component
4. Client component renders with interactive features
5. Progressive enhancement as data arrives

**Contact Form:**
1. Client component handles form state
2. User submits form
3. Server Action validates and saves to Sanity
4. Success/error message displayed

## Configuration

### Font Configuration

**File**: `src/app/layout.tsx`

```typescript
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
```

### Brand Colors

**File**: `src/app/globals.css`

```css
:root {
  /* Brand Colors */
  --brand-blue: oklch(0.45 0.12 250);       /* rgba(42, 94, 152, 1) */
  --brand-green: oklch(0.65 0.18 150);      /* rgba(24, 183, 90, 1) */
  --brand-blue-10: oklch(0.45 0.12 250 / 10%);
  --brand-green-10: oklch(0.65 0.18 150 / 10%);
}

.dark {
  /* Slightly lighter for dark mode */
  --brand-blue: oklch(0.55 0.12 250);
  --brand-green: oklch(0.70 0.18 150);
  --brand-blue-10: oklch(0.55 0.12 250 / 10%);
  --brand-green-10: oklch(0.70 0.18 150 / 10%);
}
```

**Tailwind Usage:**
```tsx
<div className="bg-brand-blue text-white" />
<button className="bg-gradient-to-r from-brand-blue to-brand-green" />
```

### Environment Variables

Uses existing Sanity configuration:

```bash
# Required (already configured)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-22  # Default
```

## Dependencies

### Internal Dependencies

- **Feature**: Sanity CMS Integration
  - **Why**: CMS-managed content (products, team, testimonials, contact submissions)
  - **Location**: `memory-bank/features/sanity-integration/`

- **Feature**: UI Components
  - **Why**: Base components (Button) and utilities
  - **Location**: `memory-bank/features/ui-components/`

- **Feature**: Theme System
  - **Why**: Color variables and theme support
  - **Location**: `memory-bank/features/theme-system/`

### External Dependencies

- **Package**: `next@16.1`
  - **Purpose**: Framework for server components and routing
  - **Alternatives**: None (project requirement)

- **Package**: `sanity@4`
  - **Purpose**: Headless CMS for dynamic content
  - **Alternatives**: Contentful, Strapi (chose Sanity for flexibility)

- **Package**: `lucide-react@0.562.0`
  - **Purpose**: Icons for features and UI
  - **Alternatives**: react-icons, heroicons

## Sanity Schemas

### Product Schema
```typescript
{
  name: 'product',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'description', type: 'text' },
    { name: 'image', type: 'image', hotspot: true },
    { name: 'price', type: 'number' },
    { name: 'features', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', type: 'boolean' },
    { name: 'order', type: 'number' }
  ]
}
```

### Team Member Schema
```typescript
{
  name: 'teamMember',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'bio', type: 'text' },
    { name: 'image', type: 'image', hotspot: true },
    { name: 'order', type: 'number' }
  ]
}
```

### Testimonial Schema
```typescript
{
  name: 'testimonial',
  fields: [
    { name: 'customerName', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'content', type: 'text' },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    { name: 'image', type: 'image', hotspot: true },
    { name: 'featured', type: 'boolean' },
    { name: 'order', type: 'number' }
  ]
}
```

### Contact Submission Schema
```typescript
{
  name: 'contactSubmission',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'message', type: 'text' },
    { name: 'submittedAt', type: 'datetime' },
    { name: 'status', type: 'string', options: ['new', 'read', 'archived'] }
  ],
  readOnly: true
}
```

## Code Examples

### Server Component (Static Section)

```typescript
// src/components/landing/hero-section.tsx
import { GradientButton } from '@/components/ui/gradient-button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Precision Engineering Delivered With Confidence
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Built to perform. Built to last.
        </p>
        <GradientButton size="lg">
          Explore Products
        </GradientButton>
      </div>
    </section>
  )
}
```

### Server Data Component Pattern

```typescript
// src/components/landing/products-data.tsx (Server)
import { client } from '@/sanity/lib/client'
import type { Product } from '@/sanity/types'
import { ProductsGrid } from './products-grid'

export async function ProductsData() {
  const query = `*[_type == "product" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    image,
    price,
    features
  }`

  const products = await client.fetch<Product[]>(query)
  return <ProductsGrid products={products} />
}

// src/components/landing/products-grid.tsx (Client)
'use client'

import type { Product } from '@/sanity/types'
import { GradientButton } from '@/components/ui/gradient-button'

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="rounded-2xl border p-6">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-muted-foreground">{product.description}</p>
              <GradientButton className="mt-4">View Details</GradientButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Performance Considerations

- **Static sections** render instantly (server components, no JS)
- **CMS sections** stream progressively (Suspense boundaries)
- **Images** optimized with Next.js Image component
- **Fonts** preloaded via next/font
- **Bundle size** minimized (client components only where needed)

## Decision Log

### Decision 1: Plus Jakarta Sans Typography

**Date**: 2025-12-23
**Context**: Need to match Figma design exactly
**Decision**: Use Plus Jakarta Sans as primary font
**Rationale**:
- Exact match to Figma design
- Google Fonts provides excellent performance
- Modern, professional aesthetic
- Multiple weights available (400-800)
**Alternatives**: Keep existing Geist Sans (faster but doesn't match design)
**Consequences**: Slightly larger font bundle, but acceptable for brand consistency

### Decision 2: OKLCH Color System

**Date**: 2025-12-23
**Context**: Add brand colors while maintaining consistency with existing system
**Decision**: Use OKLCH color space for brand colors
**Rationale**:
- Project already uses OKLCH (consistent approach)
- Perceptually uniform (predictable lightness changes)
- Better for accessibility (easier to maintain contrast ratios)
- Works seamlessly in light/dark modes
**Alternatives**: Use RGB or HSL (less modern, harder to adjust)
**Consequences**: Excellent cross-mode consistency, easier to create variants

### Decision 3: Hybrid Content Approach

**Date**: 2025-12-23
**Context**: Balance between performance and flexibility
**Decision**: Static sections for layout, CMS for dynamic content
**Rationale**:
- Hero, About, Features rarely change → static for performance
- Products, Team, Testimonials change frequently → CMS for flexibility
- Best of both worlds: fast initial load + easy content management
**Alternatives**: All static (inflexible) or all CMS (slower)
**Consequences**: Optimal performance with maintainability

### Decision 4: Component-Based Server Data Pattern

**Date**: 2025-12-23
**Context**: Follow project's established patterns
**Decision**: Create dedicated server data components (*-data.tsx)
**Rationale**:
- Follows patterns.md guidelines
- Each client component gets its own server data component
- Enables granular Suspense boundaries
- Clear separation of concerns (data vs. UI)
**Alternatives**: Route-based data files (less granular)
**Consequences**: More files, but better streaming and maintainability

## Troubleshooting

### Common Problems

**Problem 1: Brand colors not appearing**
- **Cause**: Tailwind not recognizing new color variables
- **Solution**: Restart dev server (`npm run dev`) to rebuild Tailwind config

**Problem 2: Font not loading**
- **Cause**: Next.js font loading issue
- **Solution**: Check Network tab for font requests, clear `.next` cache and rebuild

**Problem 3: Hydration errors**
- **Cause**: Mismatch between server and client rendering
- **Solution**: Ensure no 'use client' on page.tsx, use suppressHydrationWarning on html

## Known Issues / Limitations

- **Placeholder images**: Currently using placeholders until real assets are provided
- **Content**: Requires manual content entry in Sanity Studio for CMS sections

## Future Enhancements

- [ ] Add animations/transitions to sections (optional, based on performance)
- [ ] Implement scroll-triggered animations
- [ ] Add i18n support for multilingual landing page
- [ ] Create A/B testing variants for hero CTA

## Resources

### Related Files
- `src/app/layout.tsx` - Font configuration
- `src/app/globals.css` - Brand colors
- `src/app/page.tsx` - Landing page route
- `src/components/landing/*` - All landing sections

### Documentation
- [Next.js 16 Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- [OKLCH Color Space](https://oklch.com/)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed history.

---

**Last Reviewed**: 2025-12-23
**Review Schedule**: After each phase completion
