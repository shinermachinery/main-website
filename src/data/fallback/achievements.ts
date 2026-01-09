/**
 * Fallback data for achievements section
 * Used when Sanity CMS data is unavailable
 */

export interface Achievement {
  id: number;
  image: string;
  awardGiver: string;
  awardName: string;
}

export const dummyAchievements: Achievement[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    awardGiver: "Bihar Chamber of Commerce",
    awardName: "Best Regional Award",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    awardGiver: "Bihar Chamber of Commerce",
    awardName: "Best Regional Award",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    awardGiver: "Bihar Chamber of Commerce",
    awardName: "Best Regional Award",
  },
];
