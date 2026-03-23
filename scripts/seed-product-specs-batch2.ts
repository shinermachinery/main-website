/**
 * Migration script batch 2: Add application, salient features, and specification tables
 * for remaining products from catalog screenshots.
 *
 * Usage: npx tsx scripts/seed-product-specs-batch2.ts
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
  specificationTable?: {
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
  // ── Husk Aspirator ─────────────────────────────────────────
  {
    slugPattern: "husk-aspirator",
    application:
      "Highly Efficient SHINER Husk Aspirator for separating husk and brown rice.",
    salientFeatures: [
      "Compact size, requires small installation area",
      "Simple in design and low maintenance",
      "Efficiently separation of husk and brown rice by density difference",
      "Fan designed in stainless steel for a better life",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: ["Model No.", "Capacity", "Motor", "Dimension (L x W x H)"],
      rows: [
        { _key: "ha1", _type: "row", cells: ["PEHA-4TPH", "3-4 TPH", "1 HP", "2230mm x 835mm x 1130mm"] },
        { _key: "ha2", _type: "row", cells: ["PEHA-6TPH", "7 TPH", "1.5 HP", "2530mm x 1000mm x 1130mm"] },
      ],
    },
  },

  // ── Paddy Separator ────────────────────────────────────────
  {
    slugPattern: "paddy-separator",
    application:
      "Highly Efficient SHINER Paddy Separator for high capacity and efficient separation of paddy & brown rice.",
    salientFeatures: [
      "Oscillating tray type",
      "High output with adjustable stroke and inclination of tray",
      "Separation of three distinct classification: Paddy, mixed, Brown rice",
      "Stainless steel tray to avoid wear & tear. Sensor for flow indication",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: ["Model No.", "Motor", "Voltage", "Dimension (L x W x H)"],
      rows: [
        { _key: "ps1", _type: "row", cells: ["PEPS-4TPH", "3 HP", "415 V/50 Hz", "1705mm x 1520mm x 1680mm"] },
        { _key: "ps2", _type: "row", cells: ["PEPS-5TPH", "3 HP", "415 V/50 Hz", "1705mm x 1820mm x 1680mm"] },
        { _key: "ps3", _type: "row", cells: ["PEPS-7TPH", "5 HP", "415 V/50 Hz", "1705mm x 2200mm x 1680mm"] },
      ],
    },
  },

  // ── Rice Length Grader ─────────────────────────────────────
  {
    slugPattern: "rice-length-grader",
    application:
      "Highly Efficient SHINER Length Grader for Broken rice separation & rice haji separation.",
    salientFeatures: [
      "High accuracy separation of head rice from the mixed",
      "The machine has varied screen for separation of different length of rice",
      "Easy maintenance and minimum operation cost",
      "Special hard chrome plated cylinder also available",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: ["Model No.", "Capacity", "Motor", "Dimension (L x W x H)"],
      rows: [
        { _key: "rlg1", _type: "row", cells: ["PRLG_17PM", "1.5 TPH", "1 HP", "1200mm x 500mm x 1700mm"] },
        { _key: "rlg2", _type: "row", cells: ["PRLG_24PM", "2.5 TPH", "1.5 HP", "1200mm x 700mm x 1700mm"] },
        { _key: "rlg3", _type: "row", cells: ["PRLG_36PM", "4 TPH", "2 HP", "1200mm x 1000mm x 1700mm"] },
      ],
    },
  },

  // ── Rice Whitener ──────────────────────────────────────────
  {
    slugPattern: "rice-whitener",
    application:
      "Highly Efficient SHINER whitener is good to work on raw, Steamed, Parbiled, Bolted and Basmati rice.",
    salientFeatures: [
      "Ensures uniform and very high degree of Whiteness on all rice types",
      "Proper utilization of free energy between emery & sieve ensures better Whiteness & minimum rise in temperature",
      "Provides uniform emery surface which assure higher Rice Yield and lesser broken",
      "GI Perforated measurement for precise control of chamber for whitening",
      "Easy replacement of shifting Screens",
      "Minimum amount of broken rice",
      "Available in standard and heavy duty model",
      "Emery Stone Systems / Abrasive Roller Systems",
    ],
  },

  // ── Rice Waterjet Polisher ─────────────────────────────────
  {
    slugPattern: "rice-waterjet-polisher",
    application:
      "Highly Efficient SHINER Rice Polisher is used for silky shining and polishing of rice. It is good to work on raw, Steamed, Parboiled, and Basmati rice.",
    salientFeatures: [
      "Provides straightforward for high degree of polishing",
      "The rice is polished by friction among their grain giving the best polished rice and rice bran particles",
      "Also water feeding, oil can, setting, and micro components are Surface hardened for maintenance free",
      "Polishing chamber is provided with sliding cover for easy inspection",
      "The machine is fitted with 1 mist chamber & 2 polishing chambers",
    ],
  },

  // ── Bran Centrifugal Machine ───────────────────────────────
  {
    slugPattern: "bran-centrifugal",
    application:
      "SHINER Centrifugal has a very wider application. It is used for separation of left out rice bran from broken rice.",
    salientFeatures: [
      "Rotary screen makes high quality powder get filtered and collected in a tray",
      "The machine is made of heavy MS, angle, CRC sheet and ERW tube",
      "Made from high grade stainless steel",
      "Fine powder gets through the perforated screen with very little losses",
      "Available in MS and GI screen",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: ["Model No.", "Length", "Diameter", "Motor", "Dimension (L x W x H)", "Weight"],
      rows: [
        { _key: "bc1", _type: "row", cells: ["PEBC-3.5", "3.5 Ft", "15\"", "2 HP", "1500mm x 700mm x 1200mm", "150 KG"] },
        { _key: "bc2", _type: "row", cells: ["PEBC-5", "5 Ft", "15\"", "3 HP", "1900mm x 700mm x 1200mm", "200 KG"] },
        { _key: "bc3", _type: "row", cells: ["PEBC-6", "6 Ft", "18\"", "5 HP", "2200mm x 800mm x 1300mm", "250 KG"] },
      ],
    },
  },

  // ── Cylindrical Sizer ──────────────────────────────────────
  {
    slugPattern: "cylindrical-sizer",
    application:
      "Economically efficient system for separation of over sized and under sized grains. The machine is equally effective for grading of different varieties.",
    salientFeatures: [
      "Easy to install, operate and maintain",
      "Easy to change the cylindrical screen from front",
      "Multi-stage separation of impurities",
      "Precise separation of imperfects",
      "Made in MS Powder coated and Stainless Steel resistant to rust and corrosion",
    ],
  },

  // ── Rotary Separator ───────────────────────────────────────
  {
    slugPattern: "rotary-separator",
    application:
      "This machine is designed for the separation of broken rice as its diameter same with rotary machine. This machine is equipped with 2 trays and 3 surfaces for the differential elements of rice like small broken, medium broken, big broken and full rice.",
    salientFeatures: [
      "Self loading graded indent to avoid clogging of screens",
      "Simple and easy to operate",
      "Handles the rice and broken rice separation efficiently",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: ["Model No.", "Capacity", "Tray", "Dimension (L x W x H)"],
      rows: [
        { _key: "rs1", _type: "row", cells: ["PERT-21", "2 TPH", "2", "2100mm x 900mm x 1200mm"] },
        { _key: "rs2", _type: "row", cells: ["PERT-27", "3 TPH", "2", "2700mm x 900mm x 1200mm"] },
        { _key: "rs3", _type: "row", cells: ["PERT-GT", "5 TPH", "2", "3000mm x 900mm x 1200mm"] },
      ],
    },
  },

  // ── Bucket Elevator ────────────────────────────────────────
  {
    slugPattern: "bucket-elevator",
    application:
      "Highly Efficient SHINER Elevators are used for conveying the material vertically for more than 100 hours.",
    salientFeatures: [
      "Soft side powder coated tall safe type continuous for more than 100 hours",
      "Motor used ABB or Equivalent - ISI, BSEN, PHL / Premium",
      "Suitable for better grain elevations",
      "MS built with bottom and alignment on the head will be provided",
      "Available in 3 sizes: 6 foot Elevator",
      "Available in Stainless Steel & Mild Steel",
    ],
  },

  // ── Vibro Separator ────────────────────────────────────────
  {
    slugPattern: "vibro-separator",
    application:
      "Being a well established company, we are offering a wide range of Vibro Separator used to remove coarse impurities like large kernels, stones, and other foreign particles from the grain. Our product is widely appreciated in the market.",
    salientFeatures: [],
  },

  // ── Aspiration Channel ─────────────────────────────────────
  {
    slugPattern: "aspiration-channel",
    application:
      "Incorporating knowledge with effective investment, we are able to manufacture Aspiration Channel used in different Rice mills for cleaning food grains. Owing to their light weight, dimensional accuracy and easy installation, these are highly demanded. It is operated without electrical power or motor without any hassle.",
    salientFeatures: [],
  },

  // ── Reel Centrifugal Machine ───────────────────────────────
  {
    slugPattern: "reel-centrifugal",
    application:
      "To remove the various impurities. Also used for grading and separation. Manufactured using quality raw material and sophisticated technology.",
    salientFeatures: [],
  },

  // ── Destoner ───────────────────────────────────────────────
  {
    slugPattern: "destoner",
    application:
      "Used for separating stones from a continuous material flow. Features Destoner/Vibratory for screen cleaner with type of stone removal.",
    salientFeatures: [],
  },

  // ── Magnetic Destoner ──────────────────────────────────────
  {
    slugPattern: "magnetic-destoner",
    application:
      "Magnetic Destoner for efficient removal of metallic impurities from grain processing lines.",
    salientFeatures: [],
  },

  // ── Emery Roll ─────────────────────────────────────────────
  {
    slugPattern: "emery-roll",
    application:
      "We are a prominent manufacturer, supplier and exporter of excellent quality Emery roll machine. This Machine can effectively remove the husk of Gram, wheat, pulses. Our superior quality emery rolls are made with M.S and SS 304. It runs on two ball bearings. Superior design ensures that there is no breakage of the bearing.",
    salientFeatures: [],
  },

  // ── Grain Mill (HZ. Chakki) ────────────────────────────────
  {
    slugPattern: "grain-mill",
    application:
      "Being a quality driven organization, we are actively committed towards offering acknowledged Grain Mill (HZ. Chakki). This chakki is widely used for grinding grains. The offered products are precisely engineered making use of premium class components and advanced technology.",
    salientFeatures: [],
  },

  // ── Polishing Machine ─────────────────────────────────────
  {
    slugPattern: "polishing-machine",
    application:
      "We are instrumental in offering a magnificent and comprehensive range of Polishing Machine. The offered products are basically used to polish corrected surfaces of Brass, Silver.",
    salientFeatures: [
      "These products are widely acknowledged for their peerless and marvelous attributes such as longer functional life and sturdiness",
    ],
    specificationTable: {
      _type: "specificationTable",
      columns: ["Model No.", "Motor KW", "HP", "Capacity KG P/H"],
      rows: [
        { _key: "pm1", _type: "row", cells: ["PESS-900", "5.5", "7.5", "900"] },
        { _key: "pm2", _type: "row", cells: ["PESS-1050", "7.5", "10", "1200"] },
        { _key: "pm3", _type: "row", cells: ["PESS-1200", "11", "15", "1800"] },
      ],
    },
  },

  // ── Fatka Machine ──────────────────────────────────────────
  {
    slugPattern: "fatka-machine",
    application:
      "This machine is used to separate the cover of pulses. We are engaged in offering a wide range of Fatka Machine to our clients. The offered range of product is made from high grade quality raw material to meet the international quality standards.",
    salientFeatures: [],
  },

  // ── Impact Pulveriser ──────────────────────────────────────
  {
    slugPattern: "impact-pulveriser",
    application:
      "An extra heavily constructed machine designed to pulverize even rocks and minerals of medium hardness. Fineness, ranging among 100 meshes to 300 meshes (150 to 50 microns) and in some cases even 500 meshes.",
    salientFeatures: [],
  },
];

async function main() {
  console.log("Starting product specs migration (batch 2)...\n");

  let updated = 0;
  let notFound = 0;

  for (const product of products) {
    // Find the product by slug pattern (partial match)
    const doc = await client.fetch(
      `*[_type == "product" && slug.current match $pattern][0]`,
      { pattern: `*${product.slugPattern}*` },
    );

    if (!doc) {
      console.log(`⚠ Not found: "${product.slugPattern}"`);
      notFound++;
      continue;
    }

    console.log(`✓ Found "${doc.title}" (${doc._id})`);

    const patch: Record<string, any> = {
      application: product.application,
    };

    if (product.salientFeatures.length > 0) {
      patch.salientFeatures = product.salientFeatures;
    }

    if (product.specificationTable) {
      patch.specificationTable = product.specificationTable;
    }

    await client.patch(doc._id).set(patch).commit();

    const parts = [
      `application`,
      product.salientFeatures.length > 0
        ? `${product.salientFeatures.length} features`
        : null,
      product.specificationTable
        ? `${product.specificationTable.rows.length}-row spec table`
        : null,
    ]
      .filter(Boolean)
      .join(", ");

    console.log(`  → Updated: ${parts}\n`);
    updated++;
  }

  console.log(`\nMigration complete! Updated: ${updated}, Not found: ${notFound}`);
  if (notFound > 0) {
    console.log(
      "Products not found may need to be created in Sanity Studio first, or the slug pattern may differ.",
    );
  }
}

main().catch(console.error);
