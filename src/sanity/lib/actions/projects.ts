/**
 * Projects Actions
 * Server actions for fetching installations, clients, projects, and services
 */

import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

// ============================================================================
// Types
// ============================================================================

export interface Installation {
  id: string;
  title: string;
  type: string;
  location: string;
  description?: string;
  image: string;
}

export interface Client {
  id: string;
  companyName: string;
  projects: string[];
  highlight?: boolean;
  logo?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client?: string;
  location?: string;
  description?: string;
  images: string[];
  completionDate?: string;
  category?: string;
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
 * Get all installations
 * @param limit - Optional limit for results (default: 6)
 */
export async function getInstallations(limit: number = 6): Promise<Installation[]> {
  try {
    const { data: installations } = await sanityFetch({
      query: `*[_type == "installation"] | order(order asc, _createdAt desc) {
        _id,
        title,
        type,
        location,
        description,
        image
      }[0...${limit}]`,
    });

    if (!installations || installations.length === 0) {
      return [];
    }

    return installations.map(
      (installation: {
        _id: string;
        title: string;
        type: string;
        location?: string;
        description?: string;
        image?: any;
      }) => ({
        id: installation._id,
        title: installation.title,
        type: installation.type,
        location: installation.location || "",
        description: installation.description,
        image: installation.image
          ? urlFor(installation.image).url()
          : "/placeholder-installation.jpg",
      }),
    );
  } catch (error) {
    console.error("Error fetching installations:", error);
    return [];
  }
}

// ============================================================================
// Client Actions
// ============================================================================

/**
 * Get all clients
 * @param options - Filtering options
 */
export async function getClients(options?: {
  highlight?: boolean;
  limit?: number;
}): Promise<Client[]> {
  try {
    const limit = options?.limit || 50;
    const highlightFilter =
      options?.highlight !== undefined
        ? `&& highlight == ${options.highlight}`
        : "";

    const { data: clients } = await sanityFetch({
      query: `*[_type == "client" ${highlightFilter}] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        projects,
        highlight,
        logo,
        description
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
        highlight?: boolean;
        logo?: any;
        description?: string;
      }) => ({
        id: clientItem._id,
        companyName: clientItem.companyName,
        projects: clientItem.projects || [],
        highlight: clientItem.highlight,
        logo: clientItem.logo ? urlFor(clientItem.logo).url() : undefined,
        description: clientItem.description,
      }),
    );
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

/**
 * Get clients organized in columns for display
 * @param columns - Number of columns (default: 3)
 */
export async function getClientsInColumns(
  columns: number = 3,
): Promise<Client[][] | null> {
  try {
    const clients = await getClients({ highlight: false });

    if (clients.length === 0) {
      return null;
    }

    // Distribute clients across columns
    const columnArrays: Client[][] = Array.from({ length: columns }, () => []);
    clients.forEach((client, index) => {
      columnArrays[index % columns].push(client);
    });

    return columnArrays;
  } catch (error) {
    console.error("Error fetching clients in columns:", error);
    return null;
  }
}

// ============================================================================
// Project Actions
// ============================================================================

/**
 * Get all projects
 * @param options - Filtering options
 */
export async function getProjects(options?: {
  category?: string;
  limit?: number;
}): Promise<Project[]> {
  try {
    const limit = options?.limit || 10;
    const categoryFilter = options?.category
      ? `&& category == "${options.category}"`
      : "";

    const { data: projects } = await sanityFetch({
      query: `*[_type == "project" ${categoryFilter}] | order(order asc, _createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        client,
        location,
        description,
        images,
        completionDate,
        category
      }[0...${limit}]`,
    });

    if (!projects || projects.length === 0) {
      return [];
    }

    return projects.map(
      (project: {
        _id: string;
        title: string;
        slug: string;
        client?: string;
        location?: string;
        description?: string;
        images?: any[];
        completionDate?: string;
        category?: string;
      }) => ({
        id: project._id,
        title: project.title,
        slug: project.slug || "",
        client: project.client,
        location: project.location,
        description: project.description,
        images: project.images?.map((img: any) => urlFor(img).url()) || [],
        completionDate: project.completionDate,
        category: project.category,
      }),
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Get project by slug
 * @param slug - Project slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data: project } = await sanityFetch({
      query: `*[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        client,
        location,
        description,
        images,
        completionDate,
        category
      }`,
      params: { slug },
    });

    if (!project) {
      return null;
    }

    return {
      id: project._id,
      title: project.title,
      slug: project.slug || "",
      client: project.client,
      location: project.location,
      description: project.description,
      images: project.images?.map((img: any) => urlFor(img).url()) || [],
      completionDate: project.completionDate,
      category: project.category,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
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

// ============================================================================
// Other Clients Actions (for logo grid)
// ============================================================================

export interface OtherClient {
  id: string;
  companyName: string;
  logo?: string;
}

/**
 * Get other clients for logo grid display
 * @param limit - Number of clients to fetch (default: 27)
 */
export async function getOtherClients(limit: number = 27): Promise<OtherClient[]> {
  try {
    const { data: clients } = await sanityFetch({
      query: `*[_type == "client"] | order(order asc, _createdAt desc) {
        _id,
        companyName,
        logo
      }[0...${limit}]`,
    });

    if (!clients || clients.length === 0) {
      return [];
    }

    return clients.map(
      (clientItem: {
        _id: string;
        companyName: string;
        logo?: any;
      }) => ({
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
