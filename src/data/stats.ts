/**
 * Stats/Facts section data
 * Used in the stats section as fallback when no Sanity data is available
 */

export interface Fact {
  _key: string;
  number: number;
  text: string;
}

export const defaultFacts: Fact[] = [
  { _key: "1", number: 500, text: "Companies served" },
  { _key: "2", number: 1000, text: "Projects completed" },
  { _key: "3", number: 50, text: "Countries reached" },
  { _key: "4", number: 24, text: "Hours support" },
];
