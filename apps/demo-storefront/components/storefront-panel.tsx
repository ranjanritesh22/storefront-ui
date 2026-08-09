import type { Product } from "../data/products";
import { PlpGrid } from "./plp-grid";
import { PdpPanel } from "./pdp-panel";
import styles from "./demo.module.css";

/**
 * Rendered three times from the exact same JSX in <ThemeDemo> — once per
 * `data-brand` / `data-theme` wrapper. Only the tokens resolved by the
 * ancestor attribute differ; this component never branches on theme
 * (ARCHITECTURE.md §7).
 */
export function StorefrontPanel({
  products,
  featured,
  inStock,
}: {
  products: Product[];
  featured: Product;
  inStock: boolean;
}) {
  return (
    <div className={styles.panelBody}>
      <section>
        <h4 className={styles.sectionLabel}>PLP · {products.length} products</h4>
        <PlpGrid products={products} />
      </section>
      <section>
        <h4 className={styles.sectionLabel}>PDP · featured item</h4>
        <PdpPanel product={featured} inStock={inStock} />
      </section>
    </div>
  );
}
