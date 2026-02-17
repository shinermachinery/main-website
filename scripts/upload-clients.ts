/**
 * Upload Client Logos to Sanity
 * Run with: bun run scripts/upload-clients.ts
 *
 * Uploads all images from the specified folder as client documents in Sanity.
 */

import { createClient } from "@sanity/client";
import { readdir, readFile } from "node:fs/promises";
import { extname, basename, join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing environment variables. Check .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-12-22",
  useCdn: false,
});

const CLIENTS_DIR = "c:/Users/kulde/Desktop/Shinner/Clients";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function filenameToCompanyName(filename: string): string {
  // Remove extension
  let name = basename(filename, extname(filename));

  // Remove common suffixes like dimensions (300x27, 120x120, etc.) and trailing numbers
  name = name.replace(/-?\d+x\d+(-\d+)?/g, "");

  // Remove trailing "-1", "-2" etc.
  name = name.replace(/-\d+$/g, "");

  // Replace hyphens and underscores with spaces
  name = name.replace(/[-_]+/g, " ");

  // Remove "logo", "just", "new", "mc" standalone words
  name = name.replace(/\b(logo|just|new|mc)\b/gi, "");

  // Clean up extra spaces
  name = name.replace(/\s+/g, " ").trim();

  // Special case mappings for known company names
  const specialCases: Record<string, string> = {
    "anmol": "Anmol",
    "arohul foods": "Arohul Foods",
    "atc ffod": "ATC Food",
    "bd overseas": "BD Overseas",
    "Bholenath Foods P. Ltd.": "Bholenath Foods Pvt. Ltd.",
    "Bholenath Foods P Ltd": "Bholenath Foods Pvt. Ltd.",
    "dcp india": "DCP India",
    "dunar": "Dunar",
    "ebro": "Ebro",
    "galaxy": "Galaxy",
    "gautam grain": "Gautam Grain",
    "gee gee": "Gee Gee",
    "Header Lal Qilla Rice": "Lal Qilla Rice",
    "indian treat": "Indian Treat",
    "jagdish rice mills": "Jagdish Rice Mills",
    "jasmer": "Jasmer",
    "Jindla Industries P. Ltd.": "Jindla Industries Pvt. Ltd.",
    "Jindla Industries P Ltd": "Jindla Industries Pvt. Ltd.",
    "khosla agro overseas": "Khosla Agro Overseas",
    "KOHINOOR": "Kohinoor",
    "krbl": "KRBL",
    "lrnkF": "LRNK Foods",
    "majestic": "Majestic",
    "midas group": "Midas Group",
    "Nandi International": "Nandi International",
    "New Haryan Overseas": "New Haryan Overseas",
    "pansari": "Pansari",
    "patanjali": "Patanjali",
    "sagar rice": "Sagar Rice",
    "sifti": "Sifti",
    "slv": "SLV",
    "ss rice": "SS Rice",
    "suppletek": "Suppletek",
    "VINOD RICE MILL P. LTD.": "Vinod Rice Mill Pvt. Ltd.",
    "VINOD RICE MILL P LTD": "Vinod Rice Mill Pvt. Ltd.",
    "ks": "KS",
  };

  // Try to match with special cases (case-insensitive)
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(specialCases)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }

  // Title case the result
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function uploadClients() {
  console.log("Reading client logos from:", CLIENTS_DIR);

  const files = await readdir(CLIENTS_DIR);
  const imageFiles = files.filter((f) =>
    IMAGE_EXTENSIONS.has(extname(f).toLowerCase()),
  );

  console.log(`Found ${imageFiles.length} image files\n`);

  let uploaded = 0;
  let failed = 0;

  for (const file of imageFiles) {
    const companyName = filenameToCompanyName(file);
    const filePath = join(CLIENTS_DIR, file);

    try {
      console.log(`Uploading: ${file} → "${companyName}"`);

      // Read the file
      const fileBuffer = await readFile(filePath);

      // Upload image asset to Sanity
      const imageAsset = await client.assets.upload("image", fileBuffer, {
        filename: file,
        contentType: `image/${extname(file).slice(1) === "jpg" ? "jpeg" : extname(file).slice(1)}`,
      });

      // Create other client document (for logo marquee)
      await client.create({
        _type: "otherClient",
        companyName,
        logo: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
          alt: `${companyName} logo`,
        },
      });

      uploaded++;
      console.log(`  ✓ Created client: ${companyName}\n`);
    } catch (error) {
      failed++;
      console.error(`  ✗ Failed: ${file}`, error);
    }
  }

  console.log(`\nDone! Uploaded: ${uploaded}, Failed: ${failed}`);
}

uploadClients();
