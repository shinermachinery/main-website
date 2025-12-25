import {FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const productCollectionType = defineType({
  name: 'productCollection',
  title: 'Product Collection',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this collection',
    }),
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      description: 'Hero image for the collection',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Collection',
      type: 'boolean',
      description: 'Display this collection prominently',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this collection appears (lower numbers first)',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, featured} = selection
      return {
        ...selection,
        subtitle: featured ? '⭐ Featured Collection' : 'Collection',
      }
    },
  },
})
