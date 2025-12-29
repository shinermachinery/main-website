# Features Index

Master index of all features in this project. Each feature has detailed documentation in its respective folder.

**Last Updated**: 2025-12-29

## Active Features

Features currently implemented and in use.

### 1. Theme System

**Status**: ✅ Completed
**Location**: `memory-bank/features/theme-system/`
**Description**: Dark/light theme switching with system preference detection
**Key Tech**: next-themes, Tailwind CSS
**Created**: 2025-12-23

**Quick Links:**
- [Full Documentation](./features/theme-system/README.md)
- [Changelog](./features/theme-system/CHANGELOG.md)

**Key Files:**
- `src/lib/theme-provider.tsx` - Theme provider
- `src/components/global/mode-toggle.tsx` - Toggle UI
- `src/app/layout.tsx` - Provider integration

**Dependencies:**
- next-themes@0.4.6
- UI Components (for ModeToggle)

---

### 2. Sanity CMS Integration

**Status**: ✅ Completed
**Location**: `memory-bank/features/sanity-integration/`
**Description**: Headless CMS with embedded Studio for content management
**Key Tech**: Sanity v4, next-sanity, GROQ
**Created**: 2025-12-23

**Quick Links:**
- [Full Documentation](./features/sanity-integration/README.md)
- [Changelog](./features/sanity-integration/CHANGELOG.md)

**Key Files:**
- `sanity.config.ts` - Sanity configuration
- `src/sanity/lib/client.ts` - API client
- `src/sanity/schemaTypes/*.ts` - Content schemas
- `src/app/studio/[[...tool]]/page.tsx` - Studio route

**Content Schemas:**
- Post - Blog posts
- Author - Author profiles
- Category - Post categories
- Block Content - Rich text

**Dependencies:**
- sanity@4
- next-sanity@12.0.5
- @sanity/client@7.13.2
- @sanity/image-url@2.0.2
- @portabletext/react@6.0.0

