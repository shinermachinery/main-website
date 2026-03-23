"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CategoryOption {
  label: string;
  value: string;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  paramName?: string;
  basePath: string;
  placeholder?: string;
}

export function CategoryFilter({
  categories,
  paramName = "category",
  basePath,
  placeholder = "All Categories",
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParam = searchParams.get(paramName) || "";
  const selectedValues = currentParam ? currentParam.split(",") : [];

  const toggleCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let updated: string[];

    if (selectedValues.includes(value)) {
      updated = selectedValues.filter((v) => v !== value);
    } else {
      updated = [...selectedValues, value];
    }

    if (updated.length > 0) {
      params.set(paramName, updated.join(","));
    } else {
      params.delete(paramName);
    }

    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  const label =
    selectedValues.length === 0
      ? placeholder
      : selectedValues.length === 1
        ? categories.find((c) => c.value === selectedValues[0])?.label ||
          selectedValues[0]
        : `${selectedValues.length} selected`;

  return (
    <Popover>
      <PopoverTrigger className="h-12 px-4 rounded-xl bg-background flex items-center gap-2 text-sm text-foreground whitespace-nowrap">
        {label}
        <ChevronDown className="size-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-2">
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-background cursor-pointer"
            >
              <Checkbox
                checked={selectedValues.includes(category.value)}
                onCheckedChange={() => toggleCategory(category.value)}
              />
              <span className="text-sm">{category.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
