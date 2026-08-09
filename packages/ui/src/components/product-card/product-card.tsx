import * as React from "react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardFooter } from "../card/card";
import { Price, type PriceProps } from "../price/price";
import { Badge, type BadgeProps } from "../badge/badge";
import { Button, type ButtonProps } from "../button/button";
import { Rating, type RatingProps } from "../rating/rating";
import { Icon } from "../icon/icon";
import { Image } from "../image/image";
import { getMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";
import { productCardVariants, type ProductCardVariantsProps } from "./product-card.variants";

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

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      classNames,
      aspect,
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
      <div className={cn(productCardVariants({ aspect }), classNames?.image)}>
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
      </div>
    );

    return (
      <Card
        ref={ref}
        className={cn("group flex h-full flex-col overflow-hidden", classNames?.root, className)}
        {...props}
      >
        {resolvedHref ? (
          <a href={resolvedHref} aria-label={resolvedTitle} className="block">
            {media}
          </a>
        ) : (
          media
        )}
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
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <CtaSlot fullWidth onClick={onCtaClick} className={classNames?.cta}>
            {ctaLabel ?? t.productCard.addToCart}
          </CtaSlot>
        </CardFooter>
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";
