"use client";

import { useMemo, useState } from "react";
import { Badge, Breadcrumb, Pagination, Select } from "@storefront/ui";
import { shoes, type Shoe } from "../../data/shoes";
import { FiltersSidebar } from "./filters-sidebar";
import { ProductGrid } from "./product-grid";
import styles from "./plp.module.css";

type SortValue = "popularity" | "newest" | "price-asc" | "price-desc" | "rating";

const PRICE_BOUNDS: [number, number] = [999, 15999];
/** Illustrative of the full catalog this PLP would page through against a real API — see data/shoes.ts. */
const TOTAL_CATALOG_SIZE = 256;
const TOTAL_PAGES = 11;

function sortShoes(list: Shoe[], sortBy: SortValue): Shoe[] {
  const copy = [...list];
  switch (sortBy) {
    case "newest":
      return copy.reverse();
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => b.ratingCount - a.ratingCount);
  }
}

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

/**
 * Owns every piece of PLP UI state (filters, sort, wishlist, page) — the one
 * client boundary in the page; `SiteHeader`/`TrustStrip`/`SiteFooter` stay
 * server-rendered around it. Filtering/sorting here is local UI state over a
 * 12-item fixture, not the "business logic" CLAUDE.md's non-goals rule out —
 * a real storefront would swap this for a server-driven search/filter API.
 */
export function PlpExplorer() {
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [sizes, setSizes] = useState<Set<number>>(new Set());
  const [discounts, setDiscounts] = useState<Set<number>>(new Set());
  const [color, setColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>(PRICE_BOUNDS);
  const [sortBy, setSortBy] = useState<SortValue>("popularity");
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return shoes.filter((shoe) => {
      if (categories.size > 0 && !categories.has(shoe.category)) return false;
      if (brands.size > 0 && !brands.has(shoe.brand)) return false;
      if (sizes.size > 0 && !shoe.sizes.some((size) => sizes.has(size))) return false;
      if (shoe.price < priceRange[0] || shoe.price > priceRange[1]) return false;
      if (discounts.size > 0) {
        const discountPct = shoe.compareAtPrice
          ? Math.round(((shoe.compareAtPrice - shoe.price) / shoe.compareAtPrice) * 100)
          : 0;
        if (discountPct < Math.min(...discounts)) return false;
      }
      return true;
    });
  }, [categories, brands, sizes, priceRange, discounts]);

  const sorted = useMemo(() => sortShoes(filtered, sortBy), [filtered, sortBy]);

  const hasActiveFilters =
    categories.size > 0 || brands.size > 0 || sizes.size > 0 || discounts.size > 0 || color !== null ||
    priceRange[0] !== PRICE_BOUNDS[0] || priceRange[1] !== PRICE_BOUNDS[1];

  const chips: { key: string; label: string; onRemove: () => void }[] = [
    ...Array.from(categories, (value) => ({
      key: `category-${value}`,
      label: value,
      onRemove: () => setCategories((prev) => toggle(prev, value)),
    })),
    ...Array.from(brands, (value) => ({
      key: `brand-${value}`,
      label: value,
      onRemove: () => setBrands((prev) => toggle(prev, value)),
    })),
    ...Array.from(sizes, (value) => ({
      key: `size-${value}`,
      label: `UK ${value}`,
      onRemove: () => setSizes((prev) => toggle(prev, value)),
    })),
    ...Array.from(discounts, (value) => ({
      key: `discount-${value}`,
      label: `${value}% off+`,
      onRemove: () => setDiscounts((prev) => toggle(prev, value)),
    })),
    ...(color
      ? [{ key: "color", label: color, onRemove: () => setColor(null) }]
      : []),
  ];

  function clearAll() {
    setCategories(new Set());
    setBrands(new Set());
    setSizes(new Set());
    setDiscounts(new Set());
    setColor(null);
    setPriceRange(PRICE_BOUNDS);
  }

  function toggleWishlist(id: string) {
    setWishlisted((prev) => toggle(prev, id));
  }

  return (
    <div className={styles.main}>
      <div className={styles.breadcrumbRow}>
        <Breadcrumb
          items={[{ label: "Home", href: "#" }, { label: "Men", href: "#" }, { label: "Shoes" }]}
        />
      </div>

      <div className={styles.titleBlock}>
        <div>
          <h1 className={styles.pageTitle}>
            Men&apos;s Shoes
            <span className={styles.resultCount}>({TOTAL_CATALOG_SIZE} products)</span>
          </h1>
          <p className={styles.pageDescription}>
            Step up your style with our wide range of sneakers, running shoes, casuals and more.
          </p>
        </div>
        <div className={styles.sortRow}>
          <span className={styles.sortLabel}>Sort by</span>
          <Select
            aria-label="Sort by"
            className={styles.sortSelect}
            value={sortBy}
            onValueChange={(nextValue) => setSortBy(nextValue as SortValue)}
            options={[
              { value: "popularity", label: "Popularity" },
              { value: "newest", label: "Newest first" },
              { value: "price-asc", label: "Price: low to high" },
              { value: "price-desc", label: "Price: high to low" },
              { value: "rating", label: "Customer rating" },
            ]}
          />
        </div>
      </div>

      {chips.length > 0 ? (
        <div className={styles.chipRow}>
          {chips.map((chip) => (
            <Badge key={chip.key} variant="outline" className={styles.chip}>
              {chip.label}
              <button
                type="button"
                className={styles.chipRemove}
                onClick={chip.onRemove}
                aria-label={`Remove ${chip.label} filter`}
              >
                ×
              </button>
            </Badge>
          ))}
          <button type="button" className={styles.clearAllChip} onClick={clearAll}>
            Clear all
          </button>
        </div>
      ) : null}

      <div className={styles.layout}>
        <FiltersSidebar
          selectedCategories={categories}
          onToggleCategory={(label) => setCategories((prev) => toggle(prev, label))}
          selectedBrands={brands}
          onToggleBrand={(label) => setBrands((prev) => toggle(prev, label))}
          selectedSizes={sizes}
          onToggleSize={(size) => setSizes((prev) => toggle(prev, size))}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          selectedColor={color}
          onSelectColor={setColor}
          selectedDiscounts={discounts}
          onToggleDiscount={(value) => setDiscounts((prev) => toggle(prev, value))}
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAll}
        />

        <div>
          <p className={styles.resultsSummary}>
            Showing {sorted.length} of {TOTAL_CATALOG_SIZE} products
          </p>
          <ProductGrid products={sorted} wishlisted={wishlisted} onToggleWishlist={toggleWishlist} />
          <div className={styles.paginationRow}>
            <Pagination page={page} totalPages={TOTAL_PAGES} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
