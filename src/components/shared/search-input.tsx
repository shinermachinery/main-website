"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "@/components/ui/input";

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
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative flex-1"
      key={defaultValue}
    >
      <button
        type="submit"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <Search className="size-5" />
      </button>
      <Input
        type="text"
        name={paramName}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-12 pl-12 pr-4 rounded-full bg-background border-none"
      />
    </form>
  );
}
