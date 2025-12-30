# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**IMPORTANT: Always use `bun` for package management and running scripts.**

**Start development server:**
```bash
bun dev
```
Access at http://localhost:3000

**Build for production:**
```bash
bun run build
```

**Start production server:**
```bash
bun start
```

**Lint and format:**
```bash
bun run lint        # Check with Biome
bun run format      # Format with Biome
```

**Install dependencies:**
```bash
bun install
```

**Add packages:**
```bash
bun add <package-name>
bun add -d <package-name>  # For dev dependencies
```

## MCP Server Configuration

This project supports Model Context Protocol (MCP) servers for extended functionality.

**Configuration Files:**
- `.mcp.json` - Defines available MCP servers
- `.claude/settings.local.json` - Enables MCP servers for the project

**Current MCP Servers:**
- **Figma** (`http://127.0.0.1:3845/mcp`) - Design file access and integration

**How to modify:**
1. Update the URL in `.mcp.json` if your Figma MCP server runs on a different port
2. Add new MCP servers to `.mcp.json` using the same format
3. MCP servers are automatically enabled via `enableAllProjectMcpServers: true`

**Example adding a new MCP server:**
```json
{
  "mcpServers": {
    "figma": {
      "url": "http://127.0.0.1:3845/mcp",
      "description": "Figma MCP server"
    },
    "your-server": {
      "url": "http://localhost:PORT/mcp",
      "description": "Your MCP server description"
    }
  }
}
```

## Critical Design Rule: Light Mode Only

**IMPORTANT: This project is LIGHT MODE ONLY. Do NOT create dark mode styles.**

When creating or updating UI components:
- ❌ **DO NOT** add `dark:` prefixed Tailwind classes
- ❌ **DO NOT** add dark mode variants or theming
- ❌ **DO NOT** use classes like `dark:bg-zinc-950`, `dark:text-zinc-50`, etc.
- ✅ **DO** use light mode colors only: `bg-white`, `text-zinc-950`, `border-zinc-200`, etc.

**Examples:**
```tsx
// ❌ WRONG - Contains dark mode styles
<div className="bg-white dark:bg-zinc-950">

// ✅ CORRECT - Light mode only
<div className="bg-white">

// ❌ WRONG - Dark mode border
<div className="border-zinc-200 dark:border-zinc-800">

// ✅ CORRECT - Light mode border
<div className="border-zinc-200">
```

This rule applies to ALL components including buttons, popovers, dropdowns, modals, cards, etc.

## Project Architecture

This is a Next.js 16.1 application integrated with Sanity CMS for content management. The project uses TypeScript, Tailwind CSS v4, and Biome for linting/formatting.

### Core Technologies

- **Next.js 16.1** with App Router and React 19.2.3
- **React Compiler** enabled in next.config.ts
- **Sanity CMS** for content management with embedded Studio
- **Biome** for linting and formatting (not ESLint/Prettier)
- **Tailwind CSS v4** with PostCSS
- **next-themes** for theme switching
- **Radix UI** for accessible component primitives
- **TypeScript** with strict mode enabled

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── studio/[[...tool]]/ # Sanity Studio at /studio route
│   ├── layout.tsx          # Root layout with ThemeProvider
│   └── page.tsx            # Home page
├── components/
│   ├── global/             # Global components (mode-toggle, etc.)
│   └── ui/                 # UI components (button, accordion, dropdown-menu)
├── lib/
│   ├── theme-provider.tsx  # next-themes provider wrapper
│   └── utils.ts            # Utility functions (cn helper)
└── sanity/
    ├── env.ts              # Sanity environment config
    ├── lib/
    │   ├── client.ts       # Sanity client instance
    │   ├── image.ts        # Image URL builder
    │   └── live.ts         # Live preview setup
    ├── schemaTypes/        # Sanity content schemas
    │   ├── authorType.ts
    │   ├── blockContentType.ts
    │   ├── categoryType.ts
    │   ├── postType.ts
    │   └── index.ts        # Schema exports
    └── structure.ts        # Sanity Studio structure
