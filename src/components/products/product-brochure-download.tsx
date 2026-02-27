"use client";

import { Download, Share } from "lucide-react";
import type { SanityFile } from "@/lib/sanity-types";
import { Button } from "../ui/button";

interface ProductBrochureDownloadProps {
  brochure?: SanityFile;
  title: string;
}

export function ProductBrochureDownload({
  brochure,
  title,
}: ProductBrochureDownloadProps) {
  if (!brochure?.asset?._ref) {
    return null;
  }

  const handleDownload = () => {
    // Construct Sanity file URL
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    const fileRef = brochure.asset._ref;

    // Extract file ID and extension from reference
    // Format: file-{id}-{extension}
    const parts = fileRef.split("-");
    const fileId = parts[1];
    const extension = parts[2];

    const fileUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}?dl=${encodeURIComponent(title)}.${extension}`;

    // Open in new tab for download
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Alternative Actions */}
      <div className="flex gap-3 justify-between">
        <Button variant={"shiner"} onClick={handleDownload} className="w-full">
          <Download className="w-4 h-4 text-white" strokeWidth={1.5} />
          <span className="text-sm font-light text-white">
            Download Brochure
          </span>
        </Button>

        <Button
          onClick={() => {
            // Share functionality
            if (navigator.share) {
              navigator.share({
                title: `${title} Brochure`,
                text: `Check out the brochure for ${title}`,
                url: window.location.href,
              });
            } else {
              // Fallback to copy link
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
          variant={"secondary"}
          className="w-fit cursor-pointer rounded-full bg-secondary/10"
        >
          <Share className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
