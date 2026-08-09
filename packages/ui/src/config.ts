import { configureIcons } from "./components/icon/icon";
import type { IconGlyph, IconName } from "./components/icon/icon-registry";
import { configureImageComponent } from "./components/image/image";
import type { ImageComponent } from "./components/image/image";
import { configureMessages } from "./i18n/messages";
import type { StorefrontMessages } from "./i18n/messages";

export interface ConfigureStorefrontUIOptions {
  icons?: Partial<Record<IconName, IconGlyph>>;
  image?: ImageComponent;
  messages?: { [K in keyof StorefrontMessages]?: Partial<StorefrontMessages[K]> };
}

/**
 * One-call convenience wrapper around `configureIcons`, `configureImageComponent`,
 * and `configureMessages` — the three module-level registries this package
 * exposes for whole-set overrides. Equivalent to calling each individually;
 * use whichever reads better in your app's bootstrap file.
 *
 * ```ts
 * // app/storefront-ui-config.ts — imported once for its side effect
 * import { configureStorefrontUI } from "@storefront/ui";
 * import NextImage from "next/image";
 * import { ShoppingCart, Heart, Search } from "lucide-react";
 *
 * configureStorefrontUI({
 *   icons: { cart: ShoppingCart, heart: Heart, search: Search },
 *   image: NextImage,
 *   messages: { productCard: { addToCart: "In den Warenkorb" } },
 * });
 * ```
 */
export function configureStorefrontUI(options: ConfigureStorefrontUIOptions): void {
  if (options.icons) configureIcons(options.icons);
  if (options.image) configureImageComponent(options.image);
  if (options.messages) configureMessages(options.messages);
}
