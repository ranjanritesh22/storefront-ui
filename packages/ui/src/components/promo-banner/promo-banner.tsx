import * as React from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";
import { Image } from "../image/image";
import { getMessages } from "../../i18n/messages";
import { promoBannerVariants, type PromoBannerVariantsProps } from "./promo-banner.variants";

export interface PromoBannerClassNames {
  root?: string;
  image?: string;
  overlay?: string;
  content?: string;
  heading?: string;
  description?: string;
  cta?: string;
}

export interface PromoBannerImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface PromoBannerSlots {
  Image?: React.ComponentType<PromoBannerImageProps>;
  Cta?: React.ComponentType<ButtonProps>;
}

function DefaultPromoImage({ src, alt, className }: PromoBannerImageProps) {
  return <Image src={src} alt={alt} fill sizes="100vw" className={className} />;
}

export interface PromoBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    PromoBannerVariantsProps {
  heading?: string;
  /** Rendered under the heading — a sentence or two of marketing copy. */
  description?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** When given, the CTA renders as a link to this URL instead of a click handler. */
  href?: string;
  classNames?: PromoBannerClassNames;
  /** Swap any part of the composition while keeping the rest — see ARCHITECTURE.md §4, layer 4. */
  slots?: PromoBannerSlots;
}

export const PromoBanner = React.forwardRef<HTMLDivElement, PromoBannerProps>(
  (
    {
      className,
      classNames,
      tone,
      heading,
      description,
      imageSrc,
      imageAlt,
      ctaLabel,
      onCtaClick,
      href,
      slots,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();

    if (process.env.NODE_ENV !== "production") {
      if (heading === undefined) {
        console.error("PromoBanner: `heading` is required.");
      }
    }

    const ImageSlot = slots?.Image ?? DefaultPromoImage;
    const CtaSlot = slots?.Cta ?? Button;
    const showCta = Boolean(ctaLabel || onCtaClick || href);

    return (
      <div
        ref={ref}
        data-tone={tone ?? "default"}
        className={cn(promoBannerVariants({ tone }), classNames?.root, className)}
        {...props}
      >
        {imageSrc ? (
          <>
            <ImageSlot
              src={imageSrc}
              alt={imageAlt ?? ""}
              className={cn("absolute inset-0 -z-10 size-full", classNames?.image)}
            />
            <div aria-hidden="true" className={cn("absolute inset-0 -z-10 bg-overlay", classNames?.overlay)} />
          </>
        ) : null}
        <div className={cn("flex max-w-prose flex-col items-start gap-3", classNames?.content)}>
          {heading ? (
            <h2 className={cn("font-sans text-2xl font-semibold sm:text-3xl", classNames?.heading)}>
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className={cn("font-sans text-sm opacity-90 sm:text-base", classNames?.description)}>
              {description}
            </p>
          ) : null}
          {showCta ? (
            <CtaSlot
              asChild={!!href}
              variant={tone === "inverted" ? "secondary" : "primary"}
              onClick={href ? undefined : onCtaClick}
              className={classNames?.cta}
            >
              {href ? <a href={href}>{ctaLabel ?? t.promoBanner.cta}</a> : (ctaLabel ?? t.promoBanner.cta)}
            </CtaSlot>
          ) : null}
        </div>
      </div>
    );
  },
);

PromoBanner.displayName = "PromoBanner";
