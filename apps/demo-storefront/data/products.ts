export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  price: number;
  /** Higher than `price` when the item is discounted; renders struck through. */
  compareAtPrice?: number;
  currency: string;
  badgeLabel?: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  sku: string;
}

/**
 * Local, static fixture — no backend, no data fetching (see CLAUDE.md non-goals).
 * Images are local SVGs under /public/products so the demo has zero network
 * dependency. Named consts (rather than array indices) so consumers of a
 * specific product get `Product`, not `Product | undefined`.
 */
export const trailheadLowTrainer: Product = {
  id: "p1",
  slug: "trailhead-low-trainer",
  title: "Trailhead Low Trainer",
  brand: "Fernweg",
  price: 108,
  compareAtPrice: 135,
  currency: "USD",
  badgeLabel: "Sale",
  imageSrc: "/products/trail-runner.svg",
  imageAlt: "Fernweg Trailhead Low Trainer, a grey trail running shoe",
  description:
    "A low-profile trail trainer built for mixed terrain — sticky rubber outsole, breathable mesh upper, and a gusseted tongue that keeps grit out on long descents.",
  sku: "FW-TRH-108-GRY",
};

export const alpineShellRainJacket: Product = {
  id: "p2",
  slug: "alpine-shell-rain-jacket",
  title: "Alpine Shell Rain Jacket",
  brand: "Northgate",
  price: 189,
  currency: "USD",
  badgeLabel: "New",
  imageSrc: "/products/rain-jacket.svg",
  imageAlt: "Northgate Alpine Shell Rain Jacket, a sage green waterproof shell",
  description:
    "Fully seam-sealed 2.5-layer shell with pit zips and a helmet-compatible hood. Packs down to the size of a water bottle.",
  sku: "NG-ASJ-189-SGE",
};

export const weekenderCanvasDuffel: Product = {
  id: "p3",
  slug: "weekender-canvas-duffel",
  title: "Weekender Canvas Duffel",
  brand: "Fernweg",
  price: 96,
  currency: "USD",
  imageSrc: "/products/duffel-bag.svg",
  imageAlt: "Fernweg Weekender Canvas Duffel, a tan waxed-canvas duffel bag",
  description:
    "Waxed 18oz canvas with full-grain leather trim, a removable shoulder strap, and a shoe compartment that zips off from the main body.",
  sku: "FW-WCD-096-TAN",
};

export const merinoRibbedBeanie: Product = {
  id: "p4",
  slug: "merino-ribbed-beanie",
  title: "Merino Ribbed Beanie",
  brand: "Northgate",
  price: 32,
  currency: "USD",
  imageSrc: "/products/beanie.svg",
  imageAlt: "Northgate Merino Ribbed Beanie, a heather-grey wool beanie",
  description:
    "17-micron merino, double-folded brim, unlined for a closer fit. Machine washable despite what wool usually demands.",
  sku: "NG-MRB-032-HGR",
};

export const vacuumSteelBottle: Product = {
  id: "p5",
  slug: "vacuum-steel-bottle-750",
  title: "Vacuum Steel Bottle 750ml",
  brand: "Basecamp",
  price: 28,
  compareAtPrice: 34,
  currency: "USD",
  badgeLabel: "Sale",
  imageSrc: "/products/water-bottle.svg",
  imageAlt: "Basecamp Vacuum Steel Bottle, a pale blue insulated water bottle",
  description:
    "18/8 stainless, double-wall vacuum insulation — cold for 24 hours, hot for 12. Wide mouth fits standard ice cubes.",
  sku: "BC-VSB-028-BLU",
};

export const trailrunnerWirelessEarbuds: Product = {
  id: "p6",
  slug: "trailrunner-wireless-earbuds",
  title: "Trailrunner Wireless Earbuds",
  brand: "Basecamp",
  price: 79,
  currency: "USD",
  badgeLabel: "New",
  imageSrc: "/products/wireless-earbuds.svg",
  imageAlt: "Basecamp Trailrunner Wireless Earbuds with charging case",
  description:
    "IPX5-rated in-ears with an 8-hour case battery and ear hooks that stay put through interval repeats.",
  sku: "BC-TWE-079-STN",
};

export const recycledFleecePullover: Product = {
  id: "p7",
  slug: "recycled-fleece-pullover",
  title: "Recycled Fleece Pullover",
  brand: "Northgate",
  price: 84,
  currency: "USD",
  imageSrc: "/products/fleece-pullover.svg",
  imageAlt: "Northgate Recycled Fleece Pullover, a moss green quarter-zip",
  description:
    "Midweight fleece spun from recycled bottles, brushed on the inside. A kangaroo pocket and quarter-zip collar round it out.",
  sku: "NG-RFP-084-MSS",
};

export const carbonTrekkingPoles: Product = {
  id: "p8",
  slug: "carbon-trekking-poles",
  title: "Carbon Trekking Poles (Pair)",
  brand: "Fernweg",
  price: 64,
  currency: "USD",
  imageSrc: "/products/trekking-poles.svg",
  imageAlt: "Fernweg Carbon Trekking Poles, a pair of collapsible clay-colored poles",
  description:
    "3-section carbon poles with cork grips and quick-flip locks. Collapse to 24in to strap onto a pack.",
  sku: "FW-CTP-064-CLY",
};

/** The PLP grid — all eight, in display order. */
export const products: Product[] = [
  trailheadLowTrainer,
  alpineShellRainJacket,
  weekenderCanvasDuffel,
  merinoRibbedBeanie,
  vacuumSteelBottle,
  trailrunnerWirelessEarbuds,
  recycledFleecePullover,
  carbonTrekkingPoles,
];

/** The single item featured in the compact PDP panel. */
export const featuredProduct = trailheadLowTrainer;
