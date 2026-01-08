# Migration Guides

**Purpose:** Step-by-step instructions for migrating from current anti-patterns to best practices.

---

## Table of Contents

1. [Removing Inline Styles](#1-removing-inline-styles)
2. [px → rem Migration](#2-px--rem-migration)
3. [Hard-coded Colors → Tailwind Classes](#3-hard-coded-colors--tailwind-classes)
4. [Consolidating Duplicate Components](#4-consolidating-duplicate-components)
5. [Removing Dark Mode Code](#5-removing-dark-mode-code)

---

## 1. Removing Inline Styles

### Problem

80+ occurrences of `style={{}}` props, primarily for fontFamily:

```typescript
// Example from src/components/landing/hero-section.tsx
<h1
  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
>
```

### Solution

Configure Tailwind to use the font by default, eliminating the need for inline styles.

---

### Step 1: Update Tailwind Config

**Option A:** If you have `tailwind.config.ts`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Option B:** If using Tailwind CSS v4 with @theme:

```css
/* src/app/globals.css */
@theme inline {
  --font-sans: var(--font-plus-jakarta-sans), system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-geist-mono), Menlo, Monaco, monospace;
  /* ... other theme config */
}
```

---

### Step 2: Global Find & Replace

Use your IDE's find-and-replace across the entire project:

**Find (regex):**
```regex
style=\{\{\s*fontFamily:\s*["']var\(--font-plus-jakarta-sans\)["']\s*\}\}
```

**Replace:**
```
(empty string - delete it)
```

**Manual review locations:**

```typescript
// Files with most occurrences:
src/components/landing/contact-form.tsx        // 13 occurrences
src/components/landing/footer.tsx              // 12 occurrences
src/app/(landing)/about/director/page.tsx      // 11 occurrences
src/app/(landing)/about/mission-vision/page.tsx // 6 occurrences
src/components/blog/blog-card.tsx              // 4 occurrences
// + 30 more files
```

---

### Step 3: Remove Remaining Inline Styles

Some files have other inline styles to address:

#### Gradient Backgrounds

**Before:**
```typescript
<button
  style={{
    background: "linear-gradient(88.66deg, var(--brand-blue) 27.51%, var(--brand-green) 115.04%)"
  }}
>
```

**After:**
```typescript
// Add to globals.css first:
@layer utilities {
  .bg-gradient-brand {
    background: linear-gradient(88.66deg, var(--brand-blue) 27.51%, var(--brand-green) 115.04%);
  }
}

// Then use in component:
<button className="bg-gradient-brand">
```

#### Aspect Ratios

**Before:**
```typescript
<div style={{ aspectRatio: "282/168" }}>
```

**After:**
```typescript
// Option 1: Use Tailwind custom aspect ratio
<div className="aspect-product">  // After adding to Tailwind config

// Option 2: Use standard aspect ratio
<div className="aspect-video">  // Closest standard ratio
```

---

### Step 4: Verify

After removal:

```bash
# Check for remaining inline styles
grep -r "style={{" src --include="*.tsx" | grep fontFamily

# Should return 0 results
```

**Expected Results:**
- ✅ 0 inline fontFamily styles
- ✅ All text uses default font
- ✅ No visual regressions
- ✅ Smaller HTML payload

---

## 2. px → rem Migration

### Problem

CSS uses `px` units which break accessibility and don't scale with user font-size preferences.

```css
/* src/app/globals.css - Lines 44-50 */
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-xl: calc(var(--radius) + 4px);
--radius-2xl: calc(var(--radius) + 8px);
--radius-3xl: calc(var(--radius) + 12px);
--radius-4xl: calc(var(--radius) + 16px);
```

### Conversion Table

```
1px   = 0.0625rem
2px   = 0.125rem
4px   = 0.25rem
8px   = 0.5rem
12px  = 0.75rem
16px  = 1rem      (base)
20px  = 1.25rem
24px  = 1.5rem
32px  = 2rem
48px  = 3rem
64px  = 4rem
```

---

### Step 1: Update CSS Variables

**File:** `src/app/globals.css`

**Before (lines 44-50):**
```css
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--radius-2xl: calc(var(--radius) + 8px);
--radius-3xl: calc(var(--radius) + 12px);
--radius-4xl: calc(var(--radius) + 16px);
```

**After:**
```css
--radius-sm: calc(var(--radius) - 0.25rem);   /* -4px */
--radius-md: calc(var(--radius) - 0.125rem);  /* -2px */
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 0.25rem);   /* +4px */
--radius-2xl: calc(var(--radius) + 0.5rem);   /* +8px */
--radius-3xl: calc(var(--radius) + 0.75rem);  /* +12px */
--radius-4xl: calc(var(--radius) + 1rem);     /* +16px */
```

**Already correct (no change needed):**
```css
--radius: 0.625rem;  /* 10px - already in rem! ✅ */
```

---

### Step 2: Update Typography Scale

**Create:** `src/constants/typography.ts`

```typescript
export const typography = {
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  lineHeight: {
    none: '1',
    tight: '1.25',      // 125%
    snug: '1.375',      // 137.5%
    normal: '1.5',      // 150%
    relaxed: '1.625',   // 162.5%
    loose: '1.75',      // 175%
  },

  letterSpacing: {
    tighter: '-0.05em', // -0.8px at 16px
    tight: '-0.025em',  // -0.4px at 16px
    normal: '0',
    wide: '0.025em',    // +0.4px at 16px
    wider: '0.05em',    // +0.8px at 16px
  },
} as const;
```

---

### Step 3: Replace Hard-coded Typography Values

#### Find & Replace Examples:

**Example 1: text-[30px]**

**Before:**
```typescript
<h2 className="font-medium text-[30px] leading-[40px] tracking-[-0.75px]">
```

**After:**
```typescript
<h2 className="font-medium text-3xl leading-tight tracking-tight">
```

**Mapping:**
```
text-[30px] → text-3xl (1.875rem)
leading-[40px] → leading-tight (1.25)
tracking-[-0.75px] → tracking-tight (-0.025em)
```

---

**Example 2: text-[14px]**

**Before:**
```typescript
<label className="font-medium text-[14px] leading-[20px]">
```

**After:**
```typescript
<label className="font-medium text-sm leading-normal">
```

**Mapping:**
```
text-[14px] → text-sm (0.875rem)
leading-[20px] → leading-normal (1.5) at 14px = 21px (close enough)
```

---

**Example 3: Complex heading**

**Before:**
```typescript
<h1
  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
  style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
>
```

**After:**
```typescript
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6">
```

**Changes:**
- Removed inline style ✅
- Adjusted responsive sizes (8xl was too large)
- Added explicit line-height
- Changed tracking from `tight` to `tighter` for large headings

---

### Step 4: Batch Find & Replace

Use these find-replace patterns (test in small batches):

```typescript
// Common replacements:
text-[30px] → text-3xl
text-[24px] → text-2xl
text-[20px] → text-xl
text-[18px] → text-lg
text-[16px] → text-base
text-[14px] → text-sm
text-[12px] → text-xs

leading-[40px] → leading-tight
leading-[28px] → leading-snug
leading-[20px] → leading-normal
leading-[16px] → leading-tight

tracking-[-0.9px] → tracking-tighter
tracking-[-0.75px] → tracking-tight
tracking-[-0.5px] → tracking-tight
tracking-[-0.4px] → tracking-tight
```

**⚠️ Warning:** Always review each replacement. Context matters!

---

### Step 5: Verify Accessibility

Test with browser font size changes:

1. Open Chrome DevTools → Settings → Appearance
2. Set Font Size to "Very Large"
3. Navigate through your site
4. Verify all text scales proportionally

**Expected Behavior:**
- ✅ All text scales with browser font size
- ✅ Layouts remain intact
- ✅ No text overflow
- ✅ Buttons and inputs scale appropriately

---

## 3. Hard-coded Colors → Tailwind Classes

### Problem

Colors hard-coded in 110+ locations:
- `#18181b` (primary black) - 60+ times
- `#71717a` (muted gray) - 50+ times
- `#f9f9fb` (card background) - 30+ times

### Solution

Use semantic Tailwind classes from design system.

---

### Color Mapping

```typescript
// Semantic color mapping
#18181b → text-primary (or text-zinc-900)
#71717a → text-secondary (or text-zinc-500 / text-muted-foreground)
#a1a1aa → text-tertiary (or text-zinc-400)
#fafafa → text-white (or text-zinc-50)

// Backgrounds
#ffffff → bg-background (or bg-white)
#f9f9fb → bg-secondary (or bg-zinc-50)
#f4f4f5 → bg-muted (or bg-zinc-100)

// Borders
#e4e4e7 → border-border (or border-zinc-200)
#0D9488 → border-teal-600
```

---

### Step 1: Global Find & Replace

**Pattern 1: Text Colors**

**Find:**
```regex
text-\[#18181b\]
```

**Replace:**
```
text-primary
```

**Files affected:** 60+ files

---

**Pattern 2: Muted Text**

**Find:**
```regex
text-\[#71717a\]
```

**Replace:**
```
text-secondary
```

**Files affected:** 50+ files

---

**Pattern 3: Background Colors**

**Find:**
```regex
bg-\[#f9f9fb\]
```

**Replace:**
```
bg-secondary
```

**Files affected:** 30+ files

---

### Step 2: Replace Inline Color Styles

**Before:**
```typescript
<span style={{ color: '#18181b' }}>Text</span>
```

**After:**
```typescript
<span className="text-primary">Text</span>
```

---

### Step 3: Replace Gradient Backgrounds

**Before:**
```typescript
<div
  style={{
    backgroundImage: "linear-gradient(91.22deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%)"
  }}
>
```

**After (Method 1 - Utility class):**
```typescript
// First, add to globals.css:
@layer utilities {
  .bg-gradient-brand-subtle {
    background: linear-gradient(91.22deg, rgba(42, 94, 152, 0.1) 15.88%, rgba(24, 183, 90, 0.1) 115.02%);
  }
}

// Then use:
<div className="bg-gradient-brand-subtle">
```

**After (Method 2 - Tailwind gradients):**
```typescript
<div className="bg-gradient-to-r from-brand-blue/10 to-brand-green/10">
```

---

### Step 4: Update Focus Ring Colors

**Before:**
```typescript
className="focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
```

**After:**
```typescript
className="focus:outline-none focus:ring-2 focus:ring-teal-600"
```

---

### Step 5: Verification

```bash
# Check for remaining hard-coded colors
grep -r "text-\[#" src --include="*.tsx"
grep -r "bg-\[#" src --include="*.tsx"
grep -r "border-\[#" src --include="*.tsx"

# Should return 0 results
```

---

## 4. Consolidating Duplicate Components

### Problem

Multiple implementations of the same component type:
- **3 Product Card implementations**
- **2 Blog Card implementations**
- **2 Button implementations**

### Strategy

Keep the most feature-complete version, delete others, update imports.

---

### Example: Product Card Consolidation

#### Step 1: Analysis

**Version 1:** `src/components/landing/product-card.tsx`
- ❌ Simple, limited props
- ❌ Inline gradient style
- ❌ No variants

**Version 2:** `src/components/global/products/product-card.tsx`
- ✅ Feature-complete with variants
- ✅ Sanity types integrated
- ✅ Features, price, brochure download
- ⭐ **KEEP THIS ONE**

**Version 3:** Hard-coded in `src/app/(landing)/about/page.tsx`
- ❌ One-off implementation
- ❌ Hard-coded data
- ❌ Should use proper component

**Decision:** Keep Version 2, delete Versions 1 & 3

---

#### Step 2: Audit Usage

Find all imports of Version 1:

```bash
grep -r "from.*landing/product-card" src --include="*.tsx"
```

**Results:**
```
src/components/landing/products-grid.tsx:3:import { ProductCard } from "./product-card";
```

Only 1 file uses it. Easy to migrate!

---

#### Step 3: Migrate Usage

**Before:** `src/components/landing/products-grid.tsx`
```typescript
import { ProductCard } from "./product-card";

{products.map((product) => (
  <ProductCard
    key={product._id}
    title={product.title}
    description={product.description}
    imageUrl={imageUrl}
    imageAlt={product.title}
    onViewDetails={() => router.push(`/products/${product.slug.current}`)}
  />
))}
```

**After:**
```typescript
import { ProductCard } from "@/components/global/products/product-card";

{products.map((product) => (
  <ProductCard
    key={product._id}
    product={product}
    variant="default"
    showPrice={true}
    showFeatures={true}
  />
))}
```

---

#### Step 4: Delete Old Files

```bash
rm src/components/landing/product-card.tsx
```

**Verify no broken imports:**
```bash
bun run build
# Should succeed with no errors
```

---

#### Step 5: Refactor Hard-coded Version

**Before:** `src/app/(landing)/about/page.tsx:216-250`
```typescript
{products.map((product) => (
  <div key={product.id} className="flex flex-col gap-4 rounded-2xl bg-background p-4">
    {/* 35 lines of JSX */}
  </div>
))}
```

**After:**
```typescript
import { ProductCard } from "@/components/global/products/product-card";

{products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    variant="compact"
    showPrice={false}
    showFeatures={false}
  />
))}
```

**Delete hard-coded products array:**
- Move to `/src/lib/demo-data/products.ts` if needed
- Or fetch from Sanity CMS

---

### Consolidation Checklist

For each duplicate component:

- [ ] Identify all versions
- [ ] Choose version to keep (most features, best architecture)
- [ ] Find all usages of other versions
- [ ] Migrate imports and props
- [ ] Test each migration
- [ ] Delete old files
- [ ] Run build to verify
- [ ] Update documentation

---

## 5. Removing Dark Mode Code

### Problem

Dark mode CSS and component logic exists despite being light-mode-only project.

**Files Affected:**
- `src/app/globals.css` (lines 94-132)
- `src/components/ui/button.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/select.tsx`
- `src/components/blog/blog-post-detail.tsx`
- `src/components/global/blog/portable-text.tsx`
- `src/components/global/mode-toggle.tsx` (entire file)

---

### Step 1: Delete Dark Mode CSS

**File:** `src/app/globals.css`

**Delete lines 94-132:**

```css
/* DELETE THIS ENTIRE BLOCK */
.dark {
  --background: oklch(0.200 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... 39 lines total */
  --brand-blue: oklch(0.55 0.12 250);
  --brand-green: oklch(0.7 0.18 150);
}
```

**Verify:**
```bash
# Check globals.css line count
wc -l src/app/globals.css
# Should be 39 lines shorter
```

---

### Step 2: Remove Dark Mode Classes

**Find (regex across all files):**
```regex
dark:[a-zA-Z-]+:[a-zA-Z-/0-9.()]+
```

**Examples to remove:**

```typescript
// In src/components/ui/button.tsx
// REMOVE all instances of:
dark:aria-invalid:ring-destructive/40
dark:bg-destructive/60
dark:bg-input/30
dark:border-input
dark:hover:bg-input/50
dark:hover:bg-accent/50

// In prose components
// REMOVE:
dark:prose-invert
```

**Specific files to update:**

1. **src/components/ui/button.tsx (line 8)**
   ```typescript
   // Before:
   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"

   // After:
   "aria-invalid:ring-destructive/20"
   ```

2. **src/components/ui/button.tsx (line 14)**
   ```typescript
   // Before:
   "focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"

   // After:
   "focus-visible:ring-destructive/20"
   ```

3. **src/components/ui/button.tsx (line 16)**
   ```typescript
   // Before:
   "dark:bg-input/30 dark:border-input dark:hover:bg-input/50"

   // After:
   "" // Remove entirely, light mode handles this
   ```

4. **src/components/blog/blog-post-detail.tsx**
   ```typescript
   // Before:
   className="prose prose-lg max-w-none dark:prose-invert"

   // After:
   className="prose prose-lg max-w-none"
   ```

5. **src/components/global/blog/portable-text.tsx**
   ```typescript
   // Before:
   <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>

   // After:
   <div className={`prose prose-lg max-w-none ${className}`}>
   ```

---

### Step 3: Delete Mode Toggle Component

```bash
rm src/components/global/mode-toggle.tsx
```

**Verify it's not imported anywhere:**
```bash
grep -r "mode-toggle" src --include="*.tsx"
# Should return no results
```

---

### Step 4: Update Theme Provider (if needed)

**File:** `src/lib/theme-provider.tsx`

**Before:**
```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="light"
  enableSystem
  disableTransitionOnChange
>
```

**After:**
```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="light"
  enableSystem={false}  // Disable system theme detection
  forcedTheme="light"   // Force light mode always
  disableTransitionOnChange
>
```

**Or better - remove theme provider entirely if only light mode:**

```typescript
// src/app/layout.tsx
// Remove ThemeProvider wrapper if not needed
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}  {/* No ThemeProvider wrapper */}
      </body>
    </html>
  );
}
```

---

### Step 5: Verification

**Manual checks:**
1. ✅ No `.dark` class in globals.css
2. ✅ No `dark:` prefixes in components
3. ✅ No mode-toggle component
4. ✅ Theme provider set to light only or removed
5. ✅ All pages render correctly

**Automated checks:**
```bash
# Check for remaining dark mode code
grep -r "\.dark {" src
grep -r "dark:" src --include="*.tsx" --include="*.css"
grep -r "mode-toggle" src

# All should return 0 results
```

**Build check:**
```bash
bun run build
# Should succeed with no errors
```

**Bundle size check:**
```bash
bun run build
# Note the bundle size, should be slightly smaller
```

---

## Migration Checklist

After completing all migrations:

### Inline Styles
- [ ] All `style={{ fontFamily }}` removed
- [ ] Gradient utilities added to globals.css
- [ ] No inline color styles remain
- [ ] Font configured in Tailwind

### px → rem
- [ ] CSS variables updated to rem
- [ ] Typography scale created
- [ ] All text-[Xpx] replaced with Tailwind classes
- [ ] All leading-[Xpx] replaced
- [ ] All tracking-[Xpx] replaced
- [ ] Accessibility tested with large fonts

### Hard-coded Colors
- [ ] All #18181b replaced with text-primary
- [ ] All #71717a replaced with text-secondary
- [ ] All #f9f9fb replaced with bg-secondary
- [ ] Gradient utilities created
- [ ] No hex values in className
- [ ] No color values in style props

### Component Consolidation
- [ ] Product cards consolidated to 1 version
- [ ] Blog cards consolidated to 1 version
- [ ] Old component files deleted
- [ ] All imports updated
- [ ] Build succeeds
- [ ] No visual regressions

### Dark Mode Removal
- [ ] Dark mode CSS deleted from globals.css
- [ ] All dark: classes removed
- [ ] mode-toggle.tsx deleted
- [ ] Theme provider updated or removed
- [ ] Build succeeds
- [ ] Bundle size reduced

---

## Rollback Plan

If something goes wrong:

1. **Git reset to previous commit:**
   ```bash
   git reset --hard HEAD~1
   ```

2. **Cherry-pick successful changes:**
   ```bash
   git cherry-pick <commit-hash>
   ```

3. **Staged rollback:**
   - Do migrations in feature branches
   - Merge one migration at a time
   - Test thoroughly after each merge

---

## Success Metrics

After all migrations:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Inline styles | 80+ | 0 | 100% |
| Hard-coded colors | 110+ | 0 | 100% |
| Duplicate components | 10+ | 0 | 100% |
| Dark mode code | 200+ lines | 0 | 100% |
| Accessibility | 7/10 | 9/10 | +29% |
| Bundle size | Baseline | -2-3% | Smaller |
| Maintainability | 5/10 | 9/10 | +80% |

---

**Total Migration Time: 10-12 hours**

**Recommendation:** Do migrations in order listed, test after each step.
