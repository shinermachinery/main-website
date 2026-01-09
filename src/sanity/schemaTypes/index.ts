import type { SchemaTypeDefinition } from "sanity";
import { achievementType } from "./achievementType";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { certificationType } from "./certificationType";
import { clientType } from "./clientType";
import { contactSubmissionType } from "./contactSubmissionType";
import { directorType } from "./directorType";
import { eventType } from "./eventType";
import { homeType } from "./homeType";
import { installationType } from "./installationType";
import { missionVisionType } from "./missionVisionType";
import { postType } from "./postType";
import { productCollectionType } from "./productCollectionType";
import { productType } from "./productType";
import { projectType } from "./projectType";
import { serviceType } from "./serviceType";
import { teamMemberType } from "./teamMemberType";
import { testimonialType } from "./testimonialType";
import { whyChooseUsType } from "./whyChooseUsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homeType,
    blockContentType,
    categoryType,
    postType,
    authorType,
    productType,
    productCollectionType,
    projectType,
    serviceType,
    teamMemberType,
    testimonialType,
    contactSubmissionType,
    eventType,
    certificationType,
    achievementType,
    installationType,
    clientType,
    whyChooseUsType,
    missionVisionType,
    directorType,
  ],
};
