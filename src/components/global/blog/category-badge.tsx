/**
 * Category Badge Component
 * Small, pill-shaped badge for displaying post categories
 * Can be clickable for filtering or static for display
 */

"use client";

import Link from "next/link";
import type { Category } from "@/lib/sanity-types";

export interface CategoryBadgeProps {
  category: Category;
  variant?: "default" | "outline" | "subtle";
  clickable?: boolean;
  size?: "sm" | "md" | "lg";
}

export function CategoryBadge({
  category,
  variant = "default",
  clickable = false,
  size = "md",
}: CategoryBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const variantClasses = {
    default:
      "bg-gradient-to-r from-brand-blue to-brand-green text-white hover:opacity-90",
    outline:
      "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    subtle: "bg-secondary text-foreground hover:bg-secondary/80",
  };

  const baseClasses = `inline-flex items-center rounded-full font-medium transition-all ${sizeClasses[size]} ${variantClasses[variant]}`;

  if (clickable) {
    return (
      <Link
        href={`/blog/category/${category.slug.current}`}
        className={baseClasses}
        aria-label={`View posts in ${category.title} category`}
      >
        {category.title}
      </Link>
    );
  }

  return (
    <span className={baseClasses} role="status">
      {category.title}
    </span>
  );
}
