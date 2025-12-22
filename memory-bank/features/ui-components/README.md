# UI Component Library

> **Status**: In Development
> **Created**: 2025-12-23
> **Last Modified**: 2025-12-23
> **Owner/Lead**: Team

## Overview

A collection of reusable, accessible UI components built on Radix UI primitives and styled with Tailwind CSS. Components follow a consistent pattern of unstyled primitives enhanced with utility classes and variants using class-variance-authority.

## User Story / Use Case

**As a** developer
**I want** reusable, accessible UI components
**So that** I can build consistent interfaces quickly without reinventing common patterns

### Example Scenarios
- Use Button component with different variants (default, destructive, outline)
- Implement Accordion for FAQ sections
- Add DropdownMenu for user actions
- Extend components with custom styling using Tailwind

## Technical Implementation

### Architecture

```
Radix UI Primitive (unstyled, accessible)
    ↓
Wrapper Component (src/components/ui/)
    ↓
Tailwind CSS Styling
    ↓
Class Variance Authority (variants)
    ↓
cn() utility (className merging)
    ↓
Exported Component
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Button | `src/components/ui/button.tsx` | Clickable button with variants |
| Accordion | `src/components/ui/accordion.tsx` | Collapsible content sections |
| DropdownMenu | `src/components/ui/dropdown-menu.tsx` | Dropdown menus and actions |
| ModeToggle | `src/components/global/mode-toggle.tsx` | Theme switcher using DropdownMenu |

### Tech Stack

- **Base**: Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Variants**: class-variance-authority
- **Icons**: Lucide React
- **Dependencies**:
  - `@radix-ui/react-accordion@1.2.12`
  - `@radix-ui/react-dropdown-menu@2.1.16`
  - `class-variance-authority@0.7.1`
  - `tailwind-merge@3.4.0`
  - `clsx@2.1.1`
  - `lucide-react@0.562.0`

### Component Pattern

All UI components follow this pattern:

1. **Import Radix Primitive**: Use unstyled component
2. **Create Styled Wrapper**: Add Tailwind classes
3. **Define Variants**: Use CVA for different styles
4. **Merge Classes**: Use `cn()` utility
5. **Export**: Make available for use

### Code Examples

**Button Component Pattern:**
```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "base classes here",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // props
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

**Using Components:**
```tsx
import { Button } from "@/components/ui/button"

// Default variant
<Button>Click me</Button>

// Destructive variant
<Button variant="destructive">Delete</Button>

// Custom classes
<Button className="w-full">Full Width</Button>
```

## Available Components

### Button

**Variants:**
- `default` - Primary action button
- `destructive` - Dangerous actions (delete, etc.)
- `outline` - Secondary actions
- `secondary` - Alternate style
- `ghost` - Minimal styling
- `link` - Link-styled button

**Sizes:**
- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Square icon button

**Example:**
```tsx
<Button variant="outline" size="sm">
  Small Outline Button
</Button>
```

### Accordion

**Purpose**: Collapsible content sections
**Base**: Radix UI Accordion
**Types**:
- Single: One item open at a time
- Multiple: Multiple items can be open

**Example:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1?</AccordionTrigger>
    <AccordionContent>
      Answer 1
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### DropdownMenu

**Purpose**: Context menus and action dropdowns
**Base**: Radix UI DropdownMenu
**Features**:
- Keyboard navigation
- Focus management
- Portal rendering
- Positioning

**Example:**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Action 1</DropdownMenuItem>
    <DropdownMenuItem>Action 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Utility Functions

### cn() - className Merger

**Location**: `src/lib/utils.ts`
**Purpose**: Merge Tailwind classes intelligently

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```typescript
// Merges and deduplicates classes
cn("px-4 py-2", "px-6")  // Result: "px-6 py-2"

// Handles conditional classes
cn("text-base", isLarge && "text-lg")

// Merges arrays and objects
cn(["text-base", "font-bold"], { "text-red-500": hasError })
```

## Dependencies

### Internal Dependencies

- **Feature**: Theme System
  - **Why**: ModeToggle uses DropdownMenu and theme hook
  - **Location**: `memory-bank/features/theme-system/`

### External Dependencies

- **Package**: `@radix-ui/react-*`
  - **Purpose**: Accessible, unstyled primitives
  - **Alternatives Considered**: Headless UI (less comprehensive), custom (too much work)

- **Package**: `class-variance-authority`
  - **Purpose**: Type-safe variant management
  - **Alternatives Considered**: Manual variant logic (less maintainable)

- **Package**: `tailwind-merge`
  - **Purpose**: Intelligent class merging
  - **Alternatives Considered**: Simple concat (conflicts not resolved)

## Adding New Components

### Step 1: Choose Radix Primitive

