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
            ? "aspect-square max-w-[200px]"
            : "aspect-square max-w-[280px]"
        }`}
      >
        <Image
          src={imageUrl}
          alt={member.image?.alt || member.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={
            isCompact
              ? "(max-width: 768px) 100vw, 200px"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 280px"
          }
        />
      </div>

      {/* Info */}
      <div className={`space-y-2 ${isDetailed ? "text-left" : ""}`}>
        <h3 className={`font-semibold ${isCompact ? "text-lg" : "text-xl"}`}>
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
