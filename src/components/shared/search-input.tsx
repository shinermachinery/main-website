"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  paramName?: string;
  basePath: string;
}

export function SearchInput({
  placeholder = "Search...",
  defaultValue = "",
  paramName = "q",
  basePath,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const value = (formData.get(paramName) as string)?.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }

      const queryString = params.toString();
      router.push(queryString ? `${basePath}?${queryString}` : basePath);
    },
    [router, searchParams, paramName, basePath],
  );

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
      <input
        type="text"
        name={paramName}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full h-12 pl-12 pr-4 rounded-xl bg-background border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue"
      />
    </form>
  );
}
