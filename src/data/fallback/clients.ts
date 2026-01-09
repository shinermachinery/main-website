/**
 * Fallback data for clients list section
 * Used when Sanity CMS data is unavailable
 *
 * Data is organized in 3 columns for the grid layout
 */

export interface Client {
  companyName: string;
  projects: string[];
}

export const dummyClients: Client[][] = [
  // Column 1
  [
    {
      companyName: "SUNSTAR OVERSEAS LIMITED, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT) – FULLY AUTOMATIC",
      ],
    },
    {
      companyName: "JASMER FOODS, LADWA",
      projects: ["8 METRIC TONNE PADDY TO RICE PLANT - Fully Automatic"],
    },
    {
      companyName: "DUNAR FOOD, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT - Fully Automatic",
      ],
    },
  ],
  // Column 2
  [
    {
      companyName: "DUNAR FOOD, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT - Fully Automatic",
      ],
    },
    {
      companyName: "SUNSTAR OVERSEAS LIMITED, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT) – FULLY AUTOMATIC",
      ],
    },
    {
      companyName: "JASMER FOODS, LADWA",
      projects: ["8 METRIC TONNE PADDY TO RICE PLANT - Fully Automatic"],
    },
  ],
  // Column 3
  [
    {
      companyName: "JASMER FOODS, LADWA",
      projects: ["8 METRIC TONNE PADDY TO RICE PLANT - Fully Automatic"],
    },
    {
      companyName: "SUNSTAR OVERSEAS LIMITED, AMRITSAR",
      projects: [
        "24 METRIC TONNE PADDY TO RICE PLANT",
        "12 METRIC TONNE RICE TO RICE PLANT) – FULLY AUTOMATIC",
      ],
    },
  ],
];
