import * as React from "react";
import { cn } from "../../lib/cn";
import { imageVariants, type ImageVariantsProps } from "./image.variants";

/**
 * The subset of `next/image`'s prop surface every image in a storefront
 * actually needs. Deliberately small and framework-neutral — it's also
 * satisfied by a plain `<img>` (the built-in fallback), so nothing in this
 * package hard-depends on Next.js.
 */
export interface StorefrontImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** Fills the nearest `position: relative` ancestor — for cards/banners with a fixed aspect-ratio box. */
  fill?: boolean;
  /** Passed straight through to `next/image`'s `sizes`; ignored by the `<img>` fallback. */
  sizes?: string;
  loading?: "eager" | "lazy";
  /** Passed straight through to `next/image`'s `priority`; ignored by the `<img>` fallback. */
  priority?: boolean;
}

export type ImageComponent = React.ComponentType<StorefrontImageProps & { ref?: React.Ref<HTMLImageElement> }>;

function DefaultImage({
  ref,
  fill,
  priority,
  loading,
  className,
  style,
  ...props
}: StorefrontImageProps & { ref?: React.Ref<HTMLImageElement>; style?: React.CSSProperties }) {
  return (
    <img
      ref={ref}
      loading={loading ?? (priority ? "eager" : "lazy")}
      className={className}
      style={
        fill
          ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
          : style
      }
      {...props}
    />
  );
}

let activeImageComponent: ImageComponent = DefaultImage;

/**
 * Registers the component every `<Image>` in this package renders through —
 * call once with `next/image` (or any component satisfying
 * `StorefrontImageProps`) so every image in the library gets that runtime's
 * optimization, without this package depending on Next.js or pinning a
 * Next version:
 *
 * ```ts
 * // app/images.ts — imported once for its side effect, e.g. app/layout.tsx
 * import { configureImageComponent } from "@storefront/ui";
 * import NextImage from "next/image";
 *
 * configureImageComponent(NextImage);
 * ```
 *
 * Module-level registry, not a Context, for the same Server Component
 * reason as `configureIcons`/`configureMessages`: reading it is a plain
 * function call, so `Image` never forces a Client Component boundary.
 * Non-Next consumers can skip this entirely — the built-in fallback is a
 * plain `<img>`.
 */
export function configureImageComponent(component: ImageComponent): void {
  activeImageComponent = component;
}

/** Restores the `<img>` fallback. Mainly useful for test teardown. */
export function resetImageComponent(): void {
  activeImageComponent = DefaultImage;
}

export interface ImageProps extends StorefrontImageProps, ImageVariantsProps {}

/**
 * Renders through whichever component is currently registered (see
 * `configureImageComponent`), defaulting to a plain `<img>`. Every image in
 * this package (ProductCard's media, gallery thumbnails, banners) goes
 * through this instead of a raw `<img>`.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, objectFit, ...props }, ref) => {
    const Component = activeImageComponent;
    return <Component ref={ref} className={cn(imageVariants({ objectFit }), className)} {...props} />;
  },
);

Image.displayName = "Image";
