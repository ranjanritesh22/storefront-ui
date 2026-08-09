import * as React from "react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardFooter } from "../card/card";
import { Price, type PriceProps } from "../price/price";
import { Badge, type BadgeProps } from "../badge/badge";
import { Button, type ButtonProps } from "../button/button";
import { Rating, type RatingProps } from "../rating/rating";
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
  return <img src={src} alt={alt} loading="lazy" className={cn("h-full w-full object-cover", className)} />;
}

export interface ProductCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    ProductCardVariantsProps {
  title: string;
  /** Muted line under the title, e.g. a category ("Men's Shoes"). */
  subtitle?: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  /** In the currency's major unit, e.g. `19.99`. Forwarded to the `Price` slot. */
  price: number;
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
      <svg
        viewBox="0 0 20 20"
        fill={wishlisted ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-4"
        aria-hidden="true"
      >
        <path
          d="M10 17s-6.5-4.06-6.5-8.5A3.5 3.5 0 0110 6a3.5 3.5 0 016.5 2.5C16.5 12.94 10 17 10 17z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      classNames,
      aspect,
      title,
      subtitle,
      imageSrc,
      imageAlt,
      price,
      originalPrice,
      currency = "USD",
      locale = "en-US",
      priceFormatOptions,
      badgeLabel,
      rating,
      ratingCount,
      colorsCount,
      onWishlistToggle,
      wishlisted = false,
      wishlistLabel,
      ctaLabel = "Add to cart",
      onCtaClick,
      href,
      slots,
      ...props
    },
    ref,
  ) => {
    const ImageSlot = slots?.Image ?? DefaultProductImage;
    const PriceSlot = slots?.Price ?? Price;
    const BadgeSlot = slots?.Badge ?? Badge;
    const CtaSlot = slots?.Cta ?? Button;
    const RatingSlot = slots?.Rating ?? Rating;

    const media = (
      <div className={cn(productCardVariants({ aspect }), classNames?.image)}>
        <ImageSlot src={imageSrc} alt={imageAlt} />
        {badgeLabel ? (
          <BadgeSlot variant="primary" className={cn("absolute start-3 top-3", classNames?.badge)}>
            {badgeLabel}
          </BadgeSlot>
        ) : null}
        {onWishlistToggle ? (
          <WishlistToggle
            wishlisted={wishlisted}
            label={wishlistLabel ?? (wishlisted ? "Remove from wishlist" : "Add to wishlist")}
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
        {href ? (
          <a href={href} aria-label={title} className="block">
            {media}
          </a>
        ) : (
          media
        )}
        <CardContent className={cn("flex flex-1 flex-col gap-2 p-4", classNames?.body)}>
          {href ? (
            <a
              href={href}
              className={cn(
                "font-sans text-sm font-medium text-foreground hover:underline",
                classNames?.title,
              )}
            >
              {title}
            </a>
          ) : (
            <p className={cn("font-sans text-sm font-medium text-foreground", classNames?.title)}>
              {title}
            </p>
          )}
          {subtitle ? (
            <p className={cn("-mt-1 font-sans text-xs text-foreground-muted", classNames?.subtitle)}>
              {subtitle}
            </p>
          ) : null}
          <PriceSlot
            value={price}
            originalValue={originalPrice}
            currency={currency}
            locale={locale}
            formatOptions={priceFormatOptions}
            className={classNames?.price}
          />
          {typeof rating === "number" ? (
            <RatingSlot value={rating} count={ratingCount} size="sm" className={classNames?.rating} />
          ) : null}
          {typeof colorsCount === "number" ? (
            <p className={cn("font-sans text-xs text-foreground-muted", classNames?.colors)}>
              {colorsCount} {colorsCount === 1 ? "color" : "colors"}
            </p>
          ) : null}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <CtaSlot fullWidth onClick={onCtaClick} className={classNames?.cta}>
            {ctaLabel}
          </CtaSlot>
        </CardFooter>
      </Card>
    );
  },
);

ProductCard.displayName = "ProductCard";
