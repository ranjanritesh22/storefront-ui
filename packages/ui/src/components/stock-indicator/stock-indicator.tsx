import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";
import {
  stockIndicatorVariants,
  stockIndicatorDotVariants,
  type StockIndicatorVariantsProps,
} from "./stock-indicator.variants";

export interface StockIndicatorClassNames {
  root?: string;
  indicator?: string;
  label?: string;
}

export interface StockIndicatorSlots {
  /** Replaces the default coloured dot — e.g. swap in an `<Icon>` instead. */
  Indicator?: React.ElementType<{ className?: string }>;
}

export interface StockIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    StockIndicatorVariantsProps {
  /**
   * Domain-agnostic product shape — an alternative to `status`. `product.inStock`
   * resolves to `"in-stock"` / `"out-of-stock"`; there is no low-stock signal on
   * `ProductSummary`, so pass `status="low-stock"` explicitly for that case.
   */
  product?: ProductSummary;
  /** Overrides the label read from the message dictionary. */
  label?: string;
  classNames?: StockIndicatorClassNames;
  slots?: StockIndicatorSlots;
}

function resolveStatus(
  status: StockIndicatorProps["status"],
  product: ProductSummary | undefined,
): "in-stock" | "low-stock" | "out-of-stock" {
  if (status) return status;
  if (product?.inStock === false) return "out-of-stock";
  return "in-stock";
}

export const StockIndicator = React.forwardRef<HTMLSpanElement, StockIndicatorProps>(
  ({ className, classNames, status, product, label, slots, ...props }, ref) => {
    const t = getMessages();
    const resolvedStatus = resolveStatus(status, product);
    const resolvedLabel =
      label ??
      (resolvedStatus === "in-stock"
        ? t.stockIndicator.inStock
        : resolvedStatus === "low-stock"
          ? t.stockIndicator.lowStock
          : t.stockIndicator.outOfStock);

    const IndicatorSlot = slots?.Indicator ?? "span";

    return (
      <span
        ref={ref}
        data-status={resolvedStatus}
        className={cn(stockIndicatorVariants({ status: resolvedStatus }), classNames?.root, className)}
        {...props}
      >
        <IndicatorSlot
          aria-hidden="true"
          data-status={resolvedStatus}
          className={cn(stockIndicatorDotVariants({ status: resolvedStatus }), classNames?.indicator)}
        />
        <span className={cn("font-sans", classNames?.label)}>{resolvedLabel}</span>
      </span>
    );
  },
);

StockIndicator.displayName = "StockIndicator";
