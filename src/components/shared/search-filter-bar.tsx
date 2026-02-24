"use client";

import { ActiveFilters } from "./active-filters";
import { CategoryFilter } from "./category-filter";
import { SearchInput } from "./search-input";

interface CategoryOption {
  label: string;
  value: string;
}

interface SearchFilterBarProps {
  basePath: string;
  searchPlaceholder?: string;
  categoryPlaceholder?: string;
  categories: CategoryOption[];
  searchParam?: string;
  categoryParam?: string;
  currentSearch?: string;
  currentCategory?: string;
}

export function SearchFilterBar({
  basePath,
  searchPlaceholder = "Search...",
  categoryPlaceholder = "All Categories",
  categories,
  searchParam = "q",
  categoryParam = "category",
  currentSearch,
  currentCategory,
}: SearchFilterBarProps) {
  const activeFilters = [];

  if (currentCategory) {
    const selectedSlugs = currentCategory.split(",");
    for (const slug of selectedSlugs) {
      const categoryLabel =
        categories.find((c) => c.value === slug)?.label || slug;
      activeFilters.push({
        key: `Category-${slug}`,
        label: categoryLabel,
        paramName: categoryParam,
        paramValue: slug,
      });
    }
  }

  return (
    <div className="mb-10 w-full">
      <div className="w-full flex flex-col md:flex-row gap-4 items-start md:items-center">
        <SearchInput
          placeholder={searchPlaceholder}
          defaultValue={currentSearch}
          paramName={searchParam}
          basePath={basePath}
        />
        <CategoryFilter
          categories={categories}
          paramName={categoryParam}
          basePath={basePath}
          placeholder={categoryPlaceholder}
        />
      </div>

      <ActiveFilters filters={activeFilters} basePath={basePath} />
    </div>
  );
}
