/**
 * Update descriptionBulletPoints for 10 existing products in Sanity.
 * Run with:
 *   export $(grep -v '^#' .env.local | xargs) && bun run scripts/update-bullet-points.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-12-22",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

// Each entry: search term to match title → bullet points
const updates: { search: string; bulletPoints: string[] }[] = [
  {
    search: "C 600",
    bulletPoints: [
      "Fast, Reliable Whiteness Measurement — Provides instant whiteness values for rice samples, usually within seconds of insertion, improving throughput during milling and grading.",
      "Accurate and Consistent Quality Control — Uses light reflectance measurement to give repeatable and objective results, standardizing rice quality evaluation across batches and operators.",
      "Easy Operation — Simple sample handling: fill sample case, insert, and read result. Large fluorescent display makes values easy to read.",
      "Low Maintenance & Durable — Only one part (glass filter) needs routine cleaning and is easy to remove/replace. No moving parts, robust on factory floors and labs.",
      "Supports Process Control — Useful for QA and QC in rice milling, helps monitor milling performance and product standards. Automatic display of test count helps track batch testing.",
    ],
  },
  {
    search: "HB-610",
    bulletPoints: [
      "High Accuracy & Reliability — Ensures precise moisture readings, helping buyers and millers make confident procurement and storage decisions.",
      "Prevents Mold & Storage Losses — Detects excess moisture early, reducing the risk of fungal growth, spoilage, and weight loss during storage.",
      "Fast & Easy Operation — Simple one-step measurement saves time during bulk procurement and warehouse inspections.",
      "Ideal for Raw Paddy & Grains — Especially effective for raw paddy with hard husk, where surface moisture checks are unreliable.",
      "Direct In-Bag Measurement — Measures moisture directly inside paddy or jute bags using a probe sensor, no need to open or empty the bags.",
      "Portable & Field-Friendly — Lightweight and easy to carry, suitable for warehouses, mandis, procurement centers, and storage yards.",
    ],
  },
  {
    search: "PM-450",
    bulletPoints: [
      "Works on Average Mode, indicating the average moisture content of the sample.",
      "Uses the Dielectric Method, where moisture is measured based on the dielectric constant of the grain volume.",
      "Operates on the Capacitance Method, ensuring moisture readings remain stable even with changes in atmospheric temperature.",
      "Portable and battery-operated, ideal for field and laboratory use.",
      "Easy to clean, easy to carry, and maintenance-free design.",
      "Can test approximately 150 grams of grain sample at a time.",
    ],
  },
  {
    search: "GRAMS",
    bulletPoints: [
      "Accurate Quality Assessment — Measures key grain parameters such as Rice, Pulses & Seeds with consistent quality.",
      "Faster Decision Making — Provides quick results, enabling rapid grading, pricing, and acceptance or rejection of grain lots.",
      "Enhances Storage Safety — Helps identify grains with high moisture or poor quality, reducing the risk of spoilage, mold, and insect infestation.",
      "Optimizes Milling & Processing Efficiency — Ensures grains meet required standards, improving yield and final product quality.",
      "Non-Destructive Testing — Analyzes samples without damaging the grain, allowing reuse of tested material.",
      "Supports Standardized Grading — Enables compliance with industry and government quality norms.",
      "Reduces Manual Errors — Minimizes dependency on visual inspection and human judgment.",
      "Ideal for Multiple Applications — Suitable for rice mills, grain warehouses, procurement centers, laboratories, traders, and exporters.",
    ],
  },
  {
    search: "Husker",
    bulletPoints: [
      "Efficient Husk Removal — Removes husk from paddy accurately without damaging the rice kernel.",
      "Accurate Milling Analysis — Helps determine hulling efficiency and supports precise rice quality evaluation.",
      "Maintains Grain Integrity — Minimizes broken grains, ensuring reliable test results.",
      "Essential for Quality Control Labs — Widely used in rice mills, research institutes, and testing laboratories.",
      "Consistent & Repeatable Results — Ensures uniform hulling performance for comparative analysis.",
      "Small Sample Testing — Ideal for laboratory-scale testing without wastage of large quantities.",
      "Improves Process Optimization — Assists millers in adjusting milling parameters to improve yield and quality.",
      "User-Friendly Operation — Easy to operate with minimal training required.",
      "Durable & Reliable Build — Designed for long-term laboratory use with stable performance.",
    ],
  },
  {
    search: "Lab Polisher",
    bulletPoints: [
      "Accurate Polishing Evaluation — Helps assess polishing degree and surface finish of rice in laboratory conditions.",
      "Maintains Grain Quality — Ensures uniform polishing with minimal grain breakage.",
      "Supports Quality Control & R&D — Essential for rice mills, food laboratories, research institutes, and quality testing centers.",
      "Small Sample Processing — Ideal for testing limited sample quantities without wastage.",
      "Consistent & Repeatable Results — Provides reliable and comparable polishing outcomes for analysis.",
      "Improves Milling Optimization — Assists millers in fine-tuning polishing parameters to enhance yield and appearance.",
      "Durable Laboratory Design — Built for continuous lab use with stable and long-lasting performance.",
      "Time-Saving & Efficient — Delivers quick results, speeding up laboratory testing.",
    ],
  },
  {
    search: "LTJM",
    bulletPoints: [
      "Accurate Rice Yield Evaluation — Precisely measures head rice yield, broken rice percentage, and total milling yield.",
      "Essential for Quality Control — Helps rice mills, laboratories, and research institutes assess milling performance.",
      "Supports Fair Pricing & Procurement — Objective yield data reduces disputes between buyers, sellers, and millers.",
      "Consistent & Repeatable Results — Ensures uniform testing conditions for reliable comparison across samples.",
      "Small Sample Testing — Ideal for laboratory-scale analysis without processing large quantities of rice.",
      "Improves Milling Optimization — Enables millers to adjust husking and polishing parameters to maximize head rice recovery.",
      "Durable & Reliable Construction — Designed for continuous laboratory use with stable long-term performance.",
      "Time-Efficient Testing — Delivers fast and accurate results, saving time in quality evaluation.",
    ],
  },
  {
    search: "OGA",
    bulletPoints: [
      "Wide Grain Application — Suitable for paddy, rice, wheat, maize, pulses, and other grains.",
      "Quick & Accurate Moisture Measurement — Provides fast and reliable moisture readings to support confident buying, selling, and storage decisions.",
      "Portable & Field-Friendly — Compact and lightweight design makes it ideal for use at mandis, warehouses, farms, and mills.",
      "Helps Prevent Storage Losses — Early detection of high moisture reduces the risk of mold, spoilage, and insect infestation.",
      "Supports Fair Trade — Accurate moisture data minimizes disputes during procurement and pricing.",
      "Durable & Reliable Build — Designed for regular use in tough agricultural environments.",
      "Cost-Effective Solution — Affordable option for farmers, traders, and procurement centers.",
    ],
  },
  {
    search: "Crackness",
    bulletPoints: [
      "Accurate Crack Detection — Helps identify internal and surface cracks in rice kernels that are not visible to the naked eye.",
      "Improves Rice Quality Assessment — Enables precise evaluation of grain integrity, which directly impacts milling yield.",
      "Reduces Broken Rice Percentage — Early crack analysis helps prevent excessive breakage during milling.",
      "Essential for Quality Control Labs — Widely used in rice mills, testing laboratories, and research institutes.",
      "Simple & Visual Analysis Method — Easy-to-use design allows quick inspection without complex instruments.",
      "Supports Process Optimization — Assists millers in adjusting drying and milling parameters to minimize cracks.",
      "Small Sample Testing — Ideal for laboratory-scale testing with minimal sample requirement.",
      "Cost-Effective Quality Tool — Provides reliable crack analysis without high operational costs.",
      "Durable & Long-Lasting — Designed for repeated laboratory use with stable performance.",
    ],
  },
  {
    search: "Sample Divider",
    bulletPoints: [
      "Uniform Sample Division — Divides grain or seed samples into equal, representative portions for accurate testing.",
      "Improves Test Accuracy — Ensures consistent and unbiased samples for moisture, purity, germination, and quality analysis.",
      "Reduces Human Error — Eliminates manual splitting errors, improving reliability of lab results.",
      "Essential for Seed & Grain Laboratories — Widely used in seed testing labs, grain quality labs, research institutes, and procurement centers.",
      "Supports Standardized Testing — Helps comply with national and international testing standards.",
      "Time-Saving & Efficient — Quickly divides samples, increasing lab productivity.",
      "Suitable for Various Seeds & Grains — Works effectively with paddy, wheat, maize, pulses, oilseeds, and other crops.",
      "Easy to Operate & Maintain — Simple design with minimal maintenance requirements.",
      "Durable & Long-Lasting Construction — Built for regular laboratory and field use.",
    ],
  },
];

async function run() {
  console.log("🔄 Fetching all products...");
  const products: { _id: string; title: string }[] = await client.fetch(
    `*[_type == "product"]{_id, title}`
  );
  console.log(`   Found ${products.length} products\n`);

  const tx = client.transaction();
  let updateCount = 0;

  for (const update of updates) {
    // Find matching product(s)
    const matches = products.filter((p) =>
      p.title.toLowerCase().includes(update.search.toLowerCase())
    );

    if (matches.length === 0) {
      console.log(`   ❌ No match for "${update.search}"`);
      continue;
    }

    // For "Sample Divider" and "Husker" there may be multiple matches - update all
    for (const match of matches) {
      tx.patch(match._id, {
        set: { descriptionBulletPoints: update.bulletPoints },
      });
      console.log(`   ✅ ${match.title} (${match._id}) — ${update.bulletPoints.length} bullet points`);
      updateCount++;
    }
  }

  if (updateCount === 0) {
    console.log("\n⚠️  No products matched. Check search terms.");
    return;
  }

  console.log(`\n⏳ Committing ${updateCount} updates...`);
  await tx.commit();
  console.log("✅ Done!");
}

run().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
