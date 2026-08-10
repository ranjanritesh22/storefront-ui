import * as React from "react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardFooter } from "../card/card";
import { Button, type ButtonProps } from "../button/button";
import { Image } from "../image/image";
import { getMessages } from "../../i18n/messages";
import { categoryCardVariants, type CategoryCardVariantsProps } from "./category-card.variants";

export interface CategoryCardClassNames {
  root?: string;
  image?: string;
  body?: string;
  title?: string;
  count?: string;
  cta?: string;
}

export interface CategoryCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface CategoryCardSlots {
  Image?: React.ComponentType<CategoryCardImageProps>;
  Cta?: React.ComponentType<ButtonProps>;
}

function DefaultCategoryImage({ src, alt, className }: CategoryCardImageProps) {
  return <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className={className} />;
}

export interface CategoryCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    CategoryCardVariantsProps {
  title?: string;
  /** Alternative to `imageSrc`/`imageAlt` below — an `{ src, alt }` object. */
  image?: { src: string; alt: string };
  imageSrc?: string;
  imageAlt?: string;
  /** Link to the category's own listing page. */
  href?: string;
  /** Renders "N products" via the message dictionary. Omit to hide. */
  productCount?: number;
  ctaLabel?: string;
  onCtaClick?: () => void;
  classNames?: CategoryCardClassNames;
  /** Swap any part of the composition while keeping the rest — see ARCHITECTURE.md §4, layer 4. */
  slots?: CategoryCardSlots;
}

export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      className,
      classNames,
      aspect,
      title,
      image,
      imageSrc,
      imageAlt,
      href,
      productCount,
      ctaLabel,
      onCtaClick,
      slots,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();

    const resolvedImageSrc = imageSrc ?? image?.src;
    const resolvedImageAlt = imageAlt ?? image?.alt;

    if (process.env.NODE_ENV !== "production") {
      if (title === undefined || resolvedImageSrc === undefined || resolvedImageAlt === undefined) {
        console.error("CategoryCard: `title`, and either `image` or `imageSrc` + `imageAlt`, are required.");
      }
    }

    const ImageSlot = slots?.Image ?? DefaultCategoryImage;
    const CtaSlot = slots?.Cta ?? Button;

    const media = (
      <div className={cn(categoryCardVariants({ aspect }), classNames?.image)}>
        <ImageSlot src={resolvedImageSrc ?? ""} alt={resolvedImageAlt ?? ""} />
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
        <CardContent className={cn("flex flex-1 flex-col gap-1 p-4", classNames?.body)}>
          {href ? (
            <a
              href={href}
              className={cn(
                "font-sans text-base font-semibold text-foreground hover:underline",
                classNames?.title,
              )}
            >
              {title}
            </a>
          ) : (
            <p className={cn("font-sans text-base font-semibold text-foreground", classNames?.title)}>
              {title}
            </p>
          )}
          {typeof productCount === "number" ? (
            <p className={cn("font-sans text-xs text-foreground-muted", classNames?.count)}>
              {t.categoryCard.productCount(productCount)}
            </p>
          ) : null}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <CtaSlot asChild={!!href} fullWidth variant="outline" onClick={href ? undefined : onCtaClick} className={classNames?.cta}>
            {href ? <a href={href}>{ctaLabel ?? t.categoryCard.shopNow}</a> : (ctaLabel ?? t.categoryCard.shopNow)}
          </CtaSlot>
        </CardFooter>
      </Card>
    );
  },
);

CategoryCard.displayName = "CategoryCard";
