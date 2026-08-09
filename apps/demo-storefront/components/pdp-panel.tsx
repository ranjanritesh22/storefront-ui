import { Card, CardContent, Badge, Price, QuantityStepper, Button } from "@storefront/ui";
import type { Product } from "../data/products";
import styles from "./demo.module.css";

export function PdpPanel({ product, inStock }: { product: Product; inStock: boolean }) {
  return (
    <Card className={styles.pdpCard}>
      <div className={styles.pdpMedia}>
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          loading="lazy"
          className={styles.pdpImage}
        />
      </div>
      <CardContent className={styles.pdpBody}>
        <p className={styles.pdpBrand}>{product.brand}</p>
        <h3 className={styles.pdpTitle}>{product.title}</h3>
        <div className={styles.pdpPriceRow}>
          <Price
            value={product.price}
            originalValue={product.compareAtPrice}
            currency={product.currency}
            size="lg"
          />
          <Badge variant={inStock ? "success" : "danger"} size="sm">
            {inStock ? "In stock" : "Out of stock"}
          </Badge>
        </div>
        <p className={styles.pdpDescription}>{product.description}</p>
        <div className={styles.pdpActions}>
          <QuantityStepper defaultValue={1} min={1} max={9} disabled={!inStock} />
          <Button disabled={!inStock}>{inStock ? "Add to cart" : "Notify me"}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
