export interface Shoe {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  /** Muted line under the title on the card, e.g. "Men's Running Shoes". */
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  badgeLabel?: string;
  rating: number;
  ratingCount: number;
  colorsCount: number;
  /** UK sizes this shoe is stocked in. */
  sizes: number[];
  imageSrc: string;
  imageAlt: string;
}

/**
 * Local, static fixture for the PLP page (see CLAUDE.md non-goals — no data
 * fetching, no commerce-API types). Twelve items is enough to exercise every
 * filter facet below; category/brand facet *counts* are illustrative of a
 * larger catalog (matching a real PLP's sidebar), not derived from this
 * array — same spirit as the static `totalPages` passed to `Pagination` on
 * the page itself.
 */
export const shoes: Shoe[] = [
  {
    id: "s1",
    slug: "nike-air-force-1-07",
    title: "Nike Air Force 1 '07",
    brand: "Nike",
    category: "Sneakers",
    subtitle: "Men's Shoes",
    price: 8995,
    currency: "INR",
    rating: 4.5,
    ratingCount: 1200,
    colorsCount: 2,
    sizes: [6, 7, 8, 9, 10, 11],
    imageSrc: "/products/shoe-air-force.svg",
    imageAlt: "Nike Air Force 1 '07, a white leather low-top sneaker with a black swoosh",
  },
  {
    id: "s2",
    slug: "adidas-ultraboost-22",
    title: "Adidas Ultraboost 22",
    brand: "Adidas",
    category: "Running Shoes",
    subtitle: "Men's Running Shoes",
    price: 13499,
    compareAtPrice: 14999,
    currency: "INR",
    badgeLabel: "10% OFF",
    rating: 4.5,
    ratingCount: 842,
    colorsCount: 3,
    sizes: [7, 8, 9, 10, 11, 12],
    imageSrc: "/products/shoe-ultraboost.svg",
    imageAlt: "Adidas Ultraboost 22, a black knit running shoe with a boost midsole",
  },
  {
    id: "s3",
    slug: "puma-rs-x-efekt",
    title: "Puma RS-X Efekt",
    brand: "Puma",
    category: "Sneakers",
    subtitle: "Men's Sneakers",
    price: 6499,
    currency: "INR",
    rating: 4.4,
    ratingCount: 512,
    colorsCount: 2,
    sizes: [6, 7, 8, 9, 10],
    imageSrc: "/products/shoe-rsx.svg",
    imageAlt: "Puma RS-X Efekt, a grey chunky-sole sneaker",
  },
  {
    id: "s4",
    slug: "new-balance-574",
    title: "New Balance 574",
    brand: "New Balance",
    category: "Casual Shoes",
    subtitle: "Men's Casual Shoes",
    price: 7999,
    currency: "INR",
    rating: 4.6,
    ratingCount: 623,
    colorsCount: 4,
    sizes: [7, 8, 9, 10, 11, 12, 13],
    imageSrc: "/products/shoe-574.svg",
    imageAlt: "New Balance 574, a grey and black suede-and-mesh sneaker",
  },
  {
    id: "s5",
    slug: "reebok-classic-leather",
    title: "Reebok Classic Leather",
    brand: "Reebok",
    category: "Sneakers",
    subtitle: "Men's Shoes",
    price: 5999,
    currency: "INR",
    rating: 4.3,
    ratingCount: 382,
    colorsCount: 3,
    sizes: [6, 7, 8, 9, 10, 11],
    imageSrc: "/products/shoe-reebok-classic.svg",
    imageAlt: "Reebok Classic Leather, an off-white leather retro sneaker",
  },
  {
    id: "s6",
    slug: "adidas-forum-low",
    title: "Adidas Forum Low",
    brand: "Adidas",
    category: "Sneakers",
    subtitle: "Men's Sneakers",
    price: 6799,
    compareAtPrice: 7999,
    currency: "INR",
    badgeLabel: "15% OFF",
    rating: 4.5,
    ratingCount: 412,
    colorsCount: 2,
    sizes: [7, 8, 9, 10],
    imageSrc: "/products/shoe-forum-low.svg",
    imageAlt: "Adidas Forum Low, a white leather sneaker with black three stripes",
  },
  {
    id: "s7",
    slug: "nike-revolution-7",
    title: "Nike Revolution 7",
    brand: "Nike",
    category: "Running Shoes",
    subtitle: "Men's Running Shoes",
    price: 4995,
    currency: "INR",
    rating: 4.2,
    ratingCount: 256,
    colorsCount: 2,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    imageSrc: "/products/shoe-revolution.svg",
    imageAlt: "Nike Revolution 7, a black mesh running shoe with a white swoosh",
  },
  {
    id: "s8",
    slug: "puma-ca-pro-classic",
    title: "Puma CA Pro Classic",
    brand: "Puma",
    category: "Sneakers",
    subtitle: "Men's Sneakers",
    price: 5499,
    currency: "INR",
    rating: 4.4,
    ratingCount: 198,
    colorsCount: 3,
    sizes: [7, 8, 9, 10, 11],
    imageSrc: "/products/shoe-ca-pro.svg",
    imageAlt: "Puma CA Pro Classic, a cream leather court sneaker",
  },
  {
    id: "s9",
    slug: "asics-gel-contend-8",
    title: "Asics Gel-Contend 8",
    brand: "Asics",
    category: "Running Shoes",
    subtitle: "Men's Running Shoes",
    price: 7499,
    currency: "INR",
    rating: 4.3,
    ratingCount: 301,
    colorsCount: 2,
    sizes: [7, 8, 9, 10, 11],
    imageSrc: "/products/shoe-gel-contend.svg",
    imageAlt: "Asics Gel-Contend 8, an olive-green running shoe",
  },
  {
    id: "s10",
    slug: "red-tape-chelsea-boots",
    title: "Red Tape Chelsea Boots",
    brand: "Red Tape",
    category: "Boots",
    subtitle: "Men's Boots",
    price: 4999,
    currency: "INR",
    badgeLabel: "NEW",
    rating: 4.5,
    ratingCount: 154,
    colorsCount: 1,
    sizes: [7, 8, 9, 10, 11],
    imageSrc: "/products/shoe-chelsea-boot.svg",
    imageAlt: "Red Tape Chelsea Boots, a black leather ankle boot",
  },
  {
    id: "s11",
    slug: "converse-chuck-70-hi",
    title: "Converse Chuck 70 Hi",
    brand: "Converse",
    category: "Sneakers",
    subtitle: "Men's Sneakers",
    price: 6999,
    currency: "INR",
    rating: 4.6,
    ratingCount: 278,
    colorsCount: 2,
    sizes: [6, 7, 8, 9, 10, 11],
    imageSrc: "/products/shoe-chuck-hi.svg",
    imageAlt: "Converse Chuck 70 Hi, an off-white canvas high-top sneaker",
  },
  {
    id: "s12",
    slug: "vans-old-skool",
    title: "Vans Old Skool",
    brand: "Vans",
    category: "Sneakers",
    subtitle: "Men's Skate Shoes",
    price: 5299,
    currency: "INR",
    rating: 4.5,
    ratingCount: 367,
    colorsCount: 2,
    sizes: [6, 7, 8, 9, 10],
    imageSrc: "/products/shoe-old-skool.svg",
    imageAlt: "Vans Old Skool, a black and white canvas skate shoe with a side stripe",
  },
];

export interface FacetOption {
  label: string;
  count: number;
}

/** Illustrative of the full catalog behind this PLP, not derived from `shoes` — see module doc. */
export const categoryFacets: FacetOption[] = [
  { label: "Sneakers", count: 112 },
  { label: "Running Shoes", count: 48 },
  { label: "Casual Shoes", count: 36 },
  { label: "Sports Shoes", count: 28 },
  { label: "Boots", count: 12 },
  { label: "Sandals & Slides", count: 20 },
];

export const brandFacets: FacetOption[] = [
  { label: "Nike", count: 45 },
  { label: "Adidas", count: 38 },
  { label: "Puma", count: 32 },
  { label: "New Balance", count: 28 },
  { label: "Reebok", count: 18 },
];

export const sizeFacets = [6, 7, 8, 9, 10, 11, 12, 13];

export const discountFacets = [10, 20, 30, 40];

export const PRICE_MIN = 999;
export const PRICE_MAX = 15999;
