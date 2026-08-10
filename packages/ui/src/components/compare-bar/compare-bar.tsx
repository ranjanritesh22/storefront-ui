"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";
import { Image } from "../image/image";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import { compareBarVariants } from "./compare-bar.variants";

export interface CompareBarItem {
  id: string;
  label: string;
  imageSrc?: string;
}

export interface CompareBarClassNames {
  root?: string;
  list?: string;
  item?: string;
  image?: string;
  label?: string;
  remove?: string;
  actions?: string;
  compareButton?: string;
  clearButton?: string;
}

export interface CompareBarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface CompareBarSlots {
  Image?: React.ComponentType<CompareBarImageProps>;
  CompareButton?: React.ComponentType<ButtonProps>;
  ClearButton?: React.ComponentType<ButtonProps>;
}

function DefaultCompareImage({ src, alt, className }: CompareBarImageProps) {
  return <Image src={src} alt={alt} width={32} height={32} className={className} />;
}

export interface CompareBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items currently selected for comparison. Nothing renders when this is empty. */
  items: CompareBarItem[];
  onRemoveItem?: (id: string) => void;
  onCompare?: () => void;
  onClearAll?: () => void;
  compareLabel?: string;
  clearLabel?: string;
  classNames?: CompareBarClassNames;
  /** Swap any part of the composition while keeping the rest — see ARCHITECTURE.md §4, layer 4. */
  slots?: CompareBarSlots;
}

export const CompareBar = React.forwardRef<HTMLDivElement, CompareBarProps>(
  (
    {
      className,
      classNames,
      items,
      onRemoveItem,
      onCompare,
      onClearAll,
      compareLabel,
      clearLabel,
      slots,
      ...props
    },
    ref,
  ) => {
    const t = getMessages();

    if (items.length === 0) {
      return null;
    }

    const ImageSlot = slots?.Image ?? DefaultCompareImage;
    const CompareButtonSlot = slots?.CompareButton ?? Button;
    const ClearButtonSlot = slots?.ClearButton ?? Button;

    return (
      <div
        ref={ref}
        role="region"
        aria-label={t.compareBar.region}
        className={cn(compareBarVariants(), classNames?.root, className)}
        {...props}
      >
        <ul className={cn("flex flex-1 flex-wrap items-center gap-2 overflow-x-auto", classNames?.list)}>
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "flex items-center gap-2 rounded-md border border-border bg-surface-raised ps-2 pe-1 py-1",
                classNames?.item,
              )}
            >
              {item.imageSrc ? (
                <ImageSlot
                  src={item.imageSrc}
                  alt={item.label}
                  className={cn("size-8 shrink-0 rounded-sm object-cover", classNames?.image)}
                />
              ) : null}
              <span className={cn("font-sans text-sm text-foreground", classNames?.label)}>{item.label}</span>
              <button
                type="button"
                aria-label={t.compareBar.remove(item.label)}
                onClick={() => onRemoveItem?.(item.id)}
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-foreground-muted outline-none",
                  "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
                  "hover:bg-border/50 hover:text-foreground",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  classNames?.remove,
                )}
              >
                <Icon name="close" size="sm" />
              </button>
            </li>
          ))}
        </ul>
        <div className={cn("flex shrink-0 items-center gap-2", classNames?.actions)}>
          <ClearButtonSlot
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className={classNames?.clearButton}
          >
            {clearLabel ?? t.compareBar.clearAll}
          </ClearButtonSlot>
          <CompareButtonSlot
            type="button"
            variant="primary"
            size="sm"
            onClick={onCompare}
            className={classNames?.compareButton}
          >
            {compareLabel ?? t.compareBar.compare(items.length)}
          </CompareButtonSlot>
        </div>
      </div>
    );
  },
);

CompareBar.displayName = "CompareBar";
