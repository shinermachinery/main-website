"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  variant?: "contain" | "full";
  className?: string;
}

export function ImageLightbox({
  src,
  alt,
  children,
  variant = "contain",
  className,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("cursor-zoom-in", className)}
      >
        {children}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "p-0 border-none shadow-none",
            variant === "contain" &&
              "max-w-3xl bg-transparent backdrop-blur-xl",
            variant === "full" &&
              "max-w-[95vw] max-h-[95vh] bg-background overflow-auto",
          )}
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {variant === "contain" ? (
            <div className="relative w-full h-[85vh] rounded-xl overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              width={3840}
              height={2160}
              className="object-contain w-full h-auto"
              priority
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
