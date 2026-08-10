"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { getMessages } from "../../i18n/messages";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../accordion/accordion";
import { Checkbox } from "../checkbox/checkbox";
import { RadioGroup, Radio } from "../radio-group/radio-group";
import { RangeSlider } from "../range-slider/range-slider";
import { Rating } from "../rating/rating";
import { ScrollArea } from "../scroll-area/scroll-area";
import { Button, type ButtonProps } from "../button/button";
import { Icon } from "../icon/icon";
import { Image } from "../image/image";
import {
  facetGroupVariants,
  facetGroupOptionsVariants,
  facetGroupSwatchVariants,
  type FacetGroupVariantsProps,
} from "./facet-group.variants";

export type FacetGroupVariant = NonNullable<FacetGroupVariantsProps["variant"]>;

export interface FacetOption {
  /** Stable identifier for this option within the group, e.g. "red", "4-up", "0-25". */
  value: string;
  label: string;
  /** Result count rendered as muted trailing text, e.g. "(128)". */
  count?: number;
  /**
   * `color-swatch` variant: a CSS color (hex/rgb/named) representing this
   * option. This is catalog *data* supplied by the consumer at runtime (a
   * product's actual color), not a design-system literal — the same
   * reasoning that lets `Image`'s `src` or `Badge`'s `children` be arbitrary
   * consumer strings. Ignored when `imageSrc` is given.
   */
  colorValue?: string;
  /** `color-swatch` variant: an image (e.g. a pattern/print swatch) instead of a solid color, rendered through `<Image>`. */
  imageSrc?: string;
  imageAlt?: string;
  /** `rating` variant: the star threshold this row represents, e.g. `4`. Falls back to `Number(value)` when omitted. */
  ratingValue?: number;
  disabled?: boolean;
}

export interface FacetGroupClassNames {
  root?: string;
  trigger?: string;
  content?: string;
  list?: string;
  option?: string;
  showMoreButton?: string;
}

export interface FacetGroupSlots {
  /** Swap the "show N more" / "show less" toggle. See ARCHITECTURE.md §4, layer 4. */
  ShowMoreButton?: React.ComponentType<ButtonProps>;
}

