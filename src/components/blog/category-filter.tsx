"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "machinery", label: "Machinery" },
  { value: "engineering", label: "Engineering" },
  { value: "innovation", label: "Innovation" },
  { value: "industry", label: "Industry News" },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <Select value={currentCategory} onValueChange={handleValueChange}>
      <SelectTrigger className="h-12 px-4 rounded-xl bg-background border-none">
        <SelectValue placeholder="All Categories" className="text-primary" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
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
