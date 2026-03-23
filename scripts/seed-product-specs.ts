/**
 * Migration script: Add application, salient features, and specification tables
 * to existing products (Paddy Cleaner, Rice Cleaner, Paddy & Rice Destoner, Vibro Pneumatic Sheller)
 *
 * Usage: npx tsx scripts/seed-product-specs.ts
 */

import { createClient } from "next-sanity";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-12-22",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

interface ProductPatch {
  slugPattern: string;
  application: string;
  salientFeatures: string[];
  specificationTable: {
    _type: "specificationTable";
    columns: string[];
    rows: Array<{
      _key: string;
      _type: "row";
      cells: string[];
    }>;
  };
}

const products: ProductPatch[] = [
  // ── Paddy Cleaner ──────────────────────────────────────────
  {
    slugPattern: "paddy-cleaner",
    application:
      "Highly Efficient SHINER Cleaning Machine for Paddy.",
    salientFeatures: [
      "The machine is fitted with inlet feed rolls",
      "The aspiration chamber is fitted with one waste augur",
      "The screen system consists of one sieve boat with 1 short scalping screen layer and 2 long grading/sand screen layers",
      "The machine has an integral fan, fixed speed drive, and motor",
      "The machine is of steel construction with sieve boat also in steel construction",
      "Eccentric shaft mechanism reduced breakdown",
      "Top 2 sieves punched from CNC Machine zigzag holes high perforation area",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: [
        "Model No.",
        "Capacity on Paddy",
        "Fan Motor",
        "Sieve Boat Motor",
        "No. of Sieve Boat",
        "Dimension (L x W x H)",
      ],
      rows: [
        { _key: "pc1", _type: "row", cells: ["PEPL-600", "1-2 TPH", "3 HP", "1 HP", "1", "3000mm x 1150mm x 2210mm"] },
        { _key: "pc2", _type: "row", cells: ["PEPC-900", "3-4 TPH", "5 HP", "2 HP", "1", "3000mm x 1450mm x 2210mm"] },
        { _key: "pc3", _type: "row", cells: ["PEPC-1050", "4-5 TPH", "7.5 HP", "2 HP", "1", "3000mm x 1600mm x 2210mm"] },
        { _key: "pc4", _type: "row", cells: ["PEPC-1200", "5-7 TPH", "7.5 HP", "2 HP", "1", "3000mm x 1750mm x 2210mm"] },
        { _key: "pc5", _type: "row", cells: ["PEPC-1500", "10-12 TPH", "10 HP", "3 HP", "1", "3000mm x 2050mm x 2210mm"] },
        { _key: "pc6", _type: "row", cells: ["PEPC-1500x2", "16-20 TPH", "10 HP", "3 HP", "2", "3285mm x 2135mm x 3000mm"] },
      ],
    },
  },

  // ── Rice Cleaner ───────────────────────────────────────────
  {
    slugPattern: "rice-cleaner",
    application:
      "Highly Efficient SHINER Fine Cleaner for cleaning & grading of Rice.",
    salientFeatures: [
      "The machine is fitted with inlet feed rolls",
      "The aspiration chamber is fitted with one waste augur",
      "The screen system consists of 1 sieve boat with 1 short scalping screen layer and 3 long grading/sand screen layers",
      "The machine has an integral fan, fixed speed drive, and motor",
      "The machine is of steel construction with sieve boat also in steel construction",
      "Eccentric shaft mechanism reduced breakdown",
      "Top 2 sieves punched from CNC Machine zigzag holes high perforation area, better cleaning",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: [
        "Model No.",
        "Capacity on Rice",
        "Fan Motor",
        "Sieve Boat Motor",
        "No. of Sieve Boat",
        "Dimension (L x W x H)",
      ],
      rows: [
        { _key: "rc1", _type: "row", cells: ["PEFC-600", "1-2 TPH", "5HP", "1 HP", "1", "3000mm x 1150mm x 2210mm"] },
        { _key: "rc2", _type: "row", cells: ["PEFC-900", "3-4 TPH", "7.5 HP", "2 HP", "1", "3000mm x 1450mm x 2210mm"] },
        { _key: "rc3", _type: "row", cells: ["PEFC-1050", "5 TPH", "7.5 HP", "2 HP", "1", "3000mm x 1600mm x 2210mm"] },
        { _key: "rc4", _type: "row", cells: ["PEFC-1200", "6-7 TPH", "10 HP", "2 HP", "1", "3000mm x 1750mm x 2210mm"] },
        { _key: "rc5", _type: "row", cells: ["PEFC-1500", "10-12 TPH", "12.5 HP", "3 HP", "1", "3000mm x 2050mm x 2210mm"] },
      ],
    },
  },

  // ── Paddy & Rice Destoner ──────────────────────────────────
  {
    slugPattern: "paddy-rice-destoner",
    application:
      "Highly Efficient SHINER Destoner for separating the stone in Paddy & Rice.",
    salientFeatures: [
      "Efficient and precise separation of stone and heavy material by density difference",
      "Fitted with two vibro motor for trouble free & long life with low noise operation",
      "Provided with closed circuit dust/fines aspirator system",
      "Separate collections of stone and dust particles from the aspirator",
      "Sturdy rigid and heavy duty construction. Precise construction assures stone free paddies",
      "Vibro motor assure noiseless, trouble free operations",
      "Negligible loss of paddy",
      "Self cleaning system for maximum operating efficiency",
      "Remove immature grain along with other impurities",
      "Powder Coated",
      "High Tensile Hardware used for assembly",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: [
        "Model No.",
        "Capacity on Paddy",
        "Power Required",
        "Dimension (L x W x H)",
      ],
      rows: [
        { _key: "ds1", _type: "row", cells: ["PEDS-900", "3-4 TPH", "0.5HP X 02 NOS", "1645mm X 1105mm X 1950mm"] },
        { _key: "ds2", _type: "row", cells: ["PEDS-1050", "5 TPH", "0.5 HP X 02 NOS", "1645mm X 1255mm X 1950mm"] },
        { _key: "ds3", _type: "row", cells: ["PEDS-1200", "6-7 TPH", "0.5 HP X 02 NOS", "1645mm X 1405mm X 1950mm"] },
        { _key: "ds4", _type: "row", cells: ["PEDS-1500", "8-10 TPH", "1HP X 02 NOS", "1645mm X 1705mm X 1950mm"] },
      ],
    },
  },

  // ── Vibro Pneumatic Sheller ────────────────────────────────
  {
    slugPattern: "vibro-pneumatic-sheller",
    application:
      "Highly Efficient SHINER PNEUMATIC RUBBER SHELLER for De-Husking is good to work on raw, steamed, parbiled, and basmati rice.",
    salientFeatures: [
      "Special vibro feeder arrangement to feed the paddy grain vertically between the two rubber rolls, Enhancement of rubber rolls life",
      "Infinite adjustment of degree of Hulling",
      "Roll movement both in Automatic and Manual mode",
      "Special cooling arrangement for rubber roll. Ease of maintenance",
      "Heavy body ensures zero vibration and reduces chances of paddy breaking",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: [
        "Model No.",
        "Capacity on Polly",
        "Rubber Roll Size",
        "Motor",
        "Voltage Dimension",
        "Overall",
        "Approx Weight (kg)",
      ],
      rows: [
        { _key: "vs1", _type: "row", cells: ["PEVPS_3TPH/4TPH", "3-4 TPH", "10\"x10\"", "10 HP / 12.5 HP", "415 v/50 v/50 Hz", "1470mm X 980mm X 1325mm", "750 KG"] },
        { _key: "vs2", _type: "row", cells: ["PEVPS_5TPH", "5 TPH", "10\"x12\"", "15 HP", "415 v/50 v/50 Hz", "1510mm X 985mm X 1385mm", "800 KG"] },
      ],
    },
  },
];

async function main() {
  console.log("Starting product specs migration...\n");

  for (const product of products) {
    // Find the product by slug pattern (partial match)
    const docs = await client.fetch(
      `*[_type == "product" && slug.current match $pattern][0]`,
      { pattern: `*${product.slugPattern}*` },
    );

    if (!docs) {
      console.log(`⚠ Product not found for slug pattern: "${product.slugPattern}"`);
      console.log(`  → You may need to create this product in Sanity Studio first.\n`);
      continue;
    }

    console.log(`✓ Found "${docs.title}" (${docs._id})`);

    await client
      .patch(docs._id)
      .set({
        application: product.application,
        salientFeatures: product.salientFeatures,
        specificationTable: product.specificationTable,
      })
      .commit();

    console.log(`  → Updated with application, ${product.salientFeatures.length} features, ${product.specificationTable.rows.length}-row spec table\n`);
  }

  console.log("Migration complete!");
}

main().catch(console.error);
