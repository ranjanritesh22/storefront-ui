import { ProductCard } from "@storefront/ui";
import type { Shoe } from "../../data/shoes";
import styles from "./plp.module.css";

export interface ProductGridProps {
  products: Shoe[];
  wishlisted: Set<string>;
  onToggleWishlist: (id: string) => void;
}

export function ProductGrid({ products, wishlisted, onToggleWishlist }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No shoes match these filters yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          aspect="square"
          title={product.title}
          subtitle={product.subtitle}
          imageSrc={product.imageSrc}
          imageAlt={product.imageAlt}
          price={product.price}
          originalPrice={product.compareAtPrice}
          currency={product.currency}
          locale="en-IN"
          priceFormatOptions={{ maximumFractionDigits: 0 }}
          badgeLabel={product.badgeLabel}
          rating={product.rating}
          ratingCount={product.ratingCount}
          colorsCount={product.colorsCount}
          wishlisted={wishlisted.has(product.id)}
          onWishlistToggle={() => onToggleWishlist(product.id)}
          ctaLabel="Add to cart"
          href={`#${product.slug}`}
        />
      ))}
    </div>
  );
}
