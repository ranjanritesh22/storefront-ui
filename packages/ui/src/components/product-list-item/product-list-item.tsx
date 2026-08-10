import * as React from "react";
import { cn } from "../../lib/cn";
import { ProductCard, type ProductCardProps } from "../product-card/product-card";
import { productListItemVariants, type ProductListItemVariantsProps } from "./product-list-item.variants";

export interface ProductListItemProps
  extends Omit<ProductCardProps, "orientation">,
    ProductListItemVariantsProps {}

/**
 * `ProductCard` locked to its horizontal `orientation`, for search results, cart-style rows, and
 * "recently viewed" lists — see `ProductCard`'s own `orientation` prop and `classNames`/`slots`
 * for what's still overridable underneath.
 */
export const ProductListItem = React.forwardRef<HTMLDivElement, ProductListItemProps>(
  ({ size, classNames, ...props }, ref) => (
    <ProductCard
      ref={ref}
      orientation="horizontal"
      classNames={{
        ...classNames,
        image: cn(productListItemVariants({ size }), classNames?.image),
      }}
      {...props}
    />
  ),
);

ProductListItem.displayName = "ProductListItem";
