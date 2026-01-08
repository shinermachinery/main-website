"use server";

import { sanityFetch } from "@/sanity/lib/live";
import { getCompleteHomePageQuery } from "@/sanity/lib/queries/home";

export interface HomePageData {
  home: {
    _id: string;
    _type: "home";
    wordAboutUsTitle?: string;
    wordAboutUsDescription?: any[];
    gridSectionTitle?: string;
    gridSectionDescription?: any[];
    fewMoreFactsTitle?: string;
    facts?: Array<{
      _key: string;
      number: number;
      text: string;
    }>;
    stepTitle?: string;
    steps?: Array<{
      _key: string;
      number: number;
      text: string;
    }>;
    trustedByFounderTitle?: string;
    certificates?: Array<{
      _key: string;
      name: string;
      subDescription: string;
    }>;
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