```

### Key Configuration Details

**Path Alias:**
- `@/*` maps to `./src/*`

**Sanity Integration:**
- Studio mounted at `/studio` route via catch-all dynamic route
- Requires environment variables in `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
- API version defaults to `2025-12-22`
- Client configured in `src/sanity/lib/client.ts` with CDN enabled

**Theme System:**
- Uses next-themes with system detection
- ThemeProvider in root layout with `suppressHydrationWarning`
- Mode toggle component in `src/components/global/mode-toggle.tsx`

**Styling:**
- Tailwind CSS v4 configured in `postcss.config.mjs`
- `tailwind-merge` and `class-variance-authority` for component variants
- Global styles in `src/app/globals.css`
- Custom utility `cn()` in `src/lib/utils.ts` for className merging

**Fonts:**
- Geist Sans and Geist Mono from `next/font/google`
- CSS variables: `--font-geist-sans`, `--font-geist-mono`

### Biome Configuration

Biome is used instead of ESLint/Prettier. Configuration in `biome.json`:
- Formatter: 2-space indentation
- Linter: Enabled with recommended rules for Next.js and React
- Auto-organize imports enabled
- Ignores: node_modules, .next, dist, build

When making code changes, ensure they pass Biome checks before committing.

### Sanity Content Schema

The project includes a blog-style content structure with:
- **Posts** (`postType.ts`) - Blog posts with title, slug, author, categories, content
- **Authors** (`authorType.ts`) - Author profiles
- **Categories** (`categoryType.ts`) - Post categories
- **Block Content** (`blockContentType.ts`) - Rich text content type

All schemas exported from `src/sanity/schemaTypes/index.ts` and used in `sanity.config.ts`.

### Development Notes

- React Compiler is enabled, avoid patterns that break its rules
- The Studio is statically generated (`dynamic = 'force-static'`)
- Use the Sanity client from `src/sanity/lib/client.ts` for queries
- Image optimization uses `@sanity/image-url` via `src/sanity/lib/image.ts`

### Server Component & Data Loading Patterns

**CRITICAL RULES** for Next.js 16 development:

1. **Pages MUST be server components** - NO 'use client' on page files
   - Exception: `/studio` route (Sanity Studio requires client-side)
   - Use client components only for interactivity (forms, events, state)

2. **Always await params and searchParams** - Next.js 16 requirement
   ```typescript
   // ✅ CORRECT
   export default async function Page({ params, searchParams }: Props) {
     const { slug } = await params
     const filters = await searchParams
   }

   // ❌ WRONG - TypeScript error!
   export default function Page({ params }) {
     const slug = params.slug
   }
   ```

3. **Component-based server data pattern** - Each client component gets its own server data file
   - Create `[component-name]-data.tsx` files in `src/components/[feature]/`
   - Server component fetches data and renders client component with data as props
   - Example: `blog-list-data.tsx` fetches data for `BlogList` client component
   - Multiple client components = multiple server data files (NOT one data.ts per route)

4. **Wrap data fetching in Suspense** - Enable streaming for better UX
   ```typescript
   <Suspense fallback={<Skeleton />}>
     <ServerDataComponent />
   </Suspense>
   ```

5. **Show loading states** - Create skeleton components for all Suspense fallbacks

**Quick Example:**
```typescript
// src/app/blog/page.tsx (Server Page)
import { Suspense } from 'react'
import { BlogListData } from '@/components/blog/blog-list-data'

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogListData filters={params} />
    </Suspense>
  )
}

// src/components/blog/blog-list-data.tsx (Server Data Component)
import { client } from '@/sanity/lib/client'
import { BlogList } from './blog-list'

export async function BlogListData({ filters }) {
  const posts = await client.fetch(`*[_type == "post"]`)
  return <BlogList posts={posts} />
}

// src/components/blog/blog-list.tsx (Client Component)
'use client'

export function BlogList({ posts }) {
  // Interactive UI receives data as props
  return <div>{/* ... */}</div>
}
```

**For comprehensive patterns and examples**, see [Architecture Patterns Documentation](memory-bank/architecture/patterns.md).

## Memory Bank System

This project uses a comprehensive memory bank system to track all features, decisions, and development progress. The memory bank is located in the `memory-bank/` directory and MUST be maintained for all development work.

### Memory Bank Structure

```
memory-bank/
├── FEATURES-INDEX.md           # Master index - START HERE
├── QUICK-START.md              # Quick reference guide
├── README.md                   # Full documentation
├── templates/
│   └── feature-template.md     # Template for new features
├── architecture/
│   ├── tech-stack.md           # Technology stack documentation
│   └── system-overview.md      # System architecture
└── features/
    ├── theme-system/           # Theme system feature docs
    ├── sanity-integration/     # Sanity CMS feature docs
    └── ui-components/          # UI components feature docs
```

### CRITICAL RULES for Memory Bank Usage

These rules are MANDATORY and must be followed for every development task:

#### Rule 1: Always Check Memory Bank First

Before starting ANY work:
1. **Read `memory-bank/FEATURES-INDEX.md`** to understand existing features
2. **Check if feature exists** in the memory bank
3. **Read existing documentation** for related features
4. **Understand dependencies** between features

#### Rule 2: Phase-Based Development is REQUIRED

All features MUST be developed in phases. Never implement an entire feature in one go.

**Phase Planning:**
- Break down features into logical phases (typically 3-5 phases)
- Each phase should be completable in a reasonable timeframe
- Phases should build upon each other incrementally
- Document all phases upfront in the feature's README.md

**Example Phases:**
```
Phase 1: Core implementation (data models, basic functionality)
Phase 2: UI components and integration
Phase 3: Testing and error handling
Phase 4: Documentation and polish
```

#### Rule 3: Update Memory Bank After EVERY Phase

**THIS IS CRITICAL - DO NOT SKIP THIS STEP**

After completing each phase, you MUST:
1. **Update feature README.md**:
   - Mark phase as completed
   - Document what was implemented
   - Update code examples if needed
   - Add any new configuration
2. **Update CHANGELOG.md**:
   - Add entry with date and phase number
   - List all changes made in this phase
   - Note any breaking changes
3. **Update FEATURES-INDEX.md** if status changed
4. **Commit changes** to memory bank

**DO NOT START THE NEXT PHASE** until memory bank is updated.

#### Rule 4: New Feature Workflow

When starting a new feature:

**Step 1: Planning Phase**
```bash
# Create feature folder
mkdir -p memory-bank/features/[feature-name]

