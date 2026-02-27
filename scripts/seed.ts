import { writeClient } from "@/sanity/lib/client";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Product Collections ───────────────────────────────────────────────────────

const collections = [
  {
    _type: "productCollection" as const,
    title: "Paddy to Rice Milling Machinery",
    slug: { _type: "slug", current: "paddy-to-rice-milling-machinery" },
    description:
      "Complete range of machinery for paddy processing and rice milling, from cleaning and destoning to whitening and polishing.",
    featured: true,
    order: 1,
  },
  {
    _type: "productCollection" as const,
    title: "Pulses Milling Machinery",
    slug: { _type: "slug", current: "pulses-milling-machinery" },
    description:
      "Comprehensive pulses processing equipment including separators, destoners, emery rolls, grain mills, and polishing machines.",
    featured: true,
    order: 2,
  },
  {
    _type: "productCollection" as const,
    title: "Color Sorter",
    slug: { _type: "slug", current: "color-sorter" },
    description:
      "Advanced optical color sorting technology for rice, pulses, and all other food grain products.",
    featured: false,
    order: 3,
  },
  {
    _type: "productCollection" as const,
    title: "Laboratory Equipment",
    slug: { _type: "slug", current: "laboratory-equipment" },
    description:
      "Rice, pulses, wheat, and other seeds plant laboratory equipment for quality testing, moisture analysis, and grain inspection.",
    featured: true,
    order: 4,
  },
  {
    _type: "productCollection" as const,
    title: "Turnkey Projects & Solutions",
    slug: { _type: "slug", current: "turnkey-projects-and-solutions" },
    description:
      "Complete plant engineering and erection solutions for rice, pulses, seeds, flour, and spices milling and processing plants.",
    featured: false,
    order: 5,
  },
];

// ─── Products ──────────────────────────────────────────────────────────────────

interface ProductData {
  title: string;
  collectionSlug: string;
  description: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  featured?: boolean;
  order: number;
}

