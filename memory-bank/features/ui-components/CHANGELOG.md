# Changelog - UI Component Library

All notable changes to the UI component library will be documented in this file.

## [1.0.0] - 2025-12-23

### Added
- Initial UI component library setup
- Component architecture based on Radix UI + Tailwind CSS
- cn() utility function for className merging
- Three core components: Button, Accordion, DropdownMenu
- ModeToggle global component using DropdownMenu

### Components

**Button Component:**
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Full TypeScript support with VariantProps

**Accordion Component:**
- Based on Radix UI Accordion
- Supports single and multiple modes
- Styled with Tailwind CSS
- Keyboard navigation and accessibility

**DropdownMenu Component:**
- Based on Radix UI DropdownMenu
- Keyboard navigation
- Portal rendering
- Focus management
- Multiple sub-components (Trigger, Content, Item, etc.)

**ModeToggle Component:**
- Theme switcher using DropdownMenu
- Light, Dark, System options
- Lucide icons (Sun, Moon)

### Utilities

**cn() Function:**
- Located in `src/lib/utils.ts`
- Merges Tailwind classes intelligently
- Uses clsx + tailwind-merge
- Handles conditionals and deduplication

### Files Created
- `src/components/ui/button.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/global/mode-toggle.tsx`
- `src/lib/utils.ts`

### Dependencies Added
- @radix-ui/react-accordion@1.2.12
- @radix-ui/react-dropdown-menu@2.1.16
- class-variance-authority@0.7.1
- tailwind-merge@3.4.0
- clsx@2.1.1
- lucide-react@0.562.0

### Patterns Established
- Radix UI as base for accessibility
- Tailwind CSS for styling
- CVA for variant management
- cn() for className merging
- Separate ui/ and global/ directories
- TypeScript for type safety
- Dark mode support in all components
