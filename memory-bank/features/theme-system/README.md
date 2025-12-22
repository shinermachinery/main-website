# Theme System

> **Status**: Completed
> **Created**: 2025-12-23
> **Last Modified**: 2025-12-23
> **Owner/Lead**: Team

## Overview

A comprehensive dark/light theme system using next-themes that provides automatic system preference detection, manual theme switching, and persistent theme selection across sessions.

## User Story / Use Case

**As a** user
**I want** to switch between dark and light modes
**So that** I can view the site comfortably in different lighting conditions

### Example Scenarios
- User visits site in dark mode at night, system automatically applies dark theme
- User manually toggles to light mode, preference is saved for future visits
- User switches OS to dark mode, site theme updates automatically if set to "system"

## Technical Implementation

### Architecture

```
Root Layout (app/layout.tsx)
    ↓
ThemeProvider (wraps entire app)
    ↓
- Reads localStorage
- Detects system preference
- Applies theme class to <html>
    ↓
ModeToggle Component (user control)
    ↓
Changes theme via next-themes
    ↓
Persists to localStorage
    ↓
Updates HTML class
    ↓
CSS variables respond
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| ThemeProvider | `src/lib/theme-provider.tsx` | Wraps app, manages theme state |
| ModeToggle | `src/components/global/mode-toggle.tsx` | UI control for theme switching |
| Root Layout | `src/app/layout.tsx` | Includes provider with suppressHydrationWarning |

### Tech Stack

- **Framework/Library**: next-themes
- **Dependencies**:
  - `next-themes@0.4.6` - Theme management
  - `@radix-ui/react-dropdown-menu@2.1.16` - Dropdown UI for toggle
  - `lucide-react@0.562.0` - Icons (Sun, Moon)
- **APIs/Services**: None (client-side only)

### Data Flow

1. **Initial Load**: ThemeProvider reads localStorage or system preference
2. **Apply Theme**: Sets `class="dark"` or `class="light"` on `<html>` element
3. **User Toggle**: ModeToggle component calls `setTheme()`
4. **Persist**: next-themes saves preference to localStorage
5. **Update**: HTML class changes, CSS variables respond, UI updates

### Code Examples

**Basic Setup (Root Layout):**
```typescript
import { ThemeProvider } from "@/lib/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Using Theme in Components:**
```typescript
'use client'
import { useTheme } from 'next-themes'

export function Component() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme('dark')}>
      Current: {theme}
    </button>
  )
}
```

## Configuration

### ThemeProvider Props

- **attribute**: `"class"` - Applies theme as class on HTML element
- **defaultTheme**: `"system"` - Default to system preference
- **enableSystem**: `true` - Allow system preference detection
- **disableTransitionOnChange**: `true` - Prevent CSS transitions during theme switch

### CSS Variables

Tailwind CSS automatically handles dark mode via the `dark:` prefix:
```css
/* Light mode */
.element { @apply bg-white text-black; }

/* Dark mode */
.element { @apply dark:bg-black dark:text-white; }
```

## Dependencies

### Internal Dependencies

- **Feature**: UI Components
  - **Why**: ModeToggle uses Radix UI dropdown
  - **Location**: `memory-bank/features/ui-components/`

### External Dependencies

- **Package**: `next-themes`
  - **Version**: ^0.4.6
  - **Purpose**: Simplified theme management for Next.js
  - **Alternatives Considered**: Custom implementation (more work, less reliable)

## API Reference

### ThemeProvider Component

**Props**:
```typescript
interface ThemeProviderProps {
  attribute?: 'class' | 'data-theme'  // How theme is applied
  defaultTheme?: string               // Default theme
  enableSystem?: boolean              // Enable system detection
  disableTransitionOnChange?: boolean // Disable transitions
  children: React.ReactNode
}
```

### useTheme Hook

```typescript
const { theme, setTheme, systemTheme } = useTheme()

// theme: 'light' | 'dark' | 'system'
// setTheme: (theme: string) => void
// systemTheme: 'light' | 'dark' (actual system preference)
```