const products: ProductData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PADDY TO RICE MILLING MACHINERY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: "Paddy Cleaner",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER cleaning machine for paddy. Removes impurities using inlet feed rolls, aspiration chamber, and multi-layer scalping screen system.",
    features: [
      "Machine is fitted with inlet feed rolls",
      "Aspiration chamber fitted with one waste auger",
      "Screen system consists of one sieve boat with 1 short scalping screen layer and 2 long grading hand screen layers",
      "Integral fan, fixed speed drive, and motor",
      "Steel construction with sieve boat also in steel construction",
      "Eccentric shaft mechanism reduces breakdown",
      "Top 2 sieves punched from CNC Machine zigzag holes for high perforation area",
    ],
    specifications: [
      {
        label: "Model PEPC-600",
        value: "2-3 TPH, 3 HP fan, 1 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEPC-900",
        value: "3-4 TPH, 5 HP fan, 2 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEPC-1050",
        value: "4-5 TPH, 7.5 HP fan, 2 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEPC-1200",
        value: "5-7 TPH, 7.5 HP fan, 2 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEPC-1500",
        value: "10-12 TPH, 10 HP fan, 3 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEPC-1500x2",
        value: "16-20 TPH, 10 HP fan, 3 HP sieve motor, 2 sieve boats",
      },
    ],
    featured: true,
    order: 1,
  },
  {
    title: "Rice Cleaner",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER fine cleaner for cleaning and grading of rice. Features inlet feed rolls, aspiration chamber, and multi-layer scalping screen system for superior cleaning.",
    features: [
      "Machine is fitted with inlet feed rolls",
      "Aspiration chamber fitted with one waste auger",
      "Screen system consists of 1 sieve boat with 1 short scalping screen layer and 3 long grading hand screen layers",
      "Integral fan, fixed speed drive, and motor",
      "Steel construction with sieve boat also in steel construction",
      "Eccentric shaft mechanism reduces breakdown",
      "Top 2 sieves punched from CNC Machine zigzag holes for high perforation area, better cleaning",
    ],
    specifications: [
      {
        label: "Model PEFC-600",
        value: "2-3 TPH, 5 HP fan, 1 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEFC-900",
        value: "3-4 TPH, 7.5 HP fan, 2 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEFC-1050",
        value: "5 TPH, 7.5 HP fan, 2 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEFC-1200",
        value: "6-7 TPH, 10 HP fan, 2 HP sieve motor, 1 sieve boat",
      },
      {
        label: "Model PEFC-1500",
        value: "10-12 TPH, 12.5 HP fan, 3 HP sieve motor, 1 sieve boat",
      },
    ],
    featured: true,
    order: 2,
  },
  {
    title: "Paddy & Rice Destoner",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER destoner for separating stone in paddy and rice. Provides efficient and precise separation of stone and heavy material by density difference.",
    features: [
      "Efficient and precise separation of stone and heavy material by density difference",
      "Fitted with two vibro motors for trouble-free and long life with low noise operation",
      "Provided with closed circuit duct/hose aspirator system",
      "Separate collection of stone and dust particles from the aspirator",
      "Sturdy rigid and heavy-duty construction, precise construction assures stone-free paddles",
      "Vibro motor assures noiseless, trouble-free operations",
      "Negligible loss of paddy",
      "Self-cleaning system for maximum operating efficiency",
      "Removes immature grain along with other impurities",
      "Powder coated",
      "High tensile hardware used for assembly",
    ],
    specifications: [
      { label: "Model PEDS-900", value: "3-4 TPH, 0.5 HP x 02 NOS" },
      { label: "Model PEDS-1050", value: "5 TPH, 0.5 HP x 02 NOS" },
      { label: "Model PEDS-1200", value: "6-7 TPH, 0.5 HP x 02 NOS" },
      { label: "Model PEDS-1500", value: "8-10 TPH, 1 HP x 02 NOS" },
    ],
    featured: true,
    order: 3,
  },
  {
    title: "Vibro Pneumatic Sheller",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER pneumatic rubber sheller for de-husking. Good to work on raw, steamed, parboiled, and basmati rice.",
    features: [
      "Special vibro feeder arrangement to feed the paddy grain vertically between the two rubber rolls",
      "Enhancement of rubber rolls life",
      "Infinite adjustment of degree of hulling",
      "Roll movement both in Automatic and Manual mode",
      "Special cooling arrangement for rubber roll, ease of maintenance",
      "Heavy body insures zero vibration and reduces chances of paddy breaking",
    ],
    specifications: [
      {
        label: "Model PEVPS-3TPH/4TPH",
        value: '3-4 TPH, 10"x10" rubber rolls, 10 HP / 12.5 HP motor, 750 KG',
      },
      {
        label: "Model PEVPS-5TPH",
        value: '5 TPH, 10"x12" rubber rolls, 15 HP motor, 800 KG',
      },
    ],
    featured: true,
    order: 4,
  },
  {
    title: "Husk Aspirator",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER husk aspirator for separating husk and brown rice. Compact size with small installation area.",
    features: [
      "Compact size, requires small installation area",
      "Sturdy rigid and heavy duty construction",
      "Efficiently separates husk and brown rice by density difference",
      "Fan designed in stainless steel for a better life",
    ],
    specifications: [
      {
        label: "Model PEHA-4TPH",
        value: "4 MT R/H capacity, 7.5 HP motor, 550 KG",
      },
    ],
    featured: false,
    order: 5,
  },
  {
    title: "Paddy Separator",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER paddy separator for high capacity and efficient separation of paddy and brown rice.",
    features: [
      "Oscillating tray type",
      "High output with adjustable stroke and inclination of tray",
      "Separation of three distinct classification: Paddy, mixed, Brown rice",
      "Stainless steel tray to avoid wear and tear, sensor for flow indication",
    ],
    specifications: [
      { label: "Model PEPS-4TPH", value: "3 HP, 20 S.S. trays, 950 kg" },
      { label: "Model PEPS-8TPH", value: "5 HP, 40 S.S. trays, 1350 kg" },
    ],
    featured: false,
    order: 6,
  },
  {
    title: "Rice Length Grader",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER length grader for broken rice separation and rice tips separation.",
    features: [
      "High accuracy separation of head rice from the mixed",
      "Can be used in broken rice separation of different lengths of rice",
      "Easy maintenance and minimum operational cost",
      "Special hard chrome plated cylinder also available",
    ],
    specifications: [
      {
        label: "Model PELG-1TPH",
        value: "1 HP, 2285 MM screen, 430 MM screen width, 400 kg",
      },
      {
        label: "Model PELG-2TPH",
        value: "2 HP, 2920 MM screen, 600 MM screen width, 850 kg",
      },
    ],
    featured: false,
    order: 7,
  },
  {
    title: "Rice Whitener",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER whitener, good to work on raw, steamed, parboiled, boiled, and basmati rice.",
    features: [
      "Ensures uniform and very high degree of whiteness on all grains",
      "Various adjustment like the flow and gap between screens and stones enables uniform polish with less broken",
      "Vertically mounted silicon carbide grinding wheel assures higher rice yield and broken reduction",
      "Imported differential manometer for precise control of chamber air pressure",
      "Sturdy rigid and heavy duty construction with quickly exchangeable screen frames with screen, grinding wheel",
      "Very high degree to whiteness, higher rice yield",
      "Easy replacement of grinding wheel",
      "Indication of load on motor, easy to maintain, does not require special foundation",
      "Double aspiration system to ensure uniform removal of bran",
    ],
    specifications: [
      {
        label: "Model PEWT-4TPH",
        value:
          "4 TPH, 30 HP, 6 grinding wheels, 18/24/30 standard sieve sizes, 700 kg",
      },
      {
        label: "Model PEWT-6TPH",
        value:
          "6 TPH, 40 HP, 6 grinding wheels, 18/24/30 standard sieve sizes, 1000 kg",
      },
      {
        label: "Model PEWT-8TPH",
        value:
          "8 TPH, 60 HP, 7 grinding wheels, 18/24/30 standard sieve sizes, 1200 kg",
      },
    ],
    featured: true,
    order: 8,
  },
  {
    title: "Rice Waterjet Polisher",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER silky polisher for silky shining on rice surface. Good to work on raw, steamed, parboiled, boiled, and basmati rice.",
    features: [
      "Specially designed beaters for high degree of glazing",
      "Rice is polished by friction among grains, removing bran and dust particles, giving the rice luster finish",
      "Alloy steel feeding roll, cam rollers, and screen components are surface hardened for durability and hygiene",
      "Automatic controlled moisture injection systems",
      "Mist air and water is injected into the polishing chamber for uniform polishing of rice",
      "Two chambers: 1st is mixing chamber and 2nd is polishing chamber",
    ],
    specifications: [
      { label: "Model PESP-4T", value: "4 ton input, 30-40 HP, 910 kg" },
      { label: "Model PESP-8T", value: "8 ton input, 75 HP, 1300 kg" },
    ],
    featured: true,
    order: 9,
  },
  {
    title: "Bran Centrifugal Machine",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "SHINER centrifugal machine for separation of left out rice tips from bran in rice mills. Nylon net helps high quality powder get filtered and collected in a bag.",
    features: [
      "Nylon net in machine helps high quality powder get filtered and collected in a bag",
      "Nylon brush to clean filter nylon net",
      "Made of heavy M.S. angle, CRC sheet and ENB shaft",
      "High quality dust proof ball bearing and bearing housing",
      "Does not vibrate and generates very little sound",
      "Capacity depends on nylon net mesh and type of material",
      "Low energy consumption",
    ],
    specifications: [
      {
        label: "Model PECF-4T",
        value: "0.7 MT R/H, 3 HP, 2 filter nets, 600 kg",
      },
      {
        label: "Model PECF-8T",
        value: "1.2 MT R/H, 5 HP, 3 filter nets, 850 kg",
      },
    ],
    featured: false,
    order: 10,
  },
  {
    title: "Cylindrical Sizer",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "An extremely efficient system for separation of over-sized and under-sized grains. Equally effective for grading of paddy as well as rice.",
    features: [
      "Easy to install, operate and maintain",
      "Easy to change the cylindrical screen from front",
      "Low power consumption",
      "Precise separation of rejection size",
      "Machine is duly powder coated and hence resistant to rust and corrosion",
    ],
    specifications: [
      {
        label: "Model PECS-20",
        value: "2 ton capacity, 1 HP, 2 columns, 400 kg",
      },
      {
        label: "Model PECS-40",
        value: "4 ton capacity, 1.5 HP, 4 columns, 650 kg",
      },
      {
        label: "Model PECS-60",
        value: "6 ton capacity, 2 HP, 6 columns, 950 kg",
      },
    ],
    featured: false,
    order: 11,
  },
  {
    title: "Rotary Separator",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Designed for separation of broken rice as its diameter wise with rotary motion. Equipped with 5 trays and 5 outputs for differential diameters of rice like small broken, medium broken, big broken, and head rice.",
    features: [
      "Self-cleaning mechanism to avoid clogging of screens",
      "Extra sieves provided for processing of all types of rice",
      "Heavy rigid structure for noiseless and trouble-free operations",
    ],
    specifications: [
      {
        label: "Model PERT-2T",
        value: "2-3 TPH, Motor 2hp/1.5kw/960RPM, 5 S.S. trays, 700 KG",
      },
      {
        label: "Model PERT-4T",
        value: "4-6 TPH, Motor 2hp/1.5kw/960RPM, 5 S.S. trays, 740 KG",
      },
    ],
    featured: false,
    order: 12,
  },
  {
    title: "Bucket Elevator",
    collectionSlug: "paddy-to-rice-milling-machinery",
    description:
      "Highly efficient SHINER elevators for conveying the material vertically to the next machine.",
    features: [
      "Both side powder coated with salt spray test sustenance for more than 500 hours",
      "Flatted design and high tensile hardware used for assembly",
      "Motor used ABB or Equivalent: Gearbox - Bonafiglio / PBL / Premium",
      "Heavy duty casting pulley at top and specially designed fabricated pulley used at bottom to avoid broken generation",
      "Sturdy rigid and heavy duty construction, perfect alignment ensures zero wear and tear and more life",
      "Option for air aspiration in the head of the elevator",
      "Available in 2 models: Silver and Platinum",
    ],
    featured: false,
    order: 13,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PULSES MILLING MACHINERY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: "Vibro Separator",
    collectionSlug: "pulses-milling-machinery",
    description:
      "A wide range of vibro separators used to remove coarse impurities like large kernels, string, straw, wood, stones or clumps of soil, as well as fine impurities such as sand and breakage from the grain. Available in varied sizes and designs.",
    featured: true,
    order: 1,
  },
  {
    title: "Aspiration Channel",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Aspiration channels used in different flour mills for cleaning food grains. Provides high light impurity material separation capacity and high performance without any errors. Can be operated without electrical power or motor. Packed in special packaging material for secure transit.",
    featured: false,
    order: 2,
  },
  {
    title: "Reel Centrifugal Machine",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Used for removing various impurities and for grading purpose. A sieve separator with latest and sophisticated technology, widely supplied to flour and dall milling industry. Separates out big size materials like chalk, husk, and stones through sieves. Available in different capacities at cost-effective price.",
    featured: false,
    order: 3,
  },
  {
    title: "Destoner",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Used for separating stones from a continuous material stream. Reliable removal of high-density impurities such as stones. Separates small stones and glass or metal particles from the grain mass in dry process based on different specific weights of the admixtures and grain. Applied in flour mill cleaning sections.",
    specifications: [
      {
        label: "Type",
        value: "Destoner/Vibratory Air screen cleaner, Electric motor operated",
      },
      { label: "Type of prime mover", value: "Electric motor" },
      { label: "Type of drive", value: "Belt and pulley drive" },
    ],
    featured: false,
    order: 4,
  },
  {
    title: "Magnetic Destoner",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Advanced magnetic destoner for removal of metallic impurities from grain. Operates with electric motor and belt and pulley drive system.",
    specifications: [
      {
        label: "Recommended power",
        value:
          "Destoner: 0.75 KW (1 hp, three phase), Bucket elevator: 0.37 KW (0.5 hp, three phase)",
      },
      { label: "Type of drive", value: "Belt and pulley drive" },
    ],
    featured: false,
    order: 5,
  },
  {
    title: "Wooden Cleaner",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Traditional wooden cleaner for efficient grain cleaning operations. Effective for removal of dust, chaff, and light impurities from pulses and grains.",
    featured: false,
    order: 6,
  },
  {
    title: "Emery Roll",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Prominent manufacturer, supplier and exporter of excellent quality emery roll machines. Effectively removes the husk of gram, wheat, and pulses. Superior quality emery rolls made with M.S and SS 304. Runs on two ball bearings with superior design ensuring no breakage of the bearing.",
    featured: true,
    order: 7,
  },
  {
    title: "Grain Mill (HZ. Chakki)",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Precision-engineered atta chakki widely used for grinding grains. Made using premium class components and innovative technology. Provided chakki is duly inspected on numerous parameters of quality. Horizontal stone chakki distinguished for less maintenance. Designed using the best quality material and advanced technology.",
    featured: true,
    order: 8,
  },
  {
    title: "Polishing Machine",
    collectionSlug: "pulses-milling-machinery",
    description:
      "A magnificent and comprehensive range of polishing machines. Used to polish corroded surfaces of pulses and wheat. Products are widely acknowledged for their peerless and marvelous attributes such as longer functional life and sturdiness. Powder coated. Available in different sizes and specifications.",
    features: [
      "Widely acknowledged for longer functional life and sturdiness",
      "Powder coated",
      "Available in different sizes, specifications and capacities",
    ],
    specifications: [
      {
        label: "Model PEPM-0.75 TPH",
        value: '14"x48"x2.5 size, 25 HP motor, 700-800 KG P/H',
      },
      {
        label: "Model PEPM-1.0 TPH",
        value: '14"x58"x2.5 size, 25 HP motor, 1000-1100 KG P/H',
      },
      {
        label: "Model PEPM-1.5TPH",
        value: '16"x48"x2.5 size, 30 HP motor, 1400-1500 KG P/H',
      },
      {
        label: "Model PEPM-2.0 TPH",
        value: '18"x48"x2.5 size, 40 HP motor, 1800-2000 KG P/H',
      },
    ],
    featured: false,
    order: 9,
  },
  {
    title: "Fatka Machine",
    collectionSlug: "pulses-milling-machinery",
    description:
      "Used to separate the cover of pulses. Made from high grade raw material to meet international quality standards.",
    featured: false,
    order: 10,
  },
  {
    title: "Impact Pulveriser",
    collectionSlug: "pulses-milling-machinery",
    description:
      "An extra heavily constructed machine designed to pulverize even rocks and minerals of medium hardness. Fineness ranging among 100 meshes to 300 meshes (150 to 50 microns) and in some cases even 500 meshes.",
    featured: false,
    order: 11,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COLOR SORTER
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: "Color Sorter for Rice, Pulses & All Other Food Grain Products",
    collectionSlug: "color-sorter",
    description:
      "Advanced optical color sorting technology for rice, pulses, and all other food grain products. Features independent SMC ejectors made in Japan, Toshiba high-end 4096 pixels CCD full-color camera, imported SMC air filters made in Japan, and patented design of TFT touch screen for high sensitivity.",
    features: [
      "Using independent SMC ejectors made in Japan",
      "Toshiba high-end 4096 pixels CCD full-color camera",
      "Using imported SMC air filters made in Japan",
      "Patented design of TFT touch screen for high sensitivity",
    ],
    featured: true,
    order: 1,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LABORATORY EQUIPMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: "GRAMS Rice & Pulses Analyzer",
    collectionSlug: "laboratory-equipment",
    description:
      "A revolutionary rice analyzer software based on patented rice segmentation techniques and innovative image processing algorithms. Captures high resolution image from flatbed scanner, removes image noise using color pipeline, performs auto-calibration and calculates shape and color statistics for each rice particle.",
    features: [
      "Measures average length, average width, aspect ratio",
      "Calculates whiteness index, average color",
      "Identifies chalky grains, immature, reddish grains, greenish grains",
      "Detects damaged and discolored grains",
      "99% accuracy",
      "Record keeping is easy",
      "Print the analyses",
      "Very easy to use",
      "Save manpower and improve milling process",
      "Increase your revenues",
    ],
    specifications: [
      { label: "Measuring Method", value: "Image Processing Technology" },
      { label: "Measuring Time", value: "30 Secs to 1 Min" },
      { label: "Measuring Commodities", value: "Rice, Pulses & Seeds" },
      { label: "Sample Size", value: "5 to 20 Grams" },
    ],
    featured: true,
    order: 1,
  },
  {
    title: "Kett Moisture Meter PM-650",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett PM-650 moisture meter for accurate moisture measurement of rice and grain samples using dielectric and capacitance method.",
    specifications: [
      {
        label: "Measuring Method",
        value: "Dielectrically & Capacitance Method",
      },
      { label: "Measuring Time", value: "30 Secs" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Sample Size", value: "150 Grams" },
    ],
    featured: false,
    order: 2,
  },
  {
    title: "Kett Moisture Meter PM-435",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett PM-435 moisture meter for precise grain moisture testing in laboratory and field conditions.",
    featured: false,
    order: 3,
  },
  {
    title: "Kett Moisture Meter PM-450",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett PM-450 moisture meter for multigrain moisture measurement using dielectric and capacitance method.",
    specifications: [
      {
        label: "Measuring Method",
        value: "Dielectrically & Capacitance Method",
      },
      { label: "Measuring Time", value: "30 Secs" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Sample Size", value: "150 Grams" },
    ],
    featured: false,
    order: 4,
  },
  {
    title: "Kett Moisture Meter FV-295",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett FV-295 moisture meter for reliable moisture content determination in food grains.",
    featured: false,
    order: 5,
  },
  {
    title: "Kett Moisture Meter FV-209",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett FV-209 moisture meter using electrical and resist method for rapid moisture measurement of rice, wheat, clove, and barley.",
    specifications: [
      { label: "Measuring Method", value: "Electrical & Resist Method" },
      { label: "Measuring Time", value: "2 Secs" },
      { label: "Measuring Commodities", value: "Rice, Wheat, Clove & Barley" },
      { label: "Sample Size", value: "10 to 15 Grains" },
    ],
    featured: false,
    order: 6,
  },
  {
    title: "Kett NIR Bran Oil Analyzer",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett NIR bran oil analyzer for near-infrared analysis of oil content in rice bran and other grain products.",
    featured: false,
    order: 7,
  },
  {
    title: "NIR Composition Analyzer KB-270",
    collectionSlug: "laboratory-equipment",
    description:
      "NIR Composition Analyzer KB-270 for FFA and oil analysis using near-infrared technology. Suitable for rice bran and grain product composition analysis.",
    featured: true,
    order: 8,
  },
  {
    title: "Near Infrared Component Analyzer AN-920",
    collectionSlug: "laboratory-equipment",
    description:
      "Near infrared component analyzer AN-920 for advanced multi-component analysis of grains and food products using NIR spectroscopy.",
    featured: false,
    order: 9,
  },
  {
    title: "Handheld NIR Moisture Meter KJT-30",
    collectionSlug: "laboratory-equipment",
    description:
      "Handheld NIR moisture meter KJT-30 for portable, non-destructive moisture measurement of grains using near-infrared technology.",
    featured: false,
    order: 10,
  },
  {
    title: "Online NIR Moisture Analyzer KB-30",
    collectionSlug: "laboratory-equipment",
    description:
      "Online NIR moisture analyzer KB-30 for continuous, real-time moisture monitoring in grain processing lines using near-infrared technology.",
    featured: false,
    order: 11,
  },
  {
    title: "NIR Composition Analyzer KJT-700",
    collectionSlug: "laboratory-equipment",
    description:
      "NIR Composition Analyzer KJT-700/70 for multi-parameter composition analysis of grains, seeds, and food products using near-infrared spectroscopy.",
    featured: false,
    order: 12,
  },
  {
    title: "Kett Whiteness Tester C-600",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett C-600 whiteness tester for measuring the degree of whiteness in rice and other milled grains. Portable device, easy to use.",
    specifications: [
      { label: "Measurement", value: "Whiteness value of rice" },
      { label: "Response Time", value: "2 Secs" },
      { label: "Sample Volume", value: "Approximately 50 Gram" },
      { label: "Type", value: "Portable device" },
    ],
    featured: false,
    order: 13,
  },
  {
    title: "Kett Infrared Moisture Analyzer",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett infrared moisture analyzer for rapid and accurate moisture content determination using infrared technology.",
    featured: false,
    order: 14,
  },
  {
    title: "Electrical & Dielectric Moisture Analyzer",
    collectionSlug: "laboratory-equipment",
    description:
      "Electrical and dielectric moisture analyzer for versatile moisture measurement across multiple grain types using dual measurement principles.",
    featured: false,
    order: 15,
  },
  {
    title: "Kett Single Grain Moisture Tester PQ-520",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett PQ-520 single grain moisture tester for individual grain moisture measurement. Measures 10 to 100 grains with print report capability.",
    specifications: [
      { label: "Measuring Method", value: "Electrical & Resist Method" },
      { label: "Measuring Time", value: "40 Secs / 100 Grains" },
      { label: "Measuring Commodities", value: "Paddy, Rice, Wheat & Barley" },
      { label: "Sample Size", value: "10 to 100 Grains" },
      { label: "Report", value: "Can Print" },
    ],
    featured: false,
    order: 16,
  },
  {
    title: "Kett Rod Type Moisture Meter HB-610",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett HB-610 rod type moisture meter for measuring moisture content in bulk grain storage and during handling. Multigrain compatible with print report capability.",
    specifications: [
      { label: "Measuring Method", value: "Electrical & Resist Method" },
      { label: "Measuring Time", value: "2 Secs" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Report", value: "Can Print" },
    ],
    featured: false,
    order: 17,
  },
  {
    title: "Moisture Meter OGA",
    collectionSlug: "laboratory-equipment",
    description:
      "OGA moisture meter for reliable moisture measurement of various grains and food products.",
    featured: false,
    order: 18,
  },
  {
    title: "Shiner Universal Moisture Meter",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner universal moisture meter compatible with a wide range of grain and seed types for versatile moisture testing.",
    specifications: [
      { label: "Measuring Method", value: "Electrical & Resist Method" },
      { label: "Measuring Time", value: "1 Min" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Sample Size", value: "100 Grams" },
    ],
    featured: false,
    order: 19,
  },
  {
    title: "Coating Thickness Tester",
    collectionSlug: "laboratory-equipment",
    description:
      "Coating thickness tester for measuring and verifying coating thickness on processed grains and industrial surfaces.",
    featured: false,
    order: 20,
  },
  {
    title: "Shiner Lab Bracket",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner laboratory bracket for testing and evaluating rice and grain samples in quality control labs.",
    featured: false,
    order: 21,
  },
  {
    title: "Shiner Lab Pulverizer",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner laboratory pulverizer for grinding grain samples to fine powder for analysis and testing purposes.",
    featured: false,
    order: 22,
  },
  {
    title: "Shiner Lab Husker (Taiwan Model)",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner lab husker (Taiwan model) for dehulling paddy samples through rubber rolls in laboratory conditions.",
    specifications: [
      { label: "Measuring Method", value: "Dehulling through Rubber Rolls" },
      { label: "Measuring Time", value: "30 Secs" },
      { label: "Measuring Commodity", value: "Paddy" },
      { label: "Sample Size", value: "100 Grams" },
    ],
    featured: true,
    order: 23,
  },
  {
    title: "Shiner Lab Husker (Indian Model)",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner lab husker (Indian model) for dehulling paddy samples in laboratory settings. Cost-effective alternative for quality testing labs.",
    featured: false,
    order: 24,
  },
  {
    title: "Shiner Lab Polisher",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner lab polisher for polishing brown rice samples using multi-stage abrasive method in laboratory conditions.",
    specifications: [
      { label: "Measuring Method", value: "Multi Stage Abrasive Method" },
      {
        label: "Measuring Time",
        value: "100 to 200 Secs (Depend upon the Sample)",
      },
      { label: "Measuring Commodities", value: "Brown Rice" },
      { label: "Sample Size", value: "100 Grams" },
    ],
    featured: true,
    order: 25,
  },
  {
    title: "Shiner LTJM Yield Tester",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner LTJM yield tester for determining the milling yield of paddy and rice samples in laboratory conditions.",
    featured: true,
    order: 26,
  },
  {
    title: "Shiner Satake Milling Meter MM1D",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner Satake Milling Meter MM1D for measuring whiteness and milling degree value of rice. Portable device, easy to use.",
    specifications: [
      {
        label: "Measurement",
        value: "Whiteness & Milling Degree Value of Rice",
      },
      { label: "Response Time", value: "2 Secs" },
      { label: "Sample Volume", value: "Approximately 50 Gram" },
      { label: "Type", value: "Portable device" },
    ],
    featured: true,
    order: 27,
  },
  {
    title: "Shiner Lab Grader",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner laboratory grader for precise grading and classification of rice and grain samples by size using multi-sieve grading process.",
    specifications: [
      { label: "Measuring Method", value: "Multi Sieves Grading Process" },
      {
        label: "Measuring Time",
        value: "30 Secs to 1 Min (Depend upon Sample Size)",
      },
      { label: "Measuring Commodities", value: "Rice" },
      { label: "Sample Size", value: "100 Grams" },
    ],
    featured: false,
    order: 28,
  },
  {
    title: "Shiner Lab Dryer",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner laboratory dryer (10 to 120 boxes) for controlled drying of grain samples using heat and convection method.",
    specifications: [
      { label: "Measuring Method", value: "Heat & Convection Method" },
      {
        label: "Measuring Time",
        value: "30 Mins to 1 Hour (Depend upon moisture of paddy)",
      },
      { label: "Measuring Commodities", value: "Paddy" },
      { label: "Sample Size", value: "250 Grams" },
    ],
    featured: false,
    order: 29,
  },
  {
    title: "Shiner Lab Paddy Cleaner",
    collectionSlug: "laboratory-equipment",
    description:
      "Laboratory-scale paddy cleaner with vibro sieves and aspiration system for cleaning small sample quantities of paddy.",
    specifications: [
      {
        label: "Measuring Method",
        value: "Vibro Sieves with Aspiration System",
      },
      { label: "Measuring Time", value: "1 Min" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Sample Size", value: "500 grams to 1 kg" },
    ],
    featured: false,
    order: 30,
  },
  {
    title: "Vernier Caliper Mitutoyo",
    collectionSlug: "laboratory-equipment",
    description:
      "Precision Mitutoyo (Japan) vernier caliper for measuring grain dimensions including length, width, and thickness.",
    featured: false,
    order: 31,
  },
  {
    title: "PAR Scanner",
    collectionSlug: "laboratory-equipment",
    description:
      "PAR scanner for scanning and analyzing grain samples for quality parameters and visual inspection.",
    featured: false,
    order: 32,
  },
  {
    title: "Shiner Crackness Board",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner crackness board for evaluating grain hardness and breakage resistance during processing.",
    featured: false,
    order: 33,
  },
  {
    title: "Shiner Weighing Scale 0.01g",
    collectionSlug: "laboratory-equipment",
    description:
      "Precision weighing scale with 0.01g to 620g range for laboratory grain sample measurement and analysis.",
    specifications: [
      { label: "Measuring Method", value: "Load Scale" },
      { label: "Measuring Time", value: "2 Secs" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Sample Size", value: "600 Grams Max" },
    ],
    featured: false,
    order: 34,
  },
  {
    title: "Weighing Scale 0.0001g",
    collectionSlug: "laboratory-equipment",
    description:
      "High-precision analytical weighing scale with 0.0001g to 220g range for precise laboratory measurements.",
    featured: false,
    order: 35,
  },
  {
    title: "Weighing Scale 5kg to 100kg",
    collectionSlug: "laboratory-equipment",
    description:
      "Industrial weighing scale with 5kg to 100kg capacity for bulk grain sample weighing in processing and quality labs.",
    featured: false,
    order: 36,
  },
  {
    title: "Electronic Pocket Scale",
    collectionSlug: "laboratory-equipment",
    description:
      "Compact electronic pocket scale for quick and portable grain sample weighing in field or lab.",
    featured: false,
    order: 37,
  },
  {
    title: "Electronic Note Book Scale",
    collectionSlug: "laboratory-equipment",
    description:
      "Ultra-compact electronic notebook scale for lightweight, portable precision weighing of grain samples.",
    featured: false,
    order: 38,
  },
  {
    title: "Shiner Automatic Sample Divider",
    collectionSlug: "laboratory-equipment",
    description:
      "Automatic sample divider for unbiased and representative sub-sampling of grain lots for laboratory analysis using coning and quartering method.",
    specifications: [
      { label: "Measuring Method", value: "Coning & Quartering" },
      { label: "Measuring Time", value: "30 Secs" },
      { label: "Measuring Commodities", value: "Multigrain" },
      { label: "Sample Size", value: "1 Kg" },
    ],
    featured: true,
    order: 39,
  },
  {
    title: "Shiner Sample Divider",
    collectionSlug: "laboratory-equipment",
    description:
      "Manual sample divider for dividing grain samples into representative sub-samples for quality testing.",
    featured: false,
    order: 40,
  },
  {
    title: "Wooden Sieves",
    collectionSlug: "laboratory-equipment",
    description:
      "Traditional wooden sieves for manual grain grading and separation in laboratory settings.",
    featured: false,
    order: 41,
  },
  {
    title: "Brass Sieves",
    collectionSlug: "laboratory-equipment",
    description:
      "High-quality brass sieves for precise grain grading and particle size analysis in laboratory conditions.",
    featured: false,
    order: 42,
  },
  {
    title: "Cooking Plates",
    collectionSlug: "laboratory-equipment",
    description:
      "Laboratory cooking plates (black and white) for rice cooking quality evaluation and testing.",
    featured: false,
    order: 43,
  },
  {
    title: "Shiner Hot Air Oven",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner hot air oven for moisture determination, sample drying, and other thermal testing of grain samples.",
    featured: false,
    order: 44,
  },
  {
    title: "Bulk Density Apparatus",
    collectionSlug: "laboratory-equipment",
    description:
      "Bulk density apparatus for measuring the bulk density of grain and seed samples as per standard testing methods.",
    featured: false,
    order: 45,
  },
  {
    title: "Digital Colony Counter",
    collectionSlug: "laboratory-equipment",
    description:
      "Digital colony counter for microbiological analysis and colony counting in food grain quality labs.",
    featured: false,
    order: 46,
  },
  {
    title: "Sieve Shaker",
    collectionSlug: "laboratory-equipment",
    description:
      "Table-top sieve shaker for automated and consistent sieve analysis of grain and seed samples.",
    featured: false,
    order: 47,
  },
  {
    title: "Digital PH Meter",
    collectionSlug: "laboratory-equipment",
    description:
      "Digital pH meter for measuring acidity and alkalinity of grain extracts and processing water in quality labs.",
    featured: false,
    order: 48,
  },
  {
    title: "Bacteriological Incubator",
    collectionSlug: "laboratory-equipment",
    description:
      "Bacteriological incubator for maintaining controlled temperature conditions for microbiological testing of food grain samples.",
    featured: false,
    order: 49,
  },
  {
    title: "UV-VIS Spectrophotometer",
    collectionSlug: "laboratory-equipment",
    description:
      "UV-VIS spectrophotometer for spectral analysis and quality determination of grain and food samples.",
    featured: false,
    order: 50,
  },
  {
    title: "Sampling Probe",
    collectionSlug: "laboratory-equipment",
    description:
      "Sampling probe for collecting representative grain samples from bags, silos, and bulk storage for quality testing.",
    featured: false,
    order: 51,
  },
  {
    title: "Shiner Broken Sieves",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner broken rice sieves for laboratory grading and separation of broken rice particles by size.",
    featured: false,
    order: 52,
  },
  {
    title: "Shiner Lab Aspirator",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner lab aspirator for separating light impurities from grain samples by air flow in laboratory conditions.",
    featured: false,
    order: 53,
  },
  {
    title: "Shiner Serological Water Bath",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner serological water bath for maintaining constant temperature conditions during grain and food sample testing.",
    featured: false,
    order: 54,
  },
  {
    title: "Kett Sampling Spoon",
    collectionSlug: "laboratory-equipment",
    description:
      "Kett sampling spoon for collecting precise and consistent grain samples for moisture and quality analysis.",
    featured: false,
    order: 55,
  },
  {
    title: "Shiner Hand Microscope",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner hand microscope for portable visual inspection and quality assessment of grain samples.",
    featured: false,
    order: 56,
  },
  {
    title: "Shiner Microscope",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner laboratory microscope for detailed visual inspection, grain morphology analysis, and quality control.",
    featured: false,
    order: 57,
  },
  {
    title: "Shiner Laminar Air Flow",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner laminar air flow cabinet providing clean, particle-free workspace for sensitive grain testing and microbiological work.",
    featured: false,
    order: 58,
  },
  {
    title: "Shiner Magnify Board",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner magnify board for enlarged visual inspection and grading of rice and grain samples.",
    featured: false,
    order: 59,
  },
  {
    title: "Shiner Rubber Roll",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner rubber roll replacement parts for lab huskers and dehulling equipment.",
    featured: false,
    order: 60,
  },
  {
    title: "Shiner Soxhlet Analyzer",
    collectionSlug: "laboratory-equipment",
    description:
      "Shiner Soxhlet analyzer for bran and FFA (free fatty acid) analysis in rice bran and grain products.",
    featured: false,
    order: 61,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TURNKEY PROJECTS & SOLUTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    title: "Turnkey Processing Plant",
    collectionSlug: "turnkey-projects-and-solutions",
    description:
      "Complete plant engineering and erection solution for rice, pulses, seeds, flour, and spices milling and processing plant machinery. End-to-end project execution from planning to commissioning.",
    featured: true,
    order: 1,
  },
  {
    title: "Storage Silos",
    collectionSlug: "turnkey-projects-and-solutions",
    description:
      "Industrial storage silos for bulk grain storage. Designed for safe, long-term storage of rice, pulses, wheat, and other grains with controlled environment systems.",
    featured: false,
    order: 2,
  },
  {
    title: "Packing Machinery",
    collectionSlug: "turnkey-projects-and-solutions",
    description:
      "Packing machinery for grain and food products, handling capacities from 10 grams to 1000 kgs. Automated and semi-automated solutions for efficient packaging operations.",
    featured: false,
    order: 3,
  },
  {
    title: "Grain Dryer",
    collectionSlug: "turnkey-projects-and-solutions",
    description:
      "Industrial grain dryer for reducing moisture content in paddy, rice, wheat, and other grains. Essential for post-harvest processing and long-term storage preparation.",
    featured: false,
    order: 4,
  },
];

// ─── Seed Script ───────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Starting Sanity seed...\n");

  // Step 1: Delete existing products and collections
  console.log("🗑️  Cleaning existing products and collections...");

  const existingProducts = await writeClient.fetch<string[]>(
    `*[_type == "product"]._id`,
  );
  const existingCollections = await writeClient.fetch<string[]>(
    `*[_type == "productCollection"]._id`,
  );

  if (existingProducts.length > 0) {
    const productTx = writeClient.transaction();
    for (const id of existingProducts) {
      productTx.delete(id);
    }
    await productTx.commit();
    console.log(`   Deleted ${existingProducts.length} existing products`);
  }

  if (existingCollections.length > 0) {
    const collectionTx = writeClient.transaction();
    for (const id of existingCollections) {
      collectionTx.delete(id);
    }
    await collectionTx.commit();
    console.log(
      `   Deleted ${existingCollections.length} existing collections`,
    );
  }

  // Step 2: Create collections
  console.log("\n📁 Creating product collections...");

  const collectionMap = new Map<string, string>();

  for (const col of collections) {
    const result = await writeClient.create(col);
    collectionMap.set(col.slug.current, result._id);
    console.log(`   ✅ ${col.title} (${result._id})`);
  }

  // Step 3: Create products
  console.log("\n📦 Creating products...");

  let productCount = 0;
  const tx = writeClient.transaction();

  for (const product of products) {
    const collectionId = collectionMap.get(product.collectionSlug);
    if (!collectionId) {
      console.error(
        `   ❌ Collection not found for slug: ${product.collectionSlug}`,
      );
      continue;
    }

    const slug = slugify(product.title);

    const doc: Record<string, unknown> = {
      _type: "product",
      title: product.title,
      slug: { _type: "slug", current: slug },
      displayType: "textOnly",
      description: product.description,
      collection: { _type: "reference", _ref: collectionId },
      featured: product.featured ?? false,
      order: product.order,
    };

    if (product.features && product.features.length > 0) {
      doc.features = product.features;
    }

    if (product.specifications && product.specifications.length > 0) {
      doc.specifications = product.specifications.map((spec) => ({
        _type: "object",
        _key: slugify(spec.label).slice(0, 32),
        label: spec.label,
        value: spec.value,
      }));
    }

    tx.create(doc);
    productCount++;
  }

  await tx.commit();
  console.log(`   ✅ Created ${productCount} products`);

  // Summary
  console.log("\n🎉 Seed complete!");
  console.log(`   ${collections.length} collections`);
  console.log(`   ${productCount} products`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
