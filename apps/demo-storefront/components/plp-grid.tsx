import { ProductCard } from "@storefront/ui";
import type { Product } from "../data/products";
import styles from "./demo.module.css";

export function PlpGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.plpGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          aspect="square"
          title={product.title}
          imageSrc={product.imageSrc}
          imageAlt={product.imageAlt}
          price={product.price}
          originalPrice={product.compareAtPrice}
          currency={product.currency}
          badgeLabel={product.badgeLabel}
          ctaLabel="Add to cart"
        />
      ))}
    </div>
  );
}
