/**
 * Projects Actions
 * Server actions for fetching installations, client list, other clients, and services
 */

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

// ============================================================================
// Types
// ============================================================================

export interface Installation {
  id: string;
  title: string;
  description?: string;
  images: string[];
}

export interface ClientListItem {
  id: string;
  companyName: string;
  projects: string[];
}

export interface OtherClient {
  id: string;
  companyName: string;
  logo?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  content?: any;
}

export interface Flowchart {
  id: string;
  title: string;
  description?: string;
  image: string;
}

// ============================================================================
// Installation Actions
// ============================================================================

/**
 * Get all installations (image carousel cards)
 * @param options - Filtering options
 */
export async function getInstallations(options?: {
  limit?: number;
}): Promise<Installation[]> {
  try {
    const limit = options?.limit || 10;

    const { data: installations } = await sanityFetch({
      query: `*[_type == "installation"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description,
        images
      }[0...${limit}]`,
    });

    if (!installations || installations.length === 0) {
      return [];
    }

    return installations.map(
      (installation: {
        _id: string;
        title: string;
        description?: string;
        images?: any[];
      }) => ({
        id: installation._id,
        title: installation.title,
        description: installation.description,
        images: installation.images?.map((img: any) => urlFor(img).url()) || [],
      }),
    );
  } catch (error) {
    console.error("Error fetching installations:", error);
    return [];
  }
}

// ============================================================================
// Client List Actions
// ============================================================================

/**
 * Get all client list items
 * @param limit - Optional limit for results
 */
export async function getClientList(
  limit: number = 50,
): Promise<ClientListItem[]> {
  try {
    const { data: clients } = await sanityFetch({
      query: `*[_type == "clientList"] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        projects
      }[0...${limit}]`,
    });

    if (!clients || clients.length === 0) {
      return [];
    }

    return clients.map(
      (clientItem: {
        _id: string;
        companyName: string;
        projects?: string[];
      }) => ({
        id: clientItem._id,
        companyName: clientItem.companyName,
        projects: clientItem.projects || [],
      }),
    );
  } catch (error) {
    console.error("Error fetching client list:", error);
    return [];
  }
}

/**
 * Get client list organized in columns for display
 * @param columns - Number of columns (default: 3)
 */
export async function getClientListInColumns(
  columns: number = 3,
): Promise<ClientListItem[][] | null> {
  try {
    const clients = await getClientList();

    if (clients.length === 0) {
      return null;
    }

    const columnArrays: ClientListItem[][] = Array.from(
      { length: columns },
      () => [],
    );
    clients.forEach((client, index) => {
      columnArrays[index % columns].push(client);
    });

    return columnArrays;
  } catch (error) {
    console.error("Error fetching client list in columns:", error);
    return null;
  }
}

// ============================================================================
// Other Clients Actions (for logo marquee)
// ============================================================================

/**
 * Get other clients for logo marquee display
 * @param limit - Number of clients to fetch (default: 27)
 */
export async function getOtherClients(
  limit: number = 27,
): Promise<OtherClient[]> {
  try {
    const { data: clients } = await sanityFetch({
      query: `*[_type == "otherClient"] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        logo
      }[0...${limit}]`,
    });

    if (!clients || clients.length === 0) {
      return [];
    }

    return clients.map(
      (clientItem: { _id: string; companyName: string; logo?: any }) => ({
        id: clientItem._id,
        companyName: clientItem.companyName,
        logo: clientItem.logo ? urlFor(clientItem.logo).url() : undefined,
      }),
    );
  } catch (error) {
    console.error("Error fetching other clients:", error);
    return [];
  }
}

// ============================================================================
// Service Actions
// ============================================================================

/**
 * Get all services
 * @param limit - Optional limit for results
 */
export async function getServices(limit?: number): Promise<Service[]> {
  try {
    const paginationSlice = limit ? `[0...${limit}]` : "";

    const { data: services } = await sanityFetch({
      query: `*[_type == "service"] | order(order asc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        content
      }${paginationSlice}`,
    });

    if (!services || services.length === 0) {
      return [];
    }

    return services.map(
      (service: {
        _id: string;
        title: string;
        slug: string;
        description: string;
        image?: any;
        content?: any;
      }) => ({
        id: service._id,
        title: service.title,
        slug: service.slug || "",
        description: service.description,
        image: service.image
          ? urlFor(service.image).url()
          : "/placeholder-service.jpg",
        content: service.content,
      }),
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

/**
 * Get service by slug
 * @param slug - Service slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data: service } = await sanityFetch({
      query: `*[_type == "service" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        description,
        image,
        content
      }`,
      params: { slug },
    });

    if (!service) {
      return null;
    }

    return {
      id: service._id,
      title: service.title,
      slug: service.slug || "",
      description: service.description,
      image: service.image
        ? urlFor(service.image).url()
        : "/placeholder-service.jpg",
      content: service.content,
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

// ============================================================================
// Flowchart Actions
// ============================================================================

/**
 * Get flowchart (first one or by order)
 */
export async function getFlowchart(): Promise<Flowchart | null> {
  try {
    const { data: flowchart } = await sanityFetch({
      query: `*[_type == "flowchart"] | order(order asc, _createdAt desc)[0] {
        _id,
        title,
        description,
        image
      }`,
    });

    if (!flowchart) {
      return null;
    }

    return {
      id: flowchart._id,
      title: flowchart.title,
      description: flowchart.description,
      image: flowchart.image
        ? urlFor(flowchart.image).url()
        : "/placeholder-flowchart.jpg",
    };
  } catch (error) {
    console.error("Error fetching flowchart:", error);
    return null;
  }
}

/**
 * Get all flowcharts
 */
export async function getFlowcharts(): Promise<Flowchart[]> {
  try {
    const { data: flowcharts } = await sanityFetch({
      query: `*[_type == "flowchart"] | order(order asc, _createdAt desc) {
        _id,
        title,
        description,
        image
      }`,
    });

    if (!flowcharts || flowcharts.length === 0) {
      return [];
    }

    return flowcharts.map(
      (flowchart: {
        _id: string;
        title: string;
        description?: string;
        image?: any;
      }) => ({
        id: flowchart._id,
        title: flowchart.title,
        description: flowchart.description,
        image: flowchart.image
          ? urlFor(flowchart.image).url()
          : "/placeholder-flowchart.jpg",
      }),
    );
  } catch (error) {
    console.error("Error fetching flowcharts:", error);
    return [];
  }
}
