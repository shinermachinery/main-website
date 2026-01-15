import type { SchemaTypeDefinition } from "sanity";

// Blog schemas
import {
  authorType,
  blockContentType,
  categoryType,
  postType,
} from "./blog";

// Product schemas
import { productCollectionType, productType } from "./products";

// Company schemas
import {
  directorType,
  missionVisionType,
  teamMemberType,
  whyChooseUsType,
} from "./company";

// Project schemas
import {
  clientType,
  installationType,
  projectType,
  serviceType,
} from "./projects";

// Marketing schemas
import {
  achievementType,
  certificationType,
  eventType,
  testimonialType,
} from "./marketing";

// Homepage schemas
import {
  homeType,
  homepageAboutType,
  homepageFeaturesType,
  homepageHeroType,
} from "./homepage";

// Common schemas
import { companyStatsType, contactSubmissionType } from "./common";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Homepage
    homeType,
    homepageHeroType,
    homepageAboutType,
    homepageFeaturesType,

    // Blog
    blockContentType,
    categoryType,
    postType,
    authorType,

    // Products
    productType,
    productCollectionType,

    // Projects
    projectType,
    serviceType,
    clientType,
    installationType,

    // Company
    teamMemberType,
    directorType,
    whyChooseUsType,
    missionVisionType,

    // Marketing
    testimonialType,
    eventType,
    certificationType,
    achievementType,

    // Common
    companyStatsType,
    contactSubmissionType,
  ],
};
