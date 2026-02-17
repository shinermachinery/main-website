"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ActiveFilter {
  key: string;
  label: string;
  paramName: string;
  paramValue: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  basePath: string;
}

export function ActiveFilters({ filters, basePath }: ActiveFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(paramName) || "";

    // Handle comma-separated values (multi-category)
    if (current.includes(",")) {
      const values = current.split(",").filter((v) => v !== paramValue);
      if (values.length > 0) {
        params.set(paramName, values.join(","));
      } else {
        params.delete(paramName);
      }
    } else {
      params.delete(paramName);
    }

    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {filters.map((filter) => (
        <div
          key={filter.key}
          className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-full"
        >
          <span className="font-medium text-sm text-foreground">
            {filter.label}
          </span>
          <button
            type="button"
            onClick={() => removeFilter(filter.paramName, filter.paramValue)}
            className="size-5 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
