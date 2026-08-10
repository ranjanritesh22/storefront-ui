/**
 * The minimal, domain-agnostic vocabulary composite components accept for
 * "a product." Deliberately not shaped like any commerce backend's response
 * (SAP Commerce/OCC, Shopify, custom) — this package has no data-fetching or
 * backend-types dependency (see ARCHITECTURE.md §1). A consumer maps their
 * API response onto this shape once, in their own code; see the adapter
 * example in product-card.mdx and CLAUDE.md's "Domain-agnostic props" rule.
 */
export interface ProductSummary {
  id: string;
  name: string;
  /** In the currency's major unit, e.g. `19.99`. */
  price: number;
  /** ISO 4217 currency code. @default "USD" */
  currency?: string;
  /** When higher than `price`, the product is on sale. */
  originalPrice?: number;
  image: {
    src: string;
    alt: string;
  };
  /** Link to the product's own page. */
  url?: string;
  /** Merchandising label, e.g. "New" or "Best seller". */
  badge?: string;
  rating?: {
    /** Out of 5. */
    value: number;
    count?: number;
  };
  colorsCount?: number;
  inStock?: boolean;
  /** Selectable variants (e.g. colors), rendered as swatches. */
  swatches?: ProductSwatch[];
}

export interface ProductSwatch {
  id: string;
  label: string;
  /** CSS color value from the product's own data, e.g. `"#1d4ed8"` — not one of this package's design tokens. */
  color?: string;
  imageSrc?: string;
}
