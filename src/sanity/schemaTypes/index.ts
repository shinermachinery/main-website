import type { SchemaTypeDefinition } from "sanity";

// Blog schemas
import { authorType, blockContentType, categoryType, postType } from "./blog";
// Common schemas
import {
  contactSubmissionType,
  footerType,
  navigationType,
  siteSettingsType,
} from "./common";

// Company schemas
import { aboutPageType, teamMemberType } from "./company";
// Homepage schemas
import { homeType } from "./homepage";

// Marketing schemas
import {
  achievementType,
  certificationType,
  eventType,
  testimonialType,
} from "./marketing";
// Product schemas
import { productCollectionType, productType } from "./products";
// Project schemas
import {
  clientType,
  flowchartType,
  installationType,
  projectType,
  serviceType,
} from "./projects";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Homepage
    homeType,

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
    flowchartType,

    // Company
    aboutPageType,
    teamMemberType,

    // Marketing
    testimonialType,
    eventType,
    certificationType,
    achievementType,

    // Common
    siteSettingsType,
    navigationType,
    footerType,
    contactSubmissionType,
  ],
};
