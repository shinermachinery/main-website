import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "A short tagline or slogan for the company",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform?.charAt(0).toUpperCase() + platform?.slice(1),
                subtitle: url,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "seoDefaults",
      title: "SEO Defaults",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Default Meta Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Default Meta Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "image",
          title: "Default OG Image",
          type: "image",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Global site configuration",
      };
    },
  },
});