**Access:**
- Studio: `/studio`
- Dashboard: [sanity.io/manage](https://www.sanity.io/manage)

---

### 3. UI Component Library

**Status**: 🚧 In Development
**Location**: `memory-bank/features/ui-components/`
**Description**: Reusable, accessible components built on Radix UI and Tailwind CSS
**Key Tech**: Radix UI, Tailwind CSS, CVA
**Created**: 2025-12-23

**Quick Links:**
- [Full Documentation](./features/ui-components/README.md)
- [Changelog](./features/ui-components/CHANGELOG.md)

**Key Files:**
- `src/components/ui/*.tsx` - Reusable components
- `src/components/global/*.tsx` - App-specific components
- `src/lib/utils.ts` - Utility functions

**Available Components:**
- Button (variants: default, destructive, outline, etc.)
- Accordion (collapsible content)
- DropdownMenu (context menus)
- ModeToggle (theme switcher)

**Dependencies:**
- @radix-ui/react-accordion@1.2.12
- @radix-ui/react-dropdown-menu@2.1.16
- class-variance-authority@0.7.1
- tailwind-merge@3.4.0
- lucide-react@0.562.0

---

### 4. MCP Server Integration

**Status**: ✅ Completed
**Location**: `.mcp.json`, `.claude/settings.local.json`
**Description**: Model Context Protocol server configuration for external tool integration
**Key Tech**: MCP Protocol
**Created**: 2025-12-23

**Quick Links:**
- [Setup Guide](../MCP-SETUP.md)
- [Configuration](../.mcp.json)

**Key Files:**
- `.mcp.json` - MCP server definitions
- `.mcp.json.example` - Example configuration
- `.claude/settings.local.json` - Auto-enable settings
- `MCP-SETUP.md` - Complete setup guide

**Current MCP Servers:**
- Figma MCP (`http://127.0.0.1:3845/mcp`) - Design file access

**Features:**
- Auto-enable all project MCP servers
- Easy URL configuration
- Support for multiple MCP servers
- Team-friendly setup

---

### 5. Landing Page

**Status**: ✅ Completed
**Location**: `memory-bank/features/landing-page/`
**Description**: Professional landing page with static sections and CMS-managed content
**Key Tech**: Next.js 16, Sanity CMS, Plus Jakarta Sans, OKLCH colors
**Created**: 2025-12-23

**Quick Links:**
- [Full Documentation](./features/landing-page/README.md)
- [Changelog](./features/landing-page/CHANGELOG.md)

**Key Files:**
- `src/app/(landing)/layout.tsx` - Landing layout (Navbar + Footer)
- `src/app/(landing)/page.tsx` - Home page route
- `src/app/(landing)/about/page.tsx` - About Us page
- `src/app/(landing)/contact/page.tsx` - Contact page
- `src/app/layout.tsx` - Root layout (fonts, theme)
- `src/app/globals.css` - Brand colors
- `src/components/landing/*` - All landing sections

**Pages:**
- **Home** (`/`) - Full landing page with all sections
- **About** (`/about`) - Company overview and values
- **Contact** (`/contact`) - Contact form and office locations
- **Blog** (`/blog`) - Blog posts listing with search and filters

**Home Page Sections:**
- Hero section (static)
- About Us (static)
- Features Grid (static)
- Featured Products (CMS)
- Statistics (static)
- How It Works (static)
- Team (CMS)
- Testimonials (CMS)
- Contact Form (Server Action → CMS)

**Shared Layout:**
- Navbar (top navigation)
- Footer (site footer)

**Dependencies:**
- Sanity CMS Integration
- UI Components (Button, Gradient Button)
- Theme System (for color variables)

**Phases:**
- ✅ Phase 1: Foundation Setup (Completed 2025-12-23)
- ✅ Phase 2: Static Sections (Completed 2025-12-23)
- ✅ Phase 3: Sanity CMS Integration (Completed 2025-12-23)
- ✅ Phase 4: Contact Form + Footer (Completed 2025-12-23)
- ✅ Phase 5: Polish, Accessibility, SEO (Completed 2025-12-23)
- ✅ Phase 6: Route Group Restructure (Completed 2025-12-25)
- ✅ Phase 7: About Us Page (Completed 2025-12-25)
- ✅ Phase 8: Contact Us Page (Completed 2025-12-25)
- ✅ Phase 9: Light Mode Refinements (Completed 2025-12-29)
- ✅ Phase 10: Blog Posts Page (Completed 2025-12-29)
- ✅ Phase 11: Individual Blog Post Page (Completed 2025-12-29)

---

## Feature Status Legend

- ✅ **Completed** - Fully implemented and stable
- 🚧 **In Development** - Actively being worked on
- 📋 **Planned** - Scheduled for implementation
- 🔄 **Refactoring** - Being improved or rewritten
- ⚠️ **Deprecated** - No longer recommended, see migration guide
- 🗃️ **Archived** - Removed, see archived docs

## Feature Dependencies

Visual representation of how features depend on each other:

```
UI Components
    ↓
Theme System
    ↓
(Both independent)
    ↓
Sanity Integration (independent)
```

**Dependency Graph:**
- **Theme System** depends on: UI Components (ModeToggle)
- **UI Components** depends on: None (foundational)
- **Sanity Integration** depends on: None (independent)

## Features by Category

### Content Management
- [Sanity CMS Integration](#2-sanity-cms-integration)

### UI/UX
- [Theme System](#1-theme-system)
- [UI Component Library](#3-ui-component-library)

### Infrastructure
- (None yet)

### Integrations
- [Sanity CMS Integration](#2-sanity-cms-integration)

## Planned Features

Features scheduled for future implementation:

### 📋 Blog Frontend

**Priority**: High
**Description**: Public-facing blog pages displaying Sanity content
**Estimated Start**: TBD
**Dependencies**: Sanity Integration

**Planned Components:**
- Blog listing page
- Individual post pages
- Author pages
- Category pages

---

### 📋 SEO Optimization

**Priority**: Medium
**Description**: Meta tags, sitemaps, structured data
**Estimated Start**: TBD
**Dependencies**: Blog Frontend

**Planned Features:**
- Dynamic meta tags
- Open Graph tags
- JSON-LD structured data
- Sitemap generation

---

### 📋 Image Optimization

**Priority**: Medium
**Description**: Enhanced image handling and optimization
**Estimated Start**: TBD
**Dependencies**: Sanity Integration

**Planned Features:**
- Next.js Image component integration
- Responsive images
- Lazy loading
- Blur placeholders

---

## How to Use This Index

### Finding a Feature

1. **Browse by status**: Use the Active Features section
2. **Search by category**: Check "Features by Category"
3. **View roadmap**: See "Planned Features"

### When Starting Work on a Feature

1. Update status in this index
2. Create feature folder in `memory-bank/features/[feature-name]/`
3. Copy template from `memory-bank/templates/feature-template.md`
4. Fill in documentation as you build
5. Update this index when complete

### When Updating a Feature

1. Update feature's README.md
2. Add entry to feature's CHANGELOG.md
3. Update "Last Modified" date in feature's README
4. Update this index if status changes

### When Deprecating a Feature

1. Change status to ⚠️ Deprecated
2. Add migration guide to feature docs
3. Set timeline for removal
4. Create replacement feature (if applicable)

### When Archiving a Feature

1. Move to `memory-bank/archived/[feature-name]/`
2. Remove from Active Features
3. Add to archived section (if needed)
4. Update status to 🗃️ Archived

## Quick Reference

| Feature | Status | Files | Docs |
|---------|--------|-------|------|
| Theme System | ✅ | `src/lib/theme-provider.tsx`<br>`src/components/global/mode-toggle.tsx` | [View](./features/theme-system/README.md) |
| Sanity Integration | ✅ | `sanity.config.ts`<br>`src/sanity/**/*` | [View](./features/sanity-integration/README.md) |
| UI Components | 🚧 | `src/components/ui/**/*`<br>`src/lib/utils.ts` | [View](./features/ui-components/README.md) |
| MCP Integration | ✅ | `.mcp.json`<br>`.claude/settings.local.json` | [View](../MCP-SETUP.md) |
| Landing Pages | ✅ | `src/app/(landing)/**/*`<br>4 pages: Home, About, Contact, Blog | [View](./features/landing-page/README.md) |

## Feature Statistics

**Total Features**: 5
- ✅ Completed: 4
- 🚧 In Development: 1
- 📋 Planned: 3

**Last Feature Completed**: Landing Pages (2025-12-29)
**Recently Updated**: Landing Pages - Blog cards pixel-perfect with complete dummy data (9 posts), individual blog post pages with portable text, blog listing with search/filters, light mode refinements
**Next Planned**: Products Page, Product Detail Pages

## Related Documentation

- [Architecture Overview](./architecture/system-overview.md)
- [Tech Stack](./architecture/tech-stack.md)
- [Development Patterns](./architecture/patterns.md)
- [Memory Bank README](./README.md)
- [Feature Template](./templates/feature-template.md)

---

**Maintenance Schedule**: Review and update this index when features change
**Owner**: Team
**Last Review**: 2025-12-29
