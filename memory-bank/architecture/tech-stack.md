# Technology Stack

**Last Updated**: 2026-02-25

## Core Framework

### Next.js 16.1.0
- **Type**: React Meta-Framework
- **Key Features**:
  - App Router (using `app/` directory)
  - Server Components by default
  - React 19.2.3 with React Compiler enabled
  - Built-in optimization for images, fonts, and scripts
- **Configuration**: `next.config.ts`

### React 19.2.3
- **React Compiler**: Enabled in `next.config.ts`
- **Features Used**:
  - Server Components
  - Client Components
  - Hooks (useState, useEffect, etc.)
  - Context API (for theming)

## Language & Type System

### TypeScript 5.x
- **Configuration**: `tsconfig.json`
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` → `./src/*`
- **Target**: ES2017
- **JSX**: react-jsx

## Content Management

### Sanity CMS v4
- **Type**: Headless CMS
- **Integration**: `next-sanity` package
- **Studio**: Embedded at `/studio` route
- **Key Packages**:
  - `sanity@4` - Core CMS
  - `next-sanity@12.0.5` - Next.js integration
  - `@sanity/vision@4` - GROQ query tool
  - `@sanity/client@7.13.2` - API client
  - `@sanity/image-url@2.0.2` - Image optimization
  - `@portabletext/react@6.0.0` - Rich text rendering
- **Configuration**: `sanity.config.ts`
- **Content Location**: `src/sanity/`

## Styling

### Tailwind CSS v4
- **Type**: Utility-first CSS framework
- **Configuration**: `postcss.config.mjs`
- **PostCSS**: `@tailwindcss/postcss@4`
- **Helper Libraries**:
  - `tailwind-merge@3.4.0` - Merge Tailwind classes
  - `class-variance-authority@0.7.1` - Variant utilities
  - `clsx@2.1.1` - Conditional classnames
  - `tw-animate-css@1.4.0` - Animation utilities
- **Utility**: `cn()` function in `src/lib/utils.ts`

### Styled Components 6
- **Purpose**: CSS-in-JS (likely for Sanity Studio customization)
- **Version**: 6.x

## UI Components

### Radix UI
- **Type**: Unstyled, accessible component primitives
- **Components Used**:
  - `@radix-ui/react-accordion@1.2.12`
  - `@radix-ui/react-dropdown-menu@2.1.16`
- **Pattern**: Styled with Tailwind CSS
- **Location**: `src/components/ui/`

### Lucide React
- **Type**: Icon library
- **Version**: 0.562.0
- **Usage**: SVG icons throughout the app

## Theming

### next-themes 0.4.6
- **Purpose**: Dark/light mode management
- **Features**:
  - System preference detection
  - localStorage persistence
  - Class-based theme switching
- **Provider**: `src/lib/theme-provider.tsx`
- **Component**: `src/components/global/mode-toggle.tsx`

## Development Tools

### Biome 2.2.0
- **Type**: Fast linter and formatter
- **Replaces**: ESLint + Prettier
- **Configuration**: `biome.json`
- **Features**:
  - Linting with Next.js and React rules
  - Code formatting (2-space indentation)
  - Auto-organize imports
  - Git integration
- **Commands**:
  - `npm run lint` - Check code
  - `npm run format` - Format code

## Fonts

### Plus Jakarta Sans (via next/font/google)
- **Primary font** for body text and headings
- **Optimization**: Automatic by Next.js

### Hyundai-Normal (Local Font)
- **Branding font** used for logo text
- **Location**: `src/fonts/hyundai-normal.ttf`
- **CSS Class**: `font-hyundai`

### Carousel
- **embla-carousel-react**: 8.6.0
- **embla-carousel-autoplay**: 8.6.0
- **Usage**: Product carousels, testimonials, hero featured products

## Runtime

### Node.js
- **Minimum Version**: Node 20+ (implied by Next.js 16)
- **Package Manager**: bun (required)
- **Scripts**: Defined in `package.json`

## Build Tools

### PostCSS
- **Configuration**: `postcss.config.mjs`
- **Plugins**: Tailwind CSS v4 plugin

## Key Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.0 | Framework |
| react | 19.2.3 | UI Library |
| sanity | 4 | CMS |
| next-sanity | 12.0.5 | CMS Integration |
| tailwindcss | 4 | Styling |
| @biomejs/biome | 2.2.0 | Linting/Formatting |
| next-themes | 0.4.6 | Theme Management |
| typescript | 5.x | Type System |

## Environment Variables

Required variables (see `.env.example`):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project identifier
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name (e.g., production)

Optional:
- `NEXT_PUBLIC_SANITY_API_VERSION` - Defaults to `2025-12-22`

## Version Strategy

- **React 19**: Using latest stable React
- **Next.js 16**: Using latest major version
- **Tailwind v4**: Early adopter of v4
- **Biome**: Modern tooling over ESLint/Prettier
- **Sanity v4**: Using latest Sanity version

## Notable Patterns

- **No ESLint/Prettier**: Using Biome instead
- **React Compiler**: Enabled for optimization
- **Embedded CMS**: Sanity Studio served from Next.js
- **Modern React**: Server Components by default
- **Type Safety**: Strict TypeScript everywhere

## Required Development Patterns

For consistent Next.js 16 development, follow these mandatory patterns:

- **Server Components First**: All pages are server components by default
- **Async Params/SearchParams**: Always await in Next.js 16
- **Component-Based Data**: Each client component gets its own server data component
- **Server Data Components**: `[component-name]-data.tsx` files in components folder for data fetching
- **Suspense Boundaries**: Enable streaming and loading states
- **Client Components**: Only when interactivity needed, receive data as props

**See**: [Development Patterns](./patterns.md) for detailed guidance and examples.
