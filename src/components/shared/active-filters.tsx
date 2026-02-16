"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ActiveFilter {
  key: string;
  label: string;
  paramName: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  basePath: string;
}

export function ActiveFilters({ filters, basePath }: ActiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = useCallback(
    (paramName: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(paramName);

      const queryString = params.toString();
      router.push(queryString ? `${basePath}?${queryString}` : basePath);
    },
    [router, searchParams, basePath],
  );

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {filters.map((filter) => (
        <div
          key={filter.paramName}
          className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-full"
        >
          <span
            className="font-medium text-sm text-foreground"
          >
            {filter.label}
          </span>
          <button
            type="button"
            onClick={() => removeFilter(filter.paramName)}
            className="size-5 rounded-full bg-primary text-white flex items-center justify-center hover:bg-brand-blue transition-colors"
            aria-label={`Remove ${filter.key} filter`}
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
