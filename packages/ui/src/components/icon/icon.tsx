import * as React from "react";
import { cn } from "../../lib/cn";
import { iconVariants, type IconVariantsProps } from "./icon.variants";
import { defaultIcons, type IconGlyph, type IconGlyphProps, type IconName } from "./icon-registry";

export type { IconGlyph, IconGlyphProps, IconName };

let activeIcons: Record<string, IconGlyph> = { ...defaultIcons };

/**
 * Replace some or all of the built-in icon set in one call. Every component
 * in this package that renders a catalog icon internally (Dialog's close
 * button, Select's chevron, ProductCard's wishlist heart, Rating's star,
 * Checkbox's check, ...) does it via `<Icon name="...">`, so a single call
 * re-skins all of them — this is the mechanism for matching a client's
 * design language without forking the package.
 *
 * Deliberately a plain module-level registry, not a React Context: reading
 * it is a plain object lookup, so `Icon` needs no hook and works inside
 * Server Components. Call once, e.g. import the module for its side effect
 * at the top of `app/layout.tsx`:
 *
 * ```ts
 * // app/icons.ts
 * import { configureIcons } from "@storefront/ui";
 * import { ShoppingCart, Heart, Search } from "lucide-react";
 *
 * configureIcons({ cart: ShoppingCart, heart: Heart, search: Search });
 * ```
 *
 * Because this mutates process-wide state, only rely on it for a set that's
 * fixed per deployment/build (the normal case — one brand per build). A
 * single server process intentionally serving multiple icon sets per
 * request should swap icons per instance instead, via each composite
 * component's `slots` prop (see ARCHITECTURE.md §4, layer 4).
 */
export function configureIcons(overrides: Partial<Record<IconName, IconGlyph>>): void {
  activeIcons = { ...activeIcons, ...overrides };
}

/** Restores the built-in set. Mainly useful for test teardown. */
export function resetIcons(): void {
  activeIcons = { ...defaultIcons };
}

export interface IconProps extends Omit<IconGlyphProps, "children">, IconVariantsProps {
  /** Looks the glyph up in the active icon set (see `configureIcons`). */
  name: IconName;
  /**
   * Accessible name. Give one when the icon is the only content conveying
   * meaning (e.g. an icon-only button with no visible text); omit it when
   * adjacent visible text or the parent element already labels the action —
   * the icon then renders `aria-hidden`.
   */
  label?: string;
}

/**
 * Renders whichever glyph is currently registered under `name`. Pure
 * lookup + sizing, no state — stays a Server Component (CLAUDE.md rule 2).
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, label, size, className, ...props }, ref) => {
    const Glyph = activeIcons[name];
    if (!Glyph) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          `[@storefront/ui] Icon: no glyph registered for name "${name}". Falling back to nothing rendered.`,
        );
      }
      return null;
    }

    return (
      <Glyph
        ref={ref}
        className={cn(iconVariants({ size }), className)}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";
