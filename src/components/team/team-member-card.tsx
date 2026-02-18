/**
 * Team Member Card Component
 * Displays team member profile with photo, name, role, and bio
 * Reusable for team grids, directories, or individual profiles
 */

"use client";

import Image from "next/image";
import type { TeamMember } from "@/lib/sanity-types";
import { urlFor } from "@/sanity/lib/image";

export interface TeamMemberCardProps {
  member: TeamMember;
  variant?: "default" | "compact" | "detailed";
  showBio?: boolean;
}

export function TeamMemberCard({
  member,
  variant = "default",
  showBio = true,
}: TeamMemberCardProps) {
  const imageUrl = member.image
    ? urlFor(member.image).width(400).height(400).url()
    : "/placeholder-avatar.jpg";

  const isCompact = variant === "compact";
  const isDetailed = variant === "detailed";

  return (
    <article
      className={`group text-center space-y-4 ${
        isDetailed ? "rounded-2xl border bg-card p-6" : ""
      }`}
    >
      {/* Photo */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-muted mx-auto ${
          isCompact
            ? "aspect-square max-w-52"
            : "aspect-square max-w-72"
        }`}
      >
        <Image
          src={imageUrl}
          alt={member.image?.alt || member.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={
            isCompact
              ? "(max-width: 48rem) 100vw, 12.5rem"
              : "(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 17.5rem"
          }
        />
      </div>

      {/* Info */}
      <div className={`space-y-2 ${isDetailed ? "text-left" : ""}`}>
        <h3 className={`font-semibold ${isCompact ? "text-base" : "text-lg"}`}>
          {member.name}
        </h3>
        <p
          className={`font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green ${
            isCompact ? "text-xs" : "text-sm"
          }`}
        >
          {member.role}
        </p>
        {showBio && member.bio && (
          <p
            className={`text-muted-foreground ${
              isCompact ? "text-xs line-clamp-2" : "text-sm line-clamp-3"
            } ${isDetailed ? "line-clamp-none" : ""}`}
          >
            {member.bio}
          </p>
        )}
      </div>
    </article>
  );
}
