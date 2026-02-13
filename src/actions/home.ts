"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { getCompleteHomePageQuery } from "@/sanity/lib/queries";

export interface HomePageData {
  home: {
    _id: string;
    _type: "home";
    // Hero Section
    heroHeadline?: string;
    heroDescription?: string;
    heroPrimaryCta?: {
      text: string;
      link: string;
    };
    heroSecondaryCta?: {
      text: string;
      link: string;
    };
    heroBackgroundImage?: string;
    // About Section
    wordAboutUsTitle?: string;
    wordAboutUsDescription?: any[];
    gridSectionTitle?: string;
    gridSectionDescription?: any[];
    // Stats Section
    fewMoreFactsTitle?: string;
    facts?: Array<{
      _key: string;
      number: number;
      text: string;
    }>;
    // Steps Section
    stepTitle?: string;
    steps?: Array<{
      _key: string;
      number: number;
      text: string;
    }>;
    // Certificates Section
    trustedByFounderTitle?: string;
    certificates?: Array<{
      _key: string;
      name: string;
      subDescription: string;
    }>;
    // Brand Story Section
    brandStoryTitle?: string;
    brandStoryDescription?: any[];
    brandStoryVideos?: Array<{
      _key: string;
      title: string;
      subText: string;
    }>;
  } | null;
  featuredProducts: any[];
  teamMembers: any[];
  testimonials: any[];
}

export const getAllHomeData = async (): Promise<HomePageData> => {
  try {
    const { query, params } = getCompleteHomePageQuery();
    const result = await sanityFetch({ query, params });
    return {
      home: result.data?.home || null,
      featuredProducts: result.data?.featuredProducts || [],
      teamMembers: result.data?.teamMembers || [],
      testimonials: result.data?.testimonials || [],
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      home: null,
      featuredProducts: [],
      teamMembers: [],
      testimonials: [],
    };
  }
};
