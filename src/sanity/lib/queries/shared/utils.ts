/**
 * Shared GROQ Query Utilities
 * Helper functions for building dynamic queries
 */

/**
 * Query Result Type
 * All queries return this structure for consistency
 */
export interface QueryResult<TParams = Record<string, unknown>> {
  /** The GROQ query string */
  query: string;
  /** Parameters to pass to client.fetch() */
  params: TParams;
}

/**
 * Helper: Build filter string from conditions
 * @param baseType - The document type (e.g., "product")
 * @param conditions - Array of GROQ filter conditions
 * @returns Formatted filter string for GROQ query
 */
export function buildFilterString(
  baseType: string,
  conditions: string[] = [],
): string {
  const allConditions = [`_type == "${baseType}"`, ...conditions];
  return allConditions.join(" && ");
}

/**
 * Helper: Build pagination string
 * @param limit - Maximum number of results
 * @param offset - Starting index (for pagination)
 * @returns GROQ pagination string
 */
export function buildPaginationString(
  limit?: number,
  offset: number = 0,
): string {
  if (!limit) return "";
  return `[${offset}...${offset + limit}]`;
}

/**
 * Helper: Build order string
 * @param fields - Array of fields to order by (e.g., ["order asc", "publishedAt desc"])
 * @returns GROQ order string
 */
export function buildOrderString(fields: string[]): string {
  if (fields.length === 0) return "";
  return `| order(${fields.join(", ")})`;
}
