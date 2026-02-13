import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description of the product",
    }),
    defineField({
      name: "descriptionBulletPoints",
      title: "Description Bullet Points",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Key points highlighting product benefits",
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        }),
      ],
      description: "Multiple images of the product (first image is primary)",
      validation: (Rule) => Rule.min(1).error("At least one image is required"),
    }),
    defineField({
      name: "brochure",
      title: "Product Brochure",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
      description: "Upload product brochure (PDF or DOC)",
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: "label",
              value: "value",
            },
            prepare({ label, value }) {
              return {
                title: label,
                subtitle: value,
              };
            },
          },
        }),
      ],
      description:
        "Product specifications (e.g., Weight: 50kg, Capacity: 100 tons/hr)",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      description: "Products that are related or can be cross-sold",
    }),
    defineField({
      name: "collection",
      title: "Product Collection",
      type: "reference",
      to: [{ type: "productCollection" }],
      description: "Assign this product to a collection",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Key features of this product",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Display this product on the landing page",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this product appears (lower numbers first)",
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      featured: "featured",
    },
    prepare(selection) {
      const { title, featured } = selection;
      return {
        ...selection,
        subtitle: featured ? "⭐ Featured" : "Not featured",
      };
    },
  },
});
