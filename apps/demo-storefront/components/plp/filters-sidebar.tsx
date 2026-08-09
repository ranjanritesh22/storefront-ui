import { Button, Checkbox, RangeSlider } from "@storefront/ui";
import {
  categoryFacets,
  brandFacets,
  sizeFacets,
  discountFacets,
  PRICE_MIN,
  PRICE_MAX,
} from "../../data/shoes";
import styles from "./plp.module.css";

/**
 * Swatch colours are content (which colourways this catalogue stocks), not
 * component styling — same category as a product photo's `src`. CLAUDE.md
 * hard rule #1 ("no literal design values") governs `@storefront/ui`
 * component internals, not app-level product data like this.
 */
const COLOR_FACETS = [
  { label: "Black", value: "#111111" },
  { label: "White", value: "#f5f5f5" },
  { label: "Grey", value: "#9ca3af" },
  { label: "Blue", value: "#2563eb" },
  { label: "Red", value: "#dc2626" },
  { label: "Green", value: "#16a34a" },
  { label: "Brown", value: "#78350f" },
  { label: "Beige", value: "#e7dcc8" },
];

export interface FiltersSidebarProps {
  selectedCategories: Set<string>;
  onToggleCategory: (label: string) => void;
  selectedBrands: Set<string>;
  onToggleBrand: (label: string) => void;
  selectedSizes: Set<number>;
  onToggleSize: (size: number) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
  selectedDiscounts: Set<number>;
  onToggleDiscount: (value: number) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

export function FiltersSidebar({
  selectedCategories,
  onToggleCategory,
  selectedBrands,
  onToggleBrand,
  selectedSizes,
  onToggleSize,
  priceRange,
  onPriceRangeChange,
  selectedColor,
  onSelectColor,
  selectedDiscounts,
  onToggleDiscount,
  hasActiveFilters,
  onClearAll,
}: FiltersSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Filters">
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Filters</h2>
        {hasActiveFilters ? (
          <button type="button" className={styles.clearAllLink} onClick={onClearAll}>
            Clear All
          </button>
        ) : null}
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Categories</h3>
        <div className={styles.checkboxList}>
          {categoryFacets.map((facet) => (
            <Checkbox
              key={facet.label}
              label={facet.label}
              description={`(${facet.count})`}
              checked={selectedCategories.has(facet.label)}
              onCheckedChange={() => onToggleCategory(facet.label)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Brand</h3>
        <div className={styles.checkboxList}>
          {brandFacets.map((facet) => (
            <Checkbox
              key={facet.label}
              label={facet.label}
              description={`(${facet.count})`}
              checked={selectedBrands.has(facet.label)}
              onCheckedChange={() => onToggleBrand(facet.label)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Size (UK)</h3>
        <div className={styles.sizeGrid}>
          {sizeFacets.map((size) => {
            const active = selectedSizes.has(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                className={active ? styles.sizeButtonActive : styles.sizeButton}
                onClick={() => onToggleSize(size)}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Price</h3>
        <RangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={priceRange}
          onChange={onPriceRangeChange}
          lowerLabel="Minimum price"
          upperLabel="Maximum price"
          formatValue={(value) => `₹${value.toLocaleString("en-IN")}${value === PRICE_MAX ? "+" : ""}`}
        />
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Color</h3>
        <div className={styles.colorSwatchList}>
          {COLOR_FACETS.map((color) => {
            const active = selectedColor === color.label;
            return (
              <button
                key={color.label}
                type="button"
                aria-pressed={active}
                aria-label={color.label}
                title={color.label}
                className={active ? styles.colorSwatchActive : styles.colorSwatch}
                style={{ background: color.value }}
                onClick={() => onSelectColor(active ? null : color.label)}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterGroupTitle}>Discount</h3>
        <div className={styles.checkboxList}>
          {discountFacets.map((value) => (
            <Checkbox
              key={value}
              label={`${value}% and above`}
              checked={selectedDiscounts.has(value)}
              onCheckedChange={() => onToggleDiscount(value)}
            />
          ))}
        </div>
      </div>

      <div className={styles.promoCard}>
        <h3 className={styles.promoTitle}>
          New Drop
          <br />
          Sneakers 2025
        </h3>
        <Button asChild variant="secondary" size="sm">
          <a href="#">Explore Now</a>
        </Button>
      </div>
    </aside>
  );
}
