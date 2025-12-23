import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {productType} from './productType'
import {teamMemberType} from './teamMemberType'
import {testimonialType} from './testimonialType'
import {contactSubmissionType} from './contactSubmissionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    productType,
    teamMemberType,
    testimonialType,
    contactSubmissionType,
  ],
}