# Copy template
cp memory-bank/templates/feature-template.md memory-bank/features/[feature-name]/README.md

# Create changelog
touch memory-bank/features/[feature-name]/CHANGELOG.md
```

**Step 2: Document the Plan**
- Fill in the feature template with:
  - Overview and use cases
  - Technical approach
  - **List all phases with clear objectives**
  - Dependencies
  - Key decisions
- Add feature to `memory-bank/FEATURES-INDEX.md` with status "📋 Planned"

**Step 3: Get Approval**
- Present the plan to the user
- Confirm phase breakdown
- Clarify any ambiguities

**Step 4: Execute Phase by Phase**
For each phase:
1. Implement the phase
2. **STOP and update memory bank** (Rule 3)
3. Verify phase completion
4. Only then proceed to next phase

**Step 5: Mark as Complete**
- Update status to "✅ Completed" in FEATURES-INDEX.md
- Final review of all documentation
- Ensure changelog is complete

#### Rule 5: Modifying Existing Features

When modifying existing features:
1. **Read the feature's README.md** first - understand current implementation
2. **Check CHANGELOG.md** - understand previous changes
3. **Review Decision Log** - understand why choices were made
4. Make your changes
5. **Update documentation**:
   - Update affected sections in README.md
   - Add entry to CHANGELOG.md
   - Update "Last Modified" date
   - Update Decision Log if architectural changes made

#### Rule 6: Documentation Standards

All memory bank documentation MUST include:
- **File paths**: Reference actual files (e.g., `src/components/ui/button.tsx`)
- **Code examples**: Show actual usage patterns
- **Decision rationale**: Explain WHY, not just WHAT
- **Dependencies**: Note what this feature depends on
- **Date stamps**: Keep "Last Modified" current

#### Rule 7: Cross-Feature Dependencies

When a feature depends on another:
1. **Document in both features**:
   - List dependency in "Dependencies" section
   - Explain why dependency exists
2. **Update FEATURES-INDEX.md** dependency graph
3. **Consider impact** when modifying dependencies

### Memory Bank Workflow Example

**User Request**: "Add user authentication"

**Correct Workflow:**
```
1. Check memory-bank/FEATURES-INDEX.md
   → No authentication feature exists

2. Create feature folder and copy template
   → memory-bank/features/user-authentication/

3. Plan phases in README.md:
   Phase 1: Setup auth provider and basic config
   Phase 2: Login/logout UI components
   Phase 3: Protected routes and middleware
   Phase 4: Session management and persistence
   Phase 5: Testing and error handling

4. Add to FEATURES-INDEX.md with status "🚧 In Development"

5. Implement Phase 1
   → Add auth provider, configuration

6. ⚠️ STOP - Update memory bank:
   → Update README.md with Phase 1 details
   → Add entry to CHANGELOG.md
   → Commit memory bank changes

7. Implement Phase 2
   → Create login/logout components

8. ⚠️ STOP - Update memory bank again
   → Update README.md with Phase 2 details
   → Add entry to CHANGELOG.md
   → Commit memory bank changes

9. Continue for remaining phases...

10. After final phase, mark as "✅ Completed" in FEATURES-INDEX.md
```

**Incorrect Workflow (DO NOT DO THIS):**
```
❌ Implement entire auth system in one go
❌ Update documentation only at the end
❌ Skip changelog updates
❌ Forget to update FEATURES-INDEX.md
```

### Quick Reference: Memory Bank Tasks

| When... | Action Required |
|---------|----------------|
| Starting new feature | Create folder → Copy template → Plan phases → Update index |
| Completing a phase | Update README → Update CHANGELOG → Commit → THEN continue |
| Modifying feature | Read docs first → Make changes → Update docs → Update changelog |
| Making architectural decision | Document in Decision Log with rationale |
| Feature complete | Update status to ✅ in FEATURES-INDEX.md |

### Memory Bank Benefits

Following these rules ensures:
- ✅ Complete historical record of all development
- ✅ Clear understanding of why decisions were made
- ✅ Easy onboarding for new developers or future Claude instances
- ✅ Incremental, reviewable progress through phases
- ✅ No lost context between sessions
- ✅ Ability to resume work from any point

### Important Reminders

**NEVER:**
- ❌ Skip memory bank updates between phases
- ❌ Implement entire features without phase breakdown
- ❌ Modify code without reading existing documentation
- ❌ Forget to update FEATURES-INDEX.md
- ❌ Leave documentation outdated

**ALWAYS:**
- ✅ Check FEATURES-INDEX.md before starting work
- ✅ Plan features in phases (3-5 phases typical)
- ✅ Update memory bank after EVERY phase
- ✅ Document decisions with rationale
- ✅ Keep file paths and examples current