export interface FacetGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "id">,
    FacetGroupVariantsProps {
  /** Stable identifier for this facet, e.g. "size", "color", "price" — also used as the accordion item's value. */
  id: string;
  label: string;
  /** `checkbox` / `radio` / `color-swatch` / `rating` options. Unused for `price-range`. */
  options?: FacetOption[];
  /** `checkbox` & `color-swatch`: currently selected option values. */
  selectedValues?: string[];
  /** `checkbox` & `color-swatch`: called with the full next selection whenever an option toggles. */
  onSelectionChange?: (values: string[]) => void;
  /** `radio` & `rating`: the currently selected option value, or `undefined` for none. */
  selectedValue?: string;
  /** `radio` & `rating`: called with the next selected value (or `undefined` when cleared). */
  onValueChange?: (value: string | undefined) => void;
  /** `price-range` only. */
  min?: number;
  max?: number;
  step?: number;
  rangeValue?: [number, number];
  onRangeChange?: (value: [number, number]) => void;
  formatRangeValue?: (value: number) => string;
  /** Options beyond this count are hidden behind "Show more". @default 8 */
  visibleCount?: number;
  /** Uncontrolled initial open state. @default true */
  defaultOpen?: boolean;
  /** Controlled open state — pair with `onOpenChange`. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  classNames?: FacetGroupClassNames;
  slots?: FacetGroupSlots;
}

function optionAriaLabel(option: FacetOption): string {
  return typeof option.count === "number" ? `${option.label} (${option.count})` : option.label;
}

/**
 * One filterable attribute (Size, Color, Price, Rating, ...) — a collapsible
 * disclosure built on `Accordion` (so keyboard/`aria-expanded`/region
 * semantics come for free) wrapping one of five control shapes selected by
 * `variant`. Large option sets are handled by capping the initial render at
 * `visibleCount` and revealing the rest on "show more" inside a `ScrollArea`
 * instead of growing the page — this is what keeps 50+ values from causing
 * layout jank while staying fully keyboard operable (every control here is
 * a native/Radix focusable element, no custom key handling required).
 *
 * Client Component: owns the show-more toggle and, in the uncontrolled case,
 * the open/closed state.
 */
export const FacetGroup = React.forwardRef<HTMLDivElement, FacetGroupProps>(
  (
    {
      className,
      classNames,
      slots,
      variant = "checkbox",
      id,
      label,
      options = [],
      selectedValues,
      onSelectionChange,
      selectedValue,
      onValueChange,
      min = 0,
      max = 100,
      step,
      rangeValue,
      onRangeChange,
      formatRangeValue,
      visibleCount = 8,
      defaultOpen = true,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const t = getMessages().facetGroup;
    const [showAll, setShowAll] = React.useState(false);
    const ShowMoreButtonSlot = slots?.ShowMoreButton ?? Button;

    const isOpenControlled = open !== undefined;
    const accordionRootProps = isOpenControlled
      ? {
          value: open ? id : "",
          onValueChange: (next: string) => onOpenChange?.(next === id),
        }
      : {
          defaultValue: defaultOpen ? id : undefined,
          onValueChange: (next: string) => onOpenChange?.(next === id),
        };

    const hiddenCount = Math.max(options.length - visibleCount, 0);
    const displayedOptions = showAll ? options : options.slice(0, visibleCount);

    function toggleSelectedValue(value: string, checked: boolean) {
      const current = selectedValues ?? [];
      const next = checked ? [...current, value] : current.filter((entry) => entry !== value);
      onSelectionChange?.(next);
    }

    let controls: React.ReactNode;

    if (variant === "price-range") {
      controls = (
        <RangeSlider min={min} max={max} step={step} value={rangeValue} onChange={onRangeChange} formatValue={formatRangeValue} />
      );
    } else if (variant === "color-swatch") {
      controls = (
        <div className={cn(facetGroupOptionsVariants({ variant }), classNames?.list)}>
          {displayedOptions.map((option) => {
            const checked = selectedValues?.includes(option.value) ?? false;
            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={checked}
                aria-label={optionAriaLabel(option)}
                title={option.label}
                disabled={option.disabled}
                data-state={checked ? "checked" : "unchecked"}
                onClick={() => toggleSelectedValue(option.value, !checked)}
                className={cn(facetGroupSwatchVariants(), classNames?.option)}
              >
                {option.imageSrc ? (
                  <Image src={option.imageSrc} alt="" fill className="rounded-full object-cover" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="size-full rounded-full"
                    style={option.colorValue ? { backgroundColor: option.colorValue } : undefined}
                  />
                )}
                {checked ? (
                  <span
                    aria-hidden="true"
                    className="absolute -end-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-fg"
                  >
                    <Icon name="check" size="sm" className="size-3" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      );
    } else if (variant === "radio" || variant === "rating") {
      controls = (
        <RadioGroup
          value={selectedValue ?? ""}
          onValueChange={(next) => onValueChange?.(next || undefined)}
          className={cn(facetGroupOptionsVariants({ variant }), classNames?.list)}
        >
          {displayedOptions.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={classNames?.option}
              label={
                variant === "rating" ? (
                  <span className="flex items-center gap-1.5">
                    <Rating value={option.ratingValue ?? Number(option.value)} size="sm" />
                    <span>{option.label}</span>
                  </span>
                ) : (
                  option.label
                )
              }
              description={typeof option.count === "number" ? `(${option.count})` : undefined}
            />
          ))}
        </RadioGroup>
      );
    } else {
      controls = (
        <div className={cn(facetGroupOptionsVariants({ variant }), classNames?.list)}>
          {displayedOptions.map((option) => (
            <Checkbox
              key={option.value}
              checked={selectedValues?.includes(option.value) ?? false}
              onCheckedChange={(checked) => toggleSelectedValue(option.value, checked === true)}
              disabled={option.disabled}
              className={classNames?.option}
              label={option.label}
              description={typeof option.count === "number" ? `(${option.count})` : undefined}
            />
          ))}
        </div>
      );
    }

    const showOptionControls = variant !== "price-range";
    const wrappedControls =
      showOptionControls && showAll && hiddenCount > 0 ? (
        <ScrollArea className="max-h-72">
          <div className="pe-3">{controls}</div>
        </ScrollArea>
      ) : (
        controls
      );

    return (
      <Accordion type="single" collapsible {...accordionRootProps}>
        <AccordionItem
          ref={ref}
          value={id}
          data-variant={variant}
          className={cn(facetGroupVariants({ variant }), classNames?.root, className)}
          {...props}
        >
          <AccordionTrigger className={classNames?.trigger}>{label}</AccordionTrigger>
          <AccordionContent className={classNames?.content}>
            {wrappedControls}
            {showOptionControls && hiddenCount > 0 ? (
              <ShowMoreButtonSlot
                type="button"
                variant="ghost"
                size="sm"
                className={cn("mt-2", classNames?.showMoreButton)}
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? t.showLess : t.showMore(hiddenCount)}
              </ShowMoreButtonSlot>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
);

FacetGroup.displayName = "FacetGroup";
