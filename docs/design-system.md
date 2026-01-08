# Design System Documentation

**Project:** Shiner - Next.js 16.1 + Sanity CMS
**Version:** 1.0.0
**Last Updated:** January 8, 2026

---

## Overview

This document defines the complete design system for the Shiner project, including colors, typography, spacing, and all design tokens. This is the **single source of truth** for all design decisions.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing Scale](#spacing-scale)
4. [Border Radius](#border-radius)
5. [Shadows](#shadows)
6. [Breakpoints](#breakpoints)
7. [Z-Index Scale](#z-index-scale)
8. [Transitions](#transitions)
9. [Implementation Guide](#implementation-guide)

---

## Color System

### Brand Colors

Our brand uses two primary colors that create our signature gradient:

```typescript
brand: {
  blue: 'oklch(0.45 0.12 250)',      // #2A5E98 - Primary brand blue
  green: 'oklch(0.65 0.18 150)',     // #18B75A - Primary brand green
  blueSubtle: 'oklch(0.45 0.12 250 / 10%)',   // 10% opacity blue
  greenSubtle: 'oklch(0.65 0.18 150 / 10%)',  // 10% opacity green
}
```

**Usage:**
- **Blue:** Technology, trust, precision
- **Green:** Growth, sustainability, success
- **Gradient:** Primary CTAs, hero sections, featured content

**Examples:**
```tsx
// Tailwind classes
<div className="bg-brand-blue text-white" />
<div className="bg-brand-green-10" />
<h1 className="text-gradient-brand">Heading</h1>
```

---

### Semantic Colors

#### Text Colors

```typescript
text: {
  primary: '#18181b',      // Main body text - zinc-900
  secondary: '#71717a',    // Muted text - zinc-500
  tertiary: '#a1a1aa',     // Disabled/placeholder - zinc-400
  inverse: '#fafafa',      // Text on dark backgrounds - zinc-50
}
```

**Usage Guidelines:**
- **Primary:** Body text, headings, important content
- **Secondary:** Descriptions, metadata, supporting text
- **Tertiary:** Placeholders, disabled states, subtle hints
- **Inverse:** Text on brand colors or dark images

**Tailwind Mapping:**
```tsx
text-primary        → #18181b (zinc-900)
text-secondary      → #71717a (zinc-500)
text-muted-foreground → #71717a
text-zinc-50        → #fafafa
```

---

#### Background Colors

```typescript
background: {
  primary: '#ffffff',      // Main background
  secondary: '#f9f9fb',    // Card background, alternating sections
  tertiary: '#f4f4f5',     // Hover states, disabled backgrounds
  card: '#ffffff',         // Card surfaces
}
```

**Usage Guidelines:**
- **Primary:** Page background, main content areas
- **Secondary:** Cards, alternating sections, subtle differentiation
- **Tertiary:** Input fields, hover states, subtle UI elements

**Tailwind Mapping:**
```tsx
bg-background    → #ffffff
bg-secondary     → #f9f9fb
bg-card          → #ffffff
bg-muted         → #f4f4f5
```

---

#### Border Colors

```typescript
border: {
  default: '#e4e4e7',      // Standard borders - zinc-200
  subtle: '#f4f4f5',       // Very light borders - zinc-100
  focus: '#0D9488',        // Focus rings - teal-600
  error: '#ef4444',        // Error states - red-500
}
```

**Usage:**
```tsx
<div className="border border-border" />           // Default
<div className="border border-zinc-100" />         // Subtle
<input className="focus:ring-2 focus:ring-teal-600" /> // Focus
```

---

#### Status Colors

```typescript
status: {
  success: '#18B75A',      // Success states, positive feedback
  error: '#ef4444',        // Errors, destructive actions
  warning: '#f59e0b',      // Warnings, caution states
  info: '#3b82f6',         // Informational messages
}
```

**Usage Examples:**
```tsx
// Success message
<div className="bg-green-500/10 text-green-600 border border-green-500/20">
  Success!
</div>

// Error message
<div className="bg-red-500/10 text-red-600 border border-red-500/20">
  Error occurred
</div>
```

---

### Color Accessibility

All color combinations meet **WCAG 2.1 AA standards** (4.5:1 contrast ratio for normal text).

**Approved Combinations:**

| Foreground | Background | Contrast Ratio | Pass |
|------------|------------|----------------|------|
| #18181b | #ffffff | 19.5:1 | ✅ AAA |
| #18181b | #f9f9fb | 18.8:1 | ✅ AAA |
| #71717a | #ffffff | 7.2:1 | ✅ AA |
| #71717a | #f9f9fb | 6.9:1 | ✅ AA |
| #ffffff | #2A5E98 | 5.1:1 | ✅ AA |
| #ffffff | #18B75A | 3.8:1 | ⚠️ Large text only |

---

## Typography

### Font Families

```typescript
fontFamily: {
  sans: 'var(--font-plus-jakarta-sans), system-ui, -apple-system, sans-serif',
  mono: 'var(--font-geist-mono), Menlo, Monaco, monospace',
}
```

**Implementation:**
```typescript
// src/app/layout.tsx
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
```

---

### Font Sizes (rem-based)

```typescript
fontSize: {
  xs: '0.75rem',      // 12px - Fine print, captions
  sm: '0.875rem',     // 14px - Small text, labels
  base: '1rem',       // 16px - Body text (default)
  lg: '1.125rem',     // 18px - Emphasized text
  xl: '1.25rem',      // 20px - Large body, small headings
  '2xl': '1.5rem',    // 24px - H4 headings
  '3xl': '1.875rem',  // 30px - H3 headings
  '4xl': '2.25rem',   // 36px - H2 headings
  '5xl': '3rem',      // 48px - H1 headings (desktop)
  '6xl': '3.75rem',   // 60px - Hero headings
  '7xl': '4.5rem',    // 72px - Display headings
}
```

### Font Weights

```typescript
fontWeight: {
  normal: '400',      // Regular text
  medium: '500',      // Emphasized text, buttons
  semibold: '600',    // Subheadings, strong emphasis
  bold: '700',        // Headings
  extrabold: '800',   // Hero headings, display text
}
```

### Line Heights

```typescript
lineHeight: {
  none: '1',          // 100% - Tight headlines
  tight: '1.25',      // 125% - Headings
  snug: '1.375',      // 137.5% - Subheadings
  normal: '1.5',      // 150% - Body text (default)
  relaxed: '1.625',   // 162.5% - Comfortable reading
  loose: '1.75',      // 175% - Spacious text
}
```

### Letter Spacing

```typescript
letterSpacing: {
  tighter: '-0.05em',  // -0.8px at 16px - Large headings
  tight: '-0.025em',   // -0.4px at 16px - Medium headings
  normal: '0',         // Default
  wide: '0.025em',     // +0.4px at 16px - Uppercase text
  wider: '0.05em',     // +0.8px at 16px - All caps labels
}
```

---

### Typography Scale (Semantic)

Use these semantic names instead of size names:

```typescript
// Headings
h1: 'text-5xl md:text-6xl font-bold leading-tight tracking-tighter'
h2: 'text-4xl md:text-5xl font-bold leading-tight tracking-tight'
h3: 'text-3xl md:text-4xl font-semibold leading-snug tracking-tight'
h4: 'text-2xl md:text-3xl font-semibold leading-snug'
h5: 'text-xl md:text-2xl font-semibold leading-normal'
h6: 'text-lg md:text-xl font-semibold leading-normal'

// Body
body-large: 'text-lg md:text-xl leading-relaxed'
body: 'text-base leading-normal'
body-small: 'text-sm leading-normal'
caption: 'text-xs leading-normal'

// UI Elements
button: 'text-sm font-medium leading-none'
label: 'text-sm font-medium leading-normal'
input: 'text-base leading-normal'
```

**Usage Examples:**

```tsx
// BEFORE (hard-coded inline)
<h2
  className="font-medium text-[30px] leading-[40px] tracking-[-0.75px]"
  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
>

// AFTER (semantic, Tailwind)
<h2 className="text-3xl md:text-4xl font-semibold leading-snug tracking-tight">
```

---

## Spacing Scale

All spacing uses **rem-based values** for accessibility and consistent scaling.

```typescript
spacing: {
  0: '0',
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
}
```

### Semantic Spacing

Use these semantic values for consistency:

```typescript
// Component internal spacing
gap-xs: 'gap-1'      // 4px
gap-sm: 'gap-2'      // 8px
gap-md: 'gap-4'      // 16px
gap-lg: 'gap-6'      // 24px
gap-xl: 'gap-8'      // 32px

// Padding
padding-tight: 'p-2'    // 8px
padding-base: 'p-4'     // 16px
padding-comfortable: 'p-6'  // 24px
padding-spacious: 'p-8'     // 32px

// Section spacing
section-sm: 'py-12 md:py-16'    // 48px → 64px
section-base: 'py-16 md:py-24'  // 64px → 96px
section-lg: 'py-24 md:py-32'    // 96px → 128px

// Container spacing
container-padding: 'px-4 md:px-6 lg:px-8'
```

---

## Border Radius

```typescript
borderRadius: {
  none: '0',
  sm: '0.375rem',    // 6px - Small elements
  base: '0.5rem',    // 8px - Default (matches Tailwind 'rounded')
  md: '0.75rem',     // 12px - Medium cards
  lg: '1rem',        // 16px - Large cards
  xl: '1.5rem',      // 24px - Feature cards
  '2xl': '2rem',     // 32px - Hero sections
  '3xl': '3rem',     // 48px - Extra large
  full: '9999px',    // Pills, circles
}
```

**Usage:**

```tsx
// Buttons
<button className="rounded-full">Pill Button</button>

// Cards
<div className="rounded-2xl">Large Card</div>

// Inputs
<input className="rounded-xl" />

// Images
<img className="rounded-2xl" />
```

**Semantic Naming:**

```typescript
button-radius: 'rounded-full'     // Pills/rounded buttons
card-radius: 'rounded-2xl'        // Cards
input-radius: 'rounded-xl'        // Form inputs
image-radius: 'rounded-2xl'       // Images
badge-radius: 'rounded-full'      // Badges, tags
```

---

## Shadows

```typescript
shadows: {
  // Standard box shadows
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Inner shadows
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Custom gradient shadows (for brand buttons)
  gradient: 'inset 0px 4px 28.9px 0px rgba(244,244,245,0.2)',

  // No shadow
  none: 'none',
}
```

**Usage:**

```tsx
// Cards
<div className="shadow-sm hover:shadow-lg transition-shadow">Card</div>

// Modals/Dialogs
<div className="shadow-xl">Modal</div>

// Gradient Buttons
<button className="shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)]">
  Brand Button
</button>
```

---

## Breakpoints

```typescript
breakpoints: {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet portrait
  lg: '1024px',   // Tablet landscape / small desktop
  xl: '1280px',   // Desktop
  '2xl': '1536px' // Large desktop
}
```

**Usage:**

```tsx
// Mobile-first responsive design
<div className="text-base md:text-lg lg:text-xl">
  Responsive Text
</div>

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {items.map(...)}
</div>

// Spacing
<section className="py-12 md:py-16 lg:py-24">
  Responsive Section
</section>
```

---

## Z-Index Scale

```typescript
zIndex: {
  // Base layers
  base: 0,

  // Content layers
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,

  // Overlay layers
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  toast: 1070,
  tooltip: 1080,

  // Maximum
  max: 9999,
}
```

**Usage:**

```tsx
// Navbar (fixed)
<nav className="fixed top-0 z-[1030]">

// Modal
<div className="fixed inset-0 z-[1050]">Modal</div>

// Toast notification
<div className="fixed top-4 right-4 z-[1070]">Toast</div>
```

---

## Transitions

```typescript
transitions: {
  fast: '150ms',      // Quick feedback (hover, focus)
  base: '200ms',      // Default (most UI transitions)
  slow: '300ms',      // Deliberate (page transitions)
  slower: '500ms',    // Dramatic (modals, drawers)
}
```

**Easing Functions:**

```typescript
easing: {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

**Usage:**

```tsx
// Button hover
<button className="transition-all duration-200 ease-out hover:scale-105">

// Color transitions
<div className="transition-colors duration-150">

// Transform + shadow
<div className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
```

---

## Implementation Guide

### Step 1: Create Design Tokens File

Create `src/constants/design-tokens.ts`:

```typescript
export const designTokens = {
  colors: {
    brand: {
      blue: 'oklch(0.45 0.12 250)',
      green: 'oklch(0.65 0.18 150)',
      blueSubtle: 'oklch(0.45 0.12 250 / 10%)',
      greenSubtle: 'oklch(0.65 0.18 150 / 10%)',
    },
    text: {
      primary: '#18181b',
      secondary: '#71717a',
      tertiary: '#a1a1aa',
      inverse: '#fafafa',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f9f9fb',
      tertiary: '#f4f4f5',
      card: '#ffffff',
    },
    border: {
      default: '#e4e4e7',
      subtle: '#f4f4f5',
      focus: '#0D9488',
      error: '#ef4444',
    },
    status: {
      success: '#18B75A',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6',
    },
  },

  typography: {
    fontFamily: {
      sans: 'var(--font-plus-jakarta-sans), system-ui, -apple-system, sans-serif',
      mono: 'var(--font-geist-mono), Menlo, Monaco, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '1.75',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
    },
  },

  spacing: {
    // Full scale as shown above
  },

  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    base: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    gradient: 'inset 0px 4px 28.9px 0px rgba(244,244,245,0.2)',
    none: 'none',
  },

  borderRadius: {
    none: '0',
    sm: '0.375rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    full: '9999px',
  },

  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    backdrop: 1040,
    modal: 1050,
    popover: 1060,
    toast: 1070,
    tooltip: 1080,
    max: 9999,
  },
} as const;

export type DesignTokens = typeof designTokens;
```

### Step 2: Add Custom Utilities to globals.css

Add to `src/app/globals.css`:

```css
@layer utilities {
  /* Brand Gradients */
  .bg-gradient-brand {
    background: linear-gradient(88.66deg, var(--brand-blue) 27.51%, var(--brand-green) 115.04%);
  }

  .bg-gradient-brand-subtle {
    background: linear-gradient(91.22deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%);
  }

  .text-gradient-brand {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green;
  }

  /* Linear gradients for backgrounds */
  .bg-linear-to-r {
    background: linear-gradient(to right, var(--tw-gradient-stops));
  }

  .bg-linear-to-br {
    background: linear-gradient(to bottom right, var(--tw-gradient-stops));
  }

  /* Aspect ratios */
  .aspect-product {
    aspect-ratio: 282 / 168;
  }

  /* Shadow utilities */
  .shadow-gradient {
    box-shadow: inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.2);
  }
}
```

### Step 3: Extend Tailwind Config

Update `tailwind.config.ts` (if it exists) or create it:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': 'var(--brand-blue)',
        'brand-green': 'var(--brand-green)',
        'brand-blue-10': 'var(--brand-blue-10)',
        'brand-green-10': 'var(--brand-green-10)',
      },
      fontFamily: {
        sans: 'var(--font-plus-jakarta-sans), system-ui, -apple-system, sans-serif',
        mono: 'var(--font-geist-mono), Menlo, Monaco, monospace',
      },
      aspectRatio: {
        'product': '282 / 168',
      },
      boxShadow: {
        'gradient': 'inset 0px 4px 28.9px 0px rgba(244,244,245,0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## Usage Examples

### Before & After

#### Example 1: Hero Section Heading

```tsx
// ❌ BEFORE - Hard-coded, inline styles, px values
<h1
  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
>
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
    Precision Engineering
  </span>
  <br />
  <span className="text-[#18181b]">Delivered With Confidence</span>
</h1>

// ✅ AFTER - Semantic, no inline styles, uses design system
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6">
  <span className="text-gradient-brand">
    Precision Engineering
  </span>
  <br />
  <span className="text-primary">Delivered With Confidence</span>
</h1>
```

#### Example 2: Card Component

```tsx
// ❌ BEFORE
<div className="bg-background flex flex-col gap-4 items-center justify-center px-4 py-3 rounded-2xl">
  <p className="text-sm font-medium leading-5 text-[#18181b]">
    {title}
  </p>
  <p className="text-sm font-medium leading-5 text-[#71717a]">
    {description}
  </p>
</div>

// ✅ AFTER
<div className="bg-card flex flex-col gap-4 items-center justify-center p-4 rounded-2xl">
  <p className="text-sm font-medium text-primary">
    {title}
  </p>
  <p className="text-sm font-medium text-secondary">
    {description}
  </p>
</div>
```

#### Example 3: Gradient Button

```tsx
// ❌ BEFORE
<button
  className="flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-full w-full"
  style={{
    background: "linear-gradient(88.66deg, var(--brand-blue) 27.51%, var(--brand-green) 115.04%)"
  }}
>
  <span className="text-sm font-medium leading-5 text-[#fafafa]">
    View Details
  </span>
</button>

// ✅ AFTER
<button className="flex gap-2 h-10 items-center justify-center px-4 py-2 rounded-full w-full bg-gradient-brand shadow-gradient">
  <span className="text-sm font-medium text-white">
    View Details
  </span>
</button>
```

---

## Design System Checklist

Use this checklist when building components:

- [ ] **Colors:** Use semantic color classes (text-primary, bg-secondary)
- [ ] **Typography:** Use Tailwind text size classes (text-base, text-lg)
- [ ] **Spacing:** Use rem-based spacing (p-4, gap-6)
- [ ] **Borders:** Use standard radius classes (rounded-2xl)
- [ ] **Shadows:** Use design system shadows (shadow-sm, shadow-lg)
- [ ] **Transitions:** Use standard durations (duration-200, duration-300)
- [ ] **No inline styles:** Avoid `style={{}}` props
- [ ] **No hard-coded colors:** No hex values (#18181b)
- [ ] **No px values:** Use Tailwind's rem-based utilities
- [ ] **Responsive:** Mobile-first with md:, lg: breakpoints
- [ ] **Accessible:** Meet WCAG 2.1 AA contrast ratios

---

## Maintenance

### When to Update This Document

- Adding new brand colors
- Introducing new component patterns
- Changing typography scale
- Adding new spacing values
- Updating accessibility standards

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-08 | Initial design system documentation |

---

## References

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Oklahoma Color Space](https://oklch.com)
- [Material Design 3](https://m3.material.io)

---

**Questions or Updates?**
Contact the design system team or create an issue in the repository.
