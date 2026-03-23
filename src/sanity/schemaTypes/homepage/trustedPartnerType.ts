import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const trustedPartnerType = defineType({
  name: "trustedPartner",
  title: "Trusted Partner",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      media: "logo",
    },
  },
});
