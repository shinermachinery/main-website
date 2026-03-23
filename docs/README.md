# Project Documentation

**Last Updated:** January 8, 2026

This directory contains comprehensive documentation for the codebase refactoring and best practices.

---

## 📋 Quick Start

**New to the project?** Start here:

1. **[audit.md](./audit.md)** - Read the full codebase audit (1,905 lines)
2. **[refactoring-checklist.md](./refactoring-checklist.md)** - Follow the day-by-day implementation plan
3. **[constants-architecture-guide.md](./constants-architecture-guide.md)** - Implement constants first (highest priority)

---

## 📚 Documentation Index

### 🔍 Analysis & Planning

#### [audit.md](./audit.md) (1,905 lines)
**Complete technical audit of the codebase**

- Executive summary with quality score (5.5/10)
- 11 critical/medium/low priority issues with evidence
- Architecture review and recommendations
- Component duplication analysis
- Styling audit (px→rem migration needed)
- Security review (mostly good ✅)
- Performance analysis
- Accessibility checklist
- 4-phase refactoring plan (2-3 weeks)
- Actionable task list
- Priority matrix with ROI

**When to read:** First thing - understand current state and what needs fixing

---

### 🎨 Design System

#### [design-system.md](./design-system.md)
**Complete design system documentation**

- Color system (brand, semantic, status colors)
- Typography scale (rem-based)
- Spacing scale (rem-based)
- Border radius, shadows, transitions
- Breakpoints and z-index scale
- Implementation guide with code examples
- Before/After examples
- Design system checklist
- WCAG 2.1 compliance guide

**When to read:** Before implementing constants, need reference for all design tokens

**Key Sections:**
- Color mapping table
- Typography conversion guide (px → rem)
- Semantic spacing values
- Custom Tailwind utilities

---

### 🏗️ Architecture & Implementation

#### [constants-architecture-guide.md](./constants-architecture-guide.md)
**Step-by-step guide for creating constants architecture**

- Directory structure
- 8 constant files with full implementations:
  - design-tokens.ts
  - navigation.ts
  - company.ts
  - routes.ts
  - config.ts
  - forms.ts
  - seo.ts
  - index.ts
- Migration strategy
- Usage guidelines
- Testing checklist

**When to read:** Day 2 of refactoring - before creating constants

**Estimated Implementation Time:** 8-10 hours

**Priority:** 🔴 Critical - Do this first!

---

#### [migration-guides.md](./migration-guides.md)
**Practical transformation guides**

5 detailed migration guides:

1. **Removing Inline Styles** (3-4 hours)
   - Configure Tailwind fonts
   - Remove 80+ inline fontFamily styles
   - Replace gradient inline styles
   - Replace aspect ratio inline styles

2. **px → rem Migration** (4-5 hours)
   - Conversion table
   - Update CSS variables
   - Replace hard-coded typography
   - Accessibility testing

3. **Hard-coded Colors → Tailwind** (3-4 hours)
   - Color mapping table
   - Global find & replace patterns
   - 110+ color replacements
   - Verification steps

4. **Consolidating Duplicate Components** (6-8 hours)
   - Product card consolidation (3 versions → 1)
   - Blog card consolidation (2 versions → 1)
   - Step-by-step migration
   - Testing checklist

5. **Removing Dark Mode Code** (2-3 hours)
   - Delete CSS (lines 94-132)
   - Remove all dark: classes (200+)
   - Delete mode-toggle component
   - Update theme provider

**When to read:** Days 4-9 of refactoring - when doing actual migrations

**Includes:** Before/after code examples, find-replace patterns, rollback plans

---

### ♿ Accessibility

#### [accessibility-checklist.md](./accessibility-checklist.md)
**WCAG 2.1 Level AA compliance guide**

- **Quick Wins** (15-60 min each):
  - Add skip to content link
  - Fix focus indicators
  - Add ARIA live regions
  - Add image loading strategy

- **Comprehensive Sections:**
  - Keyboard navigation (dropdowns, focus trap)
  - Screen reader support (ARIA labels, landmarks)
  - Color & contrast (WCAG ratios, testing)
  - Forms & inputs (error linking, descriptions)
  - Images & media (alt text guide)
  - Focus management (modals, return focus)
  - ARIA attributes (expandable, loading, tabs)

- **Testing Tools:**
  - Lighthouse
  - axe DevTools
  - Pa11y
  - Manual testing guides
  - Screen reader testing (VoiceOver/NVDA)
  - Color blindness simulation

- **2-Week Implementation Plan**

**When to read:** Days 11-13 of refactoring - when adding accessibility

**Current Score:** 7/10
**Target Score:** 9/10
**Time Estimate:** 20-25 hours

---

### 📅 Implementation

#### [refactoring-checklist.md](./refactoring-checklist.md)
**Day-by-day implementation plan (15 days)**

**Week 1: Foundation & Cleanup**
- Day 1: Dark mode removal (6-8 hours)
- Day 2: Constants architecture part 1 (8 hours)
- Day 3: Constants architecture part 2 (8 hours)
- Day 4: Remove inline styles (8 hours)
- Day 5: Hard-coded colors part 1 (8 hours)

**Week 2: Component Consolidation & Typography**
- Day 6: Product card consolidation (8 hours)
- Day 7: Blog card consolidation (6 hours)
- Day 8: Typography migration part 1 (8 hours)
- Day 9: px → rem migration (8 hours)
- Day 10: Component refactoring (8 hours)

