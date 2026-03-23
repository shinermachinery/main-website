# Accessibility Checklist

**Goal:** Achieve WCAG 2.1 Level AA compliance (minimum 4.5:1 contrast ratio for normal text).

**Current Score:** 7/10
**Target Score:** 9/10

---

## Table of Contents

1. [Quick Wins](#quick-wins)
2. [Keyboard Navigation](#keyboard-navigation)
3. [Screen Reader Support](#screen-reader-support)
4. [Color & Contrast](#color--contrast)
5. [Forms & Inputs](#forms--inputs)
6. [Images & Media](#images--media)
7. [Focus Management](#focus-management)
8. [ARIA Attributes](#aria-attributes)
9. [Testing Tools](#testing-tools)
10. [Implementation Guide](#implementation-guide)

---

## Quick Wins

Easy fixes with high impact:

### 1. Add Skip to Content Link

**Priority:** 🔴 High
**Time:** 15 minutes
**Impact:** Essential for keyboard users

**Implementation:**

```typescript
// src/components/global/navbar.tsx
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-sm">
      {/* Skip Link - ACCESSIBLE ONLY ON FOCUS */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded focus:outline focus:outline-2 focus:outline-offset-2"
      >
        Skip to main content
      </a>

      {/* Rest of navbar */}
    </nav>
  );
}

// src/app/(landing)/layout.tsx
export default function LandingLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-5">  {/* Add ID here */}
        {children}
      </main>
      <Footer />
    </>
  );
}
```

**Test:**
- Press Tab on page load
- Skip link should appear
- Pressing Enter should jump to main content

---

### 2. Fix Focus Indicators

**Priority:** 🔴 High
**Time:** 30 minutes
**Impact:** Keyboard navigation visibility

**Problem:**
```typescript
// src/components/landing/contact-form.tsx:87
className="focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
```

`outline-none` removes native focus, custom ring might not be visible enough.

**Solution:**

```typescript
// OPTION 1: Keep outline, add ring
className="focus:outline-2 focus:outline-offset-2 focus:outline-brand-blue focus:ring-2 focus:ring-brand-blue/20"

// OPTION 2: Prominent ring only (if outline conflicts with design)
className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"

// OPTION 3: Standard Tailwind focus (recommended)
className="focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
```

**Apply to:**
- All form inputs (contact-form.tsx)
- All buttons
- All interactive elements

---

### 3. Add ARIA Live Regions

**Priority:** 🟡 Medium
**Time:** 20 minutes
**Impact:** Screen reader feedback for dynamic content

**Problem:** Form submission feedback not announced to screen readers.

**Solution:**

```typescript
// src/components/landing/contact-form.tsx:163
{responseMessage.type && (
  <div
    role="alert"          // ⭐ ADD THIS
    aria-live="polite"    // ⭐ ADD THIS
    aria-atomic="true"    // ⭐ ADD THIS
    className={`flex items-center gap-3 p-4 rounded-xl ${
      responseMessage.type === "success"
        ? "bg-[#18B75A]/10 text-[#18B75A] border border-[#18B75A]/20"
        : "bg-red-500/10 text-red-500 border border-red-500/20"
    }`}
  >
    {/* ... */}
  </div>
)}
```

**ARIA Live Region Types:**
- `polite` - Announces when screen reader is idle (forms, notifications)
- `assertive` - Interrupts immediately (errors, critical alerts)
- `off` - No announcement (default)

---

### 4. Add Image Loading Strategy

**Priority:** 🟡 Medium
**Time:** 15 minutes
**Impact:** Performance + accessibility

**Problem:** All images eager-loaded.

**Solution:**

```typescript
// Update all Image components
<Image
  src={imageUrl}
  alt={alt}
  fill
  loading={isPriority ? "eager" : "lazy"}  // ⭐ ADD THIS
  priority={isPriority}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

**Rules:**
- Hero images: `loading="eager"` + `priority={true}`
- Above-the-fold: `loading="eager"`
- Below-the-fold: `loading="lazy"`

---

## Keyboard Navigation

### Current Issues

1. ❌ Popovers only work with mouse hover (About Us dropdown)
2. ❌ No Escape key handling in dropdowns
3. ❌ Tab order might be illogical in mobile menu
4. ❌ No focus trap in modals (if any)

### Implementation

#### 1. Keyboard-Accessible Popovers

**File:** `src/components/global/navbar.tsx:112-155`

**Before:**
```typescript
<PopoverTrigger
  asChild
  onMouseEnter={() => setAboutPopoverOpen(true)}
  onMouseLeave={() => setAboutPopoverOpen(false)}
>
```

**After:**
```typescript
<PopoverTrigger
  asChild
  onMouseEnter={() => setAboutPopoverOpen(true)}
  onMouseLeave={() => setAboutPopoverOpen(false)}
  onFocus={() => setAboutPopoverOpen(true)}        // ⭐ ADD
  onBlur={(e) => {                                   // ⭐ ADD
    // Only close if focus moves outside popover content
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setAboutPopoverOpen(false);
    }
  }}
  onKeyDown={(e) => {                                // ⭐ ADD
    if (e.key === 'Escape') {
      setAboutPopoverOpen(false);
      e.currentTarget.focus(); // Return focus to trigger
    }
  }}
>
```

**Also add to PopoverContent:**
```typescript
<PopoverContent
  align="end"
  side="bottom"
  sideOffset={8}
  className="p-2 w-64"
  onMouseEnter={() => setAboutPopoverOpen(true)}
  onMouseLeave={() => setAboutPopoverOpen(false)}
  onKeyDown={(e) => {                                // ⭐ ADD
    if (e.key === 'Escape') {
      setAboutPopoverOpen(false);
    }
  }}
>
```

---

#### 2. Logical Tab Order

Ensure tab order follows visual layout:

```typescript
// Use tabIndex only when necessary
<button tabIndex={0}>Default order</button>
<div tabIndex={-1}>Not keyboard accessible</div>

// Avoid tabIndex > 0 (breaks natural order)
<button tabIndex={1}>❌ DON'T DO THIS</button>
```

**Verification:**
- Tab through entire page
- Order should be: header → main nav → content → footer
- No surprises or jumps

---

#### 3. Keyboard Shortcuts

**Optional:** Add keyboard shortcuts for power users:

```typescript
// src/hooks/use-keyboard-shortcuts.ts
import { useEffect } from 'react';

export function useKeyboardShortcuts() {
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      // Cmd/Ctrl + K = Search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Open search modal
      }

      // Cmd/Ctrl + / = Help
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        // Show keyboard shortcuts modal
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}
```

---

## Screen Reader Support

### Semantic HTML

**Good ✅:**
```tsx
<nav>         // Navigation landmarks
<main>        // Main content landmark
<section>     // Content sections
<article>     // Independent content
<header>      // Page/section header
<footer>      // Page/section footer
<aside>       // Complementary content
<button>      // Interactive buttons
<a>           // Links
```

**Current Status:** ✅ Already using semantic HTML well!

---

### ARIA Labels

**Add descriptive labels to icon-only buttons:**

**Before:**
```tsx
<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
```

**After:**
```tsx
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}  // ⭐ ADD
  aria-expanded={mobileMenuOpen}                            // ⭐ ADD
  aria-controls="mobile-menu"                               // ⭐ ADD
>
  {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
</button>

{mobileMenuOpen && (
  <div id="mobile-menu" role="navigation" aria-label="Mobile navigation">  // ⭐ ADD
    {/* menu content */}
  </div>
)}
```

---

### ARIA Landmarks

**Add explicit landmarks:**

```tsx
// Navigation
<nav aria-label="Main navigation">

// Complementary content
<aside aria-label="Sidebar">

// Search
<form role="search" aria-label="Site search">

// Breadcrumbs
<nav aria-label="Breadcrumb">
```

---

### Screen Reader Only Text

**Add context for screen readers:**

```tsx
// External links
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit our partner
  <span className="sr-only"> (opens in new tab)</span>
</a>

// Icon buttons
<button aria-label="Download brochure">
  <Download className="w-4 h-4" aria-hidden="true" />
  <span className="sr-only">Download brochure</span>
</button>

// Decorative images
<img src="/decoration.svg" alt="" role="presentation" />
```

**sr-only utility (already in Tailwind):**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus:not-sr-only:focus {
  /* Reveal on focus */
}
```

---

## Color & Contrast

### WCAG 2.1 Requirements

**Level AA (minimum):**
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio
- UI components: 3:1 contrast ratio

**Level AAA (enhanced):**
- Normal text: 7:1
- Large text: 4.5:1

---

### Current Color Combinations

| Foreground | Background | Ratio | WCAG Level |
|------------|------------|-------|------------|
| #18181b | #ffffff | 19.5:1 | ✅ AAA |
| #18181b | #f9f9fb | 18.8:1 | ✅ AAA |
| #71717a | #ffffff | 7.2:1 | ✅ AA (almost AAA) |
| #71717a | #f9f9fb | 6.9:1 | ✅ AA |
| #ffffff | #2A5E98 (brand-blue) | 5.1:1 | ✅ AA |
| #ffffff | #18B75A (brand-green) | 3.8:1 | ⚠️ Large text only |

---

### Issues & Fixes

#### Issue 1: Brand Green on White

**Problem:** Brand green (#18B75A) on white only has 3.8:1 contrast.

**Current usage:**
```tsx
// src/components/landing/footer.tsx
<div className="h-10 w-10 rounded-full bg-secondary border border-border text-primary flex items-center justify-center hover:bg-brand-green hover:text-white">
```

**Fix Option 1: Darken green on hover**
```tsx
hover:bg-green-700 hover:text-white  // Darker green = better contrast
```

**Fix Option 2: Add background darkening**
```tsx
hover:bg-brand-green hover:text-white hover:brightness-90
```

**Fix Option 3: Use outline style instead**
```tsx
border-2 border-brand-green text-brand-green hover:bg-brand-green/10
```

---

#### Issue 2: Gradient Text Might Be Low Contrast

**Problem:** Text gradients can create contrast issues.

**Current:**
```tsx
<span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
  Precision Engineering
</span>
```

**Verification needed:** Check contrast at both ends of gradient.

**Fix if needed:**
```tsx
// Fallback for no-gradient support
<span className="text-brand-blue bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
  Precision Engineering
</span>
```

---

### Testing Contrast

**Manual Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools → Inspect element → Accessibility tab shows contrast ratio

**Automated:**
```bash
# Install aXe DevTools
# Chrome Web Store: axe DevTools - Web Accessibility Testing

# Or use Lighthouse
# Chrome DevTools → Lighthouse → Accessibility audit
```

---

## Forms & Inputs

### Current Status

✅ Good:
- All inputs have associated labels
- IDs match label `htmlFor`
- Required fields marked

⚠️ Needs improvement:
- Error messages not linked to inputs
- No inline validation feedback
- Success states not announced

---

### Improvements

#### 1. Link Error Messages to Inputs

**Before:**
```tsx
<label htmlFor="email">Email Address</label>
<input
  id="email"
  name="email"
  type="email"
  required
/>
{errorMessage && <p className="text-red-500">{errorMessage}</p>}
```

**After:**
```tsx
<label htmlFor="email">Email Address</label>
<input
  id="email"
  name="email"
  type="email"
  required
  aria-invalid={!!errorMessage}              // ⭐ ADD
  aria-describedby={errorMessage ? "email-error" : undefined}  // ⭐ ADD
/>
{errorMessage && (
  <p id="email-error" className="text-red-500" role="alert">  // ⭐ ADD
    {errorMessage}
  </p>
)}
```

---

#### 2. Add Field Descriptions

```tsx
<label htmlFor="message">
  Message
  <span className="text-muted-foreground text-sm"> (required)</span>
</label>
<textarea
  id="message"
  name="message"
  required
  aria-describedby="message-hint"           // ⭐ ADD
/>
<p id="message-hint" className="text-sm text-muted-foreground">
  Please provide details about your inquiry. Minimum 10 characters.
</p>
```

---

#### 3. Disabled State Communication

```tsx
<input
  disabled={isPending}
  aria-disabled={isPending}                 // ⭐ ADD
  aria-busy={isPending}                     // ⭐ ADD for loading state
/>

{isPending && (
  <div role="status" aria-live="polite" className="sr-only">
    Submitting form, please wait...
  </div>
)}
```

---

## Images & Media

### Alt Text Guidelines

**Good alt text:**
```tsx
<Image
  src="/product-vernier-caliper.jpg"
  alt="Digital vernier caliper measuring metal component with 0.01mm precision"
/>
```

**Bad alt text:**
```tsx
<Image
  src="/product-vernier-caliper.jpg"
  alt="image"  // ❌ Not descriptive
/>

<Image
  src="/product-vernier-caliper.jpg"
  alt="vernier caliper"  // ❌ Too brief, missing context
/>
```

**Decorative images:**
```tsx
<Image
  src="/background-pattern.svg"
  alt=""  // ✅ Empty alt for decorative
  role="presentation"  // ✅ Explicitly decorative
  aria-hidden="true"   // ✅ Hide from screen readers
/>
```

---

### Current Issues

**Files to audit:**

```bash
# Find images without alt text
grep -r "<Image" src --include="*.tsx" | grep -v "alt="

# Find images with potentially bad alt text
grep -r 'alt=""' src --include="*.tsx"
grep -r 'alt="image"' src --include="*.tsx"
```

---

### Fallback for Failed Images

```tsx
<Image
  src={imageUrl}
  alt={alt}
  onError={(e) => {
    // Fallback image
    e.currentTarget.src = '/placeholder-product.jpg';
  }}
/>
```

---

## Focus Management

### Focus Traps (Modals)

**If you have modals, implement focus trap:**

```typescript
// src/hooks/use-focus-trap.ts
import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element
    firstElement?.focus();

    // Trap focus
    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    container.addEventListener('keydown', handleTab);
    return () => container.removeEventListener('keydown', handleTab);
  }, [isActive]);

  return containerRef;
}

// Usage:
function Modal({ isOpen, onClose }) {
  const modalRef = useFocusTrap(isOpen);

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}
```

---

### Return Focus on Close

**Pattern:**

```typescript
const [isOpen, setIsOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
  // Return focus to trigger
  triggerRef.current?.focus();
}

return (
  <>
    <button ref={triggerRef} onClick={openModal}>
      Open Modal
    </button>
    {isOpen && <Modal onClose={closeModal} />}
  </>
);
```

---

## ARIA Attributes

### Common Patterns

#### 1. Expandable Sections

```tsx
<button
  onClick={() => setExpanded(!expanded)}
  aria-expanded={expanded}
  aria-controls="section-content"
>
  {expanded ? 'Hide' : 'Show'} Details
</button>
<div id="section-content" hidden={!expanded}>
  {/* Content */}
</div>
```

---

#### 2. Loading States

```tsx
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading && <Loader2 className="animate-spin" aria-hidden="true" />}
  {isLoading ? 'Loading...' : 'Submit'}
</button>

{isLoading && (
  <div role="status" aria-live="polite" className="sr-only">
    Loading content, please wait...
  </div>
)}
```

---

#### 3. Tabs

```tsx
<div role="tablist" aria-label="Product information">
  <button
    role="tab"
    aria-selected={activeTab === 'specs'}
    aria-controls="specs-panel"
    onClick={() => setActiveTab('specs')}
  >
    Specifications
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 'features'}
    aria-controls="features-panel"
    onClick={() => setActiveTab('features')}
  >
    Features
  </button>
</div>

<div
  id="specs-panel"
  role="tabpanel"
  hidden={activeTab !== 'specs'}
  aria-labelledby="specs-tab"
>
  {/* Specs content */}
</div>
```

---

## Testing Tools

### Automated Testing

#### 1. Lighthouse

```bash
# Chrome DevTools → Lighthouse → Run accessibility audit
# Or command line:
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:3000
```

**Target Score:** 90+

---

#### 2. axe DevTools

Install: [Chrome Web Store](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)

**Usage:**
1. Open DevTools
2. Click "axe DevTools" tab
3. Click "Scan ALL of my page"
4. Fix all Critical and Serious issues

---

#### 3. Pa11y

```bash
npm install -g pa11y
pa11y http://localhost:3000

# Or in CI/CD:
pa11y-ci --sitemap http://localhost:3000/sitemap.xml
```

---

### Manual Testing

#### 1. Keyboard-Only Navigation

**Test steps:**
1. Unplug mouse (or don't use it)
2. Navigate entire site with:
   - Tab (forward)
   - Shift+Tab (backward)
   - Enter (activate)
   - Space (toggle)
   - Arrow keys (dropdowns, sliders)
   - Escape (close modals)
3. Verify all functionality works

---

#### 2. Screen Reader Testing

**Tools:**
- **Windows:** NVDA (free) or JAWS
- **Mac:** VoiceOver (built-in, Cmd+F5)
- **Linux:** Orca

**Basic VoiceOver commands (Mac):**
- Cmd+F5: Toggle VoiceOver
- Ctrl+Option+A: Start reading
- Ctrl+Option+Right/Left: Navigate
- Ctrl: Stop reading

**Test checklist:**
- [ ] All headings announced correctly
- [ ] Links have descriptive text
- [ ] Form labels announced
- [ ] Error messages read aloud
- [ ] Button purposes clear
- [ ] Images have alt text (or marked decorative)

---

#### 3. Color Blindness Simulation

**Chrome DevTools:**
1. DevTools → Rendering tab
2. "Emulate vision deficiencies"
3. Test with:
   - Protanopia (red-blind)
   - Deuteranopia (green-blind)
   - Tritanopia (blue-blind)
   - Achromatopsia (no color)

**Verify:**
- Information not conveyed by color alone
- All UI elements distinguishable

---

## Implementation Guide

### Week 1: Quick Wins

**Monday (2 hours):**
- [ ] Add skip to content link
- [ ] Fix focus indicators on all inputs
- [ ] Add ARIA live regions to forms

**Tuesday (2 hours):**
- [ ] Add image loading strategy
- [ ] Audit and fix all alt text
- [ ] Add aria-label to icon buttons

**Wednesday (2 hours):**
- [ ] Add keyboard navigation to popovers
- [ ] Test full keyboard navigation
- [ ] Fix tab order issues

**Thursday (3 hours):**
- [ ] Run Lighthouse audit
- [ ] Run axe DevTools
- [ ] Fix all Critical issues

**Friday (3 hours):**
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Fix announced issues
- [ ] Document remaining issues

---

### Week 2: Advanced

**Monday-Tuesday (4 hours each):**
- [ ] Fix all Medium severity issues from audits
- [ ] Implement focus management for modals
- [ ] Add comprehensive ARIA attributes

**Wednesday-Thursday (4 hours each):**
- [ ] Color contrast audit and fixes
- [ ] Form validation improvements
- [ ] Add field descriptions and hints

**Friday (4 hours):**
- [ ] Full accessibility re-test
- [ ] Document accessibility features
- [ ] Create accessibility statement

---

## Accessibility Statement

**Create:** `src/app/(landing)/accessibility/page.tsx`

```tsx
export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1>Accessibility Statement</h1>

      <p>
        Shiner is committed to ensuring digital accessibility for people with disabilities.
        We are continually improving the user experience for everyone and applying the
        relevant accessibility standards.
      </p>

      <h2>Conformance Status</h2>
      <p>
        We aim to conform to WCAG 2.1 Level AA standards.
        This website has been tested with:
      </p>
      <ul>
        <li>Keyboard-only navigation</li>
        <li>Screen readers (NVDA, VoiceOver)</li>
        <li>Automated testing tools (Lighthouse, axe)</li>
      </ul>

      <h2>Feedback</h2>
      <p>
        We welcome your feedback on the accessibility of this site.
        Please contact us at <a href="mailto:accessibility@shiner.example.com">accessibility@shiner.example.com</a>
      </p>

      <h2>Known Issues</h2>
      <ul>
        <li>[List any known accessibility issues]</li>
        <li>[With timeline for fixes]</li>
      </ul>
    </div>
  );
}
```

---

## Checklist Summary

### Critical (Do First)
- [ ] Skip to content link
- [ ] Fix focus indicators
- [ ] ARIA live regions
- [ ] Keyboard navigation for dropdowns
- [ ] Alt text audit
- [ ] Run Lighthouse + axe

### Important (Week 1-2)
- [ ] Color contrast fixes
- [ ] Form error linking
- [ ] Screen reader testing
- [ ] All interactive elements keyboard accessible
- [ ] Image loading strategy
- [ ] ARIA labels on icon buttons

### Nice to Have
- [ ] Focus trap for modals
- [ ] Keyboard shortcuts
- [ ] Accessibility statement page
- [ ] Enhanced ARIA attributes
- [ ] Comprehensive documentation

---

**Current Score:** 7/10
**After Quick Wins:** 8.5/10
**After Full Implementation:** 9/10+

**Total Time Estimate:** 20-25 hours over 2 weeks
