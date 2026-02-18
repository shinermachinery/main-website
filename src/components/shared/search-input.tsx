"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [value, setValue] = useState(defaultValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const pushSearch = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set(paramName, search);
    } else {
      params.delete(paramName);
    }

    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      pushSearch(next.trim());
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    pushSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
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
        value={value}
        onChange={handleChange}
        className="h-12 pl-12 pr-4 rounded-full bg-background border-none"
      />
    </form>
  );
}
