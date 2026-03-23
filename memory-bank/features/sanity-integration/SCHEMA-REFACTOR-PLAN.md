# Sanity Schema Refactoring Plan

**Created**: 2026-02-08
**Status**: ✅ Completed
**Completed**: 2026-02-14

---

## Context

User wants to:
1. Review and fix all Sanity schemas (they're "not good")
2. Add Sanity CMS to maximum pages possible
3. Clean up overlapping/redundant schemas

---

## Current Schema Inventory (27 schemas in 7 domains)

### 1. Blog Domain (`src/sanity/schemaTypes/blog/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `author` | Document | ✅ Good | name, slug, image, bio |
| `post` | Document | ✅ Good | title, slug, author, mainImage, categories, body |
| `category` | Document | ✅ Good | title, slug, description |
| `blockContent` | Array | ✅ Good | Portable text, reusable |

### 2. Products Domain (`src/sanity/schemaTypes/products/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `product` | Document | ✅ Good | title, slug, description, images, brochure, specifications, price, features, collection, relatedProducts |
| `productCollection` | Document | ✅ Good | title, slug, description, image, featured |

### 3. Company Domain (`src/sanity/schemaTypes/company/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `director` | Document (Singleton) | ✅ Good | name, title, image, bio, achievements, contact |
| `missionVision` | Document (Singleton) | ✅ Good | mission/vision titles, descriptions, images |
| `teamMember` | Document | ✅ Good | name, role, bio, image, order |
| `whyChooseUs` | Document (Singleton) | ✅ Good | title, description, heroImage, reasons array |

### 4. Projects Domain (`src/sanity/schemaTypes/projects/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `project` | Document | ⚠️ Review | title, slug, description, images, features, specifications - **NEED FIGMA TO VERIFY FIELDS** |
| `service` | Document | ✅ Good | title, slug, description, image |
| `installation` | Document | ❓ Unclear | May overlap with project? |
| `client` | Document | ✅ Good | companyName, projects, logo, highlight |
| `flowchart` | Document | ✅ Good | title, description, image (for process diagrams) |

### 5. Marketing Domain (`src/sanity/schemaTypes/marketing/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `achievement` | Document | ✅ Good | awardName, awardGiver, image, awardDate, description |
| `certification` | Document | ⚠️ Sparse | Only title, description, image - may need more fields |
| `event` | Document | ⚠️ Sparse | title, slug, images, description, eventDate, location |
| `testimonial` | Document | ✅ Good | customerName, role, content, rating, image, featured |

### 6. Homepage Domain (`src/sanity/schemaTypes/homepage/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `home` | Document (Singleton) | ⚠️ BLOATED | 20+ fields, hard to manage - single mega document |
| `homepageAbout` | Object | ❌ UNUSED | Created but not actually used anywhere |
| `homepageFeatures` | Object | ❌ UNUSED | Created but not actually used anywhere |
| `homepageHero` | Object | ❌ UNUSED | Created but not actually used anywhere |

### 7. Common Domain (`src/sanity/schemaTypes/common/`)
| Schema | Type | Status | Notes |
|--------|------|--------|-------|
| `companyStats` | Object | ❓ Unclear | May be unused |
| `contactSubmission` | Document | ✅ Good | Form submissions, read-only |

---

## Issues Identified

### Critical Issues
1. **`homeType` is bloated** - Single document with 20+ fields for entire homepage
2. **Unused reusable schemas** - `homepageAbout`, `homepageFeatures`, `homepageHero` exist but aren't used
3. **`installation` vs `project` overlap** - Unclear distinction, may be redundant

### Missing Schemas
1. **`siteSettings`** - Logo, company name, contact info, social links, SEO defaults
2. **`footer`** - Footer menu links, copyright text, address
3. **`faq`** - Frequently asked questions (if needed)
4. **`navigation`** - CMS-managed menu items (optional)

### Pages Not Connected to Sanity
1. **`/about` main page** - Has hardcoded product cards
2. **`/contact` page** - Static office info, hours
3. **Footer component** - Hardcoded links and address
4. **Navbar** - Static menu items

---

## User Clarifications Received

1. **Products vs Projects**: They are **SEPARATE** things
   - Products = Equipment/machinery for sale
   - Projects = (Awaiting Figma design to understand structure)

2. **Figma Design Link**: `https://www.figma.com/design/EpCcF1u70Ku7ODd9ROPmHE/Shiner--Copy-?node-id=19510-1443&m=dev`
   - This shows the Project page design
   - **NEXT CLAUDE**: Fetch this via Figma MCP to understand project structure

---

## Proposed Action Plan

### Phase 1: Clean Up Unused Schemas
- [ ] Delete `homepageAbout`, `homepageFeatures`, `homepageHero` (unused objects)
- [ ] Or refactor `homeType` to use these reusable objects properly

### Phase 2: Review Project Schema (NEEDS FIGMA)
- [ ] Fetch Figma design for project page
- [ ] Compare design fields vs current schema fields
- [ ] Update `projectType` to match design requirements
- [ ] Clarify `installation` vs `project` distinction

### Phase 3: Add Missing Global Schemas
- [ ] Create `siteSettings` schema (singleton)
- [ ] Create `footer` schema (singleton) OR add footer fields to siteSettings
- [ ] Consider `faq` schema if needed

### Phase 4: Connect Static Pages to Sanity
- [ ] `/about` main page - create CMS fields or use existing schemas
- [ ] `/contact` page - add office locations, hours to siteSettings
- [ ] Footer component - connect to footer/siteSettings schema
- [ ] Navbar - optionally make menu items CMS-managed

### Phase 5: Enhance Sparse Schemas
- [ ] `certification` - add issuing body, date, certificate number?
- [ ] `event` - add event type, registration link, capacity?

---

## Files to Modify

### Schemas to potentially delete:
- `src/sanity/schemaTypes/homepage/homepageAbout.ts`
- `src/sanity/schemaTypes/homepage/homepageFeatures.ts`
- `src/sanity/schemaTypes/homepage/homepageHero.ts`

### Schemas to update:
- `src/sanity/schemaTypes/projects/projectType.ts` - After Figma review
- `src/sanity/schemaTypes/marketing/certificationType.ts` - Add fields
- `src/sanity/schemaTypes/marketing/eventType.ts` - Add fields

### New schemas to create:
- `src/sanity/schemaTypes/common/siteSettingsType.ts`
- `src/sanity/schemaTypes/common/footerType.ts` (optional)
- `src/sanity/schemaTypes/common/faqType.ts` (optional)

---

## Instructions for Next Claude Instance

1. **Read this file first** to understand context
2. **Use Figma MCP** to fetch design: `https://www.figma.com/design/EpCcF1u70Ku7ODd9ROPmHE/Shiner--Copy-?node-id=19510-1443&m=dev`
3. **Compare Figma project page** with current `projectType` schema
4. **Ask user** to confirm the action plan before implementing
5. **Follow phase-based development** - update memory bank after each phase

---

## Current Sanity Structure (Post-Refactor)

```
src/sanity/schemaTypes/
├── blog/
│   ├── authorType.ts
│   ├── blockContentType.ts
│   ├── categoryType.ts
│   ├── postType.ts
│   └── index.ts
├── products/
│   ├── productType.ts
│   ├── productCollectionType.ts
│   └── index.ts
├── company/
│   ├── aboutPageType.ts (NEW - merged missionVision + whyChooseUs)
│   ├── teamMemberType.ts (UPDATED - added isDirector flag)
│   └── index.ts
├── projects/
│   ├── projectType.ts
│   ├── serviceType.ts
│   ├── installationType.ts (SIMPLIFIED)
│   ├── clientType.ts (SIMPLIFIED)
│   ├── flowchartType.ts
│   └── index.ts
├── marketing/
│   ├── achievementType.ts
│   ├── certificationType.ts
│   ├── eventType.ts (SIMPLIFIED)
│   ├── testimonialType.ts (UPDATED - added company field)
│   └── index.ts
├── homepage/
│   ├── homeType.ts
│   └── index.ts
├── common/
│   ├── siteSettingsType.ts (NEW)
│   ├── navigationType.ts (NEW)
│   ├── footerType.ts (NEW)
│   ├── contactSubmissionType.ts
│   └── index.ts
└── index.ts (main export)

src/sanity/lib/queries/
├── index.ts (barrel export)
├── pages/
│   ├── about.ts
│   ├── blog.ts
│   ├── events.ts
│   ├── home.ts
│   ├── products.ts
│   ├── projects.ts
│   ├── services.ts
│   ├── settings.ts
│   ├── testimonials.ts
│   └── index.ts
└── shared/
    ├── projections.ts
    ├── utils.ts
    └── index.ts
```

---

## Sanity Studio Structure

Located at: `sanity.config.ts` and `src/sanity/structure.ts`

Studio accessible at: `/studio`

---

**Last Updated**: 2026-02-14
**Author**: Claude (session handoff document)