**Week 3: Accessibility & Polish**
- Day 11: Accessibility quick wins (8 hours)
- Day 12: Accessibility images & forms (8 hours)
- Day 13: Accessibility testing & polish (8 hours)
- Day 14: Performance & testing (8 hours)
- Day 15: Documentation & wrap-up (8 hours)

**Includes:**
- Daily task breakdowns (morning/afternoon)
- Acceptance criteria for each day
- Success metrics tracker
- Risk mitigation strategies
- Final checklist before merging
- Post-refactor tasks

**When to use:** Throughout entire refactoring - daily reference

**Total Time:** 120 hours (can be compressed to 80-100 for critical items only)

---

## 🎯 Recommended Reading Order

### For Developers Starting Refactoring:

**Phase 1: Understanding (2-3 hours reading)**
1. [audit.md](./audit.md) - Executive Summary + High Priority Issues (30 min)
2. [design-system.md](./design-system.md) - Skim color & typography sections (30 min)
3. [constants-architecture-guide.md](./constants-architecture-guide.md) - Read fully (1 hour)
4. [refactoring-checklist.md](./refactoring-checklist.md) - Read Week 1 plan (30 min)

**Phase 2: Implementation (As needed)**
- Use [refactoring-checklist.md](./refactoring-checklist.md) as daily guide
- Reference [migration-guides.md](./migration-guides.md) for specific tasks
- Reference [design-system.md](./design-system.md) for token values
- Reference [accessibility-checklist.md](./accessibility-checklist.md) during Week 3

---

## 📊 Key Statistics

### Codebase Current State:
- **Total TypeScript files:** 147
- **Inline styles:** 80+ occurrences
- **Hard-coded colors:** 110+ occurrences
- **Duplicate components:** 10+
- **Dark mode code:** 200+ lines
- **Code quality score:** 5.5/10

### After Refactoring:
- **Inline styles:** 0
- **Hard-coded colors:** 0
- **Duplicate components:** 0
- **Dark mode code:** 0
- **Code quality score:** 8.5/10
- **Accessibility score:** 9/10
- **Maintainability:** +80% improvement

---

## 🚀 Quick Reference

### Most Common Issues & Solutions:

| Issue | Solution | Guide | Time |
|-------|----------|-------|------|
| Hard-coded colors | Use semantic Tailwind classes | [migration-guides.md](./migration-guides.md) #3 | 3-4h |
| Inline styles | Remove, use Tailwind utilities | [migration-guides.md](./migration-guides.md) #1 | 3-4h |
| px units | Convert to rem | [migration-guides.md](./migration-guides.md) #2 | 4-5h |
| No constants | Create /src/constants | [constants-architecture-guide.md](./constants-architecture-guide.md) | 8-10h |
| Duplicate components | Consolidate to one version | [migration-guides.md](./migration-guides.md) #4 | 6-8h |
| Dark mode exists | Remove completely | [migration-guides.md](./migration-guides.md) #5 | 2-3h |
| Accessibility <9 | Follow checklist | [accessibility-checklist.md](./accessibility-checklist.md) | 20-25h |

---

## 🛠️ Implementation Tools

### Find & Replace Patterns

**Inline styles:**
```regex
style=\{\{\s*fontFamily:\s*["']var\(--font-plus-jakarta-sans\)["']\s*\}\}
```

**Hard-coded colors:**
```regex
text-\[#18181b\]  →  text-primary
text-\[#71717a\]  →  text-secondary
bg-\[#f9f9fb\]    →  bg-secondary
```

**Dark mode classes:**
```regex
dark:[a-zA-Z-]+:[a-zA-Z-/0-9.()]+
```

**Typography:**
```regex
text-\[30px\]     →  text-3xl
leading-\[40px\]  →  leading-tight
```

---

## 📝 Contributing

When updating documentation:

1. **Maintain consistency** - Follow existing format and style
2. **Include examples** - Always show before/after code
3. **Update index** - Add entry to this README
4. **Date stamps** - Update "Last Updated" dates
5. **Cross-reference** - Link to related documents

---

## ✅ Documentation Checklist

Use this to verify documentation quality:

- [ ] Clear purpose stated at top
- [ ] Table of contents for long docs
- [ ] Code examples included
- [ ] Before/After comparisons
- [ ] File paths referenced
- [ ] Time estimates provided
- [ ] Acceptance criteria listed
- [ ] Cross-references to other docs
- [ ] Maintained and up-to-date

---

## 🔗 External Resources

### Design System References:
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design 3](https://m3.material.io)

### Accessibility Testing:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Next.js Resources:
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Sanity CMS Docs](https://www.sanity.io/docs)

---

## 📞 Questions?

If you have questions about:

- **Architecture decisions:** See [audit.md](./audit.md) - Architecture Review section
- **Implementation specifics:** See [refactoring-checklist.md](./refactoring-checklist.md)
- **Design tokens:** See [design-system.md](./design-system.md)
- **Migrations:** See [migration-guides.md](./migration-guides.md)
- **Accessibility:** See [accessibility-checklist.md](./accessibility-checklist.md)

Still stuck? Open an issue in the repository!

---

**Documentation Version:** 1.0.0
**Created:** January 8, 2026
**Total Pages:** ~5,000+ lines of documentation
**Maintenance:** Update as refactoring progresses
