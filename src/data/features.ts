/**
 * Features section data
 * Used in the landing page features section
 */

import type { LucideIcon } from "lucide-react";
import { Globe, Hammer, Settings, TrendingUp } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Hammer,
    title: "Highest Precision Components",
    description: "Engineered for accurate, consistent performance.",
  },
  {
    icon: Settings,
    title: "24/7 Support & Service",
    description: "Dedicated support team available around the clock.",
  },
  {
    icon: TrendingUp,
    title: "Productivity Focused",
    description: "Tools designed to maximize efficiency and output.",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Support",
    description: "Worldwide distribution with personalized service.",
  },
];
