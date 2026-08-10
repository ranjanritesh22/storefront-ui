import * as React from "react";
import { cn } from "../../lib/cn";
import { Grid } from "../grid/grid";
import type { GridCols, GridVariantsProps } from "../grid/grid.variants";
import { ProductCard, ProductCardSkeleton, type ProductCardProps } from "../product-card/product-card";
import { EmptyState } from "../empty-state/empty-state";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";
import { productGridVariants } from "./product-grid.variants";

export interface ProductGridClassNames {
  root?: string;
  grid?: string;
  item?: string;
  empty?: string;
}

export interface ProductGridSlots {
  /** Defaults to `ProductCard`. Must accept `product`, `onCtaClick`, `onWishlistToggle`, `onQuickView`, `wishlisted`, and `className`. */
  Item?: React.ComponentType<ProductCardProps>;
}

export interface ProductGridProps extends React.HTMLAttributes<HTMLDivElement>, GridVariantsProps {
  items?: ProductSummary[];
  /** Renders `loadingCount` `ProductCardSkeleton`s in place of `items`. */
  loading?: boolean;
  loadingCount?: number;
  /** Column count at the base breakpoint. @default 2 */
  cols?: GridCols;
  colsSm?: GridCols;
  /** @default 3 */
  colsMd?: GridCols;
  /** @default 4 */
  colsLg?: GridCols;
  colsXl?: GridCols;
  /** Ids of currently wishlisted products — presence of `onWishlistToggle` is what shows the toggle on each card. */
  wishlistedIds?: string[];
  onWishlistToggle?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onCtaClick?: (id: string) => void;
  /** Shown instead of the grid when `items` is empty and `loading` is false. */
  emptyTitle?: React.ReactNode;
  emptyDescription?: React.ReactNode;
  emptyAction?: React.ReactNode;
  classNames?: ProductGridClassNames;
  slots?: ProductGridSlots;
}

/**
 * A responsive grid of `ProductCard`s driven by domain-agnostic `ProductSummary[]` — the PLP/
 * category-page/search-results grid. Switch to `ProductListItem` for the list-view layout (see
 * `ViewToggle`); this component only lays out cards, it has no opinion on view mode itself.
 */
export const ProductGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  (
    {
      className,
      classNames,
      items = [],
      loading = false,
      loadingCount = 8,
      cols = 2,
      colsSm,
      colsMd = 3,
      colsLg = 4,
      colsXl,
      gap,
      wishlistedIds,
      onWishlistToggle,
      onQuickView,
      onCtaClick,
      emptyTitle,
      emptyDescription,
      emptyAction,
      slots,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();
    const ItemSlot = slots?.Item ?? ProductCard;

    if (!loading && items.length === 0) {
      return (
        <div ref={ref} className={cn(productGridVariants(), classNames?.root, className)} {...props}>
          <EmptyState
            icon={<Icon name="search" size="xl" />}
            title={emptyTitle ?? t.productGrid.emptyTitle}
            description={emptyDescription ?? t.productGrid.emptyDescription}
            action={emptyAction}
            className={classNames?.empty}
          />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(productGridVariants(), classNames?.root, className)} {...props}>
        <Grid
          cols={cols}
          colsSm={colsSm}
          colsMd={colsMd}
          colsLg={colsLg}
          colsXl={colsXl}
          gap={gap}
          className={classNames?.grid}
        >
          {loading
            ? Array.from({ length: loadingCount }, (_, index) => (
                <ProductCardSkeleton key={index} className={classNames?.item} />
              ))
            : items.map((item) => (
                <ItemSlot
                  key={item.id}
                  product={item}
                  wishlisted={wishlistedIds?.includes(item.id)}
                  onWishlistToggle={onWishlistToggle ? () => onWishlistToggle(item.id) : undefined}
                  onQuickView={onQuickView ? () => onQuickView(item.id) : undefined}
                  onCtaClick={onCtaClick ? () => onCtaClick(item.id) : undefined}
                  className={classNames?.item}
                />
              ))}
        </Grid>
      </div>
    );
  },
);

ProductGrid.displayName = "ProductGrid";
