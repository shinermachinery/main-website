# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**IMPORTANT: Always use `bun` for package management and running scripts.**

```bash
bun dev              # Start dev server (http://localhost:3000)
bun run build        # Build for production
bun start            # Start production server
bun run lint         # Check with Biome
bun run format       # Format with Biome
bun install          # Install dependencies
bun add <pkg>        # Add dependency
bun add -d <pkg>     # Add dev dependency
```

## Core Tech Stack

- **Next.js 16.1** with App Router and React 19.2.3 (React Compiler enabled)
- **Sanity CMS** for content management with embedded Studio at `/studio`
- **Biome** for linting and formatting (not ESLint/Prettier)
- **Tailwind CSS v4** with PostCSS
- **shadcn/ui** for UI components (PREFERRED for new components) — install with `bunx shadcn@latest add <component>`
- **next-themes** for light + dark mode
- **TypeScript** with strict mode, path alias `@/*` → `./src/*`

## Critical Development Rules

### 1. Pages MUST be server components
- NO `'use client'` on page files (exception: `/studio` route)
- Use client components only for interactivity (forms, events, state)

### 2. Always await params and searchParams (Next.js 16)
```typescript
// CORRECT
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const filters = await searchParams
}
```

### 3. Component-based server data pattern
- Create `[component-name]-data.tsx` files in `src/components/[feature]/`
- Server component fetches data → renders client component with data as props
- Multiple client components = multiple server data files (NOT one data.ts per route)

### 4. Wrap data fetching in Suspense
```typescript
<Suspense fallback={<Skeleton />}>
  <ServerDataComponent />
</Suspense>
```

### 5. Use shadcn/ui for all new UI components
- Prefer shadcn/ui over custom implementations
- Customize with `className`, not by modifying component source files
- Use `cn()` utility for conditional classes
- Check `src/components/ui/` before installing — may already exist

### 6. Use semantic color tokens
- Use `bg-background`, `text-foreground`, `bg-secondary`, etc.
- Avoid hardcoded colors like `bg-white` or `text-black`
- CSS variables for both themes defined in `src/app/globals.css`

## Memory Bank System

All detailed documentation lives in `memory-bank/`. **Read before starting work.**

### Quick Navigation

| Document | Purpose |
|----------|---------|
| [FEATURES-INDEX.md](memory-bank/FEATURES-INDEX.md) | Master feature list — **START HERE** |
| [Development Guide](memory-bank/architecture/development-guide.md) | Commands, config, MCP, shadcn/ui setup |
| [Development Patterns](memory-bank/architecture/patterns.md) | Server component & data flow patterns |
| [Tech Stack](memory-bank/architecture/tech-stack.md) | Full technology stack details |
| [System Overview](memory-bank/architecture/system-overview.md) | Architecture diagrams |
| [Workflow](memory-bank/WORKFLOW.md) | Phase-based development workflow |

### Mandatory Rules

1. **Check `memory-bank/FEATURES-INDEX.md` before starting ANY work**
2. **Phase-based development** — break features into 3-5 phases, never implement all at once
3. **Update memory bank after EVERY phase** — update feature README.md, CHANGELOG.md, and FEATURES-INDEX.md before proceeding
4. **New features** — create folder in `memory-bank/features/[name]/`, copy template, plan phases, get approval
5. **Modifying existing features** — read feature docs first, update docs after changes
6. **Document decisions** with rationale in Decision Log sections
7. **Cross-feature dependencies** — document in both features

### Quick Reference

| When... | Action |
|---------|--------|
| Starting new feature | Create folder → Copy template → Plan phases → Update index |
| Completing a phase | Update README → Update CHANGELOG → Commit → THEN continue |
| Modifying feature | Read docs first → Make changes → Update docs |
| Feature complete | Mark status ✅ in FEATURES-INDEX.md |

Full workflow details: [WORKFLOW.md](memory-bank/WORKFLOW.md)
