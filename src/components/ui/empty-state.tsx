import { AlertCircle, Inbox, Search, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const variantDefaults: Record<
  string,
  { icon: LucideIcon; title: string }
> = {
  empty: { icon: Inbox, title: "Nothing here yet" },
  filtered: { icon: Search, title: "No results found" },
  error: { icon: AlertCircle, title: "Something went wrong" },
};

const sizeMap = {
  sm: "py-8",
  md: "py-16",
  lg: "py-24",
} as const;

interface EmptyStateProps {
  variant?: "empty" | "filtered" | "error";
  icon?: LucideIcon | null;
  title?: string;
  message: string;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function EmptyState({
  variant = "empty",
  icon,
  title,
  message,
  action,
  size = "md",
  className,
}: EmptyStateProps) {
  const defaults = variantDefaults[variant];
  const resolvedTitle = title ?? defaults.title;

  // icon={null} means no icon, icon={undefined} means use variant default
  const IconComponent = icon === null ? null : (icon ?? defaults.icon);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizeMap[size],
        className,
      )}
    >
      {IconComponent && (
        <IconComponent
          className="size-10 text-muted-foreground/50 mb-4"
          strokeWidth={1}
        />
      )}
      {resolvedTitle && (
        <p className="text-lg font-medium text-foreground mb-1">
          {resolvedTitle}
        </p>
      )}
      <p className="text-sm text-muted-foreground max-w-md">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
