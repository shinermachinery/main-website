/**
 * Fallback data for certifications section
 * Used when Sanity CMS data is unavailable
 */

export interface Certification {
  id: number;
  title: string;
  description: string;
}

export const dummyCertifications: Certification[] = [
  {
    id: 1,
    title: "Certification Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus eget erat id amet.",
  },
  {
    id: 2,
    title: "Certification Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus eget erat id amet.",
  },
  {
    id: 3,
    title: "Certification Name",
    description:
      "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus eget erat id amet.",
  },
];
