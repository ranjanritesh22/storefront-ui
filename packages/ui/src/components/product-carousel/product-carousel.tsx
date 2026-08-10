"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";
import { Icon } from "../icon/icon";
import { ProductCard } from "../product-card/product-card";
import { getMessages } from "../../i18n/messages";
import type { ProductSummary } from "../../types/product";
import {
  productCarouselTrackVariants,
  productCarouselItemVariants,
  type ProductCarouselVariantsProps,
} from "./product-carousel.variants";

export interface ProductCarouselClassNames {
  root?: string;
  header?: string;
  title?: string;
  controls?: string;
  prevButton?: string;
  nextButton?: string;
  track?: string;
  item?: string;
}

export interface ProductCarouselItemProps {
  item: ProductSummary;
  className?: string;
}

export interface ProductCarouselSlots {
  /** Replaces the default per-slide `ProductCard` render. */
  Item?: React.ComponentType<ProductCarouselItemProps>;
  PrevButton?: React.ComponentType<ButtonProps>;
  NextButton?: React.ComponentType<ButtonProps>;
}

export interface ProductCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    ProductCarouselVariantsProps {
  items: ProductSummary[];
  /** Heading rendered above the track, e.g. "You may also like". */
  title?: React.ReactNode;
  /** Forwarded to each default slide's `ProductCard`. */
  ctaLabel?: string;
  /** Forwarded to each default slide's `ProductCard.onCtaClick`, called with that slide's item. */
  onItemCtaClick?: (item: ProductSummary) => void;
  classNames?: ProductCarouselClassNames;
  /** Swap any part of the composition while keeping the rest — see ARCHITECTURE.md §4, layer 4. */
  slots?: ProductCarouselSlots;
}

/** Mirrors the CSS `motion-reduce:`/`motion-safe:` variants used elsewhere, for the one thing
 *  those can't reach: the `behavior` option of a JS-driven `scrollIntoView`/`scrollBy` call. */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

export const ProductCarousel = React.forwardRef<HTMLDivElement, ProductCarouselProps>(
  (
    {
      className,
      classNames,
      items,
      title,
      ctaLabel,
      onItemCtaClick,
      gap,
      slots,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = React.useState(true);
    const [atEnd, setAtEnd] = React.useState(true);
    const reducedMotion = usePrefersReducedMotion();

    const updateEdges = React.useCallback(() => {
      const track = trackRef.current;
      if (!track) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 1) {
        setAtStart(true);
        setAtEnd(true);
        return;
      }
      const normalized = Math.abs(track.scrollLeft);
      setAtStart(normalized <= 1);
      setAtEnd(normalized >= maxScroll - 1);
    }, []);

    React.useEffect(() => {
      updateEdges();
      const track = trackRef.current;
      if (!track) return;
      track.addEventListener("scroll", updateEdges, { passive: true });
      window.addEventListener("resize", updateEdges);
      return () => {
        track.removeEventListener("scroll", updateEdges);
        window.removeEventListener("resize", updateEdges);
      };
    }, [updateEdges, items.length]);

    const scrollToAdjacentSlide = React.useCallback(
      (direction: 1 | -1) => {
        const track = trackRef.current;
        if (!track) return;
        const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-item]"));
        if (slides.length === 0) return;

        const trackRect = track.getBoundingClientRect();
        const currentIndex = slides.findIndex((slide) => {
          const rect = slide.getBoundingClientRect();
          return rect.left >= trackRect.left - 1 && rect.left < trackRect.right;
        });
        const fallbackIndex = direction > 0 ? 0 : slides.length - 1;
        const baseIndex = currentIndex === -1 ? fallbackIndex : currentIndex;
        const nextIndex = Math.min(Math.max(baseIndex + direction, 0), slides.length - 1);

        slides[nextIndex]?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          inline: "start",
          block: "nearest",
        });
      },
      [reducedMotion],
    );

    const handleTrackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToAdjacentSlide(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToAdjacentSlide(-1);
      }
    };

    if (items.length === 0) {
      return null;
    }

    const PrevButtonSlot = slots?.PrevButton ?? Button;
    const NextButtonSlot = slots?.NextButton ?? Button;
    const ItemSlot = slots?.Item;
    const resolvedTitle = typeof title === "string" ? title : undefined;

    return (
      <div
        ref={ref}
        className={cn("w-full", classNames?.root, className)}
        {...props}
      >
        {title ? (
          <div className={cn("mb-4 flex items-center justify-between gap-4", classNames?.header)}>
            <h2 className={cn("font-sans text-lg font-semibold text-foreground", classNames?.title)}>
              {title}
            </h2>
            <div className={cn("flex items-center gap-2", classNames?.controls)}>
              <PrevButtonSlot
                type="button"
                variant="outline"
                size="icon"
                aria-label={t.productCarousel.previous}
                disabled={atStart}
                data-at-start={atStart ? "true" : undefined}
                onClick={() => scrollToAdjacentSlide(-1)}
                className={classNames?.prevButton}
              >
                <Icon name="chevron-left" />
              </PrevButtonSlot>
              <NextButtonSlot
                type="button"
                variant="outline"
                size="icon"
                aria-label={t.productCarousel.next}
                disabled={atEnd}
                data-at-end={atEnd ? "true" : undefined}
                onClick={() => scrollToAdjacentSlide(1)}
                className={classNames?.nextButton}
              >
                <Icon name="chevron-right" />
              </NextButtonSlot>
            </div>
          </div>
        ) : null}
        <div
          ref={trackRef}
          role="list"
          aria-label={resolvedTitle ?? t.productCarousel.label}
          tabIndex={0}
          onKeyDown={handleTrackKeyDown}
          className={cn(productCarouselTrackVariants({ gap }), classNames?.track)}
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-carousel-item
              role="listitem"
              className={cn(productCarouselItemVariants(), classNames?.item)}
            >
              {ItemSlot ? (
                <ItemSlot item={item} />
              ) : (
                <ProductCard
                  product={item}
                  ctaLabel={ctaLabel}
                  onCtaClick={onItemCtaClick ? () => onItemCtaClick(item) : undefined}
                  className="h-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);

ProductCarousel.displayName = "ProductCarousel";
