"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const gradientButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-[inset_0px_4px_28.9px_0px_rgba(244,244,245,0.2)]",
        secondary:
          "bg-gradient-to-r from-brand-blue-10 to-brand-green-10 text-foreground shadow-[inset_0px_4px_28.9px_0px_rgba(161,161,170,0.4)]",
        outline:
          "border-2 border-transparent bg-gradient-to-r from-brand-blue to-brand-green bg-origin-border relative after:absolute after:inset-[2px] after:rounded-full after:bg-background",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === "outline" ? (
          <span className="relative z-10">{children}</span>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

GradientButton.displayName = "GradientButton";

export { GradientButton, gradientButtonVariants };
