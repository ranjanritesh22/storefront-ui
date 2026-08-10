import * as React from "react";
import { cn } from "../../lib/cn";
import { Badge, type BadgeProps } from "../badge/badge";
import { type BadgeVariantsProps } from "../badge/badge.variants";
import { getMessages, type StorefrontMessages } from "../../i18n/messages";
import { productBadgeVariants } from "./product-badge.variants";

export type ProductBadgeType = "sale" | "new" | "out-of-stock" | "custom";

export interface ProductBadgeClassNames {
  root?: string;
}

export interface ProductBadgeSlots {
  /**
   * Replaces the underlying `Badge` render while keeping type-derived
   * variant/label resolution. `Badge` is the root element ProductBadge
   * renders, so the slot still needs to accept `ref` (React 19 ref-as-prop —
   * see `Image`'s `DefaultImage` for the same pattern).
   */
  Badge?: React.ComponentType<BadgeProps & { ref?: React.Ref<HTMLSpanElement> }>;
}

interface ProductBadgeOwnProps extends Omit<BadgeProps, "children" | "variant"> {
  /** Overrides the auto-picked colour variant for this `type`. */
  variant?: BadgeVariantsProps["variant"];
  classNames?: ProductBadgeClassNames;
  slots?: ProductBadgeSlots;
}

/**
 * `label` is required when `type="custom"` (there is no dictionary default to
 * fall back to); for the built-in types it's an optional override of the
 * dictionary copy.
 */
export type ProductBadgeProps = ProductBadgeOwnProps &
  ({ type: "sale" | "new" | "out-of-stock"; label?: string } | { type: "custom"; label: string });

function defaultVariantForType(type: ProductBadgeType): BadgeVariantsProps["variant"] {
  switch (type) {
    case "sale":
      return "danger";
    case "new":
      return "primary";
    case "out-of-stock":
      return "outline";
    case "custom":
      return "default";
  }
}

function defaultLabelForType(type: ProductBadgeType, t: StorefrontMessages): string {
  switch (type) {
    case "sale":
      return t.productBadge.sale;
    case "new":
      return t.productBadge.new;
    case "out-of-stock":
      return t.productBadge.outOfStock;
    case "custom":
      return "";
  }
}

/**
 * A thin wrapper over `Badge` that auto-picks a colour variant and default
 * label from a merchandising `type` — it delegates all rendering to `Badge`
 * rather than duplicating its styling.
 */
export const ProductBadge = React.forwardRef<HTMLSpanElement, ProductBadgeProps>(
  ({ type, label, variant, className, classNames, slots, ...props }, ref) => {
    const t = getMessages();
    const resolvedVariant = variant ?? defaultVariantForType(type);
    const resolvedLabel = label ?? defaultLabelForType(type, t);

    const BadgeSlot = slots?.Badge ?? Badge;

    return (
      <BadgeSlot
        ref={ref}
        data-type={type}
        variant={resolvedVariant}
        className={cn(productBadgeVariants({ type }), classNames?.root, className)}
        {...props}
      >
        {resolvedLabel}
      </BadgeSlot>
    );
  },
);

ProductBadge.displayName = "ProductBadge";
