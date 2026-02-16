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

  if (currentSearch) {
    activeFilters.push({
      key: "Search",
      label: `Search: ${currentSearch}`,
      paramName: searchParam,
    });
  }

  if (currentCategory) {
    const categoryLabel =
      categories.find((c) => c.value === currentCategory)?.label ||
      currentCategory;
    activeFilters.push({
      key: "Category",
      label: categoryLabel,
      paramName: categoryParam,
    });
  }

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
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
