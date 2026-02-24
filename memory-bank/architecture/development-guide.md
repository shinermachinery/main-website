# Development Guide

**Last Updated**: 2026-02-25

This is the central reference for development commands, tooling configuration, and project setup.

## Development Commands

**IMPORTANT: Always use `bun` for package management and running scripts.**

| Command | Purpose |
|---------|---------|
| `bun dev` | Start development server (http://localhost:3000) |
| `bun run build` | Build for production |
| `bun start` | Start production server |
| `bun run lint` | Check with Biome |
| `bun run format` | Format with Biome |
| `bun install` | Install dependencies |
| `bun add <pkg>` | Add a dependency |
| `bun add -d <pkg>` | Add a dev dependency |

## Biome Configuration

Biome is used instead of ESLint/Prettier. Configuration in `biome.json`:
- Formatter: 2-space indentation
- Linter: Enabled with recommended rules for Next.js and React
- Auto-organize imports enabled
- Ignores: node_modules, .next, dist, build

Ensure code passes Biome checks before committing.

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

## Key Configuration Details

### Path Alias
- `@/*` maps to `./src/*`

### Sanity Integration
- Studio mounted at `/studio` route via catch-all dynamic route
- Requires environment variables in `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
- API version defaults to `2025-12-22`
- Client configured in `src/sanity/lib/client.ts` with CDN enabled

### Theme System
- Uses next-themes with system detection
- ThemeProvider in root layout with `suppressHydrationWarning`
- Mode toggle component in `src/components/global/mode-toggle.tsx`
- CSS variables for both themes in `src/app/globals.css` (`:root` for light, `.dark` for dark)
- Dark variant enabled via `@custom-variant dark (&:is(.dark *));` in globals.css
- Use semantic color tokens (`bg-background`, `text-foreground`, `bg-secondary`, etc.)
- Avoid hardcoded colors like `bg-white` or `text-black` — use tokens instead

### Styling
- Tailwind CSS v4 configured in `postcss.config.mjs`
- `tailwind-merge` and `class-variance-authority` for component variants
- Global styles in `src/app/globals.css`
- Custom utility `cn()` in `src/lib/utils.ts` for className merging

### Fonts
- Geist Sans and Geist Mono from `next/font/google`
- CSS variables: `--font-geist-sans`, `--font-geist-mono`

## shadcn/ui Component Development

**Always use shadcn/ui components when building new UI elements.**

### Installing Components
```bash
bunx shadcn@latest add <component-name>

# Examples:
bunx shadcn@latest add button
bunx shadcn@latest add dialog
bunx shadcn@latest add card
```

**Components installed to:** `src/components/ui/`

### Usage Rules
1. **Prefer shadcn/ui** over custom implementations
2. **Customize with `className`**, not by modifying component source files
3. **Use `cn()` utility** for conditional classes
4. **Use `bunx`** not `npx` (Bun package manager)
5. **Check `src/components/ui/`** before adding — may already exist

### Styling Approach
```tsx
// Ultra-thin design pattern
<Button
  variant="ghost"
  className="border border-zinc-100 hover:border-zinc-200 font-light"
>
  Ultra-thin Button
</Button>

<Card className="border-zinc-100 shadow-sm">
  <CardContent className="p-4">
    Light mode content
  </CardContent>
</Card>
```

### Common Components
Button, Card, Dialog/Modal, Form, Select/Dropdown, Tabs, Toast, Tooltip, Accordion, Alert

See [UI Components Feature Docs](../features/ui-components/README.md) for full details.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (landing)/          # Landing page route group
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About pages
│   │   ├── blog/           # Blog pages
│   │   ├── contact/        # Contact page
│   │   ├── events/         # Events page
│   │   ├── products/       # Products pages
│   │   ├── projects/       # Projects page
│   │   ├── services/       # Services page
│   │   └── layout.tsx      # Landing layout (Navbar + Footer)
│   ├── studio/[[...tool]]/ # Sanity Studio at /studio
│   ├── layout.tsx          # Root layout (fonts, theme)
│   ├── globals.css         # Global styles & theme vars
│   ├── robots.ts           # Robots.txt generation
│   ├── sitemap.ts          # Sitemap generation
│   ├── manifest.ts         # PWA manifest
│   ├── error.tsx           # Global error boundary
│   └── not-found.tsx       # Custom 404 page
├── components/
│   ├── global/             # Global components (navbar, footer, mode-toggle)
│   ├── ui/                 # shadcn/ui components
│   ├── landing/            # Landing page section components
│   ├── blog/               # Blog components
│   ├── products/           # Product components
│   ├── projects/           # Project components
│   ├── team/               # Team components
│   ├── events/             # Event components
│   ├── sections/           # Shared section components
│   ├── shared/             # Shared search/filter components
│   └── cards/              # Card components
├── actions/                # Server actions (data fetching layer)
├── lib/
│   ├── theme-provider.tsx  # next-themes provider wrapper
│   ├── utils.ts            # Utility functions (cn helper)
│   └── site-config.ts      # Centralized site configuration
└── sanity/
    ├── env.ts              # Sanity environment config
    ├── lib/
    │   ├── client.ts       # Sanity client instance
    │   ├── image.ts        # Image URL builder
    │   ├── live.ts         # Live preview / sanityFetch
    │   └── queries/        # GROQ queries organized by domain
    │       ├── pages/      # Page-specific queries
    │       └── shared/     # Shared projections and utilities
    ├── schemaTypes/        # Sanity content schemas (19 types, 7 domains)
    └── structure.ts        # Sanity Studio structure
```

## Development Notes

- React Compiler is enabled — avoid patterns that break its rules
- The Studio is statically generated (`dynamic = 'force-static'`)
- Use the Sanity client from `src/sanity/lib/client.ts` for queries
- Image optimization uses `@sanity/image-url` via `src/sanity/lib/image.ts`

## Related Documentation

- [Tech Stack](./tech-stack.md) - Full technology stack details
- [System Overview](./system-overview.md) - Architecture overview
- [Development Patterns](./patterns.md) - Server component & data patterns
- [Sanity Integration](../features/sanity-integration/README.md) - CMS schemas & queries
- [UI Components](../features/ui-components/README.md) - Component library details
- [Theme System](../features/theme-system/README.md) - Theme configuration

---

**Last Reviewed**: 2026-02-17
**Review Schedule**: As needed
