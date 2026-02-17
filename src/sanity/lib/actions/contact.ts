/**
 * Contact Page Actions
 * Server actions for fetching contact page content from Sanity
 */

import { sanityFetch } from "@/sanity/lib/live";

// ============================================================================
// Types
// ============================================================================

export interface ContactPhone {
  label?: string;
  number: string;
}

export interface ContactEmail {
  label?: string;
  email: string;
}

export interface Office {
  name: string;
  address: string;
  mapEmbedUrl?: string;
}

export interface ContactPageData {
  phoneNumbers: ContactPhone[];
  emails: ContactEmail[];
  offices: Office[];
}

// ============================================================================
// Actions
// ============================================================================

/**
 * Get contact page content (phone numbers, emails, offices)
 */
export async function getContactPage(): Promise<ContactPageData> {
  try {
    const { data } = await sanityFetch({
      query: `*[_type == "contactPage"][0] {
        phoneNumbers[] {
          label,
          number
        },
        emails[] {
          label,
          email
        },
        offices[] {
          name,
          address,
          mapEmbedUrl
        }
      }`,
    });

    if (!data) {
      return getContactPageDefaults();
    }

    return {
      phoneNumbers: data.phoneNumbers || [],
      emails: data.emails || [],
      offices: data.offices || [],
    };
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return getContactPageDefaults();
  }
}

/**
 * Default fallback data when Sanity has no content
 */
function getContactPageDefaults(): ContactPageData {
  return {
    phoneNumbers: [
      { number: "+91-90443 20555" },
      { number: "+91-90443 20555" },
    ],
    emails: [
      { email: "contact@shinermacahinery.com" },
      { email: "sales@shinermacahinery.com" },
    ],
    offices: [],
  };
}
