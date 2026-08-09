import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { priceVariants, type PriceVariantsProps } from "./price.variants";

export interface PriceProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    PriceVariantsProps {
  /** Amount in the currency's major unit, e.g. `19.99` for $19.99. */
  value: number;
  /** ISO 4217 currency code. @default "USD" */
  currency?: string;
  /** BCP 47 locale tag passed to `Intl.NumberFormat`. @default "en-US" */
  locale?: string;
  /** When higher than `value`, rendered struck through as a "was" price. */
  originalValue?: number;
  /** Overrides passed through to `Intl.NumberFormat` (merged after currency defaults). */
  formatOptions?: Intl.NumberFormatOptions;
}

function formatAmount(
  value: number,
  locale: string,
  currency: string,
  formatOptions?: Intl.NumberFormatOptions,
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...formatOptions,
  }).format(value);
}

export const Price = React.forwardRef<HTMLSpanElement, PriceProps>(
  (
    {
      className,
      size,
      value,
      currency = "USD",
      locale = "en-US",
      originalValue,
      formatOptions,
      ...props
    },
    ref,
  ) => {
    const onSale = typeof originalValue === "number" && originalValue > value;
    const formatted = formatAmount(value, locale, currency, formatOptions);
    const formattedOriginal = onSale
      ? formatAmount(originalValue, locale, currency, formatOptions)
      : undefined;

    return (
      <span
        ref={ref}
        data-sale={onSale ? "true" : undefined}
        className={cn(priceVariants({ size }), className)}
        {...props}
      >
        {onSale && formattedOriginal ? (
          <s
            className="text-foreground-muted font-normal"
            aria-label={getMessages().price.original(formattedOriginal)}
          >
            {formattedOriginal}
          </s>
        ) : null}
        <data value={value} className={cn(onSale && "text-danger")}>
          {formatted}
        </data>
      </span>
    );
  },
);

Price.displayName = "Price";
