import Link from "next/link";
import { ProductCard, Button, type PriceProps, type ProductCardClassNames } from "@storefront/ui";
import type { Product } from "../data/products";
import styles from "./demo.module.css";

/** Layer 4 — a whole different Price presentation, still fed the same props. */
function BulkPriceSlot(props: PriceProps) {
  const { value, currency = "USD", locale = "en-US", className } = props;
  const formatted = new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  return (
    <span className={[styles.bulkPrice, className].filter(Boolean).join(" ")}>
      {formatted}
      <span className={styles.bulkPriceUnit}>/ each</span>
    </span>
  );
}

const slotMapClassNames: ProductCardClassNames = {
  title: styles.overrideTitle,
  price: styles.overridePrice,
  cta: styles.overrideCta,
};

export function OverridesPanel({
  classNameProduct,
  slotMapProduct,
  swappedPriceProduct,
}: {
  classNameProduct: Product;
  slotMapProduct: Product;
  swappedPriceProduct: Product;
}) {
  return (
    <section className={styles.overridesSection}>
      <h3 className={styles.sectionHeading}>Per-layer overrides</h3>
      <p className={styles.sectionSubheading}>
        Same <code>ProductCard</code> and <code>Button</code> components, restyled through four
        different override layers (ARCHITECTURE.md §4) — cheapest and most common first.
      </p>
      <div className={styles.overridesGrid}>
        <div className={styles.overrideCell}>
          <span className={styles.overrideLabel}>Layer 3 — className</span>
          <ProductCard
            title={classNameProduct.title}
            imageSrc={classNameProduct.imageSrc}
            imageAlt={classNameProduct.imageAlt}
            price={classNameProduct.price}
            originalPrice={classNameProduct.compareAtPrice}
            currency={classNameProduct.currency}
            badgeLabel={classNameProduct.badgeLabel}
            className={styles.classNameOverride}
          />
        </div>

        <div className={styles.overrideCell}>
          <span className={styles.overrideLabel}>Layer 3 — classNames slot map</span>
          <ProductCard
            title={slotMapProduct.title}
            imageSrc={slotMapProduct.imageSrc}
            imageAlt={slotMapProduct.imageAlt}
            price={slotMapProduct.price}
            originalPrice={slotMapProduct.compareAtPrice}
            currency={slotMapProduct.currency}
            badgeLabel={slotMapProduct.badgeLabel}
            classNames={slotMapClassNames}
          />
        </div>

        <div className={styles.overrideCell}>
          <span className={styles.overrideLabel}>Layer 4 — swapped Price slot</span>
          <ProductCard
            title={swappedPriceProduct.title}
            imageSrc={swappedPriceProduct.imageSrc}
            imageAlt={swappedPriceProduct.imageAlt}
            price={swappedPriceProduct.price}
            originalPrice={swappedPriceProduct.compareAtPrice}
            currency={swappedPriceProduct.currency}
            badgeLabel={swappedPriceProduct.badgeLabel}
            slots={{ Price: BulkPriceSlot }}
          />
        </div>

        <div className={styles.overrideCell}>
          <span className={styles.overrideLabel}>Layer 4 — asChild (next/link)</span>
          <div className={styles.asChildBox}>
            <p className={styles.asChildCopy}>
              <code>Button</code> renders as the single child element it&apos;s given instead of
              a <code>&lt;button&gt;</code> — here, a real <code>next/link</code>, so this
              navigates client-side.
            </p>
            <Button asChild>
              <Link href="/buttons">Shop the full catalogue</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
