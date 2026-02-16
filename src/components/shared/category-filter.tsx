"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const currentValue = searchParams.get(paramName) || "all";

  const handleValueChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== "all") {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }

      const queryString = params.toString();
      router.push(queryString ? `${basePath}?${queryString}` : basePath);
    },
    [router, searchParams, paramName, basePath],
  );

  const allCategories: CategoryOption[] = [
    { value: "all", label: placeholder },
    ...categories,
  ];

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className="h-12 px-4 rounded-xl bg-background border-none">
        <SelectValue
          placeholder={placeholder}
          className="text-primary"
        />
      </SelectTrigger>
      <SelectContent>
        {allCategories.map((category) => (
          <SelectItem
            key={category.value}
            value={category.value}
            className="text-primary"
          >
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
