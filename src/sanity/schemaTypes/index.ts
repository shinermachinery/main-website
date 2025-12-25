import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { contactSubmissionType } from "./contactSubmissionType";
import { postType } from "./postType";
import { productCollectionType } from "./productCollectionType";
import { productType } from "./productType";
import { teamMemberType } from "./teamMemberType";
import { testimonialType } from "./testimonialType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    productType,
    productCollectionType,
    teamMemberType,
    testimonialType,
    contactSubmissionType,
  ],
};
