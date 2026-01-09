import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homeType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    // Section 1: A Word About Us and Our Mission
    defineField({
      name: "wordAboutUsTitle",
      title: "A Word About Us - Title",
      type: "string",
      initialValue: "A Word About Us",
    }),
    defineField({
      name: "wordAboutUsDescription",
      title: "A Word About Us - Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),

    // Section 2: Grid Section - Explore Description
    defineField({
      name: "gridSectionTitle",
      title: "Grid Section - Title",
      type: "string",
      initialValue: "Explore",
    }),
    defineField({
      name: "gridSectionDescription",
      title: "Grid Section - Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),

    // Section 3: Few More Facts - Array of number + text
    defineField({
      name: "fewMoreFactsTitle",
      title: "Few More Facts - Section Title",
      type: "string",
      initialValue: "Few More Facts",
    }),
    defineField({
      name: "facts",
      title: "Facts",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "fact",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              number: "number",
              text: "text",
            },
            prepare({ number, text }) {
              return {
                title: `${number || "N/A"}`,
                subtitle: text,
              };
            },
          },
        }),
      ],
    }),

    // Section 4: Step - Array of number + text (same as Facts)
    defineField({
      name: "stepTitle",
      title: "Step - Section Title",
      type: "string",
      initialValue: "Step",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              number: "number",
              text: "text",
            },
            prepare({ number, text }) {
              return {
                title: `${number || "N/A"}`,
                subtitle: text,
              };
            },
          },
        }),
      ],
    }),

    // Section 5: Trusted by Founder - Array of Certificates
    defineField({
      name: "trustedByFounderTitle",
      title: "Trusted by Founder - Section Title",
      type: "string",
      initialValue: "Trusted by Founder",
    }),
    defineField({
      name: "certificates",
      title: "Certificates",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "certificate",
          fields: [
            defineField({
              name: "name",
              title: "Certificate Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subDescription",
              title: "Sub Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: "name",
              subDescription: "subDescription",
            },
            prepare({ name, subDescription }) {
              return {
                title: name,
                subtitle: subDescription,
              };
            },
          },
        }),
      ],
    }),

    // Section 6: Our Brand Story - Description and Array of Videos
    defineField({
      name: "brandStoryTitle",
      title: "Our Brand Story - Title",
      type: "string",
      initialValue: "Our Brand Story",
    }),
    defineField({
      name: "brandStoryDescription",
      title: "Our Brand Story - Description",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "brandStoryVideos",
      title: "Brand Story Videos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "video",
          fields: [
            defineField({
              name: "title",
              title: "Video Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subText",
              title: "Sub Text",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subText: "subText",
            },
            prepare({ title, subText }) {
              return {
                title: title,
                subtitle: subText,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "wordAboutUsTitle",
    },
    prepare() {
      return {
        title: "Home",
        subtitle: "Homepage Content",
      };
    },
  },
});
