import { cn } from "@/lib/utils";

interface GridColumns {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

interface ResponsiveGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: GridColumns;
  gap?: string;
  className?: string;
}

/**
 * A flexible responsive grid component that renders items with configurable breakpoints.
 * Handles responsive column layouts and provides a clean API for rendering lists of items.
 *
 * @param items - Array of items to render in the grid
 * @param renderItem - Function that renders each item (receives item and index)
 * @param columns - Responsive column configuration: {mobile?, tablet?, desktop?} (default: {mobile: 1, tablet: 2, desktop: 3})
 * @param gap - Tailwind gap class value (e.g., "6", "10") (default: "6")
 * @param className - Additional CSS classes to merge with the component
 *
 * @example
 * ```tsx
 * // Standard 3-column grid
 * <ResponsiveGrid
 *   items={products}
 *   renderItem={(product) => <ProductCard {...product} />}
 * />
 *
 * // 4-column desktop grid with larger gap
 * <ResponsiveGrid
 *   items={items}
 *   renderItem={(item, index) => <Card key={index}>{item.name}</Card>}
 *   columns={{ mobile: 1, tablet: 2, desktop: 4 }}
 *   gap="10"
 * />
 *
 * // Custom single column grid
 * <ResponsiveGrid
 *   items={articles}
 *   renderItem={(article) => <ArticlePreview {...article} />}
 *   columns={{ mobile: 1, tablet: 1, desktop: 1 }}
 * />
 * ```
 */
export function ResponsiveGrid<T>({
  items,
  renderItem,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "6",
  className,
}: ResponsiveGridProps<T>) {
  const { mobile = 1, tablet = 2, desktop = 3 } = columns;

  return (
    <div
      className={cn(
        "grid",
        `gap-${gap}`,
        `grid-cols-${mobile}`,
        `md:grid-cols-${tablet}`,
        `lg:grid-cols-${desktop}`,
        className,
      )}
    >
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}
