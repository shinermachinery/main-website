# Changelog - About Us Pages

All notable changes to the About Us pages system will be documented in this file.

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

## Version History

- **1.0.0** (2025-12-30) - Initial release with three About pages and complete Sanity integration
