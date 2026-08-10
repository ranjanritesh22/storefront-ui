import * as React from "react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardFooter } from "../card/card";
import { Price, type PriceProps } from "../price/price";
import { Badge, type BadgeProps } from "../badge/badge";
import { Button, type ButtonProps } from "../button/button";
import { Rating, type RatingProps } from "../rating/rating";
import { Skeleton } from "../skeleton/skeleton";
import { Icon } from "../icon/icon";
import { Image } from "../image/image";
import { getMessages } from "../../i18n/messages";
import type { ProductSummary, ProductSwatch } from "../../types/product";
import {
  productCardVariants,
  productCardLayoutVariants,
  type ProductCardVariantsProps,
} from "./product-card.variants";

export interface ProductCardClassNames {
  root?: string;
  image?: string;
  body?: string;
  subtitle?: string;
  title?: string;
  price?: string;
  badge?: string;
  rating?: string;
  colors?: string;
  wishlist?: string;
  quickView?: string;
  swatches?: string;
  swatch?: string;
  cta?: string;
}

export interface ProductCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface ProductCardSlots {
  Image?: React.ComponentType<ProductCardImageProps>;
  Price?: React.ComponentType<PriceProps>;
  Badge?: React.ComponentType<BadgeProps>;
  Cta?: React.ComponentType<ButtonProps>;
  Rating?: React.ComponentType<RatingProps>;
}

function DefaultProductImage({ src, alt, className }: ProductCardImageProps) {
  return <Image src={src} alt={alt} fill sizes="(min-width: 768px) 25vw, 50vw" className={className} />;
}

export interface ProductCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    ProductCardVariantsProps {
  /**
   * Domain-agnostic product shape — an alternative to passing `title` /
   * `imageSrc` / `imageAlt` / `price` individually below. Map your API
   * response onto this once; see CLAUDE.md's "Domain-agnostic props" rule
   * and the adapter example in product-card.mdx. An individual prop below
   * wins over the matching `product` field when both are given.
   */
  product?: ProductSummary;
  title?: string;
  /** Muted line under the title, e.g. a category ("Men's Shoes"). */
  subtitle?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** In the currency's major unit, e.g. `19.99`. Forwarded to the `Price` slot. */
  price?: number;
  originalPrice?: number;
  currency?: string;
  locale?: string;
  /** Forwarded to the `Price` slot's `formatOptions`, e.g. `{ maximumFractionDigits: 0 }`. */
  priceFormatOptions?: Intl.NumberFormatOptions;
  badgeLabel?: string;
  /** Out of 5. Omit to hide the rating row entirely. */
  rating?: number;
  ratingCount?: number;
  /** Renders "N colors" under the price. Omit to hide. */
  colorsCount?: number;
  /** Presence of this callback is what shows the wishlist toggle. */
  onWishlistToggle?: () => void;
  wishlisted?: boolean;
  wishlistLabel?: string;
  /** Presence of this callback is what shows the quick-view action, revealed on hover/focus. */
  onQuickView?: () => void;
  quickViewLabel?: string;
  /** Selectable variant swatches, e.g. colors. Omit to hide the swatch row. */
  swatches?: ProductSwatch[];
  selectedSwatchId?: string;
  onSwatchSelect?: (id: string) => void;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** When given, the image and title link here; the CTA stays a separate action. */
  href?: string;
  classNames?: ProductCardClassNames;
  /** Swap any part of the composition while keeping the rest — see ARCHITECTURE.md §4, layer 4. */
  slots?: ProductCardSlots;
}

function WishlistToggle({
  wishlisted,
  label,
  className,
  onClick,
}: {
  wishlisted: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={wishlisted}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute end-3 top-3 flex size-8 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted shadow-sm transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] hover:text-danger",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        wishlisted && "text-danger",
        className,
      )}
    >
      <Icon name="heart" fill={wishlisted ? "currentColor" : "none"} />
    </button>
  );
}

