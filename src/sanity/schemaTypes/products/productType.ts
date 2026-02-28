import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "specs", title: "Specifications" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ── Basic Info ──────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collections",
      title: "Product Collections",
      type: "array",
      group: "basic",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "productCollection" }],
        }),
      ],
      description: "Assign this product to one or more collections",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      group: "basic",
      description: "Rich text description of the product",
    }),

    // ── Content ─────────────────────────────────────────────────
    defineField({
      name: "descriptionBulletPoints",
      title: "Description Bullet Points",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Key points highlighting product benefits",
    }),
    defineField({
      name: "features",
      title: "Key Features",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description: "Short feature tags (e.g. AI-Powered, Energy Efficient)",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "blockContent",
      group: "content",
      description:
        "Rich text content (used for Text Only and Image + Text display types)",
    }),

    // ── Media ───────────────────────────────────────────────────
    defineField({
      name: "displayType",
      title: "Display Type",
      type: "string",
      group: "media",
      options: {
        list: [
          { title: "Gallery", value: "gallery" },
          { title: "Text Only", value: "textOnly" },
          { title: "Image + Text", value: "imageText" },
        ],
      },
      initialValue: "imageText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption displayed below the image",
            }),
          ],
        }),
      ],
      description: "Multiple images of the product (first image is primary)",
      validation: (Rule) =>
        Rule.custom((images, context) => {
          const displayType = (context.document as any)?.displayType;
          if (displayType !== "textOnly" && (!images || images.length === 0)) {
            return "At least one image is required for this display type";
          }
          return true;
        }),
    }),
    defineField({
      name: "brochure",
      title: "Product Brochure",
      type: "file",
      group: "media",
      options: { accept: ".pdf,.doc,.docx" },
      description: "Upload product brochure (PDF or DOC)",
    }),

    // ── Specifications ──────────────────────────────────────────
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      group: "specs",
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
            select: { label: "label", value: "value" },
            prepare({ label, value }) {
              return { title: label, subtitle: value };
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
      group: "specs",
      validation: (Rule) => Rule.min(0),
    }),

    // ── Settings ────────────────────────────────────────────────
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      group: "settings",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
      description: "Products that are related or can be cross-sold",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      description: "Display this product on the landing page",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "settings",
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
      const { featured } = selection;
      return {
        ...selection,
        subtitle: featured ? "⭐ Featured" : "Not featured",
      };
    },
  },
});