### ModeToggle Component

**Usage**:
```tsx
import { ModeToggle } from '@/components/global/mode-toggle'

<ModeToggle />
```

**No props required** - Renders dropdown with Light/Dark/System options

## Testing

### Manual Test Scenarios

- [ ] Toggle between light, dark, and system modes
- [ ] Verify preference persists after page reload
- [ ] Change OS theme while on "system" mode
- [ ] Verify no flash of wrong theme on initial load
- [ ] Test in different browsers

## Known Issues / Limitations

- **Flash on Initial Load**: Minimal flash possible if localStorage differs from SSR
  - **Mitigation**: `suppressHydrationWarning` on `<html>` element
- **System Theme Detection**: Requires browser support for `prefers-color-scheme`
  - **Fallback**: Defaults to light mode on unsupported browsers

## Future Enhancements

- [ ] **Custom theme colors**: Allow users to choose accent colors
- [ ] **Per-page themes**: Different themes for different sections
- [ ] **Scheduled themes**: Auto-switch based on time of day

## Decision Log

### Decision 1: Use next-themes Library

**Date**: 2025-12-23
**Context**: Need reliable theme management with system detection
**Decision**: Use next-themes instead of custom implementation
**Rationale**:
- Handles edge cases (SSR, localStorage, system detection)
- Widely used and maintained
- Minimal bundle size
- Simple API
**Alternatives**:
- Custom implementation (more work, more bugs)
- Other libraries (less Next.js specific)
**Consequences**:
- Small dependency added
- Simplified implementation
- Reliable behavior

### Decision 2: Class-based Themes

**Date**: 2025-12-23
**Context**: Choose how to apply themes (class vs data attribute)
**Decision**: Use class-based themes (`class="dark"`)
**Rationale**:
- Works seamlessly with Tailwind's `dark:` prefix
- Standard approach for Tailwind
- Better IDE support
**Alternatives**:
- Data attributes (less common with Tailwind)
- CSS variables only (more complex)
**Consequences**:
- Standard Tailwind pattern
- Easy to understand and maintain

### Decision 3: Disable Transitions on Change

**Date**: 2025-12-23
**Context**: Prevent jarring animations during theme switch
**Decision**: Set `disableTransitionOnChange={true}`
**Rationale**:
- Instant theme change feels more responsive
- Avoids weird transition effects
- Common UX pattern
**Alternatives**:
- Enable transitions (can look glitchy)
**Consequences**:
- Instant visual change
- Better UX

## Performance Considerations

- **localStorage Access**: Minimal impact, synchronous read on mount
- **Theme Application**: Single class change on HTML element
- **Bundle Size**: next-themes adds ~2KB gzipped
- **No Runtime Overhead**: Once applied, no performance impact

## Security Considerations

- **localStorage**: Only stores theme preference (non-sensitive)
- **XSS Protection**: Theme values are sanitized by next-themes
- **No External Calls**: Entirely client-side, no API calls

## Troubleshooting

### Common Problems

**Problem 1: Flash of wrong theme on page load**
- **Cause**: Server-rendered theme differs from client preference
- **Solution**: `suppressHydrationWarning` already applied to `<html>`

**Problem 2: Theme not persisting**
- **Cause**: localStorage blocked or unavailable
- **Solution**: Check browser privacy settings, ensure localStorage is enabled

**Problem 3: System theme not detecting**
- **Cause**: Browser doesn't support `prefers-color-scheme`
- **Solution**: Falls back to default theme (light)

## Resources

### Documentation
- [next-themes GitHub](https://github.com/pacocoursey/next-themes)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)

### Related Files
- `src/lib/theme-provider.tsx`
- `src/components/global/mode-toggle.tsx`
- `src/app/layout.tsx`

## Changelog

### Recent Changes

- **2025-12-23**: Initial implementation
  - Added ThemeProvider wrapper
  - Created ModeToggle component
  - Configured root layout

---

**Last Reviewed**: 2025-12-23
**Review Schedule**: As needed