Find appropriate primitive at [radix-ui.com](https://www.radix-ui.com/)

### Step 2: Create Component File

Create in `src/components/ui/[component-name].tsx`

### Step 3: Import and Style

```typescript
import * as RadixPrimitive from "@radix-ui/react-primitive"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define variants if needed
const componentVariants = cva("base-classes", {
  variants: {
    // variant definitions
  }
})

// Create wrapped component
export function Component({ className, ...props }) {
  return (
    <RadixPrimitive.Root
      className={cn(componentVariants(), className)}
      {...props}
    />
  )
}
```

### Step 4: Export Sub-components

For complex components, export all sub-components:

```typescript
export {
  Component,
  ComponentTrigger,
  ComponentContent,
}
```

## Styling Guidelines

### Tailwind Classes to Use

- **Spacing**: `px-4`, `py-2`, `gap-2`
- **Colors**: Use CSS variables: `bg-primary`, `text-foreground`
- **Borders**: `border`, `rounded-md`
- **Transitions**: `transition-colors`, `duration-200`
- **Focus**: `focus-visible:outline-none focus-visible:ring-2`

### Dark Mode

Always include dark mode variants:
```typescript
"bg-white dark:bg-slate-900"
"text-slate-900 dark:text-slate-50"
```

### Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes (Radix handles this)
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast

## Testing

### Manual Test Scenarios

For each component:
- [ ] Renders correctly with default props
- [ ] All variants display properly
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Dark mode styles applied
- [ ] Responsive on mobile
- [ ] Screen reader announces correctly

### Component Checklist

When creating new components:
- [ ] Uses Radix primitive (if available)
- [ ] Styled with Tailwind CSS
- [ ] Variants defined with CVA (if needed)
- [ ] Supports className prop
- [ ] Dark mode styles included
- [ ] TypeScript types exported
- [ ] Forwarded refs (if needed)

## Known Issues / Limitations

- **Limited Components**: Only basic components implemented
  - **Plan**: Add more as needed
- **No Storybook**: Components not documented in Storybook
  - **Alternative**: Examples in this doc

## Future Enhancements

- [ ] **More Components**: Add Dialog, Toast, Tabs, etc.
- [ ] **Component Variants**: Expand variant options
- [ ] **Documentation**: Consider Storybook or similar
- [ ] **Testing**: Add component tests
- [ ] **Accessibility Audit**: Comprehensive a11y testing

## Decision Log

### Decision 1: Use Radix UI Over Headless UI

**Date**: 2025-12-23
**Context**: Choose component primitive library
**Decision**: Use Radix UI
**Rationale**:
- More comprehensive component set
- Better TypeScript support
- Excellent accessibility
- Active development
- Good documentation
**Alternatives**:
- Headless UI (less components)
- Custom implementation (too much work)
**Consequences**:
- Dependency on Radix UI
- Consistent API across components

### Decision 2: Class Variance Authority for Variants

**Date**: 2025-12-23
**Context**: Manage component variants
**Decision**: Use CVA library
**Rationale**:
- Type-safe variants
- Clear variant definitions
- Popular in Tailwind community
- Good DX
**Alternatives**:
- Manual className logic (harder to maintain)
- Stitches (more complex)
**Consequences**:
- Small dependency added
- Better variant management

### Decision 3: Separate ui/ and global/ Directories

**Date**: 2025-12-23
**Context**: Organize components
**Decision**: Split into ui/ (reusable) and global/ (app-specific)
**Rationale**:
- Clear separation of concerns
- ui/ components are fully reusable
- global/ components are app-specific
**Alternatives**:
- Single components/ directory (less organization)
**Consequences**:
- Clearer component organization
- Easy to identify reusable parts

## Performance Considerations

- **Bundle Size**: Radix UI is tree-shakeable, only used components bundled
- **Runtime**: Minimal overhead, mostly styling
- **No JS Required**: Components work without JS (where possible)
- **CSS**: Tailwind purges unused classes in production

## Troubleshooting

### Common Problems

**Problem 1: Styles not applying**
- **Cause**: Tailwind not processing classes
- **Solution**: Ensure file is in Tailwind content paths

**Problem 2: Dark mode not working**
- **Cause**: Missing `dark:` variants
- **Solution**: Add dark mode classes to all color-related styles

**Problem 3: TypeScript errors with variants**
- **Cause**: Incorrect VariantProps usage
- **Solution**: Properly extend VariantProps<typeof variants>

## Resources

### Documentation
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CVA](https://cva.style/)
- [Lucide Icons](https://lucide.dev/)

### Related Files
- `src/components/ui/*.tsx` - UI components
- `src/components/global/*.tsx` - Global components
- `src/lib/utils.ts` - Utility functions

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed history.

### Recent Changes

- **2025-12-23**: Initial component library setup
  - Created Button, Accordion, DropdownMenu components
  - Implemented cn() utility
  - Set up component patterns and structure

---

**Last Reviewed**: 2025-12-23
**Review Schedule**: As needed