function QuickViewAction({
  label,
  className,
  onClick,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute inset-x-3 bottom-3 flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-sm font-medium text-foreground shadow-sm",
        "opacity-0 transition-opacity duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
        "group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-surface-raised",
        "outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
    >
      <Icon name="eye" size="sm" />
      {label}
    </button>
  );
}

function SwatchRow({
  swatches,
  selectedId,
  onSelect,
  label,
  className,
  swatchClassName,
}: {
  swatches: ProductSwatch[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  label: (swatchLabel: string) => string;
  className?: string;
  swatchClassName?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} role="group">
      {swatches.map((swatch) => {
        const selected = swatch.id === selectedId;
        return (
          <button
            key={swatch.id}
            type="button"
            aria-pressed={selected}
            aria-label={label(swatch.label)}
            data-state={selected ? "selected" : "unselected"}
            onClick={() => onSelect?.(swatch.id)}
            className={cn(
              "size-6 shrink-0 overflow-hidden rounded-full border border-border",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              "data-[state=selected]:ring-2 data-[state=selected]:ring-ring data-[state=selected]:ring-offset-2 data-[state=selected]:ring-offset-surface",
              swatchClassName,
            )}
            style={swatch.color ? { backgroundColor: swatch.color } : undefined}
          >
            {swatch.imageSrc ? (
              <Image src={swatch.imageSrc} alt="" className="size-full object-cover" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      classNames,
      aspect,
      orientation,
      product,
      title,
      subtitle,
      imageSrc,
      imageAlt,
      price,
      originalPrice,
      currency,
      locale = "en-US",
      priceFormatOptions,
      badgeLabel,
      rating,
      ratingCount,
      colorsCount,
      onWishlistToggle,
      wishlisted = false,
      wishlistLabel,
      onQuickView,
      quickViewLabel,
      swatches,
      selectedSwatchId,
      onSwatchSelect,
      ctaLabel,
      onCtaClick,
      href,
      slots,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();

    const resolvedTitle = title ?? product?.name;
    const resolvedImageSrc = imageSrc ?? product?.image.src;
    const resolvedImageAlt = imageAlt ?? product?.image.alt;
    const resolvedPrice = price ?? product?.price;
    const resolvedOriginalPrice = originalPrice ?? product?.originalPrice;
    const resolvedCurrency = currency ?? product?.currency ?? "USD";
    const resolvedBadgeLabel = badgeLabel ?? product?.badge;
    const resolvedRating = rating ?? product?.rating?.value;
    const resolvedRatingCount = ratingCount ?? product?.rating?.count;
    const resolvedColorsCount = colorsCount ?? product?.colorsCount;
    const resolvedHref = href ?? product?.url;
    const resolvedSwatches = swatches ?? product?.swatches;
    const isHorizontal = orientation === "horizontal";

    if (process.env.NODE_ENV !== "production") {
      if (resolvedTitle === undefined || resolvedImageSrc === undefined || resolvedImageAlt === undefined) {
        console.error("ProductCard: provide either `product` or `title` + `imageSrc` + `imageAlt`.");
      }
      if (resolvedPrice === undefined) {
        console.error("ProductCard: provide either `product.price` or `price`.");
      }
    }

    const ImageSlot = slots?.Image ?? DefaultProductImage;
    const PriceSlot = slots?.Price ?? Price;
    const BadgeSlot = slots?.Badge ?? Badge;
    const CtaSlot = slots?.Cta ?? Button;
    const RatingSlot = slots?.Rating ?? Rating;

    const media = (
      <div
        className={cn(
          productCardVariants({ aspect }),
          isHorizontal && "w-32 shrink-0 sm:w-44",
          classNames?.image,
        )}
      >
        <ImageSlot src={resolvedImageSrc ?? ""} alt={resolvedImageAlt ?? ""} />
        {resolvedBadgeLabel ? (
          <BadgeSlot variant="primary" className={cn("absolute start-3 top-3", classNames?.badge)}>
            {resolvedBadgeLabel}
          </BadgeSlot>
        ) : null}
        {onWishlistToggle ? (
          <WishlistToggle
            wishlisted={wishlisted}
            label={
              wishlistLabel ?? (wishlisted ? t.productCard.removeFromWishlist : t.productCard.addToWishlist)
            }
            onClick={onWishlistToggle}
            className={classNames?.wishlist}
          />
        ) : null}
        {onQuickView && !isHorizontal ? (
          <QuickViewAction
            label={quickViewLabel ?? t.productCard.quickView}
            onClick={onQuickView}
            className={classNames?.quickView}
          />
        ) : null}
      </div>
    );

    return (
      <Card
        ref={ref}
        data-orientation={orientation ?? "vertical"}
        className={cn(productCardLayoutVariants({ orientation }), classNames?.root, className)}
        {...props}
      >
        {resolvedHref ? (
          <a
            href={resolvedHref}
            aria-label={resolvedTitle}
            className={cn("block", isHorizontal && "shrink-0")}
          >
            {media}
          </a>
        ) : (
          media
        )}
        <div className="flex flex-1 flex-col">
          <CardContent className={cn("flex flex-1 flex-col gap-2 p-4", classNames?.body)}>
            {resolvedHref ? (
              <a
                href={resolvedHref}
                className={cn(
                  "font-sans text-sm font-medium text-foreground hover:underline",
                  classNames?.title,
                )}
              >
                {resolvedTitle}
              </a>
            ) : (
              <p className={cn("font-sans text-sm font-medium text-foreground", classNames?.title)}>
                {resolvedTitle}
              </p>
            )}
            {subtitle ? (
              <p className={cn("-mt-1 font-sans text-xs text-foreground-muted", classNames?.subtitle)}>
                {subtitle}
              </p>
            ) : null}
            <PriceSlot
              value={resolvedPrice ?? 0}
              originalValue={resolvedOriginalPrice}
              currency={resolvedCurrency}
              locale={locale}
              formatOptions={priceFormatOptions}
              className={classNames?.price}
            />
            {typeof resolvedRating === "number" ? (
              <RatingSlot
                value={resolvedRating}
                count={resolvedRatingCount}
                size="sm"
                className={classNames?.rating}
              />
            ) : null}
            {typeof resolvedColorsCount === "number" ? (
              <p className={cn("font-sans text-xs text-foreground-muted", classNames?.colors)}>
                {t.productCard.colorsCount(resolvedColorsCount)}
              </p>
            ) : null}
            {resolvedSwatches && resolvedSwatches.length > 0 ? (
              <SwatchRow
                swatches={resolvedSwatches}
                selectedId={selectedSwatchId}
                onSelect={onSwatchSelect}
                label={t.productCard.selectSwatch}
                className={classNames?.swatches}
                swatchClassName={classNames?.swatch}
              />
            ) : null}
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <CtaSlot fullWidth onClick={onCtaClick} className={classNames?.cta}>
              {ctaLabel ?? t.productCard.addToCart}
            </CtaSlot>
          </CardFooter>
        </div>
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";

export interface ProductCardSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProductCardVariantsProps {}

/** Matches `ProductCard`'s own layout (both orientations) so a loading grid/list doesn't reflow when real cards arrive. */
export const ProductCardSkeleton = React.forwardRef<HTMLDivElement, ProductCardSkeletonProps>(
  ({ className, aspect, orientation, ...props }, ref) => {
    const isHorizontal = orientation === "horizontal";
    return (
      <Card
        ref={ref}
        data-orientation={orientation ?? "vertical"}
        className={cn(productCardLayoutVariants({ orientation }), className)}
        {...props}
      >
        <div className={cn(productCardVariants({ aspect }), isHorizontal && "w-32 shrink-0 sm:w-44")}>
          <Skeleton className="absolute inset-0 rounded-none" />
        </div>
        <div className="flex flex-1 flex-col">
          <CardContent className="flex flex-1 flex-col gap-2 p-4">
            <Skeleton shape="text" className="h-4 w-3/4" />
            <Skeleton shape="text" className="h-3 w-1/3" />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </div>
      </Card>
    );
  },
);

ProductCardSkeleton.displayName = "ProductCardSkeleton";
