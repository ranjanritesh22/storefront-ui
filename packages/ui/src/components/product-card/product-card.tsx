import * as React from "react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardFooter } from "../card/card";
import { Price, type PriceProps } from "../price/price";
import { Badge, type BadgeProps } from "../badge/badge";
import { Button, type ButtonProps } from "../button/button";
import { productCardVariants, type ProductCardVariantsProps } from "./product-card.variants";

export interface ProductCardClassNames {
  root?: string;
  image?: string;
  body?: string;
  title?: string;
  price?: string;
  badge?: string;
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
}

function DefaultProductImage({ src, alt, className }: ProductCardImageProps) {
  return <img src={src} alt={alt} loading="lazy" className={cn("h-full w-full object-cover", className)} />;
}

export interface ProductCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    ProductCardVariantsProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  /** In the currency's major unit, e.g. `19.99`. Forwarded to the `Price` slot. */
  price: number;
  originalPrice?: number;
  currency?: string;
  locale?: string;
  badgeLabel?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** When given, the image and title link here; the CTA stays a separate action. */
  href?: string;
  classNames?: ProductCardClassNames;
  /** Swap any part of the composition while keeping the rest — see ARCHITECTURE.md §4, layer 4. */
  slots?: ProductCardSlots;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      classNames,
      aspect,
      title,
      imageSrc,
      imageAlt,
      price,
      originalPrice,
      currency = "USD",
      locale = "en-US",
      badgeLabel,
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

    const media = (
      <div className={cn(productCardVariants({ aspect }), classNames?.image)}>
        <ImageSlot src={imageSrc} alt={imageAlt} />
        {badgeLabel ? (
          <BadgeSlot variant="primary" className={cn("absolute start-3 top-3", classNames?.badge)}>
            {badgeLabel}
          </BadgeSlot>
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
          <PriceSlot
            value={price}
            originalValue={originalPrice}
            currency={currency}
            locale={locale}
            className={classNames?.price}
          />
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